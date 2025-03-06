import { Request, Response, RequestHandler } from "express";
import supabase from "../../services/supabase.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { isStrongPassword } from "../../utils/passwordUtil";

// Generate JWT Tokens
// access token
const generateAccessToken = (userId: string, role: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};

// refresh token
const generateRefreshToken = (userId: string) => {
  if (!process.env.REFRESH_SECRET) {
    throw new Error("REFRESH_SECRET is not defined");
  }

  return jwt.sign({ userId }, process.env.REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

// Signup
export const signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const { data, error } = await supabase.from("users").insert([
      { email, password: hashedPassword, role },
    ]);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the user",
      details: (error as Error).message,
    });
  }
};

// Login
export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const accessToken = generateAccessToken(data.id, data.role);
    const refreshToken = generateRefreshToken(data.id);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    // Store refresh token in DB
    await supabase.from("refresh_tokens").delete().eq("user_id", data.id);
    await supabase.from("refresh_tokens").insert([{ user_id: data.id, token: hashedRefreshToken }]);

    res.json({ message: "Login successful", accessToken, refreshToken, role: data.role });
    return;
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while logging in",
      details: (error as Error).message,
    });
  }
};

// Forgot Password
export const forgotPassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", email)
      .single();

    if (error || !user) {
      res.status(404).json({ error: "Email not found" });
      return;
    };

    const { data: recentOtp } = await supabase
      .from("password_reset_tokens")
      .select("created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (recentOtp) {
      const lastOtpTime = new Date(recentOtp.created_at);
      const now = new Date();
      const timeDiff = (now.getTime() - lastOtpTime.getTime()) / 1000 / 60; // in minutes

      if (timeDiff < 5) {
        res.status(429).json({ error: "Please wait 5 minutes before requesting a new OTP." });
        return;
      }
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const hashedOtp = await bcrypt.hash(otp, 12);

    // store otp in DB
    await supabase
      .from("password_reset_tokens")
      .insert([{ user_id: user.id, otp: hashedOtp, expires_at: expiresAt.toISOString() }]);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 10 minustes`
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while sending OTP",
      details: (error as Error).message,
    });
  }
};

// Verify OTP and reset password
export const resetPassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate password strength
    if (!isStrongPassword(newPassword)) {
      res.status(400).json({ 
        error: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" 
      });
      return;
    }

    // Get user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (userError || !user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    // Get the stored OTP records
    const { data: otpRecords, error: otpError } = await supabase
      .from("password_reset_tokens")
      .select("id, otp, expires_at, used")
      .eq("user_id", user.id)
      .gte("expires_at", new Date().toISOString())
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(5); // Get recent tokens in case multiple were generated

    if (otpError || !otpRecords || otpRecords.length === 0) {
      res.status(400).json({ error: "No a valid OTP" });
      return;
    }

    // Try to find a matching OTP
    let validOtpRecord = null;
    for (const record of otpRecords) {
      const otpMatches = await bcrypt.compare(otp, record.otp);
      if (otpMatches) {
        validOtpRecord = record;
        break;
      }
    }

    if (!validOtpRecord) {
      res.status(400).json({ error: "Invalid OTP" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    const { error: updateError } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("id", user.id);

    if (updateError) {
      console.error(`Supabase error: ${updateError.message}`);
      res.status(500).json({ error: "Password reset failed" });
      return;
    }

    // Mark OTP as used
    await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("id", validOtpRecord.id);

    // Invalidate all refresh tokens for this user for security
    await supabase
      .from("refresh_tokens")
      .delete()
      .eq("user_id", user.id);

    res.json({ message: "Password reset successful. Please log in with your new password." });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while resetting password",
      details: (error as Error).message,
    });
  }
};

// Verify email
export const verifyEmail: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;

    const { data: verificationToken, error } = await supabase
      .from("email_verification_tokens")
      .select("user_id")
      .eq("token", token)
      .single();

    if (error || !verificationToken) {
      res.status(400).json({ error: "Invalid or expired token" });
      return;
    }

    // Update user verification status
    await supabase
      .from("users")
      .update({ email_verified: true })
      .eq("id", verificationToken.user_id);

    // Delete verification token
    await supabase
      .from("email_verification_tokens")
      .delete()
      .eq("token", token);

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while verifying email",
      details: (error as Error).message,
    });
  }
};

// Refresh token endpoint
export const refreshToken: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: "Refresh token required" });
    return;
  }

  try {
    // First verify the token is valid
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as { userId: string };
    
    // Get the stored hashed token for this user
    const { data: storedTokenData, error } = await supabase
      .from("refresh_tokens")
      .select("token, user_id")
      .eq("user_id", decoded.userId)
      .single();

    if (error || !storedTokenData) {
      res.status(403).json({ error: "Invalid or expired refresh token" });
      return;
    }

    // Compare the provided token with the stored hash
    const tokenMatches = await bcrypt.compare(refreshToken, storedTokenData.token);
    
    if (!tokenMatches) {
      res.status(403).json({ error: "Invalid refresh token" });
      return;
    }

    // Get the user's role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", decoded.userId)
      .single();

    if (userError || !userData) {
      res.status(403).json({ error: "User not found" });
      return;
    }

    const newAccessToken = generateAccessToken(decoded.userId, userData.role);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

// Logout
export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token required" });
    return;
  }

  try {
    // Verify the refresh token to get userId
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as { userId: string };
    
    // Delete all refresh tokens for this user (for complete logout across devices)
    await supabase.from("refresh_tokens").delete().eq("user_id", decoded.userId);

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    // Even if token verification fails, try to delete it
    try {
      await supabase.from("refresh_tokens").delete().eq("token", refreshToken);
    } catch (innerError) {
      // Ignore errors here, we're already in an error state
    }
    res.status(200).json({ message: "Logged out" });
  }
};

// Send verification email
export const sendVerificationEmail = async (userId: string, email: string) => {
  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  // Store token
  await supabase
    .from("email_verification_tokens")
    .insert([{ user_id: userId, token, expires_at: expiresAt.toISOString() }]);

  // Send email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    text: `Click the link to verify your email: ${verificationUrl}`,
  });
};



import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { validationResult } from 'express-validator';

const SECRET_KEY = process.env.JWT_SECRET || 'yourSecretKey';

// User registration
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
    return;
  } catch (error) {
    next(error);
  }
};

// User login
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    const { email, password } = req.body;
    try {
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      // Generate token
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
      return;
    } catch (error) {
      next(error);
    }
};

// Get current authenticated user
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.findById(req.user?.id).select('-password');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
      next(error)
    }
};

function next(error: unknown) {
    throw new Error('Function not implemented.');
}


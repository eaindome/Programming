const pool = require('../../database/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const createError = require('http-errors');

const { getUserByEmail, insertPasswordResetToken, getPasswordResetToken, updatePassword, deletePasswordResetToken } = require('./queries');
const { authSchema, loginSchema } = require('../validation/schema');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send password reset email
const sendResetEmail = async (email, token) => {
    const resetLink = `http://localhost:8000/auth/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Please click the following link to reset your password: ${resetLink}`
    };

    await transporter.sendMail(mailOptions);
};

// Initiate password reset
const initiateResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await pool.query(getUserByEmail, [email]);
        if (user.rows.length === 0) {
            return next(createError.NotFound('Email not found.'));
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

        await pool.query(insertPasswordResetToken, [user.rows[0].id, token, expiresAt]);
        await sendResetEmail(email, token);

        res.json({ message: 'Password reset email sent.' });
    } catch (error) {
        next(error);
    }
};

// Reset password
const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return next(createError.BadRequest('Passwords do not match.'));
        }

        const resetToken = await pool.query(getPasswordResetToken, [token]);
        if (resetToken.rows.length === 0) {
            return next(createError.BadRequest('Invalid or expired token.'));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await pool.query(updatePassword, [hashedPassword, resetToken.rows[0].user_id]);
        await pool.query(deletePasswordResetToken, [token]);

        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    initiateResetPassword,
    resetPassword
};
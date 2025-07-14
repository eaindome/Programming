import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, getCurrentUser } from './auth.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

// @route POST /api/auth/register
// @desc Register a user
router.post(
    '/register', [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    registerUser
);

// @route POST /api/auth/login
// @desc Authencticate user and get token
router.post(
    '/login', [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    loginUser
);

// @route GET /api/auth/me
// @desc Get current authenticated user
router.get('/me', authMiddleware, getCurrentUser);

export default router;

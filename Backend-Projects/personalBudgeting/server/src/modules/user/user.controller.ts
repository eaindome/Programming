impot { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// get user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json(user);
    } catch (erro) {
        res.status(500).json({
            message: `Server error: \n${error}`
        });
    }
};

// update user profile
expost const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?id;
        const { name, email, password } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();
        res.status(200).json({
            message: 'User profile update successfully',
            user: updateUser
        });
    } catch (error) {
        return res.status(500).json({
            message: `Server error: \n${error}`
        });
    }
};

// delete user profile
export const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await user.remove();

        res.status(500).json({
            message: `Server error: \n${error}`
        });
    } catch (error) {
        return res.status(500).json({
            message: `Server error: \n${error}`
        });
    }
};


// Admin: get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: `Server error: \n${error}`
        });
    }
};

// Admin: update user role
export const updateuserRole = async (req: Request, res: Response) => {
    try {} catch (error) {
        res.status(500).json({
            message: `Server error: \n${error}`
        });
    }
};
import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { isValidEmail, isStrongPassword } from '../utils/validators';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    if (!isValidEmail(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }

    if (!isStrongPassword(password)) {
        res.status(400).json({ error: 'Password is too weak' });
        return;
    }

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({ error: 'Email already in use' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(201).json({ user, token });
        return;
    } catch (error) {
        console.log('Come on');
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Signup failed' });
        return;
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    if (!isValidEmail(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }

    try {
        // check if the user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ user, token });
        return;
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
        return;
    }
};
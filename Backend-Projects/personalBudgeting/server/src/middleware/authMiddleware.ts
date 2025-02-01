import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare module 'express' {
    interface Request {
        user?: any;
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];   // bearer token

    if (!token) {
        res.status(401).json({
            message: 'Not authorized, no token'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized, token failed'
        });
        return;
    }
};

import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare module 'express' {
    interface Request {
        user?: any;
    }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];   // bearer token

    if (!token) {
        return res.status(401).json({
            message: 'Not authorized, no token'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized, token failed'
        });
    }
};

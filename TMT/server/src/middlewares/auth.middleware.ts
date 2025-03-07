import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Middleware to verify JWT token
export const authenticateUser: RequestHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Access denied. Valid authorization header required." });
      return;
    }
    
    const token = authHeader.substring(7); 
    
    if (!token) {
      res.status(401).json({ error: "Access denied. Token required." });
      return;
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { 
        userId: string; 
        role: string;
      };
      
      req.user = decoded;
      next();
    } catch (error) {
      const err = error as Error;
      if (err.name === "TokenExpiredError") {
        res.status(401).json({ error: "Access token expired. Please refresh your token." });
      } else {
        res.status(403).json({ error: "Invalid token" });
      }
    }
};

// Role-based authorization middleware
export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized. Authentication required." });
        return;
      }
  
      const { role } = req.user;
      
      if (allowedRoles.includes(role)) {
        next();
      } else {
        res.status(403).json({ 
          error: "Forbidden. You don't have permission to access this resource." 
        });
      }
    };
};

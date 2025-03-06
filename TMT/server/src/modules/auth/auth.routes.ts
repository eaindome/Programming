import { Router, Request } from "express";
import { 
    login, signup, forgotPassword, 
    verifyEmail, refreshToken, logout 
} from "./auth.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import csrfProtection from "../../middlewares/csrf.middleware";
import loginLimiter from "../../middlewares/rateLimiting.middleware";      

const router = Router();

router.post("/signup", signup);
router.post("/login", csrfProtection, loginLimiter, login);
router.post("/reset-password", forgotPassword);
router.post("/verify-email", verifyEmail);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticateUser, logout);

// Protected Route Example
router.get("/profile", authenticateUser, (req: Request & { user?: any }, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

export default router;

// Usage example:
// router.get('/admin/users', authenticateUser, authorizeRoles('admin'), adminController.getAllUsers);

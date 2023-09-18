const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// route for registration or signup process
router.post('/register', authController.register);

// route for login process
router.post('/login', authController.login);

// route to send refresh token
router.post('/refresh-token', authController.refreshToken);

// route for logout process
router.delete('/logout', authController.logout);


module.exports = router;
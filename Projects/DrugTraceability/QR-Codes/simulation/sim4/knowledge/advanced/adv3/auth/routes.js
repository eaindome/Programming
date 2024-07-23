const { Router } = require('express');
const controller = require('./controller');
const passController = require('./password/controller');
const path = require('path');
const { verifyAccessToken } = require('./token/jwt_helper');

const router = Router();

router.post('/register', controller.registerUser);
router.post('/register-account', controller.registerBlockAccount);
router.post('/login', controller.loginUser);
router.post('/refresh-token', controller.refreshToken);
router.delete('/logout', verifyAccessToken, controller.logout);
router.post('/initiate-reset-password', passController.initiateResetPassword);
router.post('/reset-password', passController.resetPassword);
router.get('/balance', verifyAccessToken, controller.getBalance);

// Serve reset password page
router.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, './password/web/reset-password.html'));
});


module.exports = router;


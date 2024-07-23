const { Router } = require('express');
const controller = require('./controller');
const { verifyAccessToken } = require('../auth/token/jwt_helper');

const router = Router();

router.post('/generate-qr-code', verifyAccessToken, controller.generateQRCode);

module.exports = router; 
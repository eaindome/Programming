const { Router } = require('express');
const controller = require('./controller');
const { verifyAccessToken } = require('../token/jwt_helper');

const router = Router();

router.post('/add-account', verifyAccessToken, controller.updateAccount);

module.exports = router;
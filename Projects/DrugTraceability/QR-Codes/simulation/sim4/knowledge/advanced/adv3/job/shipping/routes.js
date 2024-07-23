const { Router } = require('express');
const controller = require('./controller');
const { verifyAccessToken } = require('../../auth/token/jwt_helper');

const router = Router();

router.post('/add', verifyAccessToken, controller.addShippingTruck);

module.exports = router;
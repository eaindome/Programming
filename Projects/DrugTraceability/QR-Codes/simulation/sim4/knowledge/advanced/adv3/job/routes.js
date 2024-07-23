const { Router } = require('express');
const controller = require('./controller');
const { verifyAccessToken } = require('../auth/token/jwt_helper');

const router = Router();

router.post('/add-company', verifyAccessToken, controller.addCompany);
router.post('/add-pd-company', verifyAccessToken, controller.addPDCompany);
router.post('/add-sd-company', verifyAccessToken, controller.addSDCompany);
router.post('/add-retailer', verifyAccessToken, controller.addRetailer);


module.exports = router;
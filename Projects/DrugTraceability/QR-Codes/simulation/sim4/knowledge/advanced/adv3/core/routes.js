const { Router } = require('express');	
const controller = require('./controller');
const { verifyAccessToken } = require('../auth/token/jwt_helper');

const router = Router();

router.post('/create-hierarchy', verifyAccessToken, controller.createHierarchy);
router.get('/fetch-hierarchy', verifyAccessToken, controller.fetchHierarchy);
router.post('/print-hierarchy', verifyAccessToken, controller.printHierarchy);

module.exports = router;
const { Router } = require('express');	
const controller = require('./controller');
const { verifyAccessToken } = require('../../auth/token/jwt_helper');

const router = Router();

router.post('/transact', verifyAccessToken, controller.startTransaction);
router.get('/hist', controller.transactHist);

module.exports = router;
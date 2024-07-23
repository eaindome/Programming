const { Router } = require('express');	
const controller = require('./controller');
const { verifyAccessToken } = require('../../auth/token/jwt_helper')


const router = Router();

// router.post('/create', verifyAccessToken, controller.makeDelivery);

router.get('/availPacks', verifyAccessToken, controller.displayAvailPacks);
router.get('/availBoxes', verifyAccessToken, controller.displayAvailBoxes);
router.get('/recent', verifyAccessToken, controller.recentDeliveries);

module.exports = router;
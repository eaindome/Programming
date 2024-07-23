const { Router } = require('express');	
const controller = require('./controller');
const { verifyAccessToken } = require('../../auth/token/jwt_helper');

const router = Router();

// Route to enter FDA code and update FDA approval status
router.post('/enterFDAcode', controller.enterFDAcode)

// Route to check FDA approval status
router.get('/checkFDAapproval/:id', controller.checkFDAapproval);

// Route to update FDA approval status
router.put('/updateFDAapproval/:id', controller.updateFDAapproval);


module.exports = router;
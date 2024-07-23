const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/pack', controller.getPackApproval);
router.get('/box', controller.getBoxApproval);
router.get('/product', controller.getProductApproval);
router.get('/confirmStatus', controller.confirmStatus);

module.exports = router;
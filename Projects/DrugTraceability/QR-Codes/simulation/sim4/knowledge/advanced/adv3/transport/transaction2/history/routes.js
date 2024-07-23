const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/get-goods-history', controller.getGoodsHistory);

module.exports = router
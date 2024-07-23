const { Router } = require('express');	
const controller = require('./controller');
const path = require('path');
const { verifyAccessToken } = require('../../auth/token/jwt_helper');

const router = Router();

router.post('/transact', verifyAccessToken, controller.startTransaction);
router.get('/hist', controller.transactHist);
router.post('/approve-transaction', controller.approveTransaction);

// Serve reset password page
router.get('/verify-transaction/:fromUser/:to/:goodsId/:private_key/:username/:data/:to_user/:transactionId', (req, res) => {
    res.sendFile(path.join(__dirname, './web/verify_transaction.html'));
});

module.exports = router;
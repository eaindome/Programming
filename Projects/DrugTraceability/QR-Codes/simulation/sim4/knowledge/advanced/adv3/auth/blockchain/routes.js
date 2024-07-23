const express = require('express');
const router = express.Router();
const { getGanacheAccounts } = require('./account');

router.get('/getGanacheAccounts', getGanacheAccounts);

module.exports = router;

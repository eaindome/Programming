const express = require('express');
const { shortenUrl } = require('./controller');

const router = express.Router();

router.post('/shorten', shortenUrl);

module.exports = router;
const express = require('express');
const { redirectUrl } = require('./controller');

const router = express.Router();

router.get('/:shortUrl', redirectUrl);

module.exports = router;
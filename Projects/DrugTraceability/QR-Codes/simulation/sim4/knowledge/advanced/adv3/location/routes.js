const express = require('express');
const { getLocation } = require('./controller');

const router = express.Router();

router.get('/location', getLocation);

module.exports = router;

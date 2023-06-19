const { Router } = require('express');
const bookClass = require('./bookClass')

const router = Router();

router.post('/book', bookClass.bookClass);

module.exports = router;

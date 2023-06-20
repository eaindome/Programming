const { Router } = require('express');
const classController = require('./controller');

const router = Router();

router.post('/:roomID', classController.bookClass);

module.exports = router;


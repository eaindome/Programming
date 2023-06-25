const express = require('express');
const { bookClass, cancelRoomBooking } = require('./controller');

const router = express.Router();

router.post('/book/:roomId', bookClass);
router.put('/cancel/:roomId', cancelRoomBooking);

module.exports = router;


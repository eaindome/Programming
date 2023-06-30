const express = require('express');
const { bookClass, cancelRoomBooking, getAvailableTimes, getAvailableTimesCurrent } = require('./controller');

const router = express.Router();

router.post('/book/:roomId', bookClass);
router.put('/cancel/:roomId', cancelRoomBooking);
router.get('/availableTimes/:roomId/:day', getAvailableTimes);
router.get('/getAvailableTimesCurrent/:roomId', getAvailableTimesCurrent);

module.exports = router;


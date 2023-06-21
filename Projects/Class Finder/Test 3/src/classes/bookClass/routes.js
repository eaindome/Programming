const { Router } = require('express');
const classController = require('./controller');

const router = Router();

router.post('/:roomId', classController.bookClass);
router.put('/:roomId', classController.updateRoomStatusManually);
router.delete('/:roomId', classController.cancelRoomBooking);

module.exports = router;

const express = require('express');
const { searchLectureRooms } = require('./controller');

const router = express.Router();

// Route to search for lecture rooms
router.get('/search', searchLectureRooms);

module.exports = router;

const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Route for updating notification preference
router.put('/notification-preference', controller.updateNotificationPreference);

module.exports = router;

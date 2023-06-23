const { Router } = require('express');
const upcomingClasses = require('./upcomingClasses');

const router = Router();

router.get('/', upcomingClasses.getUpcomingClass);

module.exports = router;

const pool = require('../../../database');
const queries = require('./queries');

// Update class status for multiple rooms
const updateClassStatus = async (status, roomIds) => {
  await pool.query(queries.updateClassStatus, [status, roomIds]);
};

// Update class status for all rooms
const updateAllClassStatus = async (status) => {
  await pool.query(queries.updateAllClassStatus, [status]);
};

// Update room statuses based on timetable data
const updateRoomStatuses = async () => {
  const currentDay = new Date().getDay();
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

  // Check if it's Sunday (0) or Saturday (6)
  if (currentDay === 0 || currentDay === 6) {
    // If it's Sunday or Saturday, set the class status to "Empty" for all rooms
    await updateAllClassStatus('Available');
    return;
  }

  // Get the ongoing timetables
  const ongoingTimetables = await pool.query(queries.getOngoingTimetables, [currentDay, currentTime]);
  const ongoingTimetableIds = ongoingTimetables.rows.map((timetable) => timetable.timetable_id);

  if (ongoingTimetableIds.length > 0) {
    // Set the class status to "Ongoing" for the ongoing timetables
    await updateClassStatus('Ongoing', ongoingTimetableIds);
  }

  // Get the non-ongoing timetables
  const nonOngoingTimetables = await pool.query(queries.getNonOngoingTimetables, [currentDay, currentTime]);
  const nonOngoingTimetableIds = nonOngoingTimetables.rows.map((timetable) => timetable.timetable_id);

  if (nonOngoingTimetableIds.length > 0) {
    // Set the class status to "Empty" for the non-ongoing timetables
    await updateClassStatus('Available', nonOngoingTimetableIds);
  }

  // Log the updated class statuses
  console.log('Class statuses updated at:', currentTime);
};

// Automatically update room statuses at regular intervals
const interval = setInterval(async () => {
  await updateRoomStatuses();
}, 6 * 60 * 1000); // Update every 5 minutes or if you want for 1 minute (60000)

// Stop updating room statuses when the application exits
process.on('SIGINT', () => {
  clearInterval(interval);
  process.exit(0);
});



module.exports = {
  updateRoomStatuses,
};
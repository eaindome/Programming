const pool = require('../../../database');
const queries = require('./queries');
const { getCurrentDay, getCurrentTime } = require('../ongoingClasses/utils');

let manuallyUpdatedRoomIds = [];

// Endpoint: Book a class/lecture room
const bookClass = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { day, course, duration } = req.body;
    const userId = req.session.userid;

    // Check if the user is authenticated (session validation)
    if (!userId) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    // Verify the user's role is "Class Rep"
    const userRoleQuery = await pool.query(queries.getUserRole, [userId]);
    const userRole = userRoleQuery.rows[0].role;

    if (userRole !== 'Class Rep') {
      return res.status(403).json({ error: 'Access denied. Only Class Reps can book classes.' });
    }
    
    /*
    // Check if the room is available
    const classExists = await queries.getClassByRoomAndDay(roomId, day);

    if (classExists) {
      return res.status(409).json({ error: 'The room is not available for booking.' });
    }*/

    // Update the room status to "Booked"
    await pool.query(queries.updateRoomStatus, ['Booked', roomId]);

    // Add the manually updated room ID to the array
    manuallyUpdatedRoomIds.push(roomId);

    // Insert booking information into the BookedClasses table
    const bookingQuery = await pool.query(queries.bookClass, [userId, roomId, course, day, duration]);
    const bookingId = bookingQuery.rows[0].booking_id;

    // Set a timer to automatically change the room status to "Ongoing" after 5 minutes
    setTimeout(async () => {
      // Check if the room status is still "Booked" before updating it to "Ongoing"
      const currentStatusQuery = await pool.query(queries.getRoomStatus, [roomId]);
      const currentStatus = currentStatusQuery.rows[0].status;

      if (currentStatus === 'Booked') {
        await pool.query(queries.updateRoomStatus, ['Ongoing', roomId]);

        // Add the manually updated room ID to the array
        manuallyUpdatedRoomIds.push(roomId);
      }
    }, 1 * 60 * 1000); // 5 minutes (converted to milliseconds)

    res.status(200).json({
      message: 'Class booked successfully.',
      bookingId,
      selectedRoom: `Room ${roomId}`,
      day,
      course,
      duration,
    });
  } catch (error) {
    console.error('Error executing query: ', error);
    console.error(error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Endpoint: Cancel a room booking by the class representative
const cancelRoomBooking = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.session.userid;

    // Check if the user is authenticated (session validation)
    if (!userId) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    // Verify the user's role is "Class Rep"
    const userRoleQuery = await pool.query(queries.getUserRole, [userId]);
    const userRole = userRoleQuery.rows[0].role;

    if (userRole !== 'Class Rep') {
      return res.status(403).json({ error: 'Access denied. Only Class Reps can cancel class bookings.' });
    }

    // Check if the room ID is in the manuallyUpdatedRoomIds array
    if (!manuallyUpdatedRoomIds.includes(roomId)) {
      return res.status(400).json({ error: 'Invalid room ID. The room was not manually updated.' });
    }

    // Check if the class status is "Booked" or "Ongoing" before cancelling the booking
    const classStatusQuery = await pool.query(queries.getClassStatus, [roomId]);
    const classStatus = classStatusQuery.rows[0].status;

    if (classStatus === 'Booked' || classStatus === 'Ongoing') {
      await pool.query(queries.updateClassStatus, ['Cancelled', roomId]);

      // Remove the manually updated room ID from the array
      manuallyUpdatedRoomIds = manuallyUpdatedRoomIds.filter((id) => id !== roomId);

      res.status(200).json({ message: 'Class booking cancelled successfully.' });
    } else {
      res.status(409).json({ error: 'The class is not currently booked or ongoing.' });
    }
  } catch (error) {
    console.error('Error executing query: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Endpoint: Get Available Times of a Lecture Room
const getAvailableTimes = async (req, res) => {
  try {
    const { roomId, day } = req.params;

    const availableTimes = await calculateAvailableTimes(roomId, day);
    //console.log("availableTimes", availableTimes);

    res.status(200).json({ availableTimes });
  } catch (error) {
    console.error('Error executing query: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Function: Calculate Available Times
const calculateAvailableTimes = async (roomId, day) => {
  try {
    const timetableQuery = await pool.query(queries.getTimetableByRoomAndDay, [roomId, day]);
    const timetable = timetableQuery.rows;
    
    // Sort timetable by start time
    timetable.sort((a, b) => a.start_time.localeCompare(b.start_time));

    const availableTimes = [];

    // Static start and end times
    const startTime = '08:01:00';
    const endTime = '19:59:00';

    // Check if there are classes before the first scheduled class
    if (timetable.length > 0) {
      const firstClass = timetable[0];
      if (firstClass.start_time > startTime) {
        availableTimes.push({ start_time: startTime, end_time: firstClass.start_time });
      }
    } else {
      // If there are no classes, the entire day is available
      availableTimes.push({ start_time: startTime, end_time: endTime });
      return availableTimes;
    }

    // Calculate available times based on timetable gaps
    for (let i = 0; i < timetable.length - 1; i++) {
      const currentClass = timetable[i];
      const nextClass = timetable[i + 1];

      if (currentClass.end_time < nextClass.start_time) {
        availableTimes.push({ start_time: currentClass.end_time, end_time: nextClass.start_time });
      }
    }

    // Check if there are classes after the last scheduled class
    const lastClass = timetable[timetable.length - 1];
    if (lastClass.end_time < endTime) {
      availableTimes.push({ start_time: lastClass.end_time, end_time: endTime });
    }

    return availableTimes;
  } catch (error) {
    throw new Error('Error calculating available times');
  }
};

// Endpoint: Get Available Times of a Lecture Room
const getAvailableTimesCurrent = async (req, res) => {
  try {
    const { roomId } = req.params;
    const currentDay = getCurrentDay();
    const currentTime = getCurrentTime();

    const availableTimes = await calculateAvailableTimesCurrent(roomId, currentDay, currentTime, true);

    res.status(200).json({ availableTimes });
  } catch (error) {
    console.error('Error executing query: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/*
// Function: Calculate Available Times
const calculateAvailableTimes = async (roomId, day, time) => {
  try {
    const timetableQuery = await pool.query(queries.getTimetableByRoomAndDay, [roomId, day]);
    const timetable = timetableQuery.rows;
    timetable.sort((a, b) => a.start_time.localeCompare(b.start_time));

    const availableTimes = [];

    // Calculate available times based on timetable gaps
    for (let i = 0; i < timetable.length - 1; i++) {
      const currentClass = timetable[i];
      const nextClass = timetable[i + 1];

      const endTime = currentClass.end_time;
      const startTime = nextClass.start_time;

      if (endTime < startTime) {
        availableTimes.push({ start_time: endTime, end_time: startTime });
      }
    }

    // Add static start and end times for the beginning and end of the day
    if (timetable.length > 0) {
      const firstClass = timetable[0];
      const lastClass = timetable[timetable.length - 1];

      const firstStartTime = '08:01'; // Static start time
      const lastEndTime = '19:59'; // Static end time

      if (firstStartTime < firstClass.start_time) {
        availableTimes.unshift({ start_time: firstStartTime, end_time: firstClass.start_time });
      }

      if (lastClass.end_time < lastEndTime) {
        availableTimes.push({ start_time: lastClass.end_time, end_time: lastEndTime });
      }
    } else {
      // If no classes in the timetable, add the full available time range
      const fullStartTime = '08:01'; // Static start time
      const fullEndTime = '19:59'; // Static end time

      availableTimes.push({ start_time: fullStartTime, end_time: fullEndTime });
    }

    return availableTimes;
  } catch (error) {
    throw new Error('Error calculating available times');
  }
};*/


// Function: Calculate Available Times
const calculateAvailableTimesCurrent = async (roomId, day, currentTime = null, isCurrentEndpoint = false) => {
  try {
    const timetableQuery = await pool.query(queries.getTimetableByRoomAndDay, [roomId, day]);
    const timetable = timetableQuery.rows;

    // Sort timetable by start time
    timetable.sort((a, b) => a.start_time.localeCompare(b.start_time));

    const availableTimes = [];

    // Calculate available times based on timetable gaps
    for (let i = 0; i < timetable.length - 1; i++) {
      const currentClass = timetable[i];
      const nextClass = timetable[i + 1];

      const endTime = currentClass.end_time;
      const startTime = nextClass.start_time;

      if (endTime < startTime) {
        availableTimes.push({ start_time: endTime, end_time: startTime });
      }
    }

    if (isCurrentEndpoint && currentTime) {
      const firstClass = timetable[0];
      const lastClass = timetable[timetable.length - 1];

      const startTime = firstClass.start_time;
      const endTime = lastClass.end_time;

      if (endTime < '19:59:00') {
        availableTimes.push({ start_time: endTime, end_time: '19:59:00' });
      }

      if (currentTime < startTime || currentTime > '19:59:00') {
        return 'Rooms are closed for the day.';
      }
    }

    return availableTimes;
  } catch (error) {
    throw new Error('Error calculating available times');
  }
};


module.exports = {
  bookClass,
  cancelRoomBooking,
  manuallyUpdatedRoomIds,
  getAvailableTimes,
  getAvailableTimesCurrent,
};




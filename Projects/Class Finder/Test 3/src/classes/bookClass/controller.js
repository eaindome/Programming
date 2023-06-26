const pool = require('../../../database');
const queries = require('./queries');

let manuallyUpdatedRoomIds = [];

// Endpoint: Book a Class
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

module.exports = { bookClass, cancelRoomBooking, manuallyUpdatedRoomIds };




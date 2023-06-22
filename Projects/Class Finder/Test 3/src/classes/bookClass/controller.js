const pool = require('../../../database');
const queries = require('./queries');

let manuallyUpdatedRoomIds = [];


// Endpoint: Book a Class
const bookClass = (req, res) => {
  // Assume the user information is stored in the request object after successful login
  // Check if the user is authenticated (session validation)
  if (!req.session.userid) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  const userId = req.session.userid;
  const roomId = req.params.roomId;
  const bookingTime = new Date(); // Get the current booking time

  // Verify the user's role is "Class Rep"
  pool.query(queries.getUserRole, [userId], (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const userRole = results.rows[0].role;

    if (userRole !== 'Class Rep') {
      return res.status(403).json({ error: 'Access denied. Only Class Reps can book classes.' });
    }

    // Check if the room is available
    pool.query(queries.getClassStatus, [roomId], (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const classStatus = results.rows[0].status;

      if (classStatus !== 'Available') {
        return res.status(409).json({ error: 'The class is not available for booking.' });
      }

      // Update the class status to "Booked" and save the booking time
      pool.query(queries.updateClassStatus, ['Booked', roomId], (error, results) => {
        if (error) {
          console.error('Error executing query: ', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Add the manually updated room ID to the array
        manuallyUpdatedRoomIds.push(roomId);

        // Insert booking information into the BookedClasses table
        pool.query(queries.bookClass, [userId, roomId], (error, results) => {
          if (error) {
            console.error('Error executing query: ', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          // Set a timer to automatically change the class status to "Ongoing" after 5 minutes
          setTimeout(() => {
            // Check if the class status is still "Booked" before updating it to "Ongoing"
            pool.query(queries.getClassStatus, [roomId], (error, results) => {
              if (error) {
                console.error('Error executing query: ', error);
                return;
              }

              const currentStatus = results.rows[0].status;

              if (currentStatus === 'Booked') {
                pool.query(queries.updateClassStatus, ['Ongoing', roomId], (error, results) => {
                  if (error) {
                    console.error('Error executing query: ', error);
                  }
                });

                // Add the manually updated room ID to the array
                manuallyUpdatedRoomIds.push(roomId);
              }
            });
          }, 2 * 60 * 1000); // 5 minutes (converted to milliseconds)

          // Return a success response with booking information
          res.status(200).json({ message: 'Class booked successfully.', bookingTime });
        });
      });
    });
  });
};

// Endpoint: Update room status manually by the class representative
const updateRoomStatusManually = (req, res) => {
  // Check if the user is authenticated (session validation)
  if (!req.session.userid) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  const userId = req.session.userid;
  const roomId = req.params.roomId;
  const { status } = req.body;

  // Verify the user's role is "Class Rep"
  pool.query(queries.getUserRole, [userId], (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const userRole = results.rows[0].role;

    if (userRole !== 'Class Rep') {
      return res.status(403).json({ error: 'Access denied. Only Class Reps can update room status.' });
    }

    // Update the room status
    pool.query(queries.updateRoomStatus, [status, roomId], (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // add the manually updated room ID to the array
      manuallyUpdatedRoomIds.push(roomId);

      res.status(200).json({ message: 'Room status updated successfully.' });
    });
  });
};

// Endpoint: Cancel a room booking by the class representative
const cancelRoomBooking = (req, res) => {
  // Check if the user is authenticated (session validation)
  if (!req.session.userid) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  const userId = req.session.userid;
  const roomId = req.params.roomId;

  // Verify the user's role is "Class Rep"
  pool.query(queries.getUserRole, [userId], (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const userRole = results.rows[0].role;

    if (userRole !== 'Class Rep') {
      return res.status(403).json({ error: 'Access denied. Only Class Reps can cancel room bookings.' });
    }

    // Check if the room is already booked
    pool.query(queries.getClassStatus, [roomId], (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const classStatus = results.rows[0].status;

      if (classStatus !== 'Booked') {
        return res.status(409).json({ error: 'The room is not booked. Cannot cancel the booking.' });
      }

      // Cancel the room booking by updating the class status to "Available"
      pool.query(queries.updateClassStatus, ['Available', roomId], (error, results) => {
        if (error) {
          console.error('Error executing query: ', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Room booking canceled successfully.' });
      });
    });
  });
};

// Automatically reset manually updated rooms after 2 hours
const resetManuallyUpdatedRooms = () => {
  manuallyUpdatedRoomIds = [];  // Reset the array of manually updated room IDs
};

// Set a timer to reset the manually updated rooms after 2 hours (2 hours = 2 * 60 * 60 * 1000 milliseconds)
setTimeout(resetManuallyUpdatedRooms, 1 * 60 * 60 * 1000);

module.exports = {
  bookClass,
  updateRoomStatusManually,
  cancelRoomBooking,
  manuallyUpdatedRoomIds,
};



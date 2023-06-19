const pool = require('../../../database');
const queries = require('../queries');

// Endpoint: Book a Class
const bookClass = (req, res) => {
  // Check if the user is authenticated as a class rep
  if (req.session.role !== 'Class Rep') {
    return res.status(401).json({ error: 'User not authorized as class rep' });
  }

  // Get the necessary data from the request body
  const { timetableId, startTime, endTime } = req.body;
  const userId = req.session.user_id;

  // Validate the input data
  if (!timetableId || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if the class is available for booking
  pool.query(queries.checkClassAvailability, [timetableId], (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const classData = results.rows[0];

    // Check if the class exists and is available for booking
    if (!classData || classData.status !== 'empty') {
      return res.status(400).json({ error: 'Class not available for booking' });
    }

    // Update the class status to booked
    pool.query(queries.bookClass, [timetableId, userId, startTime, endTime], (error) => {
      if (error) {
        console.error('Error executing query: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Return a success response
      return res.status(200).json({ message: 'Class booked successfully' });
    });
  });
};

module.exports = {
  bookClass,
};

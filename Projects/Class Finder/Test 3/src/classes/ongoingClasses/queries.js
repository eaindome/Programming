const pool = require('../../../database');

// Retrieve ongoing sessions from the database
const getOngoingSessions = async () => {
  try {
    const query = `
      SELECT
        r.room_name,
        c.course_name,
        t.start_time,
        t.end_time
      FROM
        timetables AS t
        JOIN rooms AS r ON r.room_id = t.room_id
        JOIN courses AS c ON c.course_id = t.course_id
      WHERE
        r.status = 'Ongoing';
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOngoingSessions,
};

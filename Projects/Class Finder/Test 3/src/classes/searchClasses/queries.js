const pool = require('../../../database');

// Search for lecture rooms based on the provided query
const searchLectureRoomsQuery = async (query) => {
  try {
    const searchQuery = `
      SELECT
        room_id,
        room_name,
        room_capacity,
        status
      FROM
        rooms
      WHERE
        room_name ILIKE $1;
    `;
    const searchParam = `%${query}%`;
    const { rows } = await pool.query(searchQuery, [searchParam]);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchLectureRoomsQuery,
};


const pool = require('../../../database');

/*
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
        r.status = 'Ongoing'
        OR EXISTS (
          SELECT 1
          FROM bookedclasses AS b
          WHERE b.room_id = r.room_id
            AND b.day_name = (SELECT day_name FROM daysofweek WHERE day_id = extract(DOW FROM now())::integer)
            AND now() >= b.booking_time
            AND now() <= b.booking_time + b.duration
        );
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(error); // Log the error
    throw error;
  }
};*/

/*
const getOngoingSessions = async () => {
  try {
    const query = `
      SELECT
        room_name,
        course_name,
        start_time,
        end_time
      FROM
        (
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
            r.status = 'Ongoing'
        ) AS timetable_sessions
      UNION
      SELECT
        r.room_name,
        bc.course_name,
        bc.booking_time AS start_time,
        bc.booking_time + bc.duration AS end_time
      FROM
        rooms AS r
        JOIN bookedclasses AS bc ON r.room_id = bc.room_id
      WHERE
        r.status = 'Ongoing'
        OR (
          now() >= bc.booking_time
          AND now() <= bc.booking_time + bc.duration
        );
    `;
    catch (error) {
    console.error(error); // Log the error
    throw error;
  }
};
*/

const getOngoingSessions = async () => {
  try {
    const query = `
      SELECT
        room_name,
        course_name,
        start_time,
        end_time
      FROM
        (
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
            r.status = 'Ongoing'
        ) AS timetable_sessions
      UNION
      SELECT
        r.room_name,
        bc.course_name,
        bc.booking_time AS start_time,
        bc.booking_time + bc.duration AS end_time
      FROM
        rooms AS r
        JOIN bookedclasses AS bc ON r.room_id = bc.room_id
      WHERE
        r.status = 'Ongoing'
        OR (
          now() >= bc.booking_time
          AND now() <= bc.booking_time + bc.duration
        );
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(error); // Log the error
    throw error;
  }
};







module.exports = {
  getOngoingSessions,
};
// SQL queries
const getUserRole = 'SELECT role FROM Users WHERE user_id = $1';
const getRoomStatus = 'SELECT status FROM Rooms WHERE room_id = $1';
//const updateClassStatus = 'UPDATE Rooms SET status = $1 WHERE room_id = $2';

// Query: Getting available rooms
const getAvailableRooms = `
  SELECT room_id, room_name
  FROM Rooms
  WHERE status = 'Available';
`;

// Query: Getting class by room and day
const getClassByRoomAndDay = `
  SELECT c.course_name
  FROM Courses c
  INNER JOIN Timetables t ON c.course_id = t.course_id
  INNER JOIN DaysOfWeek dow ON t.day_id = dow.day_id
  WHERE t.room_id = $1 AND dow.day_name = $2;
`;

// Query: Booking a class
const bookClass = `
  INSERT INTO BookedClasses (user_id, room_id, course_name, day_name, duration)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id
`;

// Query: Updating the status of a room
const updateRoomStatus = `
  UPDATE Rooms
  SET status = $1
  WHERE room_id = $2
`;

// Query: Getting timetable by room and day
const getTimetableByRoomAndDay = `
  SELECT *
  FROM Timetables
  WHERE room_id = $1 AND day_id = (
    SELECT day_id
    FROM DaysOfWeek
    WHERE day_name = $2
  )
  ORDER BY start_time;
`;

module.exports = {
  getUserRole,
  getRoomStatus,
  updateRoomStatus,
  getAvailableRooms,
  getClassByRoomAndDay,
  bookClass,
  updateRoomStatus,
  getTimetableByRoomAndDay,
};
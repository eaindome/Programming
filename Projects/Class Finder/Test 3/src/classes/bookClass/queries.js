// Get the user's role
const getUserRole = `
  SELECT role FROM Users WHERE user_id = $1;
`;

// Get the class status for a specific room
const getClassStatus = `
  SELECT status FROM Rooms WHERE room_id = $1;
`;

// Update the class status for a specific room
const updateClassStatus = `
  UPDATE Rooms SET status = $1 WHERE room_id = $2;
`;

// Inserting information on booking
const bookClass = `
                    INSERT INTO BookedClasses (user_id, room_id)
                    VALUES ($1, $2)
                    RETURNING id;
`;

module.exports = {
    getUserRole,
    getClassStatus,
    updateClassStatus,
    bookClass,
};
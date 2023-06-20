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


module.exports = {
    getUserRole,
    getClassStatus,
    updateClassStatus,
};
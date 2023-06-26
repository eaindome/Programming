const favoriteRoom = 'UPDATE Rooms SET user_id = $1 WHERE room_id = $2';
const bookmarkRoom = 'UPDATE Rooms SET user_id = $1 WHERE room_id = $2';

module.exports = {
  favoriteRoom,
  bookmarkRoom,
};

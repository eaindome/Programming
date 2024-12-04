const socketIo = require('socket.io');

// Socket.io setup for real-time updates
let io;

// event listener for real time updates
const initializeSocket = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected.');
    
        // join poll room
        socket.on('joinPoll', (pollId) => {
            socket.join(pollId);
            console.log(`User joined poll: ${pollId}`);
        });
    
        // handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected.')
        });
    });
};


module.exports = {
    initializeSocket
};
const { createTask, getTasks, updateTask, deleteTask, getTaskById } = require('./controller');
const { verifyToken } = require('../middleware/authMiddleware');

async function taskRoutes(fastify, options) {
    fastify.post('/api/task/create', { preHandler: [verifyToken] }, createTask);
    fastify.get('/api/task/get', { preHandler: [verifyToken] }, getTasks);
    fastify.get('/api/task/get/:id', { preHandler: [verifyToken] }, getTaskById);
    fastify.put('/api/task/update/:id', { preHandler: [verifyToken] }, updateTask);
    fastify.delete('/api/task/delete/:id', { preHandler: [verifyToken] }, deleteTask);
}

module.exports = taskRoutes;
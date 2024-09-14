const request = require('supertest');
const fastify = require('fastify');
const authRoutes = require('../auth/routes')
const taskRoutes = require('../tasks/routes');
const { sequelize } = require('../config/database');
const Task = require('../models/Tasks');
const jwt = require('jsonwebtoken');

// create a fastify instance for testing
let app;

beforeAll(async () => {
    app = fastify();
    try {
        // console.log("Entering...");
        await sequelize.sync({
            force: true
        });
        // console.log("Working!");
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
        process.exit();
    }

    try {
        // console.log("Entering 2...");
        app.register(authRoutes);
        app.register(taskRoutes);
        // console.log("Working 2!");
    } catch (err) {
        console.error(`Error registering routes: ${err}`);
        process.exit();
    }

    await app.ready();
});

afterAll(async () => {
    // console.log("After all...")
    await sequelize.close();
    await app.close();
});

describe('Task Creation Process', () => {
    let token;

    beforeAll(async () => {
        const userCredentials = {
            username: 'TestUser',
            password: 'testpassword'
        };

        await request(app.server)
            .post('/api/auth/register')
            .send(userCredentials);

        const loginResponse = await request(app.server)
            .post('/api/auth/login')
            .send(userCredentials);

        token = loginResponse.body.token;
    });

    test(
        'POST /api/task/create should create a new task successfully',
        async () => {
            const newTask = {
                title: 'Test Task',
                description: 'This is a test task description'
            };
            const response = await request(app.server)
                .post('/api/task/create')
                .set('Authorization', `Bearer ${token}`)
                .send(newTask);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Task successfully created.');
        }
    );

    test(
        'POST /api/task/create should fail if no token is provided',
        async () => {
            const newTask = {
                title: 'Another Test Task',
                description: 'This is another test task description'
            };
            const response = await request(app.server)
                .post('/api/task/create')
                .send(newTask);
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden Entry.');
        }
    );

    test(
        'POST /api/task/create should fail if title is missing',
        async () => {
            const newTask = {
                description: 'Task withot a title'
            };
            const response = await request(app.server)
                .post('/api/task/create')
                .set('Authorization', `Bearer ${token}`)
                .send(newTask);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Title field is required.');
        }
    );
});

describe('Getting Task Process', () => {
    let token;

    beforeAll(async () => {
        const userCredentials = {
            username: 'TestUser',
            password: 'testpassword'
        };

        await request(app.server)
            .post('/api/auth/register')
            .send(userCredentials);

        const loginResponse = await request(app.server)
            .post('/api/auth/login')
            .send(userCredentials);

        token = loginResponse.body.token;

        // create a few tasks for test user
        const tasks = [
            {
                title: 'Task 1',
                description: 'First Task'
            }, 
            {
                title: 'Task 2',
                description: 'Second Task'
            }
        ];
        
        for (let task of tasks) {
            await request(app.server)
                .post('/api/task/create')
                .set('Authorization', `Bearer ${token}`)
                .send(task);
        }
    });

    test(
        'GET /api/task/get should successfully retrieve tasks',
        async () => {
            const response = await request(app.server)
                .get('/api/task/get')
                .set('Authorization', `Bearer ${token}`);

            // console.log(`Task: ${JSON.stringify(response.body)}`);
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);   // expect 2 tasks
            expect(response.body[0].title).toBe('Test Task');
            expect(response.body[1].title).toBe('Task 1');
            expect(response.body[2].title).toBe('Task 2');
        }
    );

    test(
        'GET /api/task/get should fail if no token is provided',
        async () => {
            const response = await request(app.server)
                .get('/api/task/get');
                
            // console.log(`Task: ${JSON.stringify(response.body)}`);
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden Entry.');
        }
    );

    test(
        'GET /api/task/get should return a message when no task is available',
        async () => {
            const newUserCredentials = {
                username: 'NoTaskUser',
                password: 'password123',
            };

            // register and login the new user
            await request(app.server)
                .post('/api/auth/register')
                .send(newUserCredentials);

            const loginResponse = await request(app.server)
                .post('/api/auth/login')
                .send(newUserCredentials);

            const newToken = loginResponse.body.token;

            const response = await request(app.server)
                .get('/api/task/get')
                .set('Authorization', `Bearer ${newToken}`);
                
            // console.log(`Task: ${JSON.stringify(response.body)}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No tasks available.');
        }
    );
});
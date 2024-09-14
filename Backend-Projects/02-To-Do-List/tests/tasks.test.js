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

describe('Updating Task Process', () => {
    let token, taskId;

    beforeAll(async () => {
        const userCredentials = {
            username: 'UpdateUser',
            password: 'update123password'
        };

        // register and login user
        await request(app.server)
            .post('/api/auth/register')
            .send(userCredentials);

        const loginResponse = await request(app.server)
            .post('/api/auth/login')
            .send(userCredentials);

        token = loginResponse.body.token;

        // create a task to update
        const taskResponse =  await request(app.server)
            .post('/api/task/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Original Title',
                description: 'Original Description'
            });
        
        // console.log(`tasks: ${JSON.stringify(taskResponse.body.task.id)}`);
        taskId = taskResponse.body.task.id;
    });

    test(
        'PUT /api/task/update/:id should successfully update an original task',
        async () => {
            const updatedTask = {
                title: 'Updated Title',
                description: 'Updated Description'
            };

            const response = await request(app.server)
                .put(`/api/task/update/${taskId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedTask);

            // console.log(`response: ${JSON.stringify(response.body)}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Task successfully updated!');
            expect(response.body.task.title).toBe('Updated Title');
            expect(response.body.task.description).toBe('Updated Description');
        }
    );

    test(
        'PUT /api/task/update/:id should fail if no task does not exist',
        async () => {
            const updatedTask = {
                title: 'Non-existent Title',
                description: 'Non-existent Description'
            };

            let task_id = 18;
            const response = await request(app.server)
                .put(`/api/task/update/${task_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedTask);

            // console.log(`response: ${JSON.stringify(response.body)}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Task not found!');
        }
    );

    test(
        'PUT /api/task/update/:id should fail if no token is sent',
        async () => {
            const updatedTask = {
                title: 'Updated Title',
                description: 'Updated Description'
            };

            const response = await request(app.server)
                .put(`/api/task/update/${taskId}`)
                .send(updatedTask);

            // console.log(`response: ${JSON.stringify(response.body)}`);

            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden Entry.');
        }
    );
});

describe('Task Deletion Process', () => {
    let token, taskId;

    beforeAll(async () => {
        const userCredentials = {
            username: 'DeleteUser',
            password: 'delete123password'
        };

        // register and login user
        await request(app.server)
            .post('/api/auth/register')
            .send(userCredentials);

        const loginResponse = await request(app.server)
            .post('/api/auth/login')
            .send(userCredentials);

        token = loginResponse.body.token;

        // create a task to update
        const taskResponse =  await request(app.server)
            .post('/api/task/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Title to delete',
                description: 'Task to delete'
            });
        
        // console.log(`tasks: ${JSON.stringify(taskResponse.body.task.id)}`);
        taskId = taskResponse.body.task.id;
    });

    test(
        'DELETE /api/task/delete/:id should delete a task successfully',
        async () => {
            const response = await request(app.server)
                .delete(`/api/task/delete/${taskId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Task successfully deleted!')
        }
    );

    test(
        'DELETE /api/task/delete/:id should fail if task doesn\'t exist',
        async () => {
            let task_id = 18;
            const response = await request(app.server)
                .delete(`/api/task/delete/${task_id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Task not found!')
        }
    );

    test(
        'DELETE /api/task/delete/:id should fail if token is not sent',
        async () => {
            const response = await request(app.server)
                .delete(`/api/task/delete/${taskId}`);

            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden Entry.')
        }
    );
});
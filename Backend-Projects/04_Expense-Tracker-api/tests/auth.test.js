const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    // disconnect from the database after the tests are done
    await mongoose.connection.close();
});

describe('Registration Process', () => {
    test(
        'POST /api/auth/register should register a new user successfully',
        async () =>{
            const newUser = {
                username: 'TestUser',
                password: 'test@password'
            };

            const response = await request(app).post('/api/auth/register').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully.');
        }
    );
});
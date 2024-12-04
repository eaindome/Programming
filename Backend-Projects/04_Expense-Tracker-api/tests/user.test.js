const request = require('supertest');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const app = require('../app');

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    // disconnect from the database after the tests are done
    await mongoose.connection.close();
});

afterEach(async () => {
    // clean up the test data after each test
    await User.deleteMany({});
});

describe('Profile Process', () => {
    let token;

    beforeEach(async () => {
        const userCredentials = {
            username: 'ProfileUser',
            password: 'profile@password'
        };

        await request(app)
            .post('/api/auth/register')
            .send(userCredentials);

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(userCredentials);

        token = loginResponse.body.token;
        console.log(`Token: ${token}`);
    });
    test(
        'GET /api/user/profile should return user information',
        async () => {
            const response = await request(app)
                .get('/api/user/profile')
                .set('Authorization', `Bearer ${token}`);

            console.log(`Response: ${JSON.stringify(response)}`);
            expect(response.status).toBe(200);
        }
    );

    test(
        'GET /api/user/profile should fail if user does not exist',
        async () => {
            const loginDetails = {
                username: 'NonExistentUser',
                password: 'test@password'
            };
            
            const response = await request(app).post('/api/auth/login').send(loginDetails);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid username and password.');
        }
    );

    test(
        'GET /api/user/profile should fail if no token is provided',
        async () => {
            const response = await request(app)
                .get('/api/user/profile');

            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden Entry.');
        }
    );
});
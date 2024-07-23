const request = require('supertest');
const app = require('../server');
const redisClient = require('../jest.setup');

let accessToken;
let refreshToken;

describe('Authentication and Authorization', () => {
    beforeAll(async () => {
        // Ensure Redis is connected before tests run
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    });

    afterAll(async () => {
        // Disconnect Redis after all tests run
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    });

    beforeEach(async () => {
        // Clear Redis before each test
        await redisClient.flushDb();
    });

    it('should register a user', async () => {
        console.log('Sending request to register a user...');
        const response = await request(app)
            .post('/auth/register')
            .send({
                "username": 'testuser',
                "password": 'password123',
                "role": 'manufacturer'
            });
        console.log('Registration request completed...');
        console.log(`Response: ${JSON.stringify(response.body)}`)
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User created successfully.');
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');

        // store tokens for later user in other tests
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;

        // store tokens in redis
        await redisClient.setAsync('accessToken:testuser', accessToken);
        await redisClient.setAsync('refreshToken:testuser', refreshToken);

    }, 30000);

    // it('should login a user', async () => {
    //     const response = await request(app)
    //         .post('/auth/login')
    //         .send({
    //             username: 'testuser',
    //             password: 'password123'
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('accessToken');
    //     expect(response.body).toHaveProperty('refreshToken');
        
    //     // store tokens
    //     accessToken = response.body.accessToken;
    //     refreshToken = response.body.refreshToken;

    //     // store tokens in redis
    //     await redisClient.setAsync('accessToken:testuser', accessToken);
    //     await redisClient.setAsync('refreshToken:testuser', refreshToken);
    // }, 100000);

    // it('should logout a user', async () => {
    //     const response = await request(app)
    //         .delete('/auth/logout')
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .send({
    //             refreshToken
    //         });

    //     expect(response.status).toBe(204);

    //     // verify the token was deleted
    //     const storedRefreshToken = await redisClient.getAsync('refreshToken:testuser');
    //     expect(storedRefreshToken).toBeNull();
    // }, 100000);
});
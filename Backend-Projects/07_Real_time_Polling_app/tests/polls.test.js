const request = require('supertest');
const http = require('node:http');
const { router } = require('../server');

let server;

beforeAll(() => {
    server = http.createServer(router);
});

afterAll(() => {
    server.close(done);
});

describe('Poll Creation Process', () => {
    test(
        'POST /polls should create a new poll', 
        async () => {
            const newPoll = {
                question: 'What are your favorite fruits?',
                options: ['Mango', 'Orange', 'Banana', 'Pineapple']
            };

            const response = await request(server)
                .post('/polls')
                .send(newPoll)
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('pollId');
        }
    );

    test(
        'POST /polls should return 400 if question is missing', 
        async () => {
            const newPoll = {
                options: ['Mango', 'Orange', 'Banana', 'Pineapple']
            };

            const response = await request(server)
                .post('/polls')
                .send(newPoll)
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Invalid input: question and options is required.');
        }
    );

    test(
        'POST /polls should return 400 if options is missing', 
        async () => {
            const newPoll = {
                question: 'What are your favorite fruits?',
            };

            const response = await request(server)
                .post('/polls')
                .send(newPoll)
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Invalid input: question and options is required.');
        }
    );
});
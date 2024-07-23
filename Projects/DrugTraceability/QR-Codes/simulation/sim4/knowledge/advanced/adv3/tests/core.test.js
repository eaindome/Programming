const request = require('supertest');
const express = require('express');
const routes = require('../core/routes');
const { describe } = require('@hapi/joi/lib/base');

const app = express();
app.use(express.json());
app.use('/core', routes);

describe('POSt /core/create-hierarchy', () => {
    it('should create a hierarchy', async () => {
        const res = await requiest(app)
            .post('/core/create-hierarchy')
            .send({
                num_pacs: 2,
                manufacturer_id: 1
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Hierarchy created successfully.');
    });
});

describe('GET /core/fetch-hierarchy', () => {
    it('should fetch a hierarchy', async () => {
        const res = await request(app)
            .get('/code/fetch-hierarchy');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Hierarchy fetched successfully.');
    });
});

describe('POST /core/print-hierarchy', () => {
    it('should print the hierarchy', async () => {
        const res = await request(app)
            .post('/code/print-hierarchy')
            .send({
                company_id: 1,
                date: '2024-06-19'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'company');
        expect(res.body).toHaveProperty('message', 'hierarchy');

    });
});
const request = require('supertest');
const express = require('express');
const routes = require('../core/routes');
const { describe } = require('@hapi/joi/lib/base');

const app = express();
app.use(express.json());
app.use('/code', routes);

describe('POSt /code/generate-qr-code', () => {
    it('should generate qr codes for a company', async () => {
        const res = await requiest(app)
            .post('/code/generate-qr-code')
            .send({
                companyId: 1
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'QR codes created successfully.');
    });
});
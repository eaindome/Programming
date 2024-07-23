const request = require('supertest');
const app = require('../server');

let accessToken;

describe('Job Routes', () => {
    beforeAll(async () => {
        // perform login before all tests
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        accessToken = response.body.accessToken;
    });

    it('should add a manufacturer company', async () => {
        const response = await request(app)
            .post('/job/add-company')
            .set('Authorization', `Bearer ${accessToken}`)	// set the Authorization header
            .send({
                name: 'Test Company',
                location: 'Test Location',
                address: 'Test Address',
                product_name: 'Test Product',
                product_serial_code: '123456'
            });

        expect(response.status).toBe(201);
        // expect(response.body).toHaveProperty('name', 'Test Company');
    });

    it('should add a primary distribution company', async () => {
        const response = await request(app)
            .post('/job/add-pd-company')
            .set('Authorization', `Bearer ${accessToken}`)	// set the Authorization header
            .send({
                company: 'Test PD Company',
                location: 'Test PD Location',
                address: 'Test PD Address'
            });

        expect(response.status).toBe(201);
        // expect(response.body).toHaveProperty('company', 'Test Company');
    });

    it('should add a secondary distribution shop', async () => {
        const response = await request(app)
            .post('/job/add-sd-company')
            .set('Authorization', `Bearer ${accessToken}`)	// set the Authorization header
            .send({
                company: 'Test SD Company',
                location: 'Test SD Location',
                address: 'Test SD Address'
            });

        expect(response.status).toBe(201);
    });

    it('should add a retailer shop', async () => {
        const response = await request(app)
            .post('/job/add-retailer')
            .set('Authorization', `Bearer ${accessToken}`)	// set the Authorization header
            .send({
                company: 'Test Retailer',
                location: 'Test Retailer Location',
                address: 'Test Retailer Address'
            });

        expect(response.status).toBe(201);
    });

    afterAll(async () => {
        // perform logout after all tests
        await request(app)
            .post('/auth/logout')
            .set('Authorization', `Bearer ${accessToken}`);	// set the Authorization header
    });
});
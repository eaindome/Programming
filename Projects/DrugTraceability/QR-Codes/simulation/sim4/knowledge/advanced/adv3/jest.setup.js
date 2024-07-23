const redis = require('redis');
const { promisify } = require('util');

// connect to a separate Redis database for testing
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

// promisify the Redis client methods for easier async/await handling
client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);
client.delAsync = promisify(client.del).bind(client);
client.flushDbAsync = promisify(client.flushDb).bind(client);


// optionally, clear the test redis database before running tests
beforeAll(async () => {
    if (!client.isOpen) {
        await client.connect();
    }
    // await client.flushDb();
});

// close redis connection after all tests are done
afterAll(async () => {
    if (client.isOpen) {
        await client.quit();
    }
});

module.exports = client;


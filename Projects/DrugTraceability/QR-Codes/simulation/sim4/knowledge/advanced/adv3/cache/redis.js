const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});

client.on('connect', () => {
    console.log("Client connected to Redis...");
    // console.log(`Client: ${JSON.stringify(client)}`);
    // console.log('Redis server:', client.options.socket.host + ':' + client.options.socket.port);
});

client.on('ready', async () => {
    console.log("Client connected to Redis and ready to use...");
    // test redis operations
    try {
        await client.set('test-key', 'test-value');	// set a test key-value pair
        // console.log('Successfully set test-key');
    } catch (err) {
        console.log(`Error testing Redis: ${err.message}`);
    }

    // perform a get operation 
    try {
        const value = await client.get('test-key');
        // console.log('Test key-value pair:', value);
    } catch (error) {
        console.error('Error getting test-key:', error);
    }
});

client.on('error', (err) => {
    console.log("Redis error: ", err.message);
});

client.on('end', () => {
    console.log("Client disconnected from Redis...");
});

async function connectRedis() {
    try {
        await client.connect();
        console.log("Redis client successfully connected.");
    } catch (err) {
        console.log("Error connecting to Redis: ", err.message);
    }
}

// Call the connect function immediately to ensure the client connects when the module is required
connectRedis();

process.on('SIGINT', async () => {
    await client.quit();
    console.log("Redis client closed.");
    process.exit(0);
});

module.exports = client;

// async function checkConnection() {
//     try {
//         await client.connect();
//         const pingResponse = await client.ping();
//         console.log("Ping response from Redis: ", pingResponse);
//     } catch (err) {
//         console.log("Error during connection or ping: ", err.message);
//     } finally {
//         await client.quit();
//         console.log("Redis client closed.");
//     }
// }

// checkConnection();

// module.exports = client;


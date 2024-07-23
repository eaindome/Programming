// const redisClient = require('./redis');

// require('./redis');



// to verify connection status
// redisClient.ping((err, res) => {
//     if (err) {
//         console.log("Error pinging Redis: ", err.message);
//     } else {
//         console.log("Ping response from Redis: ", res);
//     }
// });

const redis = require('redis');

const client = redis.createClient({
  host: 'localhost', // Replace with your Redis container's host
  port: 6379         // Default Redis port
});

client.on('connect', () => {
  console.log('Redis client connected');
  console.log('Redis server:', client.address);
});

client.on('ready', () => {
  console.log('Redis client ready');
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

client.on('end', () => {
  console.log('Redis client disconnected');
});

// Example command to test the connection
client.set('test-key', 'test-value', (err, reply) => {
  if (err) {
    console.error('Error setting value:', err);
  } else {
    console.log('Set value reply:', reply);
  }
});

client.get('test-key', (err, reply) => {
  if (err) {
    console.error('Error getting value:', err);
  } else {
    console.log('Get value reply:', reply); // Should output 'test-value'
  }
});


module.exports = client;

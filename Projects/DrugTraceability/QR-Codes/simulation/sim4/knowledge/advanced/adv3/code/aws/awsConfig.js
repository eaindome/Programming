// awsConfig.js
const AWS = require('aws-sdk');

// Configure AWS SDK for LocalStack or actual AWS environment
const isLocal = process.env.NODE_ENV === 'development';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
    endpoint: isLocal ? 'http://localhost:4566' : undefined, // LocalStack default endpoint
    s3ForcePathStyle: isLocal
});

module.exports = {
    s3
};

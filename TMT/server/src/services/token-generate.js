const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(64).toString('hex');
}

const tokenSecret = generateSecret();
console.log('Generated Token Secret:', tokenSecret);
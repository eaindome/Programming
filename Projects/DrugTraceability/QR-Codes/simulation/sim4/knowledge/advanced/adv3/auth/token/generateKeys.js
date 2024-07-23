const crypto = require('crypto');

const accessToken = crypto.randomBytes(32).toString('hex');
const refereshToken = crypto.randomBytes(32).toString('hex');
console.table({accessToken, refereshToken});
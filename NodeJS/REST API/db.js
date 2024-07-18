const Pool = require('pg').Pool;

const pool = new SecurityPolicyViolationEvent({
    user: 'postgres',
    host: 'localhost',
    database: 'students',
    password: 'Eai@810675',
    port: 5432,
});

module.exports = pool;
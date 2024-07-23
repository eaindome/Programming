const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const redisClient = require('./cache/redis');

// Import Routes
const authRoutes = require('./auth/routes');        // auth module
const acctRoutes = require('./auth/account/routes');
const codeRoutes = require('./code/routes');        // code module
const coreRoutes = require('./core/routes');        // hierarchy module
const videoRoutes = require('./video/routes');      // scanner module
const jobRoutes = require('./job/routes');
const delRoutes = require('./transport/delivery/routes');
// const transRoutes = require('./transport/transaction/routes');
const transRoutes = require('./transport/transaction2/routes');
const fdaApprovRoutes = require('./job/fda/routes');
const approvalRoutes = require('./transport/approvals/routes')
const shippingRoutes = require('./job/shipping/routes');
const locationRoutes = require('./location/routes');
const historyRoutes = require('./transport/transaction/history/routes');
const ganacheRoutes = require('./auth/blockchain/routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173' // Allow only this origin to access
}));


// Middleware to parse request body
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Redis test route
app.get('/test-redis', async (req, res) => {
    try {
        const response = await redisClient.ping();
        res.send(`Redis Ping Response: ${response}`);
    } catch (error) {
        res.status(500).send(`Error pinging Redis: ${error.message}`);
    }
});

// Define Routes

app.use('/auth', authRoutes);
app.use('/code', codeRoutes);
app.use('/core', coreRoutes);
app.use('/video', videoRoutes);
app.use('/job', jobRoutes);
app.use('/account', acctRoutes);
app.use('/delivery',  delRoutes);
app.use('/fda', fdaApprovRoutes);
app.use('/transaction', transRoutes);
app.use('/approval', approvalRoutes);
app.use('/shipping', shippingRoutes);
app.use('/api', locationRoutes);
app.use('/history', historyRoutes);
app.use('/ganache', ganacheRoutes);



// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError.NotFound("This route does not exist."));
});

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message,
        },
    });
});



// Start the server
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}.`);
    });
}

module.exports = app;


// app.listen(PORT, () => {
//     console.log(`App running on port ${PORT}.`);
// });

/*
// new passwrd for manufacturer = ekow@indomie
//     "username": "Mr. Indome",
//     "password": "ekow@indomie"
// not used again
*/

// manufacturers
// {
//     "username": "Mr. Indome",
//     "password": "Eai@837759",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "manufacturer"
// }
// {
//     "username": "Juanita Indome",
//     "password": "juanita@indomie",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "manufacturer"
// }

// primary distributors
// {
//     "username": "ekow",
//     "password": "eai@810675",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "primary_distributor"
// }
// {
//     "username": "Ekow",
//     "password": "eai@5432",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "primary_distributor",
// }

// secondary distributors
// {
//     "username": "papa_ekow",
//     "password": "pan23@1455",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "secondary_distributor"
//  }
// {
//     "username": "paakow",
//     "password": "eai@2460",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "secondary_distributor"
// }

// retailers
// {
//     "username": "papa_annan",
//     "password": "eai@11857",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "retailer"
// }
// {
//     "username": "araba",
//     "password": "aba@5432",
//     "email": "ekow.a.indome@gmail.com",
//     "role": "retailer"
// }
// 
// "react-qr-reader": "^3.0.0-beta-1",

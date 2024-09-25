const express = require('express');
const mongoose = require('mongoose');
const dotenv =  require('dotenv');

dotenv.config();

const app = express();

// middleware to parse incoming JSON requests
app.use(express.json());

// entry point
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running!');
});

const PORT = process.env.PORT ?? 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParse: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(`Error connecting to MongoDB: ${err}`));
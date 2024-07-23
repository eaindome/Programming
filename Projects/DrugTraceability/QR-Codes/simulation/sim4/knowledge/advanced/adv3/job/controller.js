const { addManufacturer, addPrimaryDistributor, addSecondaryDistributor, addRetailerComp } = require('./queries')
const pool = require('../database/database');

const addCompany = async (req, res) => {
    const {
        name,
        location,
        address,
        product_name,
        product_serial_code
    } = req.body;
    const username = req.username;

    try {
        const result = await pool.query(addManufacturer, [name, location, address, product_name, product_serial_code, username]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding company: ', error);
        res.status(500).json({ message: 'Error adding company.' })
    }
};

const addPDCompany = async (req, res) => {
    const {
        company,
        location,
        address
    } = req.body;

    const username = req.username;

    try {
        const result = await pool.query(addPrimaryDistributor, [company, location, address, username]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding company: ', error);
        res.status(500).json({ message: 'Error adding company.' })
    }
};

const addSDCompany = async (req, res) => {
    const {
        company,
        location,
        address
    } = req.body;

    const username = req.username;
    
    // console.log('Working...')
    try {
        console.log('Adding secondary distribution company...');
        const result = await pool.query(addSecondaryDistributor, [company, location, address, username]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding company: ', error);
        res.status(500).json({ message: 'Error adding company.' })
    }
};

const addRetailer = async (req, res) => {
    const {
        company,
        location,
        address
    } = req.body;

    const username = req.username;

    try {
        const result = await pool.query(addRetailerComp, [company, location, address, username]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(`Error adding company: ${error}`);
        res.status(500).json({ message: 'Error adding company.' });
    }
};

module.exports = {
    addCompany,
    addPDCompany,
    addSDCompany, 
    addRetailer
};


// {
//     "username": "paakow",
//     "password": "eai@810675",
//     "role": "primary_distributor"
//   }
// {
//     "username": "papa_annan",
//     "password": "pan23@1455",
//     "role": "secondary_distributor"
//   }
// {
//     "username": "papa_annan",
//     "password": "eai@2460",
//     "role": "secondary_distributor"
//   }
// {
//     "username": "paakow",
//     "password": "eai@810675",
//     "role": "retailer"
//   }
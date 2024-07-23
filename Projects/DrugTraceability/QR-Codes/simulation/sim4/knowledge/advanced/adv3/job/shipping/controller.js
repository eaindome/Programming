const pool = require('../../database/database'); // assuming you have a pool instance for PostgreSQL connection
const { addShippingVehicle } = require('./queries');

// Controller to add a shipping vehicle
const addShippingTruck = async (req, res) => {
    const { shipping_truck_number } = req.body;
    const username = req.username;

    // Validate input
    if (!shipping_truck_number) {
        return res.status(400).json({ error: 'Shipping truck number are required' });
    }

    try {
        // Insert shipping vehicle
        await pool.query(addShippingVehicle, [username, shipping_truck_number]);
        res.status(201).json({ message: 'Shipping vehicle added successfully' });
    } catch (error) {
        console.error('Error adding shipping vehicle:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addShippingTruck
};

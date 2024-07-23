const pool = require('../../database/database'); // Adjust database import as per your setup
const { availCompanyPack, availPDBoxes, getPDId, getSDId, getRTId, availSDBoxes, availDistPack, 
    createDelivery, getUserByUsername, getRole, getCompanyId, availCompanyBoxes, availRTBoxes,
    getPDdeliveries, getSDdeliveries, getRTdeliveries,
} = require('./queries');



// Display available packs by company ID
const displayAvailPacks = async (req, res) => {
    const username = req.username;
    const result = await pool.query(getRole, [username]);
    const role = result.rows[0].role;

    if (role === 'manufacturer') {
        try {
            const companyID = await pool.query(getCompanyId, [username]);
            const company_id = companyID.rows[0].id;

            const result = await pool.query(availCompanyPack, [company_id]);
            if (result.rows.length > 0) {
                const availablePacks = result.rows.map(pack => pack.id);
                res.status(200).json({ availablePacks });
            } else {
                res.status(404).json({ message: 'No available packs found for this company' });
            }
        } catch (error) {
            console.error('Error fetching available packs:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    } else if (role === 'primary_distributor') {
        try {
            const pdID = await pool.query(getPDId, [username]);
            const pd_id = pdID.rows[0].id;

            const result = await pool.query(availDistPack, [pd_id]);
            if (result.rows.length > 0) {
                const availablePacks = result.rows.map(pack => pack.id);
                res.status(200).json({ availablePacks });
            } else {
                res.status(404).json({ message: 'No available packs found for this distributor' });
            }
        } catch (error) {
            console.error('Error fetching available packs:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    } else {
        res.status(403).json({ message: 'You are not authorized to view available packs' });
    }
};

// Display available boxes by distributor ID
const displayAvailBoxes = async (req, res) => {
    const username = req.username;
    const result = await pool.query(getRole, [username]);
    const role = result.rows[0].role;

    if (role === 'primary_distributor') {
        try {
            const pdID = await pool.query(getPDId, [username]);
            const pd_id = pdID.rows[0].id;

            const result = await pool.query(availPDBoxes, [pd_id]);
            if (result.rows.length > 0) {
                const availableBoxes = result.rows.map(box => ({id:box.id, product_name:box.product_name}));
                res.status(200).json({ availableBoxes });
            } else {
                res.status(404).json({ message: 'No available boxes found for this distributor' });
            }
        } catch (error) {
            console.error('Error fetching available boxes:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    } else if (role === 'secondary_distributor') {
        const secID = await pool.query(getSDId, [username]);
        const sd_id = secID.rows[0].id;

        const result = await pool.query(availSDBoxes, [sd_id]);
        if (result.rows.length > 0) {
            const availableBoxes = result.rows.map(box => ({id:box.id, product_name:box.product_name}));
            res.status(200).json({ availableBoxes });
        } else {
            res.status(404).json({ message: 'No available boxes found for this distributor' });
        }
    } else if (role === 'retailer') {
        const retID = await pool.query(getRTId, [username]);
        const ret_id = retID.rows[0].id;

        const result = await pool.query(availRTBoxes, [ret_id]);
        if (result.rows.length > 0) {
            const availableBoxes = result.rows.map(box =({id:box.id, product_name:box.product_name}));
            res.status(200).json({ availableBoxes });
        } else {
            res.status(404).json({ message: 'No available boxes found for this retailer' });
        }
    } else if (role === 'manufacturer') {
        const companyID = await pool.query(getCompanyId, [username]);
        const company_id = companyID.rows[0].id;

        const result = await pool.query(availCompanyBoxes, [company_id]);
        if (result.rows.length > 0) {
            const availableBoxes = result.rows.map(box => ({
                id:box.id, product_name:box.product_name
            }));
            res.status(200).json({ availableBoxes });
        } else {
            res.status(404).json({ message: 'No available boxes found for this company' });
        }
    } else {
        res.status(403).json({ message: 'You are not authorized to view available boxes' });
    }
};

const recentDeliveries = async (req, res) => {
    const username = req.username;
    const result = await pool.query(getRole, [username]);
    const role = result.rows[0].role;

    if (role === 'manufacturer') {
        const result = await pool.query(getPDdeliveries, [username]);
        if (result.rows.length > 0) {
            const deliveries = result.rows.map(delivery => ({
                sender_company: delivery.name,
                sender_location: delivery.location,
                sender_address: delivery.address,
                receipient_company: delivery.company,
                item: delivery.item,
                to_username: delivery.to_username,
                time: delivery.time,
                status: delivery.status,
            }));
            res.status(200).json({ deliveries });
        } else {
            res.status(404).json({ message: 'No recent deliveries found from this manufacturer' });
        }
    } else if (role === 'primary_distributor') {
        const result = await pool.query(getSDdeliveries, [username]);
        if (result.rows.length > 0) {
            const deliveries = result.rows.map(delivery => ({
                sender_company: delivery.name,
                sender_location: delivery.location,
                sender_address: delivery.address,
                receipient_company: delivery.company,
                item: delivery.item,
                to_username: delivery.to_username,
                time: delivery.time,
                status: delivery.status,
            }));
            res.status(200).json({ deliveries });
        } else {
            res.status(404).json({ message: 'No recent deliveries found from this primary distributor' });
        }
    } else if (role === 'secondary_distributor') {
        const result = await pool.query(getRTdeliveries, [username]);
        if (result.rows.length > 0) {
            const deliveries = result.rows.map(delivery => ({
                sender_company: delivery.name,
                sender_location: delivery.location,
                sender_address: delivery.address,
                receipient_company: delivery.company,
                item: delivery.item,
                to_username: delivery.to_username,
                time: delivery.time,
                status: delivery.status,
            }));
            res.status(200).json({ deliveries });
        } else {
            res.status(404).json({ message: 'No recent deliveries found from this secondary distributor' });
        }
    } else if (role === 'retailer') {
        res.status(403).json({ message: 'Retailers cannot view recent deliveries' });
    } else {
        res.status(403).json({ message: 'You are not authorized to view recent deliveries' });
    
    }
};

module.exports = {
    displayAvailPacks,
    displayAvailBoxes,
    recentDeliveries,
};





// Controller to create a delivery entry
// const makeDelivery = async (req, res) => {
//     const from_username = req.username;
//     const { item, to_username, transaction } = req.body;

//     // Validate input
//     if (!item ||!to_username || !transaction) {
//         return res.status(400).json({ error: 'All delivery details are required' });
//     }

//     const client = await pool.connect();

//     try {
//         // Start transaction
//         await client.query('BEGIN');

//         // Check if from_username exists
//         const fromUser = await client.query(getUserByUsername, [from_username]);
//         if (fromUser.rows.length === 0) {
//             throw new Error(`User ${from_username} not found`);
//         }

//         // Check if to_username exists
//         const toUser = await client.query(getUserByUsername, [to_username]);
//         if (toUser.rows.length === 0) {
//             throw new Error(`User ${to_username} not found`);
//         }

//         // Insert delivery entry
//         await client.query(createDelivery, [item, from_username, to_username, transaction]);

//         // Commit transaction
//         await client.query('COMMIT');

//         res.status(201).json({ message: 'Delivery entry created successfully' });
//     } catch (error) {
//         // Rollback transaction in case of error
//         await client.query('ROLLBACK');

//         console.error('Error creating delivery entry:', error.message);
//         res.status(500).json({ error: error.message });
//     } finally {
//         client.release();
//     }
// };


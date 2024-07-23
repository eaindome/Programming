// query strings for delivery module

// delivery table
const createDelivery = "INSERT INTO delivery (item, from_username, to_username, transaction) VALUES ($1, $2, $3, $4)";
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const getRole = "SELECT role FROM users WHERE username = $1";
const getCompanyId = "SELECT id FROM companies WHERE username = $1";
const getPDId = "SELECT id FROM primary_distributors WHERE username = $1";	
const getSDId = "SELECT id FROM secondary_distributors WHERE username = $1";
const getRTId = "SELECT id FROM retailers WHERE username = $1";

// available entities
const availCompanyPack = "SELECT id FROM packs WHERE company_id = $1 AND delivery_status = 'f'";
const availDistPack = `
        SELECT p.id, c.product_name 
        FROM packs p
        JOIN companies c ON p.company_id = c.id
        WHERE p.distributor_id = $1 AND p.delivery_status = 'f'
`;

const availPDBoxes = `
        SELECT b.id, c.product_name
        FROM boxes b
        JOIN packs p ON b.pack_id = p.id
        JOIN companies c ON p.company_id = c.id
        WHERE p.distributor_id = $1 AND b.delivery_status = 'f'
`;

const availSDBoxes = `
        SELECT b.id, c.product_name 
        FROM boxes b 
        JOIN companies c ON b.company_id = c.id 
        WHERE secondary_distributor_id = $1 AND delivery_status = 'f'
`;

const availRTBoxes = `
        SELECT b.id, c.product_name 
        FROM boxes b 
        JOIN companies c ON b.company_id = c.id 
        WHERE retailer_id = $1 AND delivery_status = 'f'
`;

const availCompanyBoxes = `
        SELECT b.id, c.product_name 
        FROM boxes b 
        JOIN companies c ON b.company_id = c.id 
        WHERE company_id = $1 AND delivery_status = 'f'
`;



// get recent deliveries
const getPDdeliveries = `
        SELECT m.name, m.location, m.address, p.company, p.location, p.address, st.status, d.item, d.to_username, d.time
        FROM delivery d
        JOIN companies m ON m.username = d.from_username
        JOIN primary_distributors p ON p.username = d.to_username
        JOIN pending_transactions st ON st.transaction = d.transaction
        WHERE d.from_username = $1
        AND d.time >= NOW() - INTERVAL '2 days'
        ORDER BY d.time DESC;
`;

const getSDdeliveries = `
        SELECT p.company, p.location, p.address, s.company, st.status, d.item, d.to_username, d.time
        FROM delivery d
        JOIN primary_distributors p ON p.username = d.from_username
        JOIN secondary_distributors s ON s.username = d.to_username
        JOIN pending_transactions st ON st.transaction = d.transaction
        WHERE d.from_username = $1
        AND d.time >= NOW() - INTERVAL '2 days'
        ORDER BY d.time DESC;
`;

const getRTdeliveries = `
        SELECT s.company, s.location, s.address, r.company, st.status, d.item, d.to_username, d.time
        FROM delivery d
        JOIN secondary_distributors s ON s.username = d.from_username
        JOIN retailers r ON s.username = d.to_username
        JOIN pending_transactions st ON st.transaction = d.transaction
        WHERE d.from_username = $1
        AND d.time >= NOW() - INTERVAL '2 days'
        ORDER BY d.time DESC;
`;


// export query strings
module.exports = {
    availCompanyPack,
    availPDBoxes,
    createDelivery,
    getUserByUsername,
    getRole,
    getCompanyId,
    getPDId, getSDId, getRTId,
    availDistPack, availSDBoxes, availRTBoxes, availCompanyBoxes,
    getPDdeliveries, getSDdeliveries, getRTdeliveries
};


// delivery status
// const getPackDeliveryStatus = "SELECT delivery_status FROM packs WHERE id = $1";
// const getBoxDeliveryStatus = "SELECT delivery_status FROM boxes WHERE id = $1";
// const getProductDeliveryStatus = "SELECT delivery_status FROM products WHERE id = $1";

    // getPackDeliveryStatus,
    // getBoxDeliveryStatus,
    // getProductDeliveryStatus

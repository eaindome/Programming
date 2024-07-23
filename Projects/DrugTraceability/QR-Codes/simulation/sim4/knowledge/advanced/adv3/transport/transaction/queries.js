const getAccount = 'SELECT account, private_key FROM users WHERE username = $1';
const delivery = 'INSERT INTO delivery (item, from_username, to_username, transaction) VALUES ($1, $2, $3, $4)';
const getUsername = 'SELECT username FROM users WHERE account = $1';
const getRole = 'SELECT role FROM users WHERE username = $1';
const getTruck = 'SELECT shipping_truck_number FROM shipping_trucks WHERE username = $1';
const updatePack = 'UPDATE packs SET distributor_id = $1, shipping_truck_number = $2 WHERE id = $3';


const getId = 'SELECT id FROM users WHERE username = $1';
const getPrimId = 'SELECT id FROM primary_distributors WHERE username = $1';
const getSecId = 'SELECT id FROM secondary_distributors WHERE username = $1';
const getRetId = 'SELECT id FROM retailers WHERE username = $1';

// const updatePack2 = ''


const updateBox1 = `
    UPDATE boxes SET secondary_distributor_id = $1 WHERE id = $2
`;

const updateBox2 = `
    UPDATE boxes SET retailer_id = $1 WHERE id = $2
`;

const getTransactionData = (table, column) => `SELECT transaction_data FROM ${table} WHERE ${column} = $1`;
const updateTransactionData = (table, column) => `UPDATE ${table} SET transaction_data = $1 WHERE ${column} = $2`;
const updateDeliveryStatus = (table) => `
    UPDATE ${table}
    SET delivery_status = true
    WHERE id = $1
`;

module.exports = {
    getAccount,
    delivery,
    getUsername,
    getRole,
    getTruck,
    getId, getPrimId, getSecId, getRetId,
    updatePack, updateBox1, updateBox2,
    getTransactionData,
    updateTransactionData,
    updateDeliveryStatus,
};

// query strings for companies

const getTransactionPacks = "SELECT transaction_data FROM qr_code_packs WHERE id = $1";
const getTransactionBoxes = "SELECT transaction_data FROM qr_code_boxes WHERE id = $1";
const getTransactionProducts = "SELECT transaction_data FROM qr_code_products WHERE id = $1";

const getDeliveryInfo = 'SELECT from_username, to_username FROM delivery WHERE transaction = $1';
const getUserRole = 'SELECT role FROM users WHERE username = $1';
const getManufacturerInfo = 'SELECT name, location, address, product_name, product_serial_code FROM companies WHERE username = $1';
const getPrimaryDistributorInfo = 'SELECT company, location, address FROM primary_distributors WHERE username = $1';
const getSecondaryDistributorInfo = 'SELECT company, location, address FROM secondary_distributors WHERE username = $1';
const getRetailerInfo = 'SELECT company, location, address FROM retailers WHERE username = $1';

module.exports = {
    getTransactionPacks,
    getTransactionBoxes,
    getTransactionProducts,
    getDeliveryInfo,
    getUserRole,
    getManufacturerInfo,
    getPrimaryDistributorInfo,
    getSecondaryDistributorInfo,
    getRetailerInfo
}
// Query strings for scanner module

// getters
// stakeholders
const primaryDistributorInfo = "SELECT company, location, address FROM primary_distributors WHERE id = $1";
const secondaryDistributorInfo = "SELECT company, location, address FROM secondary_distributors WHERE id = $1";
const retailerInfo = "SELECT company, location, address FROM retailers WHERE id = $1";

// hierarchy
const getPackInfo = "SELECT id, distributor_id, shipping_date, shipping_truck_number FROM packs WHERE id = $1";
const getBoxInfo = "SELECT secondary_distributor_id, retailer_id, receiving_date_1, receiving_date_2 FROM boxes WHERE id = $1";
const getSecDisId = "SELECT id FROM secondary_distributors WHERE username = $1";
const getUsername = "SELECT username FROM users WHERE id = $1";
const getRetId = "SELECT id FROM retailers WHERE username = $1";

// updaters
const updatePackInfo = "UPDATE packs SET distributor_id = $1, shipping_date = $2, shipping_truck_number = $3 WHERE id = $4";
const updateBoxSecDistInfo = "UPDATE boxes SET secondary_distributor_id = $1, receiving_date_1 = $2 WHERE id = $3";
const updateBoxRetailInfo = "UPDATE boxes SET retailer_id = $1, receiving_date_2 = $2 WHERE id = $3";

// transaction pieces
const getTransactionForPack = "SELECT transaction_data FROM qr_code_packs WHERE id = $1";
const getTransactionForBox = "SELECT transaction_data FROM qr_code_boxes WHERE id = $1";
const getTransactionForProducts = "SELECT transaction_data FROM qr_code_products WHERE id = $1";

module.exports = {
    primaryDistributorInfo,
    secondaryDistributorInfo,
    retailerInfo,
    getPackInfo,
    getBoxInfo,
    getSecDisId,
    getUsername,
    getRetId,
    updatePackInfo,
    updateBoxSecDistInfo,
    updateBoxRetailInfo
};


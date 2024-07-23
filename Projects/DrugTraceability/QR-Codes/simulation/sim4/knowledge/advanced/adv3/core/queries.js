// Query strings for hierarchical module

// Create Hierarchy
// get product name of the manufacturer
const getProductByManufacturerName = "SELECT product_name FROM companies WHERE username = $1";
const getManufacturereId = "SELECT id FROM users WHERE username = $1";
const getRole = "SELECT role FROM users WHERE username = $1";
const getCompanyId = "SELECT id FROM companies WHERE username = $1";

// insert pack
const insertPack = "INSERT INTO packs (name, company_id) VALUES ($1, $2) RETURNING id";

// insert box 
const insertBox = "INSERT INTO boxes (name, pack_id, company_id) VALUES ($1, $2, $3) RETURNING id";

// insert product
const insertProduct = "INSERT INTO products (product_name, identity_number, pack_id, box_id, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";


// Fetch Hierarchy
// get all packs
const getAllPacks = "SELECT id, name FROM packs";

// get box name by pack ID
const getBoxNameByPackId = "SELECT id, name FROM boxes WHERE pack_id = $1";

// get product number by box ID
const getProductNameByBoxId = "SELECT id, product_name FROM products WHERE box_id = $1";


// Print Hierarchy
// get company info 
const getCompanyInfo = "SELECT name, address FROM companies WHERE id = $1" ;

// get packs by company ID and date
const getPacksByCompanyAndDate = "SELECT id FROM packs WHERE company_id = $1 AND DATE(created_at) = $2";

// get boxes by pack ID
const getBoxesByPackId = "SELECT id FROM boxes WHERE pack_id = $1";

// get products by box ID
const getProductsByBoxId = "SELECT id FROM products WHERE box_id = $1";


module.exports = {
    getProductByManufacturerName,
    getManufacturereId,
    getRole,
    getCompanyId,
    insertPack,
    insertBox,
    insertProduct,
    getAllPacks,
    getBoxNameByPackId,
    getProductNameByBoxId,
    getCompanyInfo,
    getPacksByCompanyAndDate,
    getBoxesByPackId,
    getProductsByBoxId
}
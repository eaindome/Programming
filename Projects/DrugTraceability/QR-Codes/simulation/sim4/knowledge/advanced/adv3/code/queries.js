// Query string for qr code module

const getCompanyName = "SELECT name FROM companies WHERE id = $1"

const getCompanyPacks = "SELECT id, name, created_at FROM packs WHERE company_id = $1 AND created_at > NOW() - INTERVAL '1 DAY'"

const getCompanyInfo = "SELECT product_name, product_serial_code FROM companies WHERE id = $1"

const getFdaCode = "SELECT fda_code FROM fda WHERE company_name = $1";

const getBoxes = "SELECT id, name, created_at FROM boxes WHERE pack_id = $1 AND created_at > NOW() - INTERVAL '1 DAY'"

const getProducts = "SELECT id, identity_number, created_at FROM products WHERE box_id = $1 AND created_at > NOW() - INTERVAL '1 DAY'"

const getRole = "SELECT role FROM users WHERE username = $1";

const getCompanyDet = "SELECT id FROM companies WHERE username = $1";

const insertQrCodePack = `
    INSERT INTO qr_code_packs (pack_id, transaction_data)
    VALUES ($1, NULL)
    RETURNING id;
`;

const insertQrCodeBox = `
    INSERT INTO qr_code_boxes (box_id, transaction_data)
    VALUES ($1, NULL)
    RETURNING id;
`;

const insertQrCodeProduct = `
    INSERT INTO qr_code_products (product_id, transaction_data)
    VALUES ($1, NULL)
    RETURNING id;
`;

module.exports = {
    getCompanyName,
    getCompanyPacks,
    getCompanyInfo,
    getBoxes,
    getProducts,
    getRole,
    getCompanyDet,
    insertQrCodePack,
    insertQrCodeBox,
    insertQrCodeProduct,
    getFdaCode,
}
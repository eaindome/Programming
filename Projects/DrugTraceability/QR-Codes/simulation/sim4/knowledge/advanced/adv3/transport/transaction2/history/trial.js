const pool = require('../../../database/database');
const { getTransactionPacks, getTransactionBoxes, getTransactionProducts 
    , getDeliveryInfo, getUserRole, getManufacturerInfo, getPrimaryDistributorInfo, getSecondaryDistributorInfo, getRetailerInfo
} = require('./queries');
const getGoodsHistory = async (req, res) => {
    const { qr_code_data } = req.body;

    // // Parse the qr_code_data to extract QR code ID, entity ID, and entity name
    // const qrCodeIdMatch = qr_code_data.match(/QR-Code ID: (\d+)/);
    // const entityIdMatch = qr_code_data.match(/(Pack|Box|Product) ID: (\d+)/);
    // const entityNameMatch = qr_code_data.match(/(Pack Name|Box Name|Product Identity): ([^\n]+)/);

    // if (!qrCodeIdMatch || !entityIdMatch || !entityNameMatch) {
    //     return res.status(400).json({ error: "Invalid QR code data format." });
    // }

    // const qrCodeId = qrCodeIdMatch[1];
    // const entityId = entityIdMatch[2];
    // const entityType = entityIdMatch[1].toLowerCase(); // convert to lowercase for easier comparison
    // const entityName = entityNameMatch[2];

    // Extract QR code ID and entity information
    const qrCodeId = extractQRCodeId(qr_code_data);
    const entityInfo = extractEntityInfo(qr_code_data);

    try {
        if (entityType === 'pack') {
            const packTransactionResult = await pool.query(getTransactionPacks, [qrCodeId]);
            const packTransactionData = packTransactionResult.rows[0].transaction_data;

            if (packTransactionData) {
                const transactionList = JSON.parse(packTransactionData);
                const transactionDetails = [];
    
                for (const transaction of transactionList) {
                    // Fetch from_username and to_username for the current transaction
                    const deliveryResult = await pool.query(getDeliveryInfo, [transaction]);
                    const deliveryRows = deliveryResult.rows;
    
                    for (const deliveryRow of deliveryRows) {
                        const { from_username, to_username } = deliveryRow;
    
                        // Fetch roles for the involved users
                        const fromUserRoleResult = await pool.query(getUserRole, [from_username]);
                        const toUserRoleResult = await pool.query(getUserRole, [to_username]);
    
                        const fromUserRole = fromUserRoleResult.rows[0].role;
                        const toUserRole = toUserRoleResult.rows[0].role;
    
                        // Fetch company information based on roles
                        const fromUserCompanyInfo = await getCompanyInfo(from_username, fromUserRole);
                        const toUserCompanyInfo = await getCompanyInfo(to_username, toUserRole);
    
                        // Create an entry for the transaction details
                        const transactionDetail = {
                            transaction,
                            fromUser: {
                                username: from_username,
                                role: fromUserRole,
                                companyInfo: fromUserCompanyInfo,
                            },
                            toUser: {
                                username: to_username,
                                role: toUserRole,
                                companyInfo: toUserCompanyInfo,
                            },
                        };
    
                        transactionDetails.push(transactionDetail);
                    }
                }
    
                // Return the transaction details as a JSON response
                res.status(200).json(transactionDetails);
            }
        } else if (entityType === 'box') {
            const boxTransactionResult = await pool.query(getTransactionBoxes, [qrCodeId]);
            const boxTransactionData = boxTransactionResult.rows[0].transaction_data;

            if (boxTransactionData) {
                const transactionList = JSON.parse(boxTransactionData);
                const transactionDetails = [];
    
                for (const transaction of transactionList) {
                    // Fetch from_username and to_username for the current transaction
                    const deliveryResult = await pool.query(getDeliveryInfo, [transaction]);
                    const deliveryRows = deliveryResult.rows;
    
                    for (const deliveryRow of deliveryRows) {
                        const { from_username, to_username } = deliveryRow;
    
                        // Fetch roles for the involved users
                        const fromUserRoleResult = await pool.query(getUserRole, [from_username]);
                        const toUserRoleResult = await pool.query(getUserRole, [to_username]);
    
                        const fromUserRole = fromUserRoleResult.rows[0].role;
                        const toUserRole = toUserRoleResult.rows[0].role;
    
                        // Fetch company information based on roles
                        const fromUserCompanyInfo = await getCompanyInfo(from_username, fromUserRole);
                        const toUserCompanyInfo = await getCompanyInfo(to_username, toUserRole);
    
                        // Create an entry for the transaction details
                        const transactionDetail = {
                            transaction,
                            fromUser: {
                                username: from_username,
                                role: fromUserRole,
                                companyInfo: fromUserCompanyInfo,
                            },
                            toUser: {
                                username: to_username,
                                role: toUserRole,
                                companyInfo: toUserCompanyInfo,
                            },
                        };
    
                        transactionDetails.push(transactionDetail);
                    }
                }
    
                // Return the transaction details as a JSON response
                res.status(200).json(transactionDetails);
            }
        } else if (entityType === 'product') {
            const productTransactionResult = await pool.query(getTransactionProducts, [qrCodeId]);
            const productTransactionData = productTransactionResult.rows[0].transaction_data;

            if (productTransactionData) {
                const transactionList = JSON.parse(productTransactionData);
                const transactionDetails = [];
    
                for (const transaction of transactionList) {
                    // Fetch from_username and to_username for the current transaction
                    const deliveryResult = await pool.query(getDeliveryInfo, [transaction]);
                    const deliveryRows = deliveryResult.rows;
    
                    for (const deliveryRow of deliveryRows) {
                        const { from_username, to_username } = deliveryRow;
    
                        // Fetch roles for the involved users
                        const fromUserRoleResult = await pool.query(getUserRole, [from_username]);
                        const toUserRoleResult = await pool.query(getUserRole, [to_username]);
    
                        const fromUserRole = fromUserRoleResult.rows[0].role;
                        const toUserRole = toUserRoleResult.rows[0].role;
    
                        // Fetch company information based on roles
                        const fromUserCompanyInfo = await getCompanyInfo(from_username, fromUserRole);
                        const toUserCompanyInfo = await getCompanyInfo(to_username, toUserRole);
    
                        // Create an entry for the transaction details
                        const transactionDetail = {
                            transaction,
                            fromUser: {
                                username: from_username,
                                role: fromUserRole,
                                companyInfo: fromUserCompanyInfo,
                            },
                            toUser: {
                                username: to_username,
                                role: toUserRole,
                                companyInfo: toUserCompanyInfo,
                            },
                        };
    
                        transactionDetails.push(transactionDetail);
                    }
                }
    
                // Return the transaction details as a JSON response
                res.status(200).json(transactionDetails);
            }
        } else {
            res.status(400).json({ error: "Invalid entity type." });
        }
    } catch (error) {
        console.error('Error getting goods history: ', error);
        res.status(500).json({ message: 'Error getting goods history.' });
    }
}

// Helper function to fetch company information based on role
const getCompanyInfo = async (username, role) => {
    let query, params;

    if (role === 'manufacturer') {
        query = getManufacturerInfo;
        params = [username];
    } else if (role === 'primary_distributor') {
        query = getPrimaryDistributorInfo;
        params = [username];
    } else if (role === 'secondary_distributor') {
        query = getSecondaryDistributorInfo;
        params = [username];
    } else if (role === 'retailer') {
        query = getRetailerInfo;
        params = [username];
    } else {
        return null;
    }

    const result = await pool.query(query, params);
    return result.rows[0];
};

// Helper function to extract QR code ID
const extractQRCodeId = (qrCodeData) => {
    const qrCodeIdMatch = qrCodeData.match(/QR-Code ID:\s*(\d+)/);
    return qrCodeIdMatch ? qrCodeIdMatch[1] : null;
};

// Helper function to extract entity information
const extractEntityInfo = (qrCodeData) => {
    const entities = [];
    const entityPattern = /(\d+)(_*)/g;
    let match;

    while ((match = entityPattern.exec(qrCodeData)) !== null) {
        const id = match[1];
        const underscores = match[2].length;

        let entityType;
        if (underscores === 1) {
            entityType = 'pack';
        } else if (underscores === 2) {
            entityType = 'box';
        } else if (underscores === 3) {
            entityType = 'product';
        } else {
            entityType = 'unknown';
        }

        entities.push({
            id,
            type: entityType,
        });
    }

    return entities;
};


module.exports = {
    getGoodsHistory,
};
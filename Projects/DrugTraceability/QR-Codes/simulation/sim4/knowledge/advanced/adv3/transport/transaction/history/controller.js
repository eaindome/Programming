// Surprisingly more optimized
const pool = require('../../../database/database');
const { getTransactionPacks, getTransactionBoxes, getTransactionProducts, getDeliveryInfo, getUserRole, getManufacturerInfo, getPrimaryDistributorInfo, getSecondaryDistributorInfo, getRetailerInfo } = require('./queries');

const getGoodsHistory = async (req, res) => {
    const { qr_code_data } = req.body;
    console.log(`QR code data: ${qr_code_data}\n`);

    if (!qr_code_data) {
        return res.status(400).json({ error: "Invalid QR code data format." });
    }

    // Extract QR code ID and entity information
    const qrCodeId = extractQRCodeId(qr_code_data);
    const entityInfo = extractEntityInfo(qr_code_data);

    console.log(`QR code ID: ${qrCodeId}\n`);
    console.log(`Entity information: ${JSON.stringify(entityInfo)}\n`);

    if (!qrCodeId || entityInfo.length === 0) {
        return res.status(400).json({ error: "Invalid QR code data format." });
    }

    const transactionDetails = [];

    try {
        for (const entity of entityInfo) {
            const { id, type } = entity;
            let transactionData;

            if (type === 'pack') {
                const packTransactionResult = await pool.query(getTransactionPacks, [id]);
                transactionData = packTransactionResult.rows[0]?.transaction_data;
            } else if (type === 'box') {
                const boxTransactionResult = await pool.query(getTransactionBoxes, [id]);
                transactionData = boxTransactionResult.rows[0]?.transaction_data;
            } else if (type === 'product') {
                const productTransactionResult = await pool.query(getTransactionProducts, [id]);
                transactionData = productTransactionResult.rows[0]?.transaction_data;
            } else {
                continue; // Skip unknown entity types
            }

            if (transactionData) {
                const transactionList = JSON.parse(transactionData);

                for (const transaction of transactionList) {
                    // Fetch from_username and to_username for the current transaction
                    const deliveryResult = await pool.query(getDeliveryInfo, [transaction]);
                    const deliveryRows = deliveryResult.rows;

                    for (const deliveryRow of deliveryRows) {
                        const { from_username, to_username } = deliveryRow;

                        // Fetch roles for the involved users
                        const fromUserRoleResult = await pool.query(getUserRole, [from_username]);
                        const toUserRoleResult = await pool.query(getUserRole, [to_username]);

                        const fromUserRole = fromUserRoleResult.rows[0]?.role;
                        const toUserRole = toUserRoleResult.rows[0]?.role;

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
            }
        }

        // Return the transaction details as a JSON response
        res.status(200).json(transactionDetails);
    } catch (error) {
        console.error('Error getting goods history: ', error);
        res.status(500).json({ message: 'Error getting goods history.' });
    }
};

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

    // Extract Pack ID and Pack Name
    const packIdMatch = qrCodeData.match(/Pack ID: (\d+)/);
    const packNameMatch = qrCodeData.match(/Pack Name: ([^\n]+)/);

    // Extract Box ID and Box Name
    const boxIdMatch = qrCodeData.match(/Box ID: (\d+)/);
    const boxNameMatch = qrCodeData.match(/Box Name: ([^\n]+)/);

    // Extract Product ID and Product Name
    const productsIdMatch = qrCodeData.match(/Product ID: (\d+)/);
    const productsNameMatch = qrCodeData.match(/Product Name: ([^\n]+)/);


    if (packIdMatch) {
        entities.push({
            id: packIdMatch[1],
            type: 'pack',
        });
    } else if (boxIdMatch) {
        entities.push({
            id: boxIdMatch[1],
            type: 'box',
        });
    } else if (productsIdMatch) {
        entities.push({
            id: productsIdMatch[1],
            type: 'product',
        });
    }

    if (packNameMatch) {
        entities.push({
            name: packNameMatch[1],
            type: 'pack',
        });
    } else if (boxNameMatch) {
        entities.push({
            name: boxNameMatch[1],
            type: 'box',
        });
    } else if (productsNameMatch) {
        entities.push({
            name: productsNameMatch[1],
            type: 'product',
        });
    }

    return entities;
};

module.exports = {
    getGoodsHistory,
};













/* optimized 2

// const pool = require('../../../database/database');
// const { 
//     getTransactionPacks, 
//     getTransactionBoxes, 
//     getTransactionProducts, 
//     getDeliveryInfo, 
//     getUserRole, 
//     getManufacturerInfo, 
//     getPrimaryDistributorInfo, 
//     getSecondaryDistributorInfo, 
//     getRetailerInfo 
// } = require('./queries');

// const getGoodsHistory = async (req, res) => {
//     const { qr_code_data } = req.body;
//     console.log(`QR code data: ${qr_code_data}\n`);

//     // Extract QR code ID and entity information
//     const qrCodeId = extractQRCodeId(qr_code_data);
//     const entityInfo = extractEntityInfo(qr_code_data);

//     console.log(`QR code ID: ${qrCodeId}\n`);
//     console.log(`Entity information: ${JSON.stringify(entityInfo)}\n`);

//     if (!qrCodeId || entityInfo.length === 0) {
//         return res.status(400).json({ error: "Invalid QR code data format." });
//     }

//     try {
//         const transactionDetails = await getTransactionDetails(entityInfo);
//         res.status(200).json(transactionDetails);
//     } catch (error) {
//         console.error('Error getting goods history: ', error);
//         res.status(500).json({ message: 'Error getting goods history.' });
//     }
// };

// const getTransactionDetails = async (entityInfo) => {
//     const transactionDetails = [];
//     const transactionPromises = entityInfo.map(async (entity) => {
//         const { id, type } = entity;
//         const query = type === 'pack' ? getTransactionPacks :
//                       type === 'box' ? getTransactionBoxes :
//                       type === 'product' ? getTransactionProducts : null;
        
//         if (query) {
//             const result = await pool.query(query, [id]);
//             const transactionData = result.rows[0]?.transaction_data;

//             if (transactionData) {
//                 const transactionList = JSON.parse(transactionData);
//                 const deliveryPromises = transactionList.map(async (transaction) => {
//                     const deliveryResult = await pool.query(getDeliveryInfo, [transaction]);
//                     return Promise.all(deliveryResult.rows.map(async (deliveryRow) => {
//                         const { from_username, to_username } = deliveryRow;
//                         const [fromUserRole, toUserRole] = await Promise.all([
//                             getRole(from_username),
//                             getRole(to_username)
//                         ]);
//                         const [fromUserCompanyInfo, toUserCompanyInfo] = await Promise.all([
//                             getCompanyInfo(from_username, fromUserRole),
//                             getCompanyInfo(to_username, toUserRole)
//                         ]);
//                         return {
//                             transaction,
//                             fromUser: {
//                                 username: from_username,
//                                 role: fromUserRole,
//                                 companyInfo: fromUserCompanyInfo,
//                             },
//                             toUser: {
//                                 username: to_username,
//                                 role: toUserRole,
//                                 companyInfo: toUserCompanyInfo,
//                             },
//                         };
//                     }));
//                 });
//                 const deliveryDetails = await Promise.all(deliveryPromises);
//                 transactionDetails.push(...deliveryDetails.flat());
//             }
//         }
//     });
//     await Promise.all(transactionPromises);
//     return transactionDetails;
// };

// const getRole = async (username) => {
//     const result = await pool.query(getUserRole, [username]);
//     return result.rows[0]?.role;
// };

// const getCompanyInfo = async (username, role) => {
//     let query;
//     switch (role) {
//         case 'manufacturer':
//             query = getManufacturerInfo;
//             break;
//         case 'primary_distributor':
//             query = getPrimaryDistributorInfo;
//             break;
//         case 'secondary_distributor':
//             query = getSecondaryDistributorInfo;
//             break;
//         case 'retailer':
//             query = getRetailerInfo;
//             break;
//         default:
//             return null;
//     }
//     const result = await pool.query(query, [username]);
//     return result.rows[0];
// };

// // Helper function to extract QR code ID
// const extractQRCodeId = (qrCodeData) => {
//     const qrCodeIdMatch = qrCodeData.match(/QR-Code ID:\s*(\d+)/);
//     return qrCodeIdMatch ? qrCodeIdMatch[1] : null;
// };

// // Helper function to extract entity information
// const extractEntityInfo = (qrCodeData) => {
//     const entities = [];

//     // Extract Pack ID and Pack Name
//     const packIdMatch = qrCodeData.match(/Pack ID: (\d+)/);
//     const packNameMatch = qrCodeData.match(/Pack Name: ([^\n]+)/);

//     // Extract Box ID and Box Name
//     const boxIdMatch = qrCodeData.match(/Box ID: (\d+)/);
//     const boxNameMatch = qrCodeData.match(/Box Name: ([^\n]+)/);

//     // Extract Product ID and Product Name
//     const productsIdMatch = qrCodeData.match(/Product ID: (\d+)/);
//     const productsNameMatch = qrCodeData.match(/Product Name: ([^\n]+)/);

//     if (packIdMatch) {
//         entities.push({ id: packIdMatch[1], type: 'pack' });
//     }
//     if (boxIdMatch) {
//         entities.push({ id: boxIdMatch[1], type: 'box' });
//     }
//     if (productsIdMatch) {
//         entities.push({ id: productsIdMatch[1], type: 'product' });
//     }
//     if (packNameMatch) {
//         entities.push({ name: packNameMatch[1], type: 'pack' });
//     }
//     if (boxNameMatch) {
//         entities.push({ name: boxNameMatch[1], type: 'box' });
//     }
//     if (productsNameMatch) {
//         entities.push({ name: productsNameMatch[1], type: 'product' });
//     }

//     return entities;
// };

// module.exports = {
//     getGoodsHistory,
// };*/

/* optimized 3 but less optimized
// const pool = require('../../../database/database');
// const { 
//     getTransactionPacks, 
//     getTransactionBoxes, 
//     getTransactionProducts, 
//     getDeliveryInfo, 
//     getUserRole, 
//     getManufacturerInfo, 
//     getPrimaryDistributorInfo, 
//     getSecondaryDistributorInfo, 
//     getRetailerInfo 
// } = require('./queries');

// const getGoodsHistory = async (req, res) => {
//     const { qr_code_data } = req.body;
//     console.log(`QR code data: ${qr_code_data}\n`);

//     // Extract QR code ID and entity information
//     const qrCodeId = extractQRCodeId(qr_code_data);
//     const entityInfo = extractEntityInfo(qr_code_data);

//     console.log(`QR code ID: ${qrCodeId}\n`);
//     console.log(`Entity information: ${JSON.stringify(entityInfo)}\n`);

//     if (!qrCodeId || entityInfo.length === 0) {
//         return res.status(400).json({ error: "Invalid QR code data format." });
//     }

//     try {
//         const transactionDetails = await getTransactionDetails(entityInfo);
//         res.status(200).json(transactionDetails);
//     } catch (error) {
//         console.error('Error getting goods history: ', error);
//         res.status(500).json({ message: 'Error getting goods history.' });
//     }
// };

// const getTransactionDetails = async (entityInfo) => {
//     const transactionDetails = [];
//     const entityPromises = entityInfo.map(async (entity) => {
//         const { id, type } = entity;
//         const query = getTransactionQuery(type);
        
//         if (query) {
//             const result = await pool.query(query, [id]);
//             const transactionData = result.rows[0]?.transaction_data;

//             if (transactionData) {
//                 const transactionList = JSON.parse(transactionData);
//                 const deliveryPromises = transactionList.map(transaction => getDeliveryDetails(transaction));
//                 const deliveryDetails = await Promise.all(deliveryPromises);
//                 transactionDetails.push(...deliveryDetails.flat());
//             }
//         }
//     });
//     await Promise.all(entityPromises);
//     return transactionDetails;
// };

// const getTransactionQuery = (type) => {
//     switch (type) {
//         case 'pack': return getTransactionPacks;
//         case 'box': return getTransactionBoxes;
//         case 'product': return getTransactionProducts;
//         default: return null;
//     }
// };

// const getDeliveryDetails = async (transaction) => {
//     const deliveryResult = await pool.query(getDeliveryInfo, [transaction]);
//     const deliveryRows = deliveryResult.rows;

//     const deliveryPromises = deliveryRows.map(async (deliveryRow) => {
//         const { from_username, to_username } = deliveryRow;
//         const [fromUserRole, toUserRole] = await Promise.all([
//             getRole(from_username),
//             getRole(to_username)
//         ]);
//         const [fromUserCompanyInfo, toUserCompanyInfo] = await Promise.all([
//             getCompanyInfo(from_username, fromUserRole),
//             getCompanyInfo(to_username, toUserRole)
//         ]);
//         return {
//             transaction,
//             fromUser: {
//                 username: from_username,
//                 role: fromUserRole,
//                 companyInfo: fromUserCompanyInfo,
//             },
//             toUser: {
//                 username: to_username,
//                 role: toUserRole,
//                 companyInfo: toUserCompanyInfo,
//             },
//         };
//     });
//     return Promise.all(deliveryPromises);
// };

// const getRole = async (username) => {
//     const result = await pool.query(getUserRole, [username]);
//     return result.rows[0]?.role;
// };

// const getCompanyInfo = async (username, role) => {
//     let query;
//     switch (role) {
//         case 'manufacturer':
//             query = getManufacturerInfo;
//             break;
//         case 'primary_distributor':
//             query = getPrimaryDistributorInfo;
//             break;
//         case 'secondary_distributor':
//             query = getSecondaryDistributorInfo;
//             break;
//         case 'retailer':
//             query = getRetailerInfo;
//             break;
//         default:
//             return null;
//     }
//     const result = await pool.query(query, [username]);
//     return result.rows[0];
// };

// // Helper function to extract QR code ID
// const extractQRCodeId = (qrCodeData) => {
//     const qrCodeIdMatch = qrCodeData.match(/QR-Code ID:\s*(\d+)/);
//     return qrCodeIdMatch ? qrCodeIdMatch[1] : null;
// };

// // Helper function to extract entity information
// const extractEntityInfo = (qrCodeData) => {
//     const entities = [];

//     // Extract Pack ID and Pack Name
//     const packIdMatch = qrCodeData.match(/Pack ID: (\d+)/);
//     const packNameMatch = qrCodeData.match(/Pack Name: ([^\n]+)/);

//     // Extract Box ID and Box Name
//     const boxIdMatch = qrCodeData.match(/Box ID: (\d+)/);
//     const boxNameMatch = qrCodeData.match(/Box Name: ([^\n]+)/);

//     // Extract Product ID and Product Name
//     const productsIdMatch = qrCodeData.match(/Product ID: (\d+)/);
//     const productsNameMatch = qrCodeData.match(/Product Name: ([^\n]+)/);

//     if (packIdMatch) {
//         entities.push({ id: packIdMatch[1], type: 'pack' });
//     }
//     if (boxIdMatch) {
//         entities.push({ id: boxIdMatch[1], type: 'box' });
//     }
//     if (productsIdMatch) {
//         entities.push({ id: productsIdMatch[1], type: 'product' });
//     }
//     if (packNameMatch) {
//         entities.push({ name: packNameMatch[1], type: 'pack' });
//     }
//     if (boxNameMatch) {
//         entities.push({ name: boxNameMatch[1], type: 'box' });
//     }
//     if (productsNameMatch) {
//         entities.push({ name: productsNameMatch[1], type: 'product' });
//     }

//     return entities;
// };

// module.exports = {
//     getGoodsHistory,
// };*/
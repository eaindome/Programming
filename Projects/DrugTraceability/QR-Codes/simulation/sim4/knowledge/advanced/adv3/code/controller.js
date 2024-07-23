const fs = require('fs').promises;
const path = require('path');
const qr = require('qrcode');
const { generateRSAKeys, encryptData } = require('../services/dataSecurityService');
const { getCompanyName, getCompanyPacks, getBoxes, 
        getProducts, getCompanyDet, insertQrCodeBox, 
        insertQrCodeProduct, insertQrCodePack, getRole, getFdaCode,
} = require('./queries');
const pool = require('../database/database');


const generateQRCode = async (req, res) => {
    const username = req.username;
    const result = await pool.query(getRole, [username]);
    const role = result.rows[0].role;

    if (role !== 'manufacturer') {
        return res.status(403).json({ error: "Unauthorized access." });
    }

    const companyResults = await pool.query(getCompanyDet, [username]);
    const companyId = companyResults.rows[0].id;

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    try {
        const companyResult = await pool.query(getCompanyName, [companyId]);
        const companyName = companyResult.rows[0]?.name;

        const fdaResult = await pool.query(getFdaCode, [companyName]);
        const fdaCode = fdaResult.rows[0]?.fda_code;

        if (!companyName) {
            return res.status(404).json({ error: "Company not found." });
        }

        const sanitizedCompanyName = companyName.replace(/\s+/g, '_').replace(/\./g, '');
        const companyDir = path.join(__dirname, 'codes', sanitizedCompanyName);
        const dateDir = path.join(companyDir, currentDate);

        await fs.mkdir(dateDir, { recursive: true });

        const packsResult = await pool.query(getCompanyPacks, [companyId]);
        const packs = packsResult.rows;

        const { privateKey, publicKey } = await generateRSAKeys();

        const createQrCode = async (data, filePath) => {
            const encryptedData = encryptData(data, publicKey);
            await qr.toFile(filePath, JSON.stringify(encryptedData));
        };

        const generateUniqueIdAndStore = async (table, entityId) => {
            const query = table === 'packs' ? insertQrCodePack : table === 'boxes' ? insertQrCodeBox : insertQrCodeProduct;
            const result = await pool.query(query, [entityId]);
            return result.rows[0].id;
        };

        const packPromises = packs.map(async (pack) => {
            const { id: packId, name: packName } = pack;
            
            const packDir = path.join(dateDir, packName);
            await fs.mkdir(packDir, { recursive: true });

            const uniqueId = await generateUniqueIdAndStore('packs', packId);
            const qrPackData = `FDA Code: ${fdaCode}\nQR-Code ID: ${uniqueId}\nPack ID: ${packId}\nPack Name: ${packName}`;
            await createQrCode(qrPackData, path.join(packDir, `${packName}.png`));

            const boxesResult = await pool.query(getBoxes, [packId]);
            const boxes = boxesResult.rows;

            const boxPromises = boxes.map(async (box) => {
                const { id: boxId, name: boxName } = box;
                const boxDir = path.join(packDir, boxName);
                await fs.mkdir(boxDir, { recursive: true });

                const boxUniqueId = await generateUniqueIdAndStore('boxes', boxId);
                const qrBoxData = `FDA Code: ${fdaCode}\nQR-Code ID: ${boxUniqueId}\nBox ID: ${boxId}\nBox Name: ${boxName}`;
                await createQrCode(qrBoxData, path.join(boxDir, `${boxName}.png`));

                const productsResult = await pool.query(getProducts, [boxId]);
                const products = productsResult.rows;

                const productPromises = products.map(async (product) => {
                    const { id: productId, identity_number: identityNumber } = product;
                    const productDir = path.join(boxDir, identityNumber);
                    await fs.mkdir(productDir, { recursive: true });

                    const productUniqueId = await generateUniqueIdAndStore('products', productId);
                    const qrProductData = `FDA Code: ${fdaCode}\nQR-Code ID: ${productUniqueId}\nProduct ID: ${productId}\nProduct Identity: ${identityNumber}`;
                    await createQrCode(qrProductData, path.join(productDir, `${identityNumber}.png`));
                });

                return Promise.all(productPromises);
            });

            return Promise.all(boxPromises);
        });

        await Promise.all(packPromises);
        res.status(201).json({ message: "QR codes generated successfully." });
    } catch (error) {
        console.error("Error generating QR codes: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { generateQRCode };





// const [year, month, day] = packName.split('_').slice(1, 4);
//             const manufacturingDate = new Date(`${year}-${month}-${day}`);

//             if (isNaN(manufacturingDate.getTime())) {
//                 throw new Error('Invalid manufacturing date value.');
//             }

//             const expiryDate = new Date(manufacturingDate);
//             expiryDate.setFullYear(expiryDate.getFullYear() + EXPIRY_YEARS);
//             const formattedExpiryDate = expiryDate.toISOString().slice(0, 10).replace(/-/g, '');




// const generateQRCode = async (req, res) => {
//     const { companyId } = req.body;
//     const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
//     const EXPIRY_YEARS = 3;

//     try {
//         const companyResult = await pool.query(getCompanyName, [companyId]);
//         const companyName = companyResult.rows[0]?.name;

//         if (!companyName) {
//             return res.status(404).json({ error: "Company not found." });
//         }

//         const sanitizedCompanyName = companyName.replace(/\s+/g, '_').replace(/\./g, '');
//         const companyDir = path.join(__dirname, 'codes', sanitizedCompanyName);
//         const dateDir = path.join(companyDir, currentDate);

//         await fs.mkdir(dateDir, { recursive: true });

//         const packsResult = await pool.query(getCompanyPacks, [companyId]);
//         const packs = packsResult.rows;

//         const { privateKey, publicKey } = await generateRSAKeys();

//         const companyInfoResult = await pool.query(getCompanyInfo, [companyId]);
//         const companyInfo = companyInfoResult.rows[0];
//         const productName = companyInfo?.product_name;
//         const productSerialCode = companyInfo?.product_serial_code;

//         if (!productName || !productSerialCode) {
//             return res.status(404).json({ error: "Company product information not found." });
//         }

//         const packPromises = packs.map(async (pack) => {
//             const { id: packId, name: packName } = pack;
//             const [year, month, day] = packName.split('_').slice(1, 4);
//             const manufacturingDate = new Date(`${year}-${month}-${day}`);

//             if (isNaN(manufacturingDate.getTime())) {
//                 throw new Error('Invalid manufacturing date value.');
//             }

//             const expiryDate = new Date(manufacturingDate);
//             expiryDate.setFullYear(expiryDate.getFullYear() + EXPIRY_YEARS);
//             const formattedExpiryDate = expiryDate.toISOString().slice(0, 10).replace(/-/g, '');

//             const packDir = path.join(dateDir, packName);
//             await fs.mkdir(packDir, { recursive: true });

//             const qrData = `Pack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${formattedExpiryDate}\nProduct Name: ${productName}\nProduct Serial Code: ${productSerialCode}`;
//             const encryptedData = encryptData(qrData, publicKey);
//             await qr.toFile(path.join(packDir, `${packName}.png`), JSON.stringify(encryptedData));

//             const boxesResult = await pool.query(getBoxes, [packId]);
//             const boxes = boxesResult.rows;

//             const boxPromises = boxes.map(async (box) => {
//                 const { id: boxId, name: boxName } = box;
//                 const boxDir = path.join(packDir, boxName);
//                 await fs.mkdir(boxDir, { recursive: true });

//                 const boxQrData = `Box ID: ${boxId}\nBox Name: ${boxName}\nPack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${formattedExpiryDate}\nProduct Name: ${productName}\nProduct Serial Code: ${productSerialCode}`;
//                 const boxEncryptedData = encryptData(boxQrData, publicKey);
//                 await qr.toFile(path.join(boxDir, `${boxName}.png`), JSON.stringify(boxEncryptedData));

//                 const productsResult = await pool.query(getProducts, [boxId]);
//                 const products = productsResult.rows;

//                 const productPromises = products.map(async (product) => {
//                     const { id: productId, identity_number: identityNumber } = product;
//                     const productDir = path.join(boxDir, identityNumber);
//                     await fs.mkdir(productDir, { recursive: true });

//                     const productQrData = `Product ID: ${productId}\nProduct Name: ${productName}\nProduct Identity: ${identityNumber}\nBox ID: ${boxId}\nBox Name: ${boxName}\nPack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${formattedExpiryDate}\nProduct Serial Code: ${productSerialCode}`;
//                     const productEncryptedData = encryptData(productQrData, publicKey);
//                     await qr.toFile(path.join(productDir, `${identityNumber}.png`), JSON.stringify(productEncryptedData));
//                 });

//                 return Promise.all(productPromises);
//             });

//             return Promise.all(boxPromises);
//         });

//         await Promise.all(packPromises);
//         res.status(201).json({ message: "QR codes generated successfully." });
//     } catch (error) {
//         console.error("Error generating QR codes: ", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = { generateQRCode };









// const generateQRCode = async (req, res) => {
//     const { companyId } = req.body;
//     const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

//     try {
//         const companyResult = await pool.query(getCompanyName, [companyId]);
//         const companyName = companyResult.rows[0]?.name;

//         if (!companyName) {
//             return res.status(404).json({ error: "Company not found." });
//         }

//         const sanitizedCompanyName = companyName.replace(/\s+/g, '_').replace(/\./g, '');
//         const companyDir = path.join(__dirname, 'codes', sanitizedCompanyName);
//         const dateDir = path.join(companyDir, currentDate);

//         await fs.mkdir(dateDir, { recursive: true });

//         const packsResult = await pool.query(getCompanyPacks, [companyId]);
//         const packs = packsResult.rows;

//         const { privateKey, publicKey } = await generateRSAKeys();

//         const companyInfoResult = await pool.query(getCompanyInfo, [companyId]);
//         const companyInfo = companyInfoResult.rows[0];
//         const productName = companyInfo?.product_name;
//         const productSerialCode = companyInfo?.product_serial_code;

//         if (!productName || !productSerialCode) {
//             return res.status(404).json({ error: "Company product information not found." });
//         }

//         const packPromises = packs.map(async (pack) => {
//             const { id: packId, name: packName } = pack;
//             const [year, month, day] = packName.split('_').slice(1, 4);
//             const manufacturingDate = new Date(`${year}-${month}-${day}`);

//             if (isNaN(manufacturingDate.getTime())) {
//                 throw new Error('Invalid manufacturing date value.');
//             }

//             const expiryDate = new Date(manufacturingDate);
//             expiryDate.setFullYear(expiryDate.getFullYear() + 3);
//             const formattedExpiryDate = expiryDate.toISOString().slice(0, 10).replace(/-/g, '');

//             const packDir = path.join(dateDir, packName);
//             await fs.mkdir(packDir, { recursive: true });

//             const qrData = `Pack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${formattedExpiryDate}\nProduct Name: ${productName}\nProduct Serial Code: ${productSerialCode}`;
//             const encryptedData = encryptData(qrData, publicKey);
//             await qr.toFile(path.join(packDir, `${packName}.png`), JSON.stringify(encryptedData));

//             const boxesResult = await pool.query(getBoxes, [packId]);
//             const boxes = boxesResult.rows;

//             const boxPromises = boxes.map(async (box) => {
//                 const { id: boxId, name: boxName } = box;
//                 const boxDir = path.join(packDir, boxName);
//                 await fs.mkdir(boxDir, { recursive: true });

//                 const boxQrData = `Box ID: ${boxId}\nBox Name: ${boxName}\nPack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${formattedExpiryDate}\nProduct Name: ${productName}\nProduct Serial Code: ${productSerialCode}`;
//                 const boxEncryptedData = encryptData(boxQrData, publicKey);
//                 await qr.toFile(path.join(boxDir, `${boxName}.png`), JSON.stringify(boxEncryptedData));

//                 const productsResult = await pool.query(getProducts, [boxId]);
//                 const products = productsResult.rows;

//                 const productPromises = products.map(async (product) => {
//                     const { id: productId, identity_number: identityNumber } = product;
//                     const productDir = path.join(boxDir, identityNumber);
//                     await fs.mkdir(productDir, { recursive: true });

//                     const productQrData = `Product ID: ${productId}\nProduct Name: ${productName}\nProduct Identity: ${identityNumber}\nBox ID: ${boxId}\nBox Name: ${boxName}\nPack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${formattedExpiryDate}\nProduct Serial Code: ${productSerialCode}`;
//                     const productEncryptedData = encryptData(productQrData, publicKey);
//                     await qr.toFile(path.join(productDir, `${identityNumber}.png`), JSON.stringify(productEncryptedData));
//                 });

//                 return Promise.all(productPromises);
//             });

//             return Promise.all(boxPromises);
//         });

//         await Promise.all(packPromises);
//         res.status(201).json({ message: "QR codes generated successfully." });
//     } catch (error) {
//         console.error("Error generating QR codes: ", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = { generateQRCode };


// const generateQRCode = async (req, res) => {
//     const { companyId } = req.body;
//     const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

//     try {
//         // console.log('Fetching company name...');
//         // console.log('Query:', getCompanyName, 'Params:', [companyId]);
//         const companyResult = await pool.query(getCompanyName, [companyId]);
//         const companyName = companyResult.rows[0].name;

//         // sanitize the company name to remove spaces and periods
//         const sanitizedCompanyName = companyName.replace(/\s+/g, '_').replace(/\./g, '');
//         const companyDir = path.join(__dirname, 'codes', sanitizedCompanyName);
//         // console.log('Company Directory:', companyDir);
//         const dateDir = path.join(companyDir, currentDate);
//         // console.log('Date Directory:', dateDir);

//         // Ensure the directories exist
//         await fs.mkdir(dateDir, { recursive: true });

//         // console.log('Fetching company packs...');
//         // console.log('Query:', getCompanyPacks, 'Params:', [companyId]);
//         const packsResult = await pool.query(getCompanyPacks, [companyId]);
//         const packs = packsResult.rows;
        
        
//         // console.log('Generating Keys...');
//         const { privateKey, publicKey } = await generateRSAKeys();
//         // console.log('Keys generated successfully...');
//         // console.log('Private Key:', privateKey, '\nPublic Key:', publicKey);

//         // console.log('Fetching company info...');
//         // console.log('Query:', getCompanyInfo, 'Params:', [companyId]);
//         const companyInfoResult = await pool.query(getCompanyInfo, [companyId]);
//         const companyInfo = companyInfoResult.rows[0];
//         const productName = companyInfo.product_name;
//         const productSerialCode = companyInfo.product_serial_code;
//         // console.log('Done fetching company info...')

//         const packPromises = packs.map(async (pack) => {
//             // console.log('Processing pack:', pack.id)
//             const packId = pack.id;
//             const packName = pack.name;
//             // const manufacturingDateStr = packName.split('_')[1];
//             // console.log(`Pack Name: ${packName}`);
//             // console.log(`Manufacturing Date: ${manufacturingDateStr}`);
//             // // Parse the string into year, month, and day components
//             // const year = manufacturingDateStr.substring(0, 4);
//             // const month = manufacturingDateStr.substring(4, 6);
//             // const day = manufacturingDateStr.substring(6, 8);
//             // console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);

//             let year, month, day;
//             const parts = packName.split('_');
//             if (parts.length > 4) {
//                 // assuming the format is Pack_YYYY_MM_DD_...
//                 year = parts[1];
//                 month = parts[2];
//                 day = parts[3];
//             } else {
//                 // assuming the format is Pack_YYYYMMDD_...
//                 const manufacturingDateStr = parts[1];
//                 // console.log(`Manufacturing Date: ${manufacturingDateStr}`);
//                 year = manufacturingDateStr.substring(0, 4);
//                 month = manufacturingDateStr.substring(4, 6);
//                 day = manufacturingDateStr.substring(6, 8);
//             }

//             // Create a date string in a format that new Date() can parse
//             const formattedDateStr = `${year}-${month}-${day}`;

//             // Create a new Date object
//             const manufacturingDate = new Date(formattedDateStr);

//             // Ensure the date is valid
//             if (isNaN(manufacturingDate.getTime())) {
//                 throw new Error('Invalid manufacturing date value.');
//             }
//             const expiryDate = new Date(
//                 new Date(manufacturingDate).setFullYear(new Date(manufacturingDate).getFullYear() + 3)
//             ).toISOString().slice(0, 10).replace(/-/g, '');

//             // console.log('Creating QR code for pack:', packId)
//             const packDir = path.join(dateDir, packName);
//             await fs.mkdir(packDir, { recursive: true });

//             let qrData = `Pack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${expiryDate}\nProduct Name: ${productName}\nProduct Serial Code: ${productSerialCode}`;

//             // console.log('Encrypting QR data...')
//             let encryptedData = encryptData(qrData, publicKey);
//             await qr.toFile(path.join(packDir, `${packName}.png`), JSON.stringify(encryptedData));

//             // console.log('Fetching boxes for pack:', packId);
//             // console.log('Query:', getBoxes, 'Params:', [packId]);
//             const boxesResult = await pool.query(getBoxes, [packId]);
//             const boxes = boxesResult.rows;

//             const boxPromises = boxes.map(async (box) => {
//                 const boxId = box.id;
//                 const boxName = box.name;

//                 const boxDir = path.join(packDir, boxName);
//                 await fs.mkdir(boxDir, { recursive: true });

//                 qrData = `Box ID: ${boxId}\nBox Name: ${boxName}\nPack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${expiryDate}\nProduct Name: ${productName}\nProduct Serial Code: ${productSerialCode}`;
//                 encryptedData = encryptData(qrData, publicKey);
//                 await qr.toFile(path.join(boxDir, `${boxName}.png`), JSON.stringify(encryptedData));

//                 // console.log('Fetching products for box:', boxId);
//                 // console.log('Query:', getProducts, 'Params:', [boxId]);
//                 const productsResult = await pool.query(getProducts, [boxId]);
//                 const products = productsResult.rows;

//                 const productPromises = products.map(async (product) => {
//                     const productId = product.id;
//                     const identityNumber = product.identity_number;

//                     const productDir = path.join(boxDir, identityNumber);
//                     await fs.mkdir(productDir, { recursive: true });

//                     qrData = `Product ID: ${productId}\nProduct Name: ${productName}\nProduct Identity: ${identityNumber}\nBox ID: ${boxId}\nBox Name: ${boxName}\nPack ID: ${packId}\nPack Name: ${packName}\nManufacturer: ${companyName}\nManufacturing Date: ${manufacturingDate}\nExpiry Date: ${expiryDate}\nProduct Name: ${productName}\nProduct Serial Code: ${productSerialCode}`;
//                     encryptedData = encryptData(qrData, publicKey);
//                     await qr.toFile(path.join(productDir, `${identityNumber}.png`), JSON.stringify(encryptedData));
//                 });
//                 return Promise.all(productPromises);
//             });
//             return Promise.all(boxPromises);
//         });

//         await Promise.all(packPromises);
//         // console.log('QR codes generated successfully.')

//         res.status(201).json({ message: "QR codes generated successfully." });
//     } catch (error) {
//         console.error("Error generating QR codes: ", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = { generateQRCode };


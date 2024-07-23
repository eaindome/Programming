// generateQRCode.js
const { promisify } = require('util');
const qr = require('qrcode');
const path = require('path');
const fs = require('fs');
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);

const { generateRSAKeys, encryptData } = require('../../services/dataSecurityService');
const { s3 } = require('./awsConfig'); // Import AWS configuration
const { getCompanyName, getCompanyPacks, getCompanyInfo, 
        getBoxes, getProducts, getRole, getCompanyDet,
        insertQrCodePack, insertQrCodeBox, insertQrCodeProduct
} = require('../queries');
const pool = require('../../database/database');

const uploadToS3 = async (filePath, bucketName, key) => {
    const fileContent = await readFile(filePath);
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: 'image/png'
    };

    return s3.upload(params).promise();
};

const generateQRCode = async (req, res) => {
    const username = req.username;
    const result = await pool.query(getRole, [username]);
    const role = result.rows[0].role;

    if (role !== 'manufacturer') {
        return res.status(403).json({ error: "Unauthorized access." });
    }

    const companyResults = await pool.query(getCompanyDet, [username]);
    const companyId = companyResults.rows[0].id;
    const companyName = companyResults.rows[0].name;

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const EXPIRY_YEARS = 3;
    const bucketName = `qr-codes-${companyName}`;

    try {
        const companyResult = await pool.query(getCompanyName, [companyId]);
        const companyName = companyResult.rows[0]?.name;

        if (!companyName) {
            return res.status(404).json({ error: "Company not found." });
        }

        const sanitizedCompanyName = companyName.replace(/\s+/g, '_').replace(/\./g, '');
        const baseS3Path = `${sanitizedCompanyName}/${currentDate}`;

        const packsResult = await pool.query(getCompanyPacks, [companyId]);
        const packs = packsResult.rows;

        const { privateKey, publicKey } = await generateRSAKeys();

        const companyInfoResult = await pool.query(getCompanyInfo, [companyId]);
        const companyInfo = companyInfoResult.rows[0];
        const productName = companyInfo?.product_name;
        const productSerialCode = companyInfo?.product_serial_code;

        if (!productName || !productSerialCode) {
            return res.status(404).json({ error: "Company product information not found." });
        }

        const createQrCode = async (data, filePath, s3Key) => {
            const encryptedData = encryptData(data, publicKey);
            await qr.toFile(filePath, JSON.stringify(encryptedData));
            await uploadToS3(filePath, bucketName, s3Key);
        };

        const generateUniqueIdAndStore = async (table, entityId) => {
            const query = table === 'packs' ? insertQrCodePack : table === 'boxes' ? insertQrCodeBox : insertQrCodeProduct;
            const result = await pool.query(query, [entityId]);
            return result.rows[0].id;
        };

        const packPromises = packs.map(async (pack) => {
            const { id: packId, name: packName } = pack;
            const [year, month, day] = packName.split('_').slice(1, 4);
            const manufacturingDate = new Date(`${year}-${month}-${day}`);

            if (isNaN(manufacturingDate.getTime())) {
                throw new Error('Invalid manufacturing date value.');
            }

            const expiryDate = new Date(manufacturingDate);
            expiryDate.setFullYear(expiryDate.getFullYear() + EXPIRY_YEARS);
            const formattedExpiryDate = expiryDate.toISOString().slice(0, 10).replace(/-/g, '');

            const packDir = path.join(__dirname, 'temp', packName);
            await mkdir(packDir, { recursive: true });
            const filePath = path.join(packDir, `${packName}.png`);
            const s3Key = `${baseS3Path}/${packName}.png`;

            const uniqueId = await generateUniqueIdAndStore('packs', packId);

            await createQrCode(uniqueId, filePath, s3Key);

            const boxesResult = await pool.query(getBoxes, [packId]);
            const boxes = boxesResult.rows;

            const boxPromises = boxes.map(async (box) => {
                const { id: boxId, name: boxName } = box;
                const boxDir = path.join(packDir, boxName);
                await mkdir(boxDir, { recursive: true });
                const boxFilePath = path.join(boxDir, `${boxName}.png`);
                const boxS3Key = `${baseS3Path}/${packName}/${boxName}.png`;

                const boxUniqueId = await generateUniqueIdAndStore('boxes', boxId);

                await createQrCode(boxUniqueId, boxFilePath, boxS3Key);

                const productsResult = await pool.query(getProducts, [boxId]);
                const products = productsResult.rows;

                const productPromises = products.map(async (product) => {
                    const { id: productId, identity_number: identityNumber } = product;
                    const productDir = path.join(boxDir, identityNumber);
                    await mkdir(productDir, { recursive: true });
                    const productFilePath = path.join(productDir, `${identityNumber}.png`);
                    const productS3Key = `${baseS3Path}/${packName}/${boxName}/${identityNumber}.png`;

                    const productUniqueId = await generateUniqueIdAndStore('products', productId);

                    await createQrCode(productUniqueId, productFilePath, productS3Key);
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
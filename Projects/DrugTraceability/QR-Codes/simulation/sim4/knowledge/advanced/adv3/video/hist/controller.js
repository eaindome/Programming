const axios = require('axios');
const pool = require('../../database/database');
const { decryptData, generateRSAKeys } = require('../../services/dataSecurityService');

function parseQrData(data) {
    const lines = data.split('\n');
    let qrCodeId;
    for (let line of lines) {
        if (line.startsWith("QR-Code ID")) {
            qrCodeId = parseInt(line.split(": ")[1]);
        }
        if (line.startsWith("Pack ID:")) {
            return { QRCodeID: `${qrCodeId}`, entityId: parseInt(line.split(": ")[1]), entityType: "pack" };
        } else if (line.startsWith("Box ID:")) {
            return { QRCodeID: `${qrCodeId}`, entityId: parseInt(line.split(": ")[1]), entityType: "box" };
        } else if (line.startsWith("Product ID:")) {
            return { QRCodeID: `${qrCodeId}`, entityId: parseInt(line.split(": ")[1]), entityType: "product" };
        }
    }
    return {};
}

const decryptedData = async (req, res) => {
    console.log('Decrypting data...')
    let encryptedData1 = req.body;
    // console.log(`Encrypted data: ${JSON.stringify(encryptedData1)}`);

    let encryptedData;
    try {
        // Attempt to parse the encryptedData1.data to check if it's already in the correct format
        encryptedData = JSON.parse(encryptedData1.data);
        // console.log(`Encrypted data: ${JSON.stringify(encryptedData)}`);
    } catch (error) {
        // If parsing fails, it means encryptedData1.data is not in the correct JSON format
        // Handle the case where encryptedData1.data needs to be parsed differently or is already in the correct format
        console.log("Data is not in the expected format, proceeding with original data.");
        encryptedData = encryptedData1; // Adjust this line based on how you want to handle the incorrect format
    }

    try {
        const { privateKey } = await generateRSAKeys();

        const decryptedData = decryptData(
            encryptedData.key,
            encryptedData.iv,
            encryptedData.data,
            encryptedData.tag,
            privateKey
        );

        // console.log(`Decrypted data: ${decryptedData}`);


        const { qrID, entityId, entityType } = parseQrData(decryptedData);
        // console.log(`
        //     QR ID: ${qrID}\n
        //     Entity ID: ${entityId}\n
        //     Entity Type: ${entityType}`
        // );

        res.status(200).send(decryptedData);
    } catch (error) {
        console.error(`Error in decryptData: ${error}`);
        res.status(500).send(`Server error: ${error.message}`);
    }
    console
};

module.exports = {
    decryptedData
};

/*
// const { scanAndDecryptQrCode } = require('../helpers');

// const scanQrCode = async (req, res) => {
//     try {
//         const { decryptedData, entityId, entityType } = await scanAndDecryptQrCode();

//         console.log(`
//             Decrypted data: \n${decryptedData}\n\n
//             Entity ID: ${entityId}\n
//             Entity Type: ${entityType}`
//         );

//         res.status(200).send(`Information displayed successfully.\nData: \n${decryptedData}`);
//     } catch (err) {
//         console.error(`Error in scanCodeForManufacturer: ${err}`);
//         res.status(500).send(`Server error: ${err.message}`);
//     }
// };

// module.exports = {
//     scanQrCode,
//     decryptedData
// };
*/
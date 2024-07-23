const util = require('util');
const { decryptData, generateRSAKeys } = require('../services/dataSecurityService');
const exec = util.promisify(require('child_process').exec);

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

const scanAndDecryptQrCode = async () => {
    const { privateKey } = await generateRSAKeys();

    const { stdout, stderr } = await exec('python ./video/scanner.py');
    if (stderr) {
        throw new Error(`Error output from Python script: ${stderr}`);
    }

    const qrData = stdout.trim();
    let encryptedData;
    try {
        encryptedData = JSON.parse(qrData);
    } catch (parseError) {
        throw new Error('Invalid QR data format');
    }

    const decryptedData = decryptData(
        encryptedData.key,
        encryptedData.iv,
        encryptedData.data,
        encryptedData.tag,
        privateKey
    );

    const { qrID, entityId, entityType } = parseQrData(decryptedData);
    return { decryptedData, qrID, entityId, entityType };
};

module.exports = {
    scanAndDecryptQrCode
}
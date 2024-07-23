const axios = require('axios');
const pool = require('../../database/database');
const { scanAndDecryptQrCode } = require('../helpers');

const scanCodeForInformation = async (req, res) => {
    const username = req.username;
    try {
        const { qrCodeId, entityId, entityType } = await scanAndDecryptQrCode();

        const apiUrl = 'http://localhost:8000/video/display-info';
        const updateApiUrl = 'http://localhost:8000/video/update-entity-info';

        await axios.post(updateApiUrl, { qrCodeId, entityId, entityType });

    } catch (err) {
        console.error(`Error in scanCodeForInfo: ${err}`);
        res.status(500).send(`Server error: ${err.message}`);
    }
};

const displayInfo = async (req, res) => {
    const { qrCodeId, entityId, entityType } = req.body;

    try {
        if (entityType === 'pack') {
            res.status(200).json({ entityId, entityType });
        }
    } catch (err) {
        console.error(`Error in displayInfo: ${err}`);
        res.status(500).send(`Server error: ${err.message}`);
    }
};
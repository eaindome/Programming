const pool = require('../database/database');
const { updatePackInfo, updateBoxSecDistInfo, updateBoxRetailInfo,
} = require('./queries');
const readline = require('readline');

const updatePackEntityInfo = async (req, res) => {
    const { entityId, user_id } = req.body;
    const shipping_date = new Date().toISOString().split('T')[0];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Please enter the shipping truck number: ', async (shipping_truck_number) => {
        try {
            console.log(`shipping_truck_number: ${shipping_truck_number}`);
            await pool.query(updatePackInfo, [user_id, shipping_date, shipping_truck_number, entityId]);
            res.status(200).json({ message: "Pack entity info updated successfully." });
        } catch (err) {
            console.error(`Error in updatePackEntityInfo: ${err}`);
            res.status(500).send(`Server error: ${err.message}`);
        } finally {
            rl.close();
        }
    });
};

const updateBoxEntityInfo = async (req, res) => {
    const { entityId, role, user_id } = req.body;
    let receiving_date;

    if (role === 'secondary_distributor') {
        receiving_date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    } else if (role === 'retailer') {
        receiving_date = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    } else {
        return res.status(400).json({ error: "Invalid role specified." });
    }

    try {
        const query = role === 'secondary_distributor' ? updateBoxSecDistInfo : updateBoxRetailInfo;
        await pool.query(query, [user_id, receiving_date, entityId]);
        res.status(200).json({ message: "Box entity info updated successfully." });
    } catch (err) {
        console.error(`Error in updateBoxEntityInfo: ${err}`);
        res.status(500).send(`Server error: ${err.message}`);
    }
};

module.exports = {
    updatePackEntityInfo,
    updateBoxEntityInfo,
};




// function parseQrData(data) {
//     const lines = data.split('\n');
//     for (let line of lines) {
//         if (line.startsWith("Pack ID:")) {
//             return { entityId: parseInt(line.split(": ")[1]), entityType: "pack" };
//         } else if (line.startsWith("Box ID:")) {
//             return { entityId: parseInt(line.split(": ")[1]), entityType: "box" };
//         } else if (line.startsWith("Product ID:")) {
//             return { entityId: parseInt(line.split(": ")[1]), entityType: "product" };
//         }
//     }
//     return {};
// }

// const scanCode = async (req, res) => {
//     try {
//         const { role, user_id } = req.body;
//         const { privateKey } = await generateRSAKeys();

//         const { stdout, stderr } = await exec('python ./video/scanner.py');
//         if (stderr) {
//             console.error(`Error output from Python script: ${stderr}`);
//             return res.status(500).send(`Error output from Python script: ${stderr}`);
//         }

//         const qrData = stdout.trim();
//         // console.log(`QR data: ${qrData}`);
//         let encryptedData;
//         try {
//             encryptedData = JSON.parse(qrData);
//             // console.log(`Encrypted data: ${encryptedData}`);
//         } catch (parseError) {
//             console.error(`Error parsing QR data: ${parseError}`);
//             return res.status(400).send('Invalid QR data format');
//         }
//         const decryptedData = decryptData(
//             encryptedData.key,
//             encryptedData.iv,
//             encryptedData.data,
//             encryptedData.tag,
//             privateKey
//         );

//         // console.log(`Decrypted data: ${decryptedData}`);
//         const { entityId, entityType } = parseQrData(decryptedData);
//         console.log(`Entity ID: ${entityId}, Entity Type: ${entityType}`);

//         let apiUrl;
//         switch (role) {
//             case 'manufacturer':
//                 apiUrl = 'http://localhost:8000/video/display-manufacturer';
//                 break;
//             case 'secondary_distributor':
//                 apiUrl = 'http://localhost:8000/video/display-secondary-distributor';
//                 break;
//             case 'retailer':
//                 apiUrl = 'http://localhost:8000/video/display-retailer';
//                 break;
//             case 'primary_distributor':
//                 apiUrl = 'http://localhost:8000/video/display-distributor';
//                 break;
//             default:
//                 return res.status(400).send('Invalid role specified');
//         }

//         let updateApiUrl = entityType === 'pack' ? 'http://localhost:8000/video/update-pack-entity-info' : 'http://localhost:8000/video/update-box-entity-info';
//         const username  = await pool.query(getUsername, [user_id]);
//         try {
//             if (role === 'manufacturer') {
//                 await axios.post(apiUrl, { 
//                     data: decryptedData, entityType, entityId 
//                 }); 
//                 res.status(200).send('Manufacturer info displayed successfully');
//             } else if (role === 'primary_distributor') {
//                 await axios.post(updateApiUrl, { entityId, user_id });
//                 await axios.post(apiUrl, { data: decryptedData, entityType, entityId });
//                 res.status(200).send('Entity info updated successfully');
//             } else if (role === 'secondary_distributor') {
//                 const secDisId = await pool.query(getSecDisId, [username]);
//                 await axios.post(updateApiUrl, { entityId, role, secDisId });
//                 await axios.post(apiUrl, { data: decryptedData, entityType, entityId });
//                 res.status(200).send('Entity info updated successfully');
//             } else if (role === 'retailer') {
//                 const retId = await pool.query(getRetId, [username]);
//                 await axios.post(updateApiUrl, { entityId, role, retId });
//                 await axios.post(apiUrl, { data: decryptedData, entityType, entityId });
//                 res.status(200).send('Entity info updated successfully');
//             }
//         } catch (axiosError) {
//             console.error(`Error in Axios request: ${axiosError}`);
//             return res.status(500).send(`Error in Axios request: ${axiosError.message}`);
//         }
//     } catch (err) {
//         console.error(`Error in scanCode: ${err}`);
//         res.status(500).send(`Server error: ${err.message}`);
//     }
// };

// const displayManufacturerInfo = async (req, res) => {
//     const { data, entityType, entityId } = req.body;

//     try {
//         if (entityType === 'pack') {
//             console.log(data);
//             res.status(200).json(data);
//         } else if (entityType === 'box') {
//             const result = await pool.query(getBoxInfo, [entityId]);
//             const box_info = result.rows[0] || {};

//             let secondary_distributor_info = {}, retailer_info = {};

//             if (box_info.secondary_distributor_id) {
//                 secondary_distributor_info = (await pool.query(secondaryDistributorInfo, [box_info.secondary_distributor_id])).rows[0] || {};
//             }

//             if (box_info.retailer_id) {
//                 retailer_info = (await pool.query(retailerInfo, [box_info.retailer_id])).rows[0] || {};
//             }

//             console.log("Working...");
//             res.status(200).json({
//                 secondary_distributor: secondary_distributor_info,
//                 retailer: retailer_info,
//                 receiving_date_1: box_info.receiving_date_1,
//                 receiving_date_2: box_info.receiving_date_2
//             });
//             console.log("WORKED");
//         } else if (entityType === 'product') {
//             const result = await pool.query(retailerInfo, [entityId]);
//             res.status(200).json(result.rows[0]);
//         } else {
//             res.status(400).json({ error: "Invalid entity type." });
//         }
//     } catch (err) {
//         console.error(`Error in displayManufacturerInfo: ${err}`);
//         res.status(500).send(`Server error: ${err.message}`);
//     }
// };

// const displayPrimaryDistributorInfo = async (req, res) => {
//     const { data, entityType, entityId } = req.body;

//     if (entityType === 'pack') {
//         res.status(200).json(data);
//     } else {
//         res.status(400).json({ error: "Invalid entity type." });
//     }
// };

// const displaySecondaryDistributorInfo = async (req, res) => {
//     const { data } = req.body;
//     let pack_id = data.match(/Pack ID:\s*(\d+)/)?.[1];

//     if (!pack_id) {
//         return res.status(400).json({ error: "No Pack ID found in the provided data." });
//     }

//     try {
//         const pack = await pool.query(getPackInfo, [pack_id]);
//         const pack_info = pack.rows[0];

//         const distributor_info = (await pool.query(primaryDistributorInfo, [pack_info.distributor_id])).rows[0];

//         console.log("Working...");
//         console.log(pack_info, distributor_info, data);
//         res.status(200).json({
//             ...pack_info,
//             primary_distributor: distributor_info,
//             message: data
//         });
//     } catch (err) {
//         console.error(`Error in displaySecondaryDistributorInfo: ${err}`);
//         res.status(500).send(`Server error: ${err.message}`);
//     }
// };

// const displayRetailerInfo = async (req, res) => {
//     const { data } = req.body;
//     let box_id = data.match(/Box ID:\s*(\d+)/)?.[1];
//     let pack_id = data.match(/Pack ID:\s*(\d+)/)?.[1];

//     if (!box_id) {
//         return res.status(400).json({ error: "No Box ID found in the provided data." });
//     }

//     try {
//         const box = await pool.query(getBoxInfo, [box_id]);
//         const box_info = box.rows[0];

//         const pack_info = (await pool.query(getPackInfo, [pack_id])).rows[0];

//         const distributor_info = (await pool.query(primaryDistributorInfo, [pack_info.distributor_id])).rows[0];
//         const secondary_distributor_info = (await pool.query(secondaryDistributorInfo, [box_info.secondary_distributor_id])).rows[0];

//         console.log("Working...");
//         console.log(`Box info: ${JSON.stringify(box_info, null, 2)}`, `Pack info: ${JSON.stringify(pack_info)}`, `Primary distributor info: ${JSON.stringify(distributor_info)}`, `Secondary distributor info: ${JSON.stringify(secondary_distributor_info)}`, `Data: ${data}`);
//         res.status(200).json({
//             ...pack_info,
//             primary_distributor: distributor_info,
//             secondary_distributor: secondary_distributor_info,
//             receiving_date: box_info.receiving_date_2,
//             message: data
//         });
//     } catch (err) {
//         console.error(`Error in displayRetailerInfo: ${err}`);
//         res.status(500).send(`Server error: ${err.message}`);
//     }
// };


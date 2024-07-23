const {
    packApproval,
    boxApproval,
    productApproval
} = require('./queries');
const pool = require('../../database/database');

// Reusable function to fetch approval status
const fetchApprovalStatus = async (query, id) => {
    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length > 0) {
            return { id, approval_status: result.rows[0].approval_status };
        }
        return { id, approval_status: 'not found' };
    } catch (error) {
        console.error(`Error fetching approval status for ID ${id}:`, error);
        return { id, approval_status: 'error' };
    }
};

const getPackApproval = async (req, res, next) => {
    const { pack_id } = req.query;
    if (!pack_id) return res.status(400).json({ error: 'pack_id is required' });

    const approval = await fetchApprovalStatus(packApproval, pack_id);
    if (approval.approval_status === 'not found') {
        return res.status(404).json({ message: 'Pack approval status not found' });
    }
    if (approval.approval_status === 'error') {
        return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ approval_status: approval.approval_status });
};

const getBoxApproval = async (req, res, next) => {
    const { box_id } = req.query;
    if (!box_id) return res.status(400).json({ error: 'box_id is required' });

    const approval = await fetchApprovalStatus(boxApproval, box_id);
    if (approval.approval_status === 'not found') {
        return res.status(404).json({ message: 'Box approval status not found' });
    }
    if (approval.approval_status === 'error') {
        return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ approval_status: approval.approval_status });
};

const getProductApproval = async (req, res, next) => {
    const { product_name } = req.query;
    if (!product_name) return res.status(400).json({ error: 'product_name is required' });

    const approval = await fetchApprovalStatus(productApproval, product_name);
    if (approval.approval_status === 'not found') {
        return res.status(404).json({ message: 'Product approval status not found' });
    }
    if (approval.approval_status === 'error') {
        return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ approval_status: approval.approval_status });
};

const confirmStatus = async (req, res, next) => {
    const { statusString } = req.query;
    if (!statusString) return res.status(400).json({ error: 'statusString is required' });

    // Parse the statusString using regex
    const packs = [];
    const boxes = [];
    const regex = /(\d+)(__?)/g;
    let match;

    while ((match = regex.exec(statusString)) !== null) {
        if (match[2] === '_') {
            packs.push(match[1]);
        } else {
            boxes.push(match[1]);
        }
    }

    try {
        const packPromises = packs.map(pack_id => fetchApprovalStatus(packApproval, pack_id));
        const boxPromises = boxes.map(box_id => fetchApprovalStatus(boxApproval, box_id));

        const approvalStatus = {
            packs: await Promise.all(packPromises),
            boxes: await Promise.all(boxPromises)
        };

        const allApproved = approvalStatus.packs.every(pack => pack.approval_status === 'approved') &&
            approvalStatus.boxes.every(box => box.approval_status === 'approved');

        if (allApproved) {
            res.status(200).json({ message: 'All items approved', statusString });
        } else {
            res.status(400).json({ message: 'Not all items approved', approvalStatus });
        }
    } catch (error) {
        console.error('Error in confirmStatus:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getPackApproval,
    getBoxApproval,
    getProductApproval,
    confirmStatus
};




// const {
//     packApproval,
//     boxApproval,
//     productApproval
// } = require('./queries');
// const pool = require('../../database/database');

// const getPackApproval = async (req, res, next) => {
//     const { pack_id } = req.query; // Assuming pack_id is passed as a query parameter
//     if (pack_id) {
//         try {
//             const result = await pool.query(packApproval, [pack_id]);
//             if (result.rows.length > 0) {
//                 res.status(200).json({ approval_status: result.rows[0].approval_status });
//             } else {
//                 res.status(404).json({ message: 'Pack approval status not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching pack approval status:', error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     } else {
//         res.status(400).json({ error: 'pack_id is required' });
//     }
// };

// const getBoxApproval = async (req, res, next) => {
//     const { box_id } = req.query; // Assuming box_id is passed as a query parameter
//     if (box_id) {
//         try {
//             const result = await pool.query(boxApproval, [box_id]);
//             if (result.rows.length > 0) {
//                 res.status(200).json({ approval_status: result.rows[0].approval_status });
//             } else {
//                 res.status(404).json({ message: 'Box approval status not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching box approval status:', error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     } else {
//         res.status(400).json({ error: 'box_id is required' });
//     }
// };

// const getProductApproval = async (req, res, next) => {
//     const { product_name } = req.query; // Assuming product_name is passed as a query parameter
//     if (product_name) {
//         try {
//             const result = await pool.query(productApproval, [product_name]);
//             if (result.rows.length > 0) {
//                 res.status(200).json({ approval_status: result.rows[0].approval_status });
//             } else {
//                 res.status(404).json({ message: 'Product approval status not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching product approval status:', error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     } else {
//         res.status(400).json({ error: 'product_name is required' });
//     }
// };

// const confirmStatus = async (req, res, next) => {
//     const { statusString } = req.query; // Assuming statusString is passed as a query parameter
//     if (!statusString) {
//         return res.status(400).json({ error: 'statusString is required' });
//     }

//     // Parse the statusString
//     const packs = [];
//     const boxes = [];
//     const regex = /(\d+)(__?)/g;
//     let match;

//     while ((match = regex.exec(statusString)) !== null) {
//         if (match[2] === '_') {
//             packs.push(match[1]);
//         } else {
//             boxes.push(match[1]);
//         }
//     }

//     const approvalStatus = { packs: [], boxes: [] };

//     try {
//         const packPromises = packs.map(pack_id => 
//             pool.query(packApproval, [pack_id])
//                 .then(result => ({
//                     pack_id,
//                     approval_status: result.rows.length > 0 ? result.rows[0].approval_status : 'not found'
//                 }))
//                 .catch(error => {
//                     console.error('Error fetching pack approval status:', error);
//                     return { pack_id, approval_status: 'error' };
//                 })
//         );

//         const boxPromises = boxes.map(box_id =>
//             pool.query(boxApproval, [box_id])
//                 .then(result => ({
//                     box_id,
//                     approval_status: result.rows.length > 0 ? result.rows[0].approval_status : 'not found'
//                 }))
//                 .catch(error => {
//                     console.error('Error fetching box approval status:', error);
//                     return { box_id, approval_status: 'error' };
//                 })
//         );

//         approvalStatus.packs = await Promise.all(packPromises);
//         approvalStatus.boxes = await Promise.all(boxPromises);

//         const allApproved = approvalStatus.packs.every(pack => pack.approval_status === 'approved') &&
//             approvalStatus.boxes.every(box => box.approval_status === 'approved');

//         if (allApproved) {
//             res.status(200).json({ message: 'All items approved', statusString });
//         } else {
//             res.status(400).json({ message: 'Not all items approved', approvalStatus });
//         }
//     } catch (error) {
//         console.error('Error in confirmStatus:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = {
//     getPackApproval,
//     getBoxApproval,
//     getProductApproval,
//     confirmStatus
// };


// const {
//     packApproval,
//     boxApproval,
//     productApproval
// } = require('./queries');
// const pool = require('../../database/database');

// const getPackApproval = async (req, res, next) => {
//     const { pack_id } = req.query; // Assuming pack_id is passed as a query parameter
//     if (pack_id) {
//         try {
//             const result = await pool.query(packApproval, [pack_id]);
//             if (result.rows.length > 0) {
//                 res.status(200).json({ approval_status: result.rows[0].approval_status });
//             } else {
//                 res.status(404).json({ message: 'Pack approval status not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching pack approval status:', error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     } else {
//         res.status(400).json({ error: 'pack_id is required' });
//     }
// };

// const getBoxApproval = async (req, res, next) => {
//     const { box_id } = req.query; // Assuming box_id is passed as a query parameter
//     if (box_id) {
//         try {
//             const result = await pool.query(boxApproval, [box_id]);
//             if (result.rows.length > 0) {
//                 res.status(200).json({ approval_status: result.rows[0].approval_status });
//             } else {
//                 res.status(404).json({ message: 'Box approval status not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching box approval status:', error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     } else {
//         res.status(400).json({ error: 'box_id is required' });
//     }
// };

// const getProductApproval = async (req, res, next) => {
//     const { product_name } = req.query; // Assuming product_name is passed as a query parameter
//     if (product_name) {
//         try {
//             const result = await pool.query(productApproval, [product_name]);
//             if (result.rows.length > 0) {
//                 res.status(200).json({ approval_status: result.rows[0].approval_status });
//             } else {
//                 res.status(404).json({ message: 'Product approval status not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching product approval status:', error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     } else {
//         res.status(400).json({ error: 'product_name is required' });
//     }
// };

// const confirmStatus = async (req, res, next) => {
//     const { statusString } = req.query; // Assuming statusString is passed as a query parameter
//     if (!statusString) {
//         return res.status(400).json({ error: 'statusString is required' });
//     }

//     const packs = [];
//     const boxes = [];
//     let current = '';
//     let isBox = false;

//     for (let i = 0; i < statusString.length; i++) {
//         const char = statusString[i];
//         if (char === '_' && current) {
//             if (statusString[i + 1] === '_') {
//                 boxes.push(current);
//                 i++; // Skip the next '_'
//                 isBox = true;
//             } else {
//                 packs.push(current);
//                 isBox = false;
//             }
//             current = '';
//         } else {
//             current += char;
//         }
//     }
//     if (current) {
//         if (isBox) {
//             boxes.push(current);
//         } else {
//             packs.push(current);
//         }
//     }

//     const approvalStatus = { packs: [], boxes: [] };

//     for (const pack_id of packs) {
//         try {
//             const result = await pool.query(packApproval, [pack_id]);
//             if (result.rows.length > 0) {
//                 approvalStatus.packs.push({ pack_id, approval_status: result.rows[0].approval_status });
//             } else {
//                 approvalStatus.packs.push({ pack_id, approval_status: 'not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching pack approval status:', error);
//             approvalStatus.packs.push({ pack_id, approval_status: 'error' });
//         }
//     }

//     for (const box_id of boxes) {
//         try {
//             const result = await pool.query(boxApproval, [box_id]);
//             if (result.rows.length > 0) {
//                 approvalStatus.boxes.push({ box_id, approval_status: result.rows[0].approval_status });
//             } else {
//                 approvalStatus.boxes.push({ box_id, approval_status: 'not found' });
//             }
//         } catch (error) {
//             console.error('Error fetching box approval status:', error);
//             approvalStatus.boxes.push({ box_id, approval_status: 'error' });
//         }
//     }

//     const allApproved = approvalStatus.packs.every(pack => pack.approval_status === 'approved') &&
//         approvalStatus.boxes.every(box => box.approval_status === 'approved');

//     if (allApproved) {
//         res.status(200).json({ message: 'All items approved', statusString });
//     } else {
//         res.status(400).json({ message: 'Not all items approved', approvalStatus });
//     }
// };

// module.exports = {
//     getPackApproval,
//     getBoxApproval,
//     getProductApproval,
//     confirmStatus
// };

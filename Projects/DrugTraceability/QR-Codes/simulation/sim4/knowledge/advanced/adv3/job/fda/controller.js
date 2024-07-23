const pool = require('../../database/database'); // assuming you have a pool instance for PostgreSQL connection
const { enterCode, checkApproval,
    updateApproval, getCompanyId
} = require('../queries');

// Controller to enter FDA code and update FDA approval status
const enterFDAcode = async (req, res) => {
    const { company_name, fda_code } = req.body;
    
    if (!company_name || !fda_code) {
        return res.status(400).send('Company name and FDA code are required');
    }

    const existingCode = await pool.query('SELECT * FROM fda WHERE fda_code = $1', [fda_code]);
    if (existingCode.rows.length > 0) {
      // fdaCode already exists, handle accordingly
      return res.status(409).json({ error: 'FDA code already exists.' });
    }

    const client = await pool.connect();
    
    try {
        console.log('Beginning...')
        await client.query('BEGIN');
        
        console.log('Entering code...')
        // Insert FDA code
        try {
            await client.query(enterCode, [company_name, fda_code]);
        } catch (error) {
            console.log('Error entering code:', error);
            res.status(500).send('Invalid company name');
        }
        
        console.log('Getting company ID...')
        // Get the company ID based on the company name
        const result = await client.query(getCompanyId, [company_name]);
        if (result.rows.length === 0) {
            throw new Error('Company not found');
        }
        const companyId = result.rows[0].id;
        

        console.log('Updating approval...')
        // Update FDA approval status
        await client.query(updateApproval, [companyId]);
        
        console.log('Committing...');
        await client.query('COMMIT');
        
        res.status(201).send('FDA code inserted and approval status updated successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        if (error.message === 'Company not found') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Error processing FDA code and approval status');
        }
    } finally {
        client.release();
    }
};

// Controller to check FDA approval status
const checkFDAapproval = (req, res) => {
    const companyId = parseInt(req.params.id);

    if (isNaN(companyId)) {
        return res.status(400).send('Invalid company ID');
    }

    pool.query(checkApproval, [companyId], (error, results) => {
        if (error) {
            return res.status(500).send('Error checking FDA approval status');
        }
        if (results.rows.length === 0) {
            return res.status(404).send('Company not found');
        }
        res.status(200).json(results.rows[0]);
    });
};

// Controller to update FDA approval status
const updateFDAapproval = (req, res) => {
    const companyId = parseInt(req.params.id);

    if (isNaN(companyId)) {
        return res.status(400).send('Invalid company ID');
    }

    pool.query(updateApproval, [companyId], (error, results) => {
        if (error) {
            return res.status(500).send('Error updating FDA approval status');
        }
        if (results.rowCount === 0) {
            return res.status(404).send('Company not found');
        }
        res.status(200).send('FDA approval status updated successfully');
    });
};

module.exports = {
    enterFDAcode,
    checkFDAapproval,
    updateFDAapproval,
};


// const pool = require('../../database/database'); // assuming you have a pool instance for PostgreSQL connection
// const queries = require('../queries');

// // Controller to enter FDA code and update FDA approval status
// const enterFDAcode = async (req, res) => {
//     const { company_name, fda_code } = req.body;
    
//     if (!company_name || !fda_code) {
//         return res.status(400).send('Company name and FDA code are required');
//     }

//     const client = await pool.connect();
    
//     try {
//         await client.query('BEGIN');
        
//         // Insert FDA code
//         await client.query(queries.enterFDAcode, [company_name, fda_code]);
        
//         // Get the company ID based on the company name
//         const result = await client.query(queries.getCompanyId, [company_name]);
//         if (result.rows.length === 0) {
//             throw new Error('Company not found');
//         }
//         const companyId = result.rows[0].id;
        
//         // Update FDA approval status
//         await client.query(queries.updateFDAapproval, [companyId]);
        
//         await client.query('COMMIT');
        
//         res.status(201).send('FDA code inserted and approval status updated successfully');
//     } catch (error) {
//         await client.query('ROLLBACK');
//         if (error.message === 'Company not found') {
//             res.status(404).send(error.message);
//         } else {
//             res.status(500).send('Error processing FDA code and approval status');
//         }
//     } finally {
//         client.release();
//     }
// };

// // Controller to check FDA approval status
// const checkFDAapproval = (req, res) => {
//     const id = parseInt(req.params.id);

//     if (isNaN(id)) {
//         return res.status(400).send('Invalid company ID');
//     }

//     pool.query(queries.checkFDAapproval, [id], (error, results) => {
//         if (error) {
//             return res.status(500).send('Error checking FDA approval status');
//         }
//         if (results.rows.length === 0) {
//             return res.status(404).send('Company not found');
//         }
//         res.status(200).json(results.rows[0]);
//     });
// };

// // Controller to update FDA approval status
// const updateFDAapproval = (req, res) => {
//     const id = parseInt(req.params.id);

//     if (isNaN(id)) {
//         return res.status(400).send('Invalid company ID');
//     }

//     pool.query(queries.updateFDAapproval, [id], (error, results) => {
//         if (error) {
//             return res.status(500).send('Error updating FDA approval status');
//         }
//         if (results.rowCount === 0) {
//             return res.status(404).send('Company not found');
//         }
//         res.status(200).send('FDA approval status updated successfully');
//     });
// };

// module.exports = {
//     enterFDAcode,
//     checkFDAapproval,
//     updateFDAapproval,
// };


// const pool = require('../../database/database'); // assuming you have a pool instance for PostgreSQL connection
// const queries = require('../queries');

// // Controller to enter FDA code and update FDA approval status
// const enterFDAcode = async (req, res) => {
//     const { company_name, fda_code } = req.body;
    
//     const client = await pool.connect();
    
//     try {
//         await client.query('BEGIN');
        
//         // Insert FDA code
//         await client.query(queries.enterFDAcode, [company_name, fda_code]);
        
//         // Get the company ID based on the company name
//         const result = await client.query(queries.getCompanyId, [company_name]);
//         const companyId = result.rows[0].id;
        
//         // Update FDA approval status
//         await client.query(queries.updateFDAapproval, [companyId]);
        
//         await client.query('COMMIT');
        
//         res.status(201).send('FDA code inserted and approval status updated successfully');
//     } catch (error) {
//         await client.query('ROLLBACK');
//         res.status(500).send('Error processing FDA code and approval status');
//     } finally {
//         client.release();
//     }
// };

// // Controller to check FDA approval status
// const checkFDAapproval = (req, res) => {
//     const id = parseInt(req.params.id);
//     pool.query(queries.checkFDAapproval, [id], (error, results) => {
//         if (error) {
//             return res.status(500).send('Error checking FDA approval status');
//         }
//         res.status(200).json(results.rows[0]);
//     });
// };

// // Controller to update FDA approval status
// const updateFDAapproval = (req, res) => {
//     const id = parseInt(req.params.id);
//     pool.query(queries.updateFDAapproval, [id], (error, results) => {
//         if (error) {
//             return res.status(500).send('Error updating FDA approval status');
//         }
//         res.status(200).send('FDA approval status updated successfully');
//     });
// };

// module.exports = {
//     enterFDAcode,
//     checkFDAapproval,
//     updateFDAapproval,
// };



// const pool = require('../../database/database'); // assuming you have a pool instance for PostgreSQL connection
// const queries = require('../queries');

// // Controller to enter FDA code and update FDA approval status
// const enterFDAcode = (req, res) => {
//     const { company_name, fda_code } = req.body;
    
//     pool.query(queries.enterFDAcode, [company_name, fda_code], (error, results) => {
//         if (error) {
//             return res.status(500).send('Error inserting FDA code');
//         }
        
//         // Get the company ID based on the company name
//         pool.query(queries.getCompanyId, [company_name], (error, results) => {
//             if (error) {
//                 return res.status(500).send('Error fetching company ID');
//             }
            
//             const companyId = results.rows[0].id;
            
//             // Update FDA approval status
//             pool.query(queries.updateFDAapproval, [companyId], (error, results) => {
//                 if (error) {
//                     return res.status(500).send('Error updating FDA approval status');
//                 }
//                 res.status(201).send('FDA code inserted and approval status updated successfully');
//             });
//         });
//     });
// };

// // Controller to check FDA approval status
// const checkFDAapproval = (req, res) => {
//     const id = parseInt(req.params.id);
//     pool.query(queries.checkFDAapproval, [id], (error, results) => {
//         if (error) {
//             return res.status(500).send('Error checking FDA approval status');
//         }
//         res.status(200).json(results.rows[0]);
//     });
// };

// // Controller to update FDA approval status
// const updateFDAapproval = (req, res) => {
//     const id = parseInt(req.params.id);
//     pool.query(queries.updateFDAapproval, [id], (error, results) => {
//         if (error) {
//             return res.status(500).send('Error updating FDA approval status');
//         }
//         res.status(200).send('FDA approval status updated successfully');
//     });
// };

// module.exports = {
//     enterFDAcode,
//     checkFDAapproval,
//     updateFDAapproval,
// };


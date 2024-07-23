const { 
    getProductByManufacturerName,
    getManufacturereId, 
    getRole,
    getCompanyId,
    getAllPacks, 
    getBoxNameByPackId, 
    getProductNameByBoxId, 
    getCompanyInfo,
} = require('./queries');
const pool = require('../database/database');

const createHierarchy = async (req, res) => {
    const { num_packs } = req.body;
    const username = req.username;

    if (!Number.isInteger(num_packs) || num_packs <= 0) {
        return res.status(400).json({ error: "Invalid number of packs. It must be a positive integer." });
    }

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const [roleResult, productResult, manufacturerResult, companyResult] = await Promise.all([
                client.query(getRole, [username]),
                client.query(getProductByManufacturerName, [username]),
                client.query(getManufacturereId, [username]),
                client.query(getCompanyId, [username])
            ]);

            const role = roleResult.rows[0]?.role;
            const product_name = productResult.rows[0]?.product_name;
            const manufacturer_id = manufacturerResult.rows[0]?.id;
            const company_id = companyResult.rows[0]?.id;

            if (role !== 'manufacturer' || !product_name || !manufacturer_id) {
                await client.query('ROLLBACK');
                return res.status(403).json({ error: "Forbidden: Only manufacturers can create hierarchies." });
            }

            const current_time = new Date().toISOString().replace(/[-:.TZ]/g, "_");
            const boxesPerPack = 4;
            const productsPerBox = 2;

            // Batch insert packs
            const packValues = [];
            for (let i = 0; i < num_packs; i++) {
                const pack_name = `Pack_${current_time}_${i + 1}`;
                packValues.push(`('${pack_name}', ${company_id})`);
            }
            const packQuery = `INSERT INTO packs (name, company_id) VALUES ${packValues.join(', ')} RETURNING id`;
            const packResults = await client.query(packQuery);
            const packIds = packResults.rows.map(row => row.id);

            // Batch insert boxes
            const boxValues = [];
            packIds.forEach((pack_id, i) => {
                for (let j = 0; j < boxesPerPack; j++) {
                    const box_name = `Box_${current_time}_${i + 1}_${j + 1}`;
                    boxValues.push(`('${box_name}', ${pack_id}, ${company_id})`);
                }
            });
            const boxQuery = `INSERT INTO boxes (name, pack_id, company_id) VALUES ${boxValues.join(', ')} RETURNING id`;
            const boxResults = await client.query(boxQuery);
            const boxIds = boxResults.rows.map(row => row.id);

            // Batch insert products
            const productValues = [];
            boxIds.forEach((box_id, index) => {
                for (let k = 0; k < productsPerBox; k++) {
                    const identity_number = `Product_${current_time}_${Math.floor(index / boxesPerPack) + 1}_${(index % boxesPerPack) + 1}_${k + 1}`;
                    productValues.push(`('${product_name}', '${identity_number}', ${packIds[Math.floor(index / boxesPerPack)]}, ${box_id}, ${company_id})`);
                }
            });
            const productQuery = `INSERT INTO products (product_name, identity_number, pack_id, box_id, company_id) VALUES ${productValues.join(', ')}`;
            await client.query(productQuery);

            await client.query('COMMIT');
            res.status(201).json({ message: "Hierarchy created successfully." });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Error creating hierarchy:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const fetchHierarchy = async (req, res) => {
    const username = req.username;

    const get_role = await pool.query(getRole, [username]);
    const role = get_role.rows[0].role;

    if (role !== 'manufacturer') {
        return res.status(403).json({ error: "Forbidden: Only manufacturers can fetch hierarchies." });
    }
    try {
        const packsResult = await pool.query(getAllPacks);
        const packs = packsResult.rows;
        const hierarchyPromises = packs.map(async (pack) => {
            const packData = {
                id: pack.id,
                name: pack.name,
                node_type: 'pack',
                children: []
            };
            const boxesResult = await pool.query(getBoxNameByPackId, [pack.id]);
            const boxes = boxesResult.rows;

            const boxPromises = boxes.map(async (box) => {
                const boxData = {
                    id: box.id,
                    name: box.name,
                    node_type: 'box',
                    children: []
                };
                const productsResult = await pool.query(getProductNameByBoxId, [box.id]);
                const products = productsResult.rows;

                products.forEach(product => {
                    boxData.children.push({
                        id: product.id,
                        name: product.name,
                        node_type: 'product'
                    });
                });
                return boxData;
            });
            packData.children = await Promise.all(boxPromises);
            return packData;
        });
        const hierarchy = await Promise.all(hierarchyPromises);
        res.status(200).json({ hierarchy });
    } catch (err) {
        console.error("Error fetching hierarchy:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


const printHierarchy = async (req, res) => {
    const username = req.username;

    try {
        // Fetch user role and company ID in parallel
        const [roleResult, companyResult] = await Promise.all([
            pool.query(getRole, [username]),
            pool.query(getCompanyId, [username])
        ]);

        const role = roleResult.rows[0]?.role;
        const company_id = companyResult.rows[0]?.id;

        if (role !== 'manufacturer') {
            return res.status(403).json({ error: "Forbidden: Only manufacturers can create hierarchies." });
        }
        const getFullHierarchy = `
            SELECT 
                p.id AS pack_id,
                p.name AS pack_name,
                b.id AS box_id,
                b.name AS box_name,
                pr.id AS product_id,
                pr.identity_number
            FROM 
                packs p
            JOIN 
                boxes b ON p.id = b.pack_id
            JOIN 
                products pr ON b.id = pr.box_id
            WHERE 
                p.company_id = $1 
                AND DATE(p.created_at) = $2
        `;
        const { date } = req.body;
        const date_str = new Date(date).toISOString().split('T')[0];

        // Fetch all hierarchy data in a single query
        const hierarchyResult = await pool.query(getFullHierarchy, [company_id, date_str]);
        const hierarchyData = hierarchyResult.rows;

        if (hierarchyData.length === 0) {
            return res.status(404).json({ error: "No packs found for the given company and date." });
        }

        // Process hierarchy data to structure it
        const hierarchy = structureHierarchy(hierarchyData);

        // Fetch company information
        const companyInfoResult = await pool.query(getCompanyInfo, [company_id]);
        const companyInfo = companyInfoResult.rows[0];

        res.status(200).json({ company: companyInfo, hierarchy });
    } catch (err) {
        console.error("Error printing hierarchy:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const structureHierarchy = (data) => {
    const hierarchy = [];
    const packMap = new Map();

    data.forEach((item) => {
        // Destructure item properties
        const { pack_id, pack_name, box_id, box_name, product_id, identity_number } = item;

        // Handle packs
        if (!packMap.has(pack_id)) {
            const newPack = { pack_id, name: pack_name, boxes: [] };
            packMap.set(pack_id, newPack);
            hierarchy.push(newPack);
        }

        // Handle boxes within the pack
        const pack = packMap.get(pack_id);
        let box = pack.boxes.find(b => b.box_id === box_id);
        if (!box) {
            box = { box_id, name: box_name, products: [] };
            pack.boxes.push(box);
        }

        // Handle products within the box
        box.products.push({ product_id, identity_number });
    });

    return hierarchy;
};

module.exports = {
    createHierarchy,
    fetchHierarchy,
    printHierarchy
};
















// const printHierarchy = async (req, res) => {
//     const username = req.username;
    
//     try {
//         // fetch user role and company ID in parallel
//         const [roleResult, companyResult] = await Promise.all([
//             pool.query(getRole, [username]),
//             pool.query(getCompanyId, [username])
//         ]);

//         const role = roleResult.rows[0]?.role;
//         const company_id = companyResult.rows[0]?.id;

//         if (role !== 'manufacturer') {
//             return res.status(403).json({ error: "Forbidden: Only manufacturers can create hierarchies." });
//         }

//         const { date } = req.body;
//         const date_str = new Date(date).toISOString().split('T')[0];
        
//         // Fetch packs for the given company and date
//         const packsResult = await pool.query(getPacksByCompanyAndDate, [company_id, date_str]);
//         const packs = packsResult.rows;

//         if (packs.length === 0) {
//             return res.status(404).json({ error: "No packs found for the given company and date." });
//         }

//         // Fetch company information
//         const companyInfoResult = await pool.query(getCompanyInfo, [company_id]);
//         const companyInfo = companyInfoResult.rows[0];

//         // Prepare hierarchy data asynchronously
//         const hierarchyPromises = packs.map(async (pack) => {
//             // Initialize pack data
//             const packData = { pack_id: pack.id, boxes: [] };

//             // Fetch boxes for the current pack
//             const boxesResult = await pool.query(getBoxesByPackId, [pack.id]);
//             const boxes = boxesResult.rows;

//             // Prepare box data asynchronously
//             const boxPromises = boxes.map(async (box) => {
//                 // Initialize box data
//                 const boxData = { box_id: box.id, products: [] };

//                 // Fetch products for the current box
//                 const productsResult = await pool.query(getProductsByBoxId, [box.id]);
//                 const products = productsResult.rows;

//                 // Map products to box data
//                 products.forEach(product => {
//                     boxData.products.push({
//                         product_id: product.id,
//                         identity_number: `Product_${pack.id}_${box.id}_${product.id}`
//                     });
//                 });

//                 return boxData;
//             });

//             // Wait for all box data to be prepared and assign to pack's boxes
//             packData.boxes = await Promise.all(boxPromises);

//             return packData;
//         });

//         // Wait for all hierarchy data to be prepared and send as response
//         const hierarchy = await Promise.all(hierarchyPromises);
//         res.status(200).json({ company: companyInfo, hierarchy });
//     } catch (err) {
//         console.error("Error printing hierarchy:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };



// const createHierarchy = async (req, res) => {
//     const { num_packs, username } = req.body;

//     try {
//         const current_time = new Date().toISOString().replace(/[-:.]/g, "").replace("T", "_").replace("Z", "");
//         const result = await pool.query(getProductByManufacturerName, [username]);
//         const product_name = result.rows[0].product_name;

//         const manufacturerDet = await pool.query(getManufacturereId, [username]);
//         const manufacturer_id = manufacturerDet.rows[0].id;

//         // Start a transaction
//         await pool.query('BEGIN');

//         const packQueries = [];
//         for (let i = 0; i < num_packs; i++) {
//             const pack_name = `Pack_${current_time}_${i + 1}`;
//             packQueries.push(pool.query(insertPack, [pack_name, manufacturer_id]));
//         }
//         const packResults = await Promise.all(packQueries);
//         console.log("packResults: ", packResults);

//         // extracting pack IDs from the results
//         const packIds = packResults.map(result => result.rows[0].id);
//         console.log("packIds: ", packIds);

//         const boxQueries = [];
//         const productQueries = [];
//         for (let i = 0; i < num_packs; i++) {
//             const pack_id = packResults[i].rows[0].id;
//             for (let j = 0; j < 4; j++) {
//                 const box_name = `Box_${current_time}_${i + 1}_${j + 1}`;
//                 boxQueries.push(pool.query(insertBox, [box_name, pack_id, manufacturer_id]));
//             }
//         }
//         const boxResults = await Promise.all(boxQueries);
//         console.log("boxResults: ", boxResults);
        
//         // Extracting box IDs from the results
//         const boxIds = boxResults.map(result => result.rows[0].id);
//         console.log("boxIds: ", boxIds);

//         let boxCounter = 0;
//         for (let i = 0; i < num_packs; i++) {
//             const pack_id = packIds[i];
//             for (let j = 0; j < 4; j++) {
//                 const box_id = boxIds[boxCounter++];
//                 for (let k = 0; k < 2; k++) {
//                     const identity_number = `Product_${current_time}_${i + 1}_${j + 1}_${k + 1}`;
//                     productQueries.push(pool.query(insertProduct, [product_name, identity_number, pack_id, box_id, manufacturer_id]));
//                 }
//             }
//         }
//         const productResults = await Promise.all(productQueries);
//         console.log("productResults: ", productResults);

//         // Commit the transaction
//         await pool.query('COMMIT');

//         res.status(201).json({ message: "Hierarchy created successfully." });
//     } catch (error) {
//         await pool.query('ROLLBACK');
//         console.log("Error creating hierarchy: ", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// cr
        // let boxCounter = 0;
        // for (let i = 0; i < num_packs; i++) {
        //     const pack_id = packIds[i];
        //     for (let j = 0; j < 4; j++) {
        //         const box_id = boxIds[boxCounter++];
        //         for (let k = 0; k < 2; k++) {
        //             const identity_number = `Product_${current_time}_${i + 1}_${j + 1}_${k + 1}`;
        //             productQueries.push(pool.query(insertProduct, [product_name, identity_number, pack_id, box_id, manufacturer_id]));
        //         }
        //     }
        // }
// const createHierarchy = async (req, res) => {
//     const { num_packs } = req.body;
//     const username = req.username;

//     try {
//         const client = await pool.connect();
//         try {
//             await client.query('BEGIN');

//             const [roleResult, productResult, manufacturerResult] = await Promise.all([
//                 client.query(getRole, [username]),
//                 client.query(getProductByManufacturerName, [username]),
//                 client.query(getManufacturereId, [username])
//             ]);

//             const role = roleResult.rows[0]?.role;
//             const product_name = productResult.rows[0]?.product_name;
//             const manufacturer_id = manufacturerResult.rows[0]?.id;

//             if (role !== 'manufacturer' || !product_name || !manufacturer_id) {
//                 await client.query('ROLLBACK');
//                 return res.status(403).json({ error: "Forbidden: Only manufacturers can create hierarchies." });
//             }

//             const current_time = new Date().toISOString().replace(/[-:.TZ]/g, "_");
//             const boxesPerPack = 4;
//             const productsPerBox = 2;

//             // Batch insert packs
//             const packInserts = [];
//             for (let i = 0; i < num_packs; i++) {
//                 const pack_name = `Pack_${current_time}_${i + 1}`;
//                 packInserts.push(client.query(insertPack, [pack_name, manufacturer_id]));
//             }
//             const packResults = await Promise.all(packInserts);
//             const packIds = packResults.map(result => result.rows[0].id);

//             // Batch insert boxes
//             const boxInserts = [];
//             packIds.forEach((pack_id, i) => {
//                 for (let j = 0; j < boxesPerPack; j++) {
//                     const box_name = `Box_${current_time}_${i + 1}_${j + 1}`;
//                     boxInserts.push(client.query(insertBox, [box_name, pack_id, manufacturer_id]));
//                 }
//             });
//             const boxResults = await Promise.all(boxInserts);
//             const boxIds = boxResults.map(result => result.rows[0].id);

//             // Batch insert products
//             const productInserts = [];
//             boxIds.forEach((box_id, index) => {
//                 for (let k = 0; k < productsPerBox; k++) {
//                     const identity_number = `Product_${current_time}_${Math.floor(index / boxesPerPack) + 1}_${(index % boxesPerPack) + 1}_${k + 1}`;
//                     productInserts.push(client.query(insertProduct, [product_name, identity_number, packIds[Math.floor(index / boxesPerPack)], box_id, manufacturer_id]));
//                 }
//             });
//             await Promise.all(productInserts);

//             await client.query('COMMIT');
//             res.status(201).json({ message: "Hierarchy created successfully." });
//         } catch (error) {
//             await client.query('ROLLBACK');
//             console.error("Error creating hierarchy:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         } finally {
//             client.release();
//         }
//     } catch (error) {
//         console.error("Database connection error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };






// const fetchHierarchy = async (req, res) => {
//     const username = req.username;

//     try {
//         // Fetch user role
//         const roleResult = await pool.query(getRole, [username]);
//         const role = roleResult.rows[0]?.role;

//         if (role !== 'manufacturer') {
//             return res.status(403).json({ error: "Forbidden: Only manufacturers can fetch hierarchies." });
//         }

//         // Fetch all packs for the manufacturer
//         const packsResult = await pool.query(getAllPacks);
//         const packs = packsResult.rows;

//         // Prepare hierarchy data asynchronously
//         const hierarchyPromises = packs.map(async (pack) => {
//             try {
//                 // Initialize pack data
//                 const packData = {
//                     id: pack.id,
//                     name: pack.name,
//                     node_type: 'pack',
//                     children: []
//                 };

//                 // Fetch boxes for the current pack
//                 const boxesResult = await pool.query(getBoxNameByPackId, [pack.id]);
//                 const boxes = boxesResult.rows;

//                 // Prepare box data asynchronously
//                 const boxPromises = boxes.map(async (box) => {
//                     try {
//                         // Initialize box data
//                         const boxData = {
//                             id: box.id,
//                             name: box.name,
//                             node_type: 'box',
//                             children: []
//                         };

//                         // Fetch products for the current box
//                         const productsResult = await pool.query(getProductNameByBoxId, [box.id]);
//                         const products = productsResult.rows;

//                         // Map products to children of the box
//                         products.forEach(product => {
//                             boxData.children.push({
//                                 id: product.id,
//                                 name: product.name,
//                                 node_type: 'product'
//                             });
//                         });

//                         return boxData;
//                     } catch (error) {
//                         console.error(`Error fetching products for box ${box.id}:`, error);
//                         throw error; // Propagate the error to the caller
//                     }
//                 });

//                 // Wait for all box data to be prepared and assign to pack's children
//                 packData.children = await Promise.all(boxPromises);

//                 return packData;
//             } catch (error) {
//                 console.error(`Error fetching hierarchy for pack ${pack.id}:`, error);
//                 throw error; // Propagate the error to the caller
//             }
//         });

//         // Wait for all hierarchy data to be prepared and send as response
//         const hierarchy = await Promise.all(hierarchyPromises);
//         res.status(200).json({ hierarchy });
//     } catch (err) {
//         console.error("Error fetching hierarchy:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
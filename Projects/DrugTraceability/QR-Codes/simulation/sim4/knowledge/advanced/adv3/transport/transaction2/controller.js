const Web3 = require('web3');
const dotenv = require('dotenv');
dotenv.config();

const pool = require('../../database/database');

const { getAccount, delivery, getUsername, getRole, getTruck,
    getTransactionData, updateTransactionData, updateDeliveryStatus,
    updatePack, updateBox1, updateBox2, getPrimId, getSecId, getRetId
} = require('./queries');
const { sendNotification } = require('./email');

const web3 = new Web3(process.env.WEB3_PROVIDER);
const contractABI = require('../../GoodsTransactionABI.json');
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);


const startTransaction = async (req, res, next) => {
    try {
        const { toUser, goodsId } = req.body;
        let from = null;
        let private_key = null;
        const username = req.username;
        let to_user = null;
        let toResult = null;

        try {
            toResult = await pool.query(getAccount, [toUser]);
            // console.log(`query results: ${JSON.stringify(toResult.rows)}`);
        } catch (error) {
            console.error('Error fetching account:', error);
            return res.status(500).send('An error occurred during the transaction.');
        }
        // console.log(`query results: ${JSON.stringify(toResult.rows)}`);
        const to = toResult.rows[0].account;

        const data = "Bentos Capsules";

        // Attempt to retrieve the account
        const result = await pool.query(getAccount, [username]);
        if (result.rows.length > 0) {
            from = result.rows[0].account;
            private_key = result.rows[0].private_key;
        } else {
            return res.status(404).send('Blockchain account not found.');
        }

        console.log(`From: ${from}\nTo: ${to}\nGoods ID: ${goodsId}\nUsername: ${username}\nData: ${data}\n`);

        // Retrieve to_username
        const toUsername = await pool.query(getUsername, [to]);
        if (toUsername.rows.length > 0) {
            to_user = toUsername.rows[0].username;
            to_email = toUsername.rows[0].email;
            console.log('To email:', to_email);
        } else {
            return res.status(404).send('Username not found.');
        }

        console.log(`To User: ${to_user}\nTo Email: ${to_email}\n`);

        // Create a pending transaction
        const trancresult = await pool.query(
            'INSERT INTO pending_transactions (from_user, to_user, data, goods_id) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, to_user, data, goodsId]
        );

        const transactionId = trancresult.rows[0].id;

        try {
            console.log(`private_key: ${private_key}`);
            sendNotification(to_email, to, from, goodsId, private_key, username, data, to_user, transactionId);
        } catch (error) {
            console.error('Error creating pending transaction:', error);
            return res.status(500).send('An error occurred during the transaction.');
        }
        res.status(200).send('Transaction initiated. Please check your email for verification.');
        
    } catch (error) {
        console.error('Transaction error:', error.message);
        if (error.message.includes('insufficient funds')) {
            return res.status(400).send('Insufficient funds for the transaction.');
        }
        res.status(500).send('An error occurred during the transaction.');
    }
};

const approveTransaction = async (req, res, next) => {
    console.log('Approving transaction...');
    let { from, to, goodsId, private_key, username, data, to_user, transactionId} = req.body;
    username = decodeURIComponent(username);
    data = decodeURIComponent(data);

    console.log(`
        From: ${from}\n
        To: ${to}\n
        Goods ID: ${goodsId}\n
        Key: {${private_key}}
        Username: ${username}\n
        Data: ${data}\n
        To User: ${to_user}\n
        TransactionId: ${transactionId}\n
        `
    );

    // Dynamic Gas Price
    const gasPrice = await web3.eth.getGasPrice();

    // Prepare transaction
    const tx = contract.methods.makeTransaction(to, goodsId, data);

    // Estimate Gas Limit with a buffer
    const estimatedGas = await tx.estimateGas({ from });
    const gasLimit = Math.floor(estimatedGas * 1.2); // Adding 20% buffer

    const txData = tx.encodeABI();

    // Sign transaction
    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: contractAddress,
            data: txData,
            gas: gasLimit,
            gasPrice: gasPrice,
        },
        private_key
    );

    // Send transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Record the delivery
    await pool.query(delivery, [data, username, to_user, goodsId]);

    // Parse goodsId and update QR code tables
    const entityUpdates = await parseGoodsId(goodsId);
    // console.log(`Entity updates:${entityUpdates}\n`);

    for (const entityUpdate of entityUpdates) {
        const { table, column, id } = entityUpdate;

        // Check for existing transaction data
        const transactionDataResult = await pool.query(getTransactionData(table, column), [id]);

        let newTransactionData = [goodsId];

        if (transactionDataResult.rows.length > 0 && transactionDataResult.rows[0].transaction_data) {
            // Merge with existing data if present
            const existingData = JSON.parse(transactionDataResult.rows[0].transaction_data);
            newTransactionData = [...new Set([...existingData, goodsId])];
        }

        // Update the QR code table with the new transaction data
        await pool.query(updateTransactionData(table, column), [JSON.stringify(newTransactionData), id]);

        // Update related entities
        await updateRelatedEntities(table, column, id, newTransactionData);
    }

    // console.log('Working 1...');
    const entityUpdates2 = parseGoodsId2(goodsId);
    // console.log(`Entity updates2:${entityUpdates2}\n`);

    // console.log('Working 2...');
    // let column = 'delivery_status';
    for (const [entity, ids] of Object.entries(entityUpdates2)) {
        if (ids.length > 0) {
            for (const id of ids) {
                try {
                    await pool.query(updateDeliveryStatus(entity), [id]);
                } catch (err) {
                    console.error(`Error querying ${entity} with ID ${id}:`, err.stack);
                }
            }
        }
    }

    // Update entity tables with appropriate stakeholder IDs
    try {
        console.log('Working 3...');
        await updateEntity(username, to_user, entityUpdates);
    } catch (err) {
        console.error('Error updating entities:', err.stack);
    }

    // Update status of pending transaction
    try {
        const result = await pool.query('UPDATE pending_transactions SET status = $1 WHERE id = $2', ['approved', transactionId]);
        console.log('Pending transaction status updated:', result.rowCount);
    } catch (err) {
        console.error('Error updating pending transaction status:', err.stack);
    }

    res.send(receipt);
};






const parseGoodsId = async (goodsId) => {
    const entityUpdates = [];
    const regex = /(\d+)(_{1,3})/g;
    let match;

    while ((match = regex.exec(goodsId)) !== null) {
        const id = parseInt(match[1]);
        const underscores = match[2].length;

        if (underscores === 1) {
            entityUpdates.push({ table: 'qr_code_packs', column: 'pack_id', id });

            // Add related boxes and products
            const boxesResult = await pool.query('SELECT id FROM boxes WHERE pack_id = $1', [id]);
            boxesResult.rows.forEach(box => {
                entityUpdates.push({ table: 'qr_code_boxes', column: 'box_id', id: box.id });
            });

            const productsResult = await pool.query('SELECT id FROM products WHERE pack_id = $1', [id]);
            productsResult.rows.forEach(product => {
                entityUpdates.push({ table: 'qr_code_products', column: 'product_id', id: product.id });
            });

        } else if (underscores === 2) {
            entityUpdates.push({ table: 'qr_code_boxes', column: 'box_id', id });

            // Add related products
            const productsResult = await pool.query('SELECT id FROM products WHERE box_id = $1', [id]);
            productsResult.rows.forEach(product => {
                entityUpdates.push({ table: 'qr_code_products', column: 'product_id', id: product.id });
            });

        } else if (underscores === 3) {
            entityUpdates.push({ table: 'qr_code_products', column: 'product_id', id });
        }
    }

    return entityUpdates;
};

const parseGoodsId2 = (goodsId) => {
    const categorizedIds = {
        packs: [],
        boxes: [],
        products: []
    };
    const regex = /(\d+)(_{1,3})/g;
    let match;

    while ((match = regex.exec(goodsId)) !== null) {
        const id = parseInt(match[1]);
        const underscores = match[2].length;

        if (underscores === 1) {
            categorizedIds.packs.push(id);
        } else if (underscores === 2) {
            categorizedIds.boxes.push(id);
        } else if (underscores === 3) {
            categorizedIds.products.push(id);
        }
    }

    return categorizedIds;
};

const updateRelatedEntities = async (table, column, id, newTransactionData) => {
    if (table === 'qr_code_packs') {
        // Update boxes and products related to the pack
        const boxesResult = await pool.query('SELECT id FROM boxes WHERE pack_id = $1', [id]);
        for (const box of boxesResult.rows) {
            await pool.query(updateTransactionData('qr_code_boxes', 'box_id'), [JSON.stringify(newTransactionData), box.id]);
        }

        const productsResult = await pool.query('SELECT id FROM products WHERE pack_id = $1', [id]);
        for (const product of productsResult.rows) {
            await pool.query(updateTransactionData('qr_code_products', 'product_id'), [JSON.stringify(newTransactionData), product.id]);
        }
    } else if (table === 'qr_code_boxes') {
        // Update products related to the box
        const productsResult = await pool.query('SELECT id FROM products WHERE box_id = $1', [id]);
        for (const product of productsResult.rows) {
            await pool.query(updateTransactionData('qr_code_products', 'product_id'), [JSON.stringify(newTransactionData), product.id]);
        }
    }
};


const updateEntity = async (from_username, to_username, entityUpdates2) => {
    const role1 = await pool.query(getRole, [from_username]);
    const role2 = await pool.query(getRole, [to_username]);

    for (const entityUpdate of entityUpdates2) {
        const { table, column, id } = entityUpdate;

        if (role1.rows[0].role === 'manufacturer' && role2.rows[0].role === 'primary_distributor') {
            const shippingTruckResult = await pool.query(getTruck, [to_username]);
            const shippingTruck = shippingTruckResult.rows[0].shipping_truck_number;
            
            const toIDResult = await pool.query(getPrimId, [to_username]);
            const toID = toIDResult.rows[0].id;

            // Update pack entity
            try {
                await pool.query(updatePack, [toID, shippingTruck, id]);
            } catch (err) {
                console.error(`Error updating pack entity:`, err.stack);
            }    
            

        } else if (role1.rows[0].role === 'primary_distributor' && role2.rows[0].role === 'secondary_distributor') {
            const toIDResult = await pool.query(getSecId, [to_username]);
            const toID = toIDResult.rows[0].id;
            await pool.query(updateBox1, [toID, id]);

        } else if (role1.rows[0].role === 'secondary_distributor' && role2.rows[0].role === 'retailer') {
            // Update box entity
            const toIDResult = await pool.query(getRetId, [to_username]);
            const toID = toIDResult.rows[0].id;
            await pool.query(updateBox2, [toID, id]);
        }
    }
};

const transactHist = async (req, res, next) => {
    const { goodsId }= req.body;
    console.log('Goods ID:', goodsId);
    const history = await contract.methods.getGoodsHistory(goodsId).call();
    res.send(history);
};

module.exports = {
    startTransaction,
    transactHist,
    approveTransaction,
}



/*
const Web3 = require('web3');
const dotenv = require('dotenv');
dotenv.config();

const pool = require('../../database/database');

const {
    getAccount,
    delivery,
    getUsername,
    getRole,
    getTruck,
    getTransactionData,
    updateTransactionData,
    updateDeliveryStatus,
    updatePack,
    updateBox1,
    updateBox2,
    getPrimId,
    getSecId,
    getRetId
} = require('./queries');

const web3 = new Web3(process.env.WEB3_PROVIDER);
const contractABI = require('../../GoodsTransactionABI.json');
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const startTransaction = async (req, res) => {
    try {
        const { to, goodsId } = req.body;
        const data = "Bentos Capsules";
        const username = req.username;

        const [accountResult, toUserResult] = await Promise.all([
            pool.query(getAccount, [username]),
            pool.query(getUsername, [to])
        ]);

        if (accountResult.rows.length === 0) {
            return res.status(404).send('Blockchain account not found.');
        }
        if (toUserResult.rows.length === 0) {
            return res.status(404).send('Username not found.');
        }

        const from = accountResult.rows[0].account;
        const private_key = accountResult.rows[0].private_key;
        const to_user = toUserResult.rows[0].username;

        const gasPrice = await web3.eth.getGasPrice();
        const tx = contract.methods.makeTransaction(to, goodsId, data);
        const estimatedGas = await tx.estimateGas({ from });
        const gasLimit = Math.floor(estimatedGas * 1.2);
        const txData = tx.encodeABI();

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data: txData,
                gas: gasLimit,
                gasPrice
            },
            private_key
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        await pool.query(delivery, [data, username, to_user, goodsId]);

        const entityUpdates = await parseGoodsId(goodsId);
        await updateEntities(entityUpdates, goodsId);
        await updateDeliveryStatusForEntities(goodsId);
        await updateEntityDetails(username, to_user, entityUpdates);

        res.send(receipt);
    } catch (error) {
        console.error('Transaction error:', error.message);
        if (error.message.includes('insufficient funds')) {
            return res.status(400).send('Insufficient funds for the transaction.');
        }
        res.status(500).send('An error occurred during the transaction.');
    }
};

const parseGoodsId = async (goodsId) => {
    const entityUpdates = [];
    const regex = /(\d+)(_{1,3})/g;
    let match;

    while ((match = regex.exec(goodsId)) !== null) {
        const id = parseInt(match[1]);
        const underscores = match[2].length;

        if (underscores === 1) {
            entityUpdates.push({ table: 'qr_code_packs', column: 'pack_id', id });

            const [boxesResult, productsResult] = await Promise.all([
                pool.query('SELECT id FROM boxes WHERE pack_id = $1', [id]),
                pool.query('SELECT id FROM products WHERE pack_id = $1', [id])
            ]);

            boxesResult.rows.forEach(box => {
                entityUpdates.push({ table: 'qr_code_boxes', column: 'box_id', id: box.id });
            });

            productsResult.rows.forEach(product => {
                entityUpdates.push({ table: 'qr_code_products', column: 'product_id', id: product.id });
            });
        } else if (underscores === 2) {
            entityUpdates.push({ table: 'qr_code_boxes', column: 'box_id', id });

            const productsResult = await pool.query('SELECT id FROM products WHERE box_id = $1', [id]);
            productsResult.rows.forEach(product => {
                entityUpdates.push({ table: 'qr_code_products', column: 'product_id', id: product.id });
            });
        } else if (underscores === 3) {
            entityUpdates.push({ table: 'qr_code_products', column: 'product_id', id });
        }
    }

    return entityUpdates;
};

const updateEntities = async (entityUpdates, goodsId) => {
    const transactionPromises = entityUpdates.map(async ({ table, column, id }) => {
        const transactionDataResult = await pool.query(getTransactionData(table, column), [id]);
        let newTransactionData = [goodsId];

        if (transactionDataResult.rows.length > 0 && transactionDataResult.rows[0].transaction_data) {
            const existingData = JSON.parse(transactionDataResult.rows[0].transaction_data);
            newTransactionData = [...new Set([...existingData, goodsId])];
        }

        await pool.query(updateTransactionData(table, column), [JSON.stringify(newTransactionData), id]);
        await updateRelatedEntities(table, column, id, newTransactionData);
    });

    await Promise.all(transactionPromises);
};

const updateRelatedEntities = async (table, column, id, newTransactionData) => {
    if (table === 'qr_code_packs') {
        const [boxesResult, productsResult] = await Promise.all([
            pool.query('SELECT id FROM boxes WHERE pack_id = $1', [id]),
            pool.query('SELECT id FROM products WHERE pack_id = $1', [id])
        ]);

        const updatePromises = [
            ...boxesResult.rows.map(box => pool.query(updateTransactionData('qr_code_boxes', 'box_id'), [JSON.stringify(newTransactionData), box.id])),
            ...productsResult.rows.map(product => pool.query(updateTransactionData('qr_code_products', 'product_id'), [JSON.stringify(newTransactionData), product.id]))
        ];

        await Promise.all(updatePromises);
    } else if (table === 'qr_code_boxes') {
        const productsResult = await pool.query('SELECT id FROM products WHERE box_id = $1', [id]);
        const updatePromises = productsResult.rows.map(product => pool.query(updateTransactionData('qr_code_products', 'product_id'), [JSON.stringify(newTransactionData), product.id]));
        await Promise.all(updatePromises);
    }
};

const updateDeliveryStatusForEntities = async (goodsId) => {
    const categorizedIds = parseGoodsId2(goodsId);

    const updatePromises = [
        ...categorizedIds.packs.map(id => pool.query(updateDeliveryStatus('qr_code_packs'), [id])),
        ...categorizedIds.boxes.map(id => pool.query(updateDeliveryStatus('qr_code_boxes'), [id])),
        ...categorizedIds.products.map(id => pool.query(updateDeliveryStatus('qr_code_products'), [id]))
    ];

    await Promise.all(updatePromises);
};

const parseGoodsId2 = (goodsId) => {
    const categorizedIds = {
        packs: [],
        boxes: [],
        products: []
    };
    const regex = /(\d+)(_{1,3})/g;
    let match;

    while ((match = regex.exec(goodsId)) !== null) {
        const id = parseInt(match[1]);
        const underscores = match[2].length;

        if (underscores === 1) {
            categorizedIds.packs.push(id);
        } else if (underscores === 2) {
            categorizedIds.boxes.push(id);
        } else if (underscores === 3) {
            categorizedIds.products.push(id);
        }
    }

    return categorizedIds;
};

const updateEntityDetails = async (from_username, to_username, entityUpdates) => {
    const [role1Result, role2Result] = await Promise.all([
        pool.query(getRole, [from_username]),
        pool.query(getRole, [to_username])
    ]);

    const role1 = role1Result.rows[0].role;
    const role2 = role2Result.rows[0].role;

    for (const { table, column, id } of entityUpdates) {
        if (role1 === 'manufacturer' && role2 === 'primary_distributor') {
            const [shippingTruckResult, toIDResult] = await Promise.all([
                pool.query(getTruck, [to_username]),
                pool.query(getPrimId, [to_username])
            ]);

            const shippingTruck = shippingTruckResult.rows[0].shipping_truck_number;
            const toID = toIDResult.rows[0].id;

            await pool.query(updatePack, [toID, shippingTruck, id]);
        } else if (role1 === 'primary_distributor' && role2 === 'secondary_distributor') {
            const toIDResult = await pool.query(getSecId, [to_username]);
            const toID = toIDResult.rows[0].id;
            await pool.query(updateBox1, [toID, id]);
        } else if (role1 === 'secondary_distributor' && role2 === 'retailer') {
            const toIDResult = await pool.query(getRetId, [to_username]);
            const toID = toIDResult.rows[0].id;
            await pool.query(updateBox2, [toID, id]);
        }
    }
};

const transactHist = async (req, res) => {
    const { goodsId } = req.body;
    const history = await contract.methods.getGoodsHistory(goodsId).call();
    res.send(history);
};

module.exports = {
    startTransaction,
    transactHist,
};

*/





/* const startTransaction = async (req, res, next) => {
//     try {
//         const { to, goodsId } = req.body;
//         let from = null;
//         const data = "Bentos Capsules";
//         const username = req.username;
//         let to_user = null;

//         // Attempt to retrieve the account
//         const result = await pool.query(getAccount, [username]);
//         if (result.rows.length > 0) {
//             from = result.rows[0].account;
//         } else {
//             return res.status(404).send('Blockchain account not found.');
//         }

//         // Retrieve to_username
//         const toUsername = await pool.query(getUsername, [to]);
//         if (toUsername.rows.length > 0) {
//             to_user = toUsername.rows[0].username;
//         } else {
//             return res.status(404).send('Username not found.');
//         }

//         // Dynamic Gas Price
//         const gasPrice = await web3.eth.getGasPrice();

//         // Prepare transaction
//         const tx = contract.methods.makeTransaction(to, goodsId, data);

//         // // Estimate Gas Limit with a buffer
//         const estimatedGas = await tx.estimateGas({ from });
//         const gasLimit = Math.floor(estimatedGas * 1.2); // Adding 20% buffer

//         // // Check balance of the sender
//         // const balance = await web3.eth.getBalance(from);
//         // const totalCost = web3.utils.toBN(gasPrice).mul(web3.utils.toBN(gasLimit)).toString();

//         // Ensure the account balance is sufficient to cover the total cost (gas)
//         // if (web3.utils.toBN(balance).lt(web3.utils.toBN(totalCost))) {
//         //     const balanceInEther = web3.utils.fromWei(balance, 'ether');
//         //     return res.status(400).send(`Insufficient funds for the transaction. Your balance is ${balanceInEther} ETH.`);
//         // }

//         const txData = tx.encodeABI();

//         // Sign transaction
//         const signedTx = await web3.eth.accounts.signTransaction(
//             {
//                 to: contractAddress,
//                 data: txData,
//                 gas: gasLimit,
//                 gasPrice: gasPrice,
//             },
//             '0xf639e1f00b7f60839f0c6e3f91fa6281347bd2e40e80316cd3904670d5a22ae6'
//         );

//         // Send transaction
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//         // Record the delivery
//         await pool.query(delivery, [data, username, to_user, goodsId]);

//         // Parse goodsId and update QR code tables
//         const entityUpdates = parseGoodsId(goodsId);

//         for (const entityUpdate of entityUpdates) {
//             const { table, column, id } = entityUpdate;

//             // Check for existing transaction data
//             const transactionDataResult = await pool.query(getTransactionData(table, column), [id]);

//             let newTransactionData = [goodsId];

//             if (transactionDataResult.rows.length > 0 && transactionDataResult.rows[0].transaction_data) {
//                 // Merge with existing data if present
//                 const existingData = JSON.parse(transactionDataResult.rows[0].transaction_data);
//                 newTransactionData = [...new Set([...existingData, goodsId])];
//             }

//             // Update the QR code table with the new transaction data
//             await pool.query(updateTransactionData(table, column), [JSON.stringify(newTransactionData), id]);
//         }

//         res.send(receipt);
//     } catch (error) {
//         console.error('Transaction error:', error.message);
//         if (error.message.includes('insufficient funds')) {
//             return res.status(400).send('Insufficient funds for the transaction.');
//         }
//         res.status(500).send('An error occurred during the transaction.');
//     }
// };

// const transactHist = async (req, res, next) => {
//     const { goodsId }= req.body;
//     console.log('Goods ID:', goodsId);
//     const history = await contract.methods.getGoodsHistory(goodsId).call();
//     res.send(history);
// };


// const parseGoodsId = (goodsId) => {
//     const entityUpdates = [];
//     const regex = /(\d+)(_{1,3})/g;
//     let match;

//     while ((match = regex.exec(goodsId)) !== null) {
//         const id = parseInt(match[1]);
//         const underscores = match[2].length;

//         if (underscores === 1) {
//             entityUpdates.push({ table: 'qr_code_packs', column: 'pack_id', id });
//         } else if (underscores === 2) {
//             entityUpdates.push({ table: 'qr_code_boxes', column: 'box_id', id });
//         } else if (underscores === 3) {
//             entityUpdates.push({ table: 'qr_code_products', column: 'product_id', id });
//         }
//     }

//     return entityUpdates;
// };

// const updateEntity = async (from_username, to_username, entityUpdates) => {
//     const result1 = await pool.query(getUsername, [from_username]);
//     const result2 = await pool.query(getUsername, [to_username]);
//     if (result1.rows.length > 0 && result2.rows.length > 0) {
//         const from = result1.rows[0].username;
//         const to = result2.rows[0].username;
//     } else {
//         return null;
//     }

//     const role1 = await pool.query(getRole, [from]);
//     const role2 = await pool.query(getRole, [to]);

//     if (role1 === 'manufacturer' && role2 === 'primary_distributor') {
//         const shippingTruckResult = await pool.query(getTruck, [to]);
//         const shippingTruck = shippingTruckResult.rows[0].shipping_truck_number;
//         const toIDResult = await pool.query(getId, [to]);
//         const toID = toIDResult.rows[0].id;

//         // update pack entity
//         const pack = await pool.query(updatePack, [toID, shippingTruck, id]);
//     } else if (role1 === 'primary_distributor' && role2 === 'secondary_distributor') {
        
//     } else if (role1 === 'secondary_distributor' && role2 === 'retailer') {}
// };

// module.exports = {
//     startTransaction,
//     transactHist,
// }*/





/* const startTransaction = async (req, res, next) => {
//     try {
//         const { to, goodsId } = req.body;
//         let from = null;
//         const data = "Bentos Capsules"
//         const username = req.username;

//         // Attempt to retrieve the account
//         const result = await pool.query(getAccount, [username]);
//         if (result.rows.length > 0) {
//             from = result.rows[0].account;
//         } else {
//             return res.status(404).send('Blockchain account not found.');
//         }

//         // Check balance of the sender
//         const balance = await web3.eth.getBalance(from);
//         console.log('Balance from_username:', balance);
//         const balanceInEther = web3.utils.fromWei(balance, 'ether');
//         console.log('Balance in ETH:', balanceInEther);

        

//         // Prepare transaction
//         const tx = contract.methods.makeTransaction(to, goodsId, data);
//         const gas = await tx.estimateGas({ from });
//         const gasPrice = await web3.eth.getGasPrice();
//         // const gasCost = gas * gasPrice;

//         // Use BigNumber for accurate multiplication or convert to string if necessary
//         const gasCost = web3.utils.toBN(gas).mul(web3.utils.toBN(gasPrice)).toString();

//         // // Check if balance covers the gas cost
//         // if (balance < gasCost) {
//         //     console.log(`Insufficient funds for the transaction. Your balance is ${balanceInEther} ETH.`);
//         //     return res.status(400).send(`Insufficient funds for the transaction. Your balance is ${balanceInEther} ETH.`);
//         // } else {
//         //     console.log(`Transaction gas cost: ${gasCost} wei`);
//         //     console.log(`Transaction gas cost: ${web3.utils.fromWei(gasCost, 'ether')} ETH`);
//         //     console.log(`Transaction gas price: ${gasPrice} wei`);
//         //     console.log(`Transaction gas price: ${web3.utils.fromWei(gasPrice, 'ether')} ETH`);
//         //     console.log(`Balance (${from}): ${web3.utils.fromWei(balance, 'ether')} ETH (wei: ${balance}) > gas Cost (${web3.utils.fromWei(gasCost, 'ether')} ETH)`);
//         // }

//         // Check if balance covers the gas cost
//         if (web3.utils.toBN(balance).lt(web3.utils.toBN(gasCost))) {
//             const balanceInEther = web3.utils.fromWei(balance, 'ether');
//             console.log(`Insufficient funds for the transaction. Your balance is ${balanceInEther} ETH.`);
//             return res.status(400).send(`Insufficient funds for the transaction. Your balance is ${balanceInEther} ETH.`);
//         } else {
//             console.log(`Transaction gas cost: ${gasCost} wei`);
//             console.log(`Transaction gas cost: ${web3.utils.fromWei(gasCost, 'ether')} ETH`);
//             console.log(`Transaction gas price: ${gasPrice} wei`);
//             console.log(`Transaction gas price: ${web3.utils.fromWei(gasPrice, 'ether')} ETH`);
//             console.log(`Balance (${from}): ${web3.utils.fromWei(balance, 'ether')} ETH (wei: ${balance}) > gas Cost (${web3.utils.fromWei(gasCost, 'ether')} ETH)`);
//         }

//         const txData = tx.encodeABI();

//         // Sign transaction
//         const signedTx = await web3.eth.accounts.signTransaction(
//             {
//                 to: contractAddress,
//                 data: txData,
//                 gas,
//             },
//             process.env.PRIVATE_KEY
//         );

//         // Send transaction
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         console.log('Transaction receipt:', receipt);
//         console.log('Transaction hash:', receipt.transactionHash);

//         // Record the delivery
//         const deliveryResult = await pool.query(delivery, [data, from, to, goodsId]);
//         res.send(receipt);
//     } catch (error) {
//         console.error('Transaction error:', error.message);
//         // Handle specific errors based on their type or message
//         if (error.message.includes('insufficient funds')) {
//             return res.status(400).send('Insufficient funds for the transaction.');
//         }
//         // Generic error response
//         res.status(500).send('An error occurred during the transaction.');
//     }
// };

// const startTransaction = async (req, res, next) => {
//     try {
//         const { to, goodsId } = req.body;
//         let from = null;
//         const data = "Bentos Capsules";
//         const username = req.username;
//         let to_user = null

//         // Attempt to retrieve the account
//         const result = await pool.query(getAccount, [username]);
//         if (result.rows.length > 0) {
//             from = result.rows[0].account;
//         } else {
//             return res.status(404).send('Blockchain account not found.');
//         }

//         // retrieve to_username
//         const toUsername = await pool.query(getUsername, [to]);
//         if (toUsername.rows.length > 0) {
//             to_user = toUsername.rows[0].username;
//         } else {
//             return res.status(404).send('Username not found.');
//         }

//         // Dynamic Gas Price
//         const gasPrice = await web3.eth.getGasPrice();

//         // Prepare transaction
//         const tx = contract.methods.makeTransaction(to, goodsId, data);
        
//         // Estimate Gas Limit with a buffer
//         const estimatedGas = await tx.estimateGas({ from });
//         const gasLimit = Math.floor(estimatedGas * 1.2); // Adding 20% buffer

//         // Assuming `value` is the amount of Ether (in wei) you want to send along with the transaction.
//         // If you're not sending Ether along with the transaction, ensure `value` is set to '0' or an appropriate value.
//         const value = web3.utils.toWei('0', 'ether'); // Adjust this based on the transaction requirements.

//         // Check balance of the sender
//         const balance = await web3.eth.getBalance(from);
//         // const totalCost = web3.utils.toBN(gasPrice).mul(web3.utils.toBN(gasLimit));
//         const totalCost = web3.utils.toBN(gasPrice).mul(web3.utils.toBN(gasLimit)).add(web3.utils.toBN(value));

//         // Ensure the account balance is sufficient to cover the total cost (gas + value).
//         if (web3.utils.toBN(balance).lt(totalCost)) {
//             const balanceInEther = web3.utils.fromWei(balance, 'ether');
//             // console.log(`Insufficient funds. Balance: ${balanceInEther} ETH, Required: ${web3.utils.fromWei(totalCost, 'ether')} ETH`);
//             return res.status(400).send(`Insufficient funds for the transaction. Your balance is ${balanceInEther} ETH, but the transaction requires ${web3.utils.fromWei(totalCost, 'ether')} ETH.`);
//         }

//         // Improved Logging
//         // console.log(`Transaction gas cost: ${totalCost.toString()} wei`);
//         // console.log(`Transaction gas cost: ${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH`);
//         // console.log(`Transaction gas price: ${gasPrice} wei`);
//         // console.log(`Transaction gas price: ${web3.utils.fromWei(gasPrice, 'ether')} ETH`);
//         // console.log(`Balance (${from}): ${web3.utils.fromWei(balance, 'ether')} ETH (wei: ${balance}) > gas Cost (${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH)`);

//         const txData = tx.encodeABI();

//         // Sign transaction
//         const signedTx = await web3.eth.accounts.signTransaction(
//             {
//                 to: contractAddress,
//                 data: txData,
//                 gas: gasLimit,
//                 gasPrice: gasPrice,
//                 value: value,
//             },
//             '0xd45c950ff80717df5cad98d51ba0a0de8335323c86785247b93d8577b59b543b'
//             // process.env.PRIVATE_KEY
//         );

//         // Send transaction
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         console.log('Transaction receipt:', receipt);
//         console.log('Transaction hash:', receipt.transactionHash);

//         // Record the delivery
//         const deliveryRes = await pool.query(delivery, [data, username, to_user, goodsId]);
//         res.send(receipt);
//     } catch (error) {
//         console.error('Transaction error:', error.message);
//         if (error.message.includes('insufficient funds')) {
//             return res.status(400).send('Insufficient funds for the transaction.');
//         }
//         res.status(500).send('An error occurred during the transaction.');
//     }
// };*/

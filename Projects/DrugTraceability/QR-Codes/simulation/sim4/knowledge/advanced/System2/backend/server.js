const express = require('express');
const Web3 = require('web3');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

// Load contract ABI and address
const contractABI = require('../GoodsTransactionABI.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Routes
app.post('/transaction', async (req, res) => {
    const { from, to, goodsId } = req.body;
    const data = "Some hardcoded data";  // Hardcoded data
    try {
        const tx = contract.methods.makeTransaction(to, goodsId, data);
        const gas = await tx.estimateGas({ from });
        const gasPrice = await web3.eth.getGasPrice();

        const txData = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(from);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data: txData,
                gas,
                gasPrice,
                nonce,
                from,
                chainId: await web3.eth.net.getId(),
            },
            process.env.PRIVATE_KEY
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.send(receipt);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/history/:goodsId', async (req, res) => {
    const { goodsId } = req.params;
    try {
        const history = await contract.methods.getGoodsHistory(goodsId).call();
        res.status(200).send(history);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const Web3 = require('web3');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// const web3 = new Web3(process.env.WEB3_PROVIDER);
// const contractABI = require('../GoodsTransactionABI.json');
// const contractAddress = process.env.CONTRACT_ADDRESS;
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// app.post('/transaction', async (req, res) => {
//     let data = "Some data"
//     const { from, to, goodsId } = req.body;
//     const tx = contract.methods.makeTransaction(to, goodsId, data);
//     const gas = await tx.estimateGas({ from });
//     const txData = tx.encodeABI();

//     const signedTx = await web3.eth.accounts.signTransaction(
//         {
//             to: contractAddress,
//             data: txData,
//             gas,
//         },
//         process.env.PRIVATE_KEY
//     );

//     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//     res.send(receipt);
// });

// app.get('/history/:goodsId', async (req, res) => {
//     const goodsId = req.params.goodsId;
//     const history = await contract.methods.getGoodsHistory(goodsId).call();
//     res.send(history);
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

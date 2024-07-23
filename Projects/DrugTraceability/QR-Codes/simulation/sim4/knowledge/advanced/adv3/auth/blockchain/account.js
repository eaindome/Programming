const Web3 = require('web3');
const dotenv = require('dotenv');
dotenv.config();

const web3 = new Web3(process.env.WEB3_PROVIDER);

const getGanacheAccounts = async (req, res, next) => {
    try {
        // Get the list of accounts
        const accounts = await web3.eth.getAccounts();

        // Get the private keys from Ganache (this assumes you have access to the private keys)
        const privateKeys = [
            '0xd45c950ff80717df5cad98d51ba0a0de8335323c86785247b93d8577b59b543b',
            '0xf639e1f00b7f60839f0c6e3f91fa6281347bd2e40e80316cd3904670d5a22ae6',
            '0xf308d05aa22635264ca19dcbb0b527e544a33f2f1ce3ad94e844dd846f50650d',
            '0x29a487a65a6a11685a7a9daf6c34ad45a134d6d4e7bbb5768410a57f78efb71b',
            '0x1d80681a2cdb636b6746e2d87365a8126799bf07f488967309ec098620feacff',
            '0x1a0b35b86ee140f4f3611db5deffb1d56dcd2849ede1efab454e90f3d4345dbf',
            '0x3fa32fe462f93791a52889d7d0c873d97cac3ec55305a921881b22e70cf32c64',
            '0xf0becbde3cae16532f162e5f8601aa1557266627d14391066d6189080cb31579',
            '0x1a88df59b64e26fbabb9b9fe708d5afeb40800495717bcd8a47abab4ec3bfdf1',
            '0x894574c7aaece282b723a1706da2768c2a150ec77ecf64d0e3183cd945bed4c8'
            // Add all private keys here
        ];

        // Map accounts with their private keys
        const accountDetails = accounts.map((account, index) => ({
            address: account,
            privateKey: privateKeys[index],
        }));

        res.json(accountDetails);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getGanacheAccounts,
};

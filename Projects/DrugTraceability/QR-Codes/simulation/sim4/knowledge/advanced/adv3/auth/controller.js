const pool = require('../database/database');
const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const Web3 = require('web3');
const fs = require('fs');

const { addUser, confirmUser, updateUser } = require('./queries');
const { authSchema, loginSchema, blockchainSchema } = require('./validation/schema');
const { signAccessToken, signRefreshToken, 
        verifyRefreshToken } = require('./token/jwt_helper');
const client = require('../cache/redis');
const { getAccount } = require('../transport/transaction2/queries');

const web3 = new Web3(process.env.WEB3_PROVIDER);
const contractABI = JSON.parse(fs.readFileSync('./scripts/UserContractABI.json', 'utf8'));
const contractAddress = fs.readFileSync('./auth/UserContractAddress.txt', 'utf8').trim();
const userContract = new web3.eth.Contract(contractABI, contractAddress);

const ganacheAccounts = [
  {
    address: "0xF1033aFF3bd13c945FfD33ef14b1Af4ac09Ed4bC",
    privateKey: "0xd45c950ff80717df5cad98d51ba0a0de8335323c86785247b93d8577b59b543b"
  },
  {
    address: "0x6968706e55B37469d50D32814CDBda3E7efb6B0f",
    privateKey: "0xf639e1f00b7f60839f0c6e3f91fa6281347bd2e40e80316cd3904670d5a22ae6"
  },
  {
    address: "0xB10E62C70fa189FB1E2569Ab33Fd955Ad7691C02",
    privateKey: "0xf308d05aa22635264ca19dcbb0b527e544a33f2f1ce3ad94e844dd846f50650d"
  },
  {
    address: "0xF9789259C430E464c84Ae2D57803700FA1093d58",
    privateKey: "0x29a487a65a6a11685a7a9daf6c34ad45a134d6d4e7bbb5768410a57f78efb71b"
  },
  {
    address: "0x39F7BD82b2F59db647fE16B446Fdd653f84E7097",
    privateKey: "0x1d80681a2cdb636b6746e2d87365a8126799bf07f488967309ec098620feacff"
  },
  {
    address: "0xfc06dc33B7C31fc9289478D6691E72f8889D761f",
    privateKey: "0x1a0b35b86ee140f4f3611db5deffb1d56dcd2849ede1efab454e90f3d4345dbf"
  },
  {
    address: "0x1210F7Ca4d224E2aB102DDeEeA96262051958B0d",
    privateKey: "0x3fa32fe462f93791a52889d7d0c873d97cac3ec55305a921881b22e70cf32c64"
  },
  {
    address: "0x28EAc77d299FcECE882f6BA0800b8a441673A4D9",
    privateKey: "0xf0becbde3cae16532f162e5f8601aa1557266627d14391066d6189080cb31579"
  },
  {
    address: "0x2b04207234541830c23fb893f2D337fa0147168f",
    privateKey: "0x1a88df59b64e26fbabb9b9fe708d5afeb40800495717bcd8a47abab4ec3bfdf1"
  },
  {
    address: "0x0Db5E47FC8BF246B90E5080d8Dc1a457b41f357e",
    privateKey: "0x894574c7aaece282b723a1706da2768c2a150ec77ecf64d0e3183cd945bed4c8"
  }
];

let assignedAccounts = {};

const getFreeAccount = () => {
    for (const account of ganacheAccounts) {
        if (!assignedAccounts[account.address]) {
            assignedAccounts[account.address] = true;
            return account;
        }
    }
    throw new Error('No free accounts available');
};

// Register a new user
const registerUser = async (req, res, next) => {
    // Register user
    try {
        // validate the request body
        const result = await authSchema.validateAsync(req.body);

        // check if the user exists
        const user = await pool.query(confirmUser, [result.username]);

        // If the user already exists, return an error
        if (user.rows.length > 0) {
            return next(createError.Conflict('User already exists.'));
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);      // Generate a salt
        const hashedPassword = await bcrypt.hash(result.password, salt); // Hash the password

        // If the user does not exist, add the user to the database
        const newUser = await pool.query(addUser, [result.username, hashedPassword, result.role, result.email]);
        const userId = newUser.rows[0].id;

        const accessToken = await signAccessToken(userId); // Create an access token
        const refreshToken = await signRefreshToken(userId); // Create a refresh token

        console.log("auth.controller -> user created successfully.");
        // Return a success message
        res.status(201).json({ 
            message: "User created successfully.",
            accessToken,
            refreshToken
        });
    } catch (error) {
        if (error.isJoi === true) error.status = 422;  // Set the status code to 422 if the error is a Joi error
        console.error(error.message);       // Log the error message
        return next(createError.InternalServerError());     // Return an internal server error
    }
};

/*
// register blockchain account
// const registerBlockAccount = async (req, res, next) => {
//     // Register user
//     try {
//         // Get the username, email, and password from the request body and validate them
//         const result = await blockchainSchema.validateAsync(req.body);  // Validate the request body

//         // check if the user exists
//         const user = await pool.query(confirmUser, [result.username]);

//         // If the user already exists, return an error
//         if (user.rows.length === 0) {
//             return next(createError.Conflict('User not found. Use app account details.'));
//         }

//         // compare the provided password with the stored hashed password
//         const validPassword = await bcrypt.compare(result.password, user.rows[0].password);
        
//         // If the password is invalid, return an error
//         if (!validPassword) {
//             return next(createError.Unauthorized('Invalid username or password. Use app account details'));
//         }

//         // generate blockchain account
//         const account = web3.eth.accounts.create();
//         console.log(`Account: ${account.address}`);
//         const privateKey = account.privateKey;
//         console.log(`Private Key: ${privateKey}`);
//         const address = account.address;
//         console.log(`Address: ${address}`);

//         // Add the account to the Web3 provider's wallet
//         web3.eth.accounts.wallet.add(account);

//         // Fund the new account from an existing Ganache account
//         const ganachePrivateKey = '0x894574c7aaece282b723a1706da2768c2a150ec77ecf64d0e3183cd945bed4c8'; // Replace this with a private key from Ganache
//         const senderAccount = web3.eth.accounts.privateKeyToAccount(ganachePrivateKey);
//         web3.eth.accounts.wallet.add(senderAccount);

//         // Transfer some Ether to the new account
//         const transferAmount = web3.utils.toWei('1', 'ether'); // 1 ETH
//         await web3.eth.sendTransaction({
//             from: senderAccount.address,
//             to: account.address,
//             value: transferAmount,
//             gas: 21000,
//             gasPrice: await web3.eth.getGasPrice()
//         });

//         // Check the new account's balance
//         const newBalance = await web3.eth.getBalance(account.address);
//         console.log(`New Balance: ${web3.utils.fromWei(newBalance, 'ether')} ETH`);

//         // Adjust the gas limit and gas price if necessary
//         const gas = 1000000; // Example gas limit
//         const gasPrice = await web3.eth.getGasPrice(); // Get current gas price

//         console.log("Worked 1 ...")
//         // register on blockchain
//         await userContract.methods.register().send({ 
//             from: address,
//             gas: gas,
//             gasPrice: gasPrice 
//         });

//         // If the user  exist, update user account details in the database
//         await pool.query(updateUser, [account, privateKey, result.username]);
        
//         console.log("auth.controller -> user account created successfully.");
//         // Return a success message
//         res.status(201).json({ 
//             message: "User account created successfully."
//         });
//     } catch (error) {
//         if (error.isJoi === true) error.status = 422;  // Set the status code to 422 if the error is a Joi error
//         console.error(error.message);       // Log the error message
//         return next(createError.InternalServerError());     // Return an internal server error
//     }
// };
*/

const registerBlockAccount = async (req, res, next) => {
    try {
        const result = await blockchainSchema.validateAsync(req.body);  // Validate the request body

        // check if the user exists
        const user = await pool.query(confirmUser, [result.username]);

        // If the user already exists, return an error
        if (user.rows.length === 0) {
            return next(createError.Conflict('User not found. Use app account details.'));
        }

        // compare the provided password with the stored hashed password
        const validPassword = await bcrypt.compare(result.password, user.rows[0].password);
        
        // If the password is invalid, return an error
        if (!validPassword) {
            return next(createError.Unauthorized('Invalid username or password. Use app account details'));
        }

        // Get a free account from Ganache
        const { address, privateKey } = getFreeAccount();

        // Add the account to the Web3 provider's wallet
        web3.eth.accounts.wallet.add(privateKey);

        // Register on the blockchain
        const gas = 1000000; // Example gas limit
        const gasPrice = await web3.eth.getGasPrice(); // Get current gas price

        await userContract.methods.register().send({
            from: address,
            gas: gas,
            gasPrice: gasPrice
        });

        // Add the user to the database
        await pool.query(updateUser, [address, privateKey, result.username]);

        res.status(201).json({
            message: "User registered successfully",
            address,
            privateKey
        });
    } catch (error) {
        next(error);
    }
};


// Login a user
const loginUser = async (req, res, next) => {
    try {
        // validate the request body
        const result = await loginSchema.validateAsync(req.body);

        // check if the user exists
        const user = await pool.query(confirmUser, [result.username]);

        // If the user already exists, return an error
        if (user.rows.length === 0) {
            return next(createError.Conflict('User not found.'));
        }

        // compare the provided password with the stored hashed password
        const validPassword = await bcrypt.compare(result.password, user.rows[0].password);
        
        // If the password is invalid, return an error
        if (!validPassword) {
            return next(createError.Unauthorized('Invalid username or password.'));
        }

        // if the passwords match, create a token for the user
        const accessToken = await signAccessToken(user.rows[0].id);
        const refreshToken = await signRefreshToken(user.rows[0].id);

        // console.log(`Refresh Token: ${refreshToken}`);
        
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({ accessToken, refreshToken });        // 
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest('Invalid username or password.'));
        return next(error);
    }
};

// Refresh the access token
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);

        res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
        next(error);
    }
};

// Logout a user
const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        // console.log(`Logging out user with refresh token: ${refreshToken}`);

        if (!refreshToken) {
            throw createError.BadRequest('Missing refresh token');
        }

        const userId = await verifyRefreshToken(refreshToken);
        // console.log(`userId in logout endpoint: ${userId}`);

        try {
            const delResult = await client.DEL(userId);
            // console.log(`Deleted ${delResult} keys`);
            res.sendStatus(204);
        } catch (err) {
            // console.error('Error deleting key:', err);
            throw createError.InternalServerError('Failed to delete refresh token');
        }
    } catch (error) {
        next(error);
    }
};

// const getBalance = async (req, res, next) => {
//     try {
//         const username = req.username;

//         const user = await pool.query(confirmUser, [username]);
//         if (user.rows.length === 0) {
//             return next(createError.Conflict('User not found.'));
//         }

//         // Attempt to parse the account object from the user's row
//         let account = user.rows[0].account;

//         // Check if account is a string that needs to be parsed as JSON
//         if (typeof account === 'string') {
//             try {
//                 account = JSON.parse(account);
//             } catch (error) {
//                 // If parsing fails, assume account is a plain string (address)
//                 account = { address: account };
//             }
//         }

//         // At this point, account should be an object with an address property
//         if (!account || !account.address) {
//             return next(createError.BadRequest('Account address is undefined.'));
//         }

//         console.log(`Account: ${JSON.stringify(account)}\nAccount address: ${account.address}`);
        
//         const balance = await userContract.methods.getBalance(account.address).call();

//         res.json({
//             balance: balance.toString()
//         });
//     } catch (error) {
//         next(error);
//     }
// };

const getBalance = async (req, res, next) => {
    try {
        const username = req.username;

        // Check if the user exists
        const user = await pool.query(confirmUser, [username]);
        if (user.rows.length === 0) {
            return next(createError.Conflict('User not found.'));
        }

        // Attempt to parse the account object from the user's row
        let account = user.rows[0].account;

        // Check if account is a string that needs to be parsed as JSON
        if (typeof account === 'string') {
            try {
                account = JSON.parse(account);
            } catch (error) {
                // If parsing fails, assume account is a plain string (address)
                account = { address: account };
            }
        }

        // At this point, account should be an object with an address property
        if (!account || !account.address) {
            return next(createError.BadRequest('Account address is undefined.'));
        }

        console.log(`Account: ${JSON.stringify(account)}\nAccount address: ${account.address}`);
        
        // const balance = await userContract.methods.getBalance(account.address).call();

        const balance = await web3.eth.getBalance(account.address);
        console.log(`Balance: ${balance}`);

        res.json({
            address: account,
            balance: web3.utils.fromWei(balance, 'ether')
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logout,
    registerBlockAccount,
    getBalance
};

// {
//     "username": "ekow",
//     "password": "ecow@2460",
//     "role": "manufacturer"
//   }
// {
//     "username": "papa_ekow",
//     "password": "ekow@2460",
//     "role": "primary_distributor"
//   }




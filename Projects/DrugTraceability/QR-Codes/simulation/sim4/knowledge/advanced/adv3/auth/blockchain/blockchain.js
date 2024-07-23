const Web3 = require('web3');
const truffleConfig = require('../truffle-config');
const contract = require('@truffle/contract');
const UserContractArtifact = require('../build/contracts/UserContract.json');

const provider = new Web3.providers.HttpProvider(truffleConfig.networks.development.url);
const web3 = new Web3(provider);

const UserContract = contract(UserContractArtifact);
UserContract.setProvider(provider);

const getAccount = async (index) => {
    const accounts = await web3.eth.getAccounts();
    return accounts[index];
};

const getUserContract = async () => {
    const instance = await UserContract.deployed();
    return instance;
};

module.exports = { getAccount, getUserContract, web3 };

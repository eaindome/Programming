Migrations Documentation
File:
- migrations/2_deploy_contracts.js

``migrations/2_deploy_contracts.js``
This file is a Truffle migration script used to deploy the GoodsTransaction smart contract to the Ethereum blockchain. Migration scripts in Truffle are responsible for deploying and managing the state of smart contracts.

*Functionality:*
1. **Artifacts Require:** This line imports the GoodsTransaction contract from the compiled artifacts. The artifacts.require function is used to fetch the compiled contract so it can be deployed.
    code
        const GoodsTransaction = artifacts.require("GoodsTransaction");

2. **Module Export:** The exported function takes deployer as an argument and uses it to deploy the GoodsTransaction contract.
    code
        module.exports = function (deployer) {
            deployer.deploy(GoodsTransaction);
        };

**Steps for Deployment:**
1. **Compile Contracts:** Before running migrations, ensure that the contracts are compiled using:
    code
        truffle compile

2. **Run Migrations:** Execute the migrations to deploy the contracts to the specified network.
    code
        truffle migrate

**Deployment Process:**
The deployer.deploy method takes care of deploying the GoodsTransaction contract to the blockchain.
During deployment, Truffle will handle the creation of a new contract instance on the blockchain, and will keep track of the deployment state.
Example:
To deploy the contract on a local Ganache network, make sure your truffle-config.js is properly configured, then run:
    code
        truffle migrate --network development

*Sample truffle-config.js for Local Network:*
    code
        module.exports = {
        networks: {
            development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
            },
        },
        compilers: {
            solc: {
            version: "0.8.0" // Fetch exact version from solc-bin
            }
        }
        };
This migration script ensures that the GoodsTransaction contract is deployed to the desired Ethereum network. Make sure to verify the deployment and interact with the deployed contract using Truffle's console or other tools like Remix or Web3.js.
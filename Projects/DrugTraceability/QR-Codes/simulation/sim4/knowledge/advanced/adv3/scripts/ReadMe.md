**<ins>Documentation for Deploy Scripts</ins>**

**Overview**
This script is used to deploy a Solidity smart contract to a local Ethereum node using the Web3.py and Py-solc-x libraries. The smart contract, GoodsTransaction, is designed to handle transactions of goods, maintaining a history of each transaction. The script includes the following steps:
1. Installing and setting the Solidity compiler.
2. Connecting to a local Ethereum node.
3. Compiling the Solidity contract.
4. Deploying the contract to the Ethereum network.
5. Saving the contract ABI to a JSON file.
6. Printing the deployed contract's address.

*Dependencies*
Ensure you have the following libraries installed:
- web3
- solcx
- json

*Install these libraries using pip:*
- bash
    code: pip install web3 solcx

**Script Explanation**
``Step 1: Install and Set Solidity Compiler``
    code: 
        from solcx import install_solc, set_solc_version

        # Install specific version of Solidity compiler
        install_solc('0.8.0')

        # Set the Solidity version to use
        set_solc_version('0.8.0')
This part of the script installs and sets the Solidity compiler version to 0.8.0.

``Step 2: Connect to Local Ethereum Node``
    code
        from web3 import Web3

        # Connect to local Ethereum node
        w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
Here, we establish a connection to a local Ethereum node running on http://127.0.0.1:7545.

``Step 3: Compile Solidity Contract``
    code
        from solcx import compile_standard
        import json

        # Compile Solidity contract
        compiled_sol = compile_standard({
            "language": "Solidity",
            "sources": {
                "GoodsTransaction.sol": {
                    "content": '''
                    // SPDX-License-Identifier: MIT
                    pragma solidity ^0.8.0;

                    contract GoodsTransaction {
                        struct Transaction {
                            address from;
                            address to;
                            string goodsId;
                            string data;
                            uint timestamp;
                        }

                        Transaction[] public transactions;

                        mapping(string => Transaction[]) public goodsHistory;

                        event TransactionMade(address from, address to, string goodsId, string data, uint timestamp);

                        function makeTransaction(address _to, string memory _goodsId, string memory _data) public {
                            Transaction memory newTransaction = Transaction(msg.sender, _to, _goodsId, _data, block.timestamp);
                            transactions.push(newTransaction);
                            goodsHistory[_goodsId].push(newTransaction);

                            emit TransactionMade(msg.sender, _to, _goodsId, _data, block.timestamp);
                        }

                        function getGoodsHistory(string memory _goodsId) public view returns (Transaction[] memory) {
                            return goodsHistory[_goodsId];
                        }
                    }
                    '''
                }
            },
            "settings": {
                "outputSelection": {
                    "*": {
                        "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]
                    }
                }
            }
        })
The Solidity contract is defined and compiled using the compile_standard function. The contract GoodsTransaction includes a structure for storing transactions, a mapping for goods history, and functions to make transactions and retrieve goods history.

``Step 4: Get Bytecode and ABI``
    code
        # Get bytecode and abi
        bytecode = compiled_sol['contracts']['GoodsTransaction.sol']['GoodsTransaction']['evm']['bytecode']['object']
        abi = compiled_sol['contracts']['GoodsTransaction.sol']['GoodsTransaction']['abi']
The bytecode and ABI (Application Binary Interface) of the compiled contract are extracted. The bytecode is the compiled version of the contract, and the ABI is a JSON array that describes the interface of the contract.

``Step 5: Save ABI to File``
    code
        # Save ABI to file
        with open('GoodsTransactionABI.json', 'w') as f:
            json.dump(abi, f)
The ABI is saved to a JSON file named GoodsTransactionABI.json for future use, such as interacting with the deployed contract.

``Step 6: Deploy Contract``
    code
        # Deploy contract
        w3.eth.default_account = w3.eth.accounts[0]
        GoodsTransaction = w3.eth.contract(abi=abi, bytecode=bytecode)
        tx_hash = GoodsTransaction.constructor().transact()
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        contract_address = tx_receipt.contractAddress

        print(f'Contract deployed at {contract_address}')
The contract is deployed to the Ethereum network. The script sets the default account for transactions, creates a contract instance with the ABI and bytecode, and sends the transaction to deploy the contract. It then waits for the transaction receipt and prints the deployed contract's address.

``Running the Script``
Ensure your local Ethereum node (e.g., Ganache) is running on http://127.0.0.1:7545. Execute the script using Python:
    code
        python deploy.py
This will compile and deploy the GoodsTransaction contract and output the address where the contract is deployed. The ABI will be saved in GoodsTransactionABI.json.

This documentation should help you understand the purpose and functionality of each part of the deployment script.
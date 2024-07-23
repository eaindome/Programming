from web3 import Web3
from solcx import compile_standard, install_solc, set_solc_version
import json

# Install specific version of Solidity compiler
install_solc('0.8.0')

# Set the Solidity version to use
set_solc_version('0.8.0')

# Connect to local Ethereum node
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7546'))

# Compile Solidity contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "UserContract.sol": {
            "content": '''
            // SPDX-License-Identifier: MIT
            pragma solidity ^0.8.0;

            contract UserContract {
                mapping(address => uint256) public balances;

                function register() public {
                    balances[msg.sender] = 100; // Give some initial balance
                }

                function getBalance(address user) public view returns (uint256) {
                    return balances[user];
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

# Get bytecode and abi
bytecode = compiled_sol['contracts']['UserContract.sol']['UserContract']['evm']['bytecode']['object']
abi = compiled_sol['contracts']['UserContract.sol']['UserContract']['abi']

# Save ABI to file
with open('UserContractABI.json', 'w') as f:
    json.dump(abi, f)

# Deploy contract
w3.eth.default_account = w3.eth.accounts[0]
UserContract = w3.eth.contract(abi=abi, bytecode=bytecode)
tx_hash = UserContract.constructor().transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# Save contract address
with open('UserContractAddress.txt', 'w') as f:
    f.write(tx_receipt.contractAddress)

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

# Get bytecode and abi
bytecode = compiled_sol['contracts']['GoodsTransaction.sol']['GoodsTransaction']['evm']['bytecode']['object']
abi = compiled_sol['contracts']['GoodsTransaction.sol']['GoodsTransaction']['abi']

# Save ABI to file
with open('GoodsTransactionABI.json', 'w') as f:
    json.dump(abi, f)

# Deploy contract
w3.eth.default_account = w3.eth.accounts[0]
GoodsTransaction = w3.eth.contract(abi=abi, bytecode=bytecode)
tx_hash = GoodsTransaction.constructor().transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
contract_address = tx_receipt.contractAddress

# Save contract address
with open('GoodsTransactionContractAddress.txt', 'w') as f:
    f.write(tx_receipt.contractAddress)

print(f'Contract deployed at {contract_address}')


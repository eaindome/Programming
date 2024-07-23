**<ins>GoodsTransaction Smart Contract Documentation</ins>**

**Overview**
The GoodsTransaction smart contract facilitates the tracking of transactions involving goods between different parties. It stores details of each transaction on the Ethereum blockchain and provides a history of transactions for each good.

**Solidity Version**
The contract is written in Solidity and uses version ^0.8.0.

**SPDX License Identifier**
The contract is licensed under the MIT License, as indicated by the SPDX license identifier at the top of the file:

*SPDX-License-Identifier: MIT*


**Contract Structure**
*Transaction Struct*
The Transaction struct represents a single transaction and contains the following fields:

- address from: The address of the sender.
- address to: The address of the receiver.
- string goodsId: The unique identifier for the goods.
- string data: Additional data or metadata related to the transaction.
- uint timestamp: The timestamp of the transaction.

*State Variables*
- Transaction[] public transactions: An array that stores all transactions.
- mapping(string => Transaction[]) public goodsHistory: A mapping from goods IDs to arrays of transactions, representing the transaction history for each good.

*Events*
- event TransactionMade(address from, address to, string goodsId, string data, uint timestamp): An event that is emitted when a new transaction is made.

*Functions*

`makeTransaction`

## function makeTransaction(address _to, string memory _goodsId, string memory _data) public

This function records a new transaction. It takes the following parameters:
- address _to: The address of the receiver.
- string memory _goodsId: The unique identifier for the goods.
- string memory _data: Additional data or metadata related to the transaction.

When called, the function:
- Creates a new Transaction struct with the provided details and the current timestamp.
- Adds the new transaction to the transactions array.
- Adds the new transaction to the goodsHistory mapping for the specified goods ID.
- Emits the TransactionMade event.

`getGoodsHistory`

## function getGoodsHistory(string memory _goodsId) public view returns (Transaction[] memory)

This function retrieves the transaction history for a specific goods ID. It takes the following parameter:

- string memory _goodsId: The unique identifier for the goods.

The function returns an array of Transaction structs representing the transaction history for the specified goods ID.

**Usage**
To use the GoodsTransaction contract, you need to deploy it to an Ethereum blockchain. Once deployed, you can interact with it using the following functions:

- Record a Transaction: Use the makeTransaction function to record a new transaction. This will store the transaction details on the blockchain and update the transaction history for the specified goods ID.

- Retrieve Goods History: Use the getGoodsHistory function to retrieve the history of transactions for a specific goods ID. This will return an array of Transaction structs representing the transaction history.

**Event Handling**
The TransactionMade event is emitted whenever a new transaction is recorded. You can listen for this event in your application to perform actions or notifications based on new transactions.

**Conclusion**
The GoodsTransaction smart contract provides a robust mechanism for recording and tracking transactions involving goods on the Ethereum blockchain. By leveraging the immutability and transparency of the blockchain, it ensures that the transaction history is reliable and tamper-proof.
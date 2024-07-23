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
        Transaction memory newTransaction = Transaction({
            from: msg.sender,
            to: _to,
            goodsId: _goodsId,
            timestamp: block.timestamp,
            data: _data
        });
        transactions.push(newTransaction);
        goodsHistory[_goodsId].push(newTransaction);

        emit TransactionMade(msg.sender, _to, _goodsId, _data, block.timestamp);
    }

    function getGoodsHistory(string memory _goodsId) public view returns (Transaction[] memory) {
        return goodsHistory[_goodsId];
    }
}




// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GoodsTransaction {
    struct Transaction {
        address from;
        address to;
        string goodsId;
        uint timestamp;
        string data;
    }

    Transaction[] public transactions;

    mapping(string => Transaction[]) public goodsHistory;

    event TransactionMade(address from, address to, string goodsId, uint timestamp);

    function makeTransaction(address _to, string memory _goodsId, string memory _data) public {
        require(_to != address(0), "Invalid recipient address");
        require(bytes(_goodsId).length > 0, "Goods ID cannot be empty");

        Transaction memory newTransaction = Transaction({
            from: msg.sender,
            to: _to,
            goodsId: _goodsId,
            timestamp: block.timestamp,
            data: _data
        });

        transactions.push(newTransaction);
        goodsHistory[_goodsId].push(newTransaction);

        emit TransactionMade(msg.sender, _to, _goodsId, block.timestamp);
    }

    function getGoodsHistory(string memory _goodsId) public view returns (Transaction[] memory) {
        require(bytes(_goodsId).length > 0, "Goods ID cannot be empty");
        return goodsHistory[_goodsId];
    }
}



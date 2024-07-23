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

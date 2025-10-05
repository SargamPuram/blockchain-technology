// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Bank {
    mapping(address => uint256) public balanceOf;

    // Deposit ETH
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balanceOf[msg.sender] += msg.value;
    }

    // Withdraw ETH
    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdraw amount must be greater than 0");
        require(amount <= balanceOf[msg.sender], "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // View balance
    function getBalance() public view returns (uint256) {
        return balanceOf[msg.sender];
    }
}

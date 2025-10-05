// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Bank {
    mapping(address => uint256) public balanceOf;  // Tracks balances for each user's address

    // Function to deposit money (ETH)
    function deposit(uint256 amount) public payable {
        require(msg.value == amount, "Sent value does not match the specified amount");  // Ensure the sent ETH matches the amount
        balanceOf[msg.sender] += amount;  // Add to the sender's balance
    }

    // Function to withdraw money (only if the user has enough balance)
    function withdraw(uint256 amount) public {
        require(amount <= balanceOf[msg.sender], "Insufficient balance");  // Check: Ensure enough funds
        balanceOf[msg.sender] -= amount;  // Effect: Update balance first (prevents reentrancy bug)
        payable(msg.sender).transfer(amount);  // Interaction: Send ETH to the sender
    }

    // Function to show balance (for the caller's account)
    function getBalance() public view returns (uint256) {
        return balanceOf[msg.sender];  // Returns the balance of the person calling this function
    }
}
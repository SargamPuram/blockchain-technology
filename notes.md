// SPDX-License-Identifier: UNLICENSED
// A standard line telling the world this code is not open-source licensed.

// This tells the compiler to use a version of Solidity 0.8.28 or newer.
// This is great because you're using a modern, secure version.
pragma solidity ^0.8.28;

// This is the beginning of your contract, a container for all the logic.
contract Bank {
    
    // This is the most important piece of data in your contract.
    // It's like a digital ledger or a spreadsheet.
    // `mapping(address => uint256)` means:
    //    - The "key" (like a row label) is an Ethereum address.
    //    - The "value" (the data in the cell) is a uint256 (a big number).
    // `public balanceOf;` means:
    //    - We name this ledger "balanceOf".
    //    - 'public' automatically creates a function so anyone can look up a balance.
    mapping(address => uint256) public balanceOf;

    // --- FUNCTIONS (The Actions Your Bank Can Perform) ---

    // Function to deposit money (ETH)
    // `payable` is a special keyword. It means this function is allowed to RECEIVE Ether.
    function deposit(uint256 amount) public payable {
        // This is a safety check.
        // `msg.value` is the ACTUAL amount of ETH sent with the transaction.
        // `amount` is the number the user TYPED IN.
        // This line ensures the user sent exactly the amount they said they would.
        require(msg.value == amount, "Sent value does not match the specified amount");
        
        // This is the core logic.
        // `msg.sender` is the address of the person who called the function.
        // We look up their current balance in our ledger and add the deposited amount.
        balanceOf[msg.sender] += amount;
    }

    // Function to withdraw money
    function withdraw(uint256 amount) public {
        // This follows the "Checks-Effects-Interactions" security pattern.
        
        // 1. CHECK: First, check if the user has enough money in their account.
        // If this is false, the function stops immediately and reverts the transaction.
        require(amount <= balanceOf[msg.sender], "Insufficient balance");
        
        // 2. EFFECT: Second, update our internal ledger. We subtract the amount
        // BEFORE we send the money. This is the critical step that prevents the
        // "re-entrancy" bug mentioned in your manual.
        balanceOf[msg.sender] -= amount;
        
        // 3. INTERACTION: Finally, send the actual ETH to the user.
        // `payable(msg.sender)` converts the address to a type that can receive ETH.
        // `.transfer(amount)` performs the sending.
        payable(msg.sender).transfer(amount);
    }

    // Function to show balance
    // `view` means this function only reads data; it doesn't change anything.
    // Because it doesn't change anything, it's free to call (costs no gas).
    // `returns (uint256)` tells us it will give back a number.
    function getBalance() public view returns (uint256) {
        // It looks up the address of the person calling the function (`msg.sender`)
        // in our ledger and returns the value (their balance).
        return balanceOf[msg.sender];
    }
}
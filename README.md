# Blockchain Bank Project Setup

This guide provides step-by-step instructions to set up a Hardhat project for blockchain development on both Windows and Linux.

## Step 1: Install Required Software

### Node.js (Version 16 or higher recommended):
- Download from [https://nodejs.org/](https://nodejs.org/) (get the LTS version).
- Install it (follow the installer prompts). This includes npm (Node Package Manager), which we'll use to install Hardhat.
- **Verify**: Open a terminal/command prompt and run `node -v` and `npm -v`. You should see version numbers.

### VS Code (Free Code Editor):
- Download from [https://code.visualstudio.com/](https://code.visualstudio.com/).
- Install it. We'll use it to write and edit files.
- **Optional**: Install the "Solidity" extension in VS Code (search in the Extensions tab) for syntax highlighting.

### Git (Optional but useful for version control):
- If you don't have it, download from [https://git-scm.com/](https://git-scm.com/) and install.

## Step 2: Set Up a Hardhat Project

We'll create a new project folder and install Hardhat.

### Open a terminal/command prompt.

### Create a project directory:
```
mkdir blockchain-bank
cd blockchain-bank
```
(This makes a folder called "blockchain-bank" and navigates into it.)

### Initialize the project:
```
npm init -y
```
(This creates a package.json file for managing dependencies.)

### Install Hardhat:
```
npm install --save-dev hardhat@2.26.3
```
(This downloads Hardhat. It might take a minute.)

### Set up Hardhat:
```
npx hardhat init
```
- Select "Create a JavaScript project" (or TypeScript if you prefer, but JS is simpler for beginners).
- Accept defaults for the rest (yes to everything).
- This creates folders like `contracts/`, `scripts/`, and `test/`, plus a `hardhat.config.js` file.

## Next Steps
- After setup, you can start writing smart contracts in the `contracts/` folder.
- Use `npx hardhat compile` to compile your contracts.
- Use `npx hardhat test` to run tests.
- For deployment, refer to Hardhat documentation.



contract is deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3

Part 2: Understanding the Project Files
Your project folder now contains several important files and directories.

contracts/Bank.sol: The Smart Contract. This is the heart of our application, containing all the rules of our bank written in Solidity.
test/Bank.test.js: The Test Script. This file contains automated tests that verify our contract works correctly and securely in all situations.
scripts/deploy.js: The Deployment Script. This script takes our compiled contract and publishes it to a blockchain.
hardhat.config.js: The Configuration File. This file tells Hardhat how to behave—for example, which version of Solidity to use.
package.json: The Project Manifest. This lists our project's dependencies, like Hardhat.

Part 3: Running the Project (Step-by-Step Guide)
Follow these commands in order from your project's root directory (blockchain-bank).

Step 1: Compile the Smart Contract
This command reads your Bank.sol file, checks for any errors, and converts it into a format that the Ethereum Virtual Machine (EVM) can understand (bytecode).

Bash

npx hardhat compile
You should see a message like Compiled 1 Solidity file successfully.

Step 2: Run the Automated Tests
This is the most important quality check. This command will execute the test/Bank.test.js script. It will automatically deploy a fresh version of your contract to a temporary, in-memory blockchain for each test case, ensuring the results are clean and reliable.

Bash

npx hardhat test
The expected output for this command is detailed in the Appendix. This is the definitive proof that your contract works.

Step 3: Start a Local Blockchain Node
Now, let's run a simulated blockchain on our own computer. This is a safe and free way to deploy and interact with contracts as if they were on the real Ethereum network.

Bash

npx hardhat node
This will start a local node and list 20 test accounts, each pre-loaded with 10000 fake ETH. Keep this terminal window open!

Step 4: Deploy the Contract to the Local Node
Open a new, second terminal window and navigate to your project folder again.

Run the deployment script, telling it to target our local network (--network localhost).

Bash

npx hardhat run scripts/deploy.js --network localhost
This will deploy the contract and print its unique address. You will need this address for the manual interaction scripts, as explained in the Appendix.


Part 4: Explanation of the Smart Contract Code (Bank.sol)
This section breaks down the code inside contracts/Bank.sol to explain how it works.

solidity

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28; // Specifies a modern, secure version of Solidity.

// The contract is a container for our state and functions.
contract Bank {
    
    // THE LEDGER: A mapping is like a hash table or dictionary.
    // It maps an Ethereum address to an unsigned integer (uint256).
    // This is where we store how much money each person has in the bank.
    // 'public' makes it readable by anyone.
    mapping(address => uint256) public balanceOf;

    // DEPOSIT FUNCTION
    // 'payable' is a special keyword that allows this function to receive Ether.
    function deposit(uint256 amount) public payable {
        // Safety Check: Ensures the amount of Ether sent (`msg.value`)
        // matches the amount specified in the function argument.
        require(msg.value == amount, "Sent value does not match the specified amount");
        
        // Update Ledger: Add the deposited amount to the sender's (`msg.sender`) balance.
        balanceOf[msg.sender] += amount;
    }

    // WITHDRAW FUNCTION
    // This function demonstrates the "Checks-Effects-Interactions" security pattern.
    function withdraw(uint256 amount) public {
        // 1. CHECK: Verify the sender has enough funds to withdraw.
        // If not, the transaction fails here.
        require(amount <= balanceOf[msg.sender], "Insufficient balance");
        
        // 2. EFFECT: Update the internal state (the ledger) *before* sending money.
        // This prevents a security flaw called a "re-entrancy attack".
        balanceOf[msg.sender] -= amount;
        
        // 3. INTERACTION: Send the requested amount of Ether to the sender.
        payable(msg.sender).transfer(amount);
    }

    // GET BALANCE FUNCTION
    // 'view' means this function only reads data from the blockchain; it does not modify it.
    // Calling view functions is free (costs no gas).
    // 'returns (uint256)' specifies that it will return a number.
    function getBalance() public view returns (uint256) {
        // Returns the balance of the address that called the function.
        return balanceOf[msg.sender];
    }
}
Appendix: Detailed Script Outputs and Explanations
This section details the expected output for each script when run in a clean environment. This is crucial for understanding what "correct" looks like and for diagnosing issues.

1. The Professional Test Suite (test/Bank.test.js)
This is the most important and reliable way to verify the contract. It runs all checks in a completely isolated and clean environment. It does not require any address updates, as it handles deployment automatically.

➡️ Command to Run:

Bash

npx hardhat test
✅ Expected Output:

text

  Bank Contract
    ✔ Should have an initial balance of 0 for new accounts
    ✔ Should allow a user to deposit ETH
    ✔ Should allow a user to withdraw ETH if they have sufficient balance
    ✔ Should fail/revert if a user tries to withdraw more than their balance
    ✔ Should keep account balances separate


  5 passing (112ms)
🔍 Explanation of Output:

The command npx hardhat test automatically finds and runs all files in the /test directory.
The green checkmarks ✔ indicate that every single assertion (expect(...)) inside our test file passed successfully.
This is the definitive proof that your contract's logic is correct and secure.
2. The Interaction Scripts (scripts/testBank.js & scripts/enhancedTest.js)
These scripts are for manual interaction with a live contract on your local node. Because the contract address changes every time you restart the node and deploy, you must follow these steps carefully.

A Crucial Prerequisite: Updating the Deployed Contract Address
Why is this necessary?
Every time you restart the local node (npx hardhat node) and deploy your contract, it gets a new, unique address. The interaction scripts (testBank.js and enhancedTest.js) have a hardcoded address written inside them. If these addresses don't match, the scripts will fail because they will be trying to talk to an old or non-existent contract.

Therefore, you must follow this workflow every time you want to run an interaction script:

Start the Local Node:

Bash

npx hardhat node
(Keep this terminal running in the background.)

Deploy the Contract: In a new, second terminal, run the deployment script.

Bash

npx hardhat run scripts/deploy.js --network localhost
Copy the New Address: Look at the output from the previous command and copy the new contract address.

text

Bank contract deployed to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9  <-- COPY THIS
Update the Script File:

Open the script you want to run (e.g., scripts/testBank.js) in VS Code.
Find this line near the top:
JavaScript

const bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
Replace the old address with the new one you just copied:
JavaScript

const bankAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // <-- PASTE THE NEW ADDRESS HERE
Save the file.
Run the Script: Now you can safely run the interaction script in your second terminal.

Bash

npx hardhat run scripts/testBank.js --network localhost
Expected Output for scripts/testBank.js (Simple Script)
✅ Correct Output (after updating the address):

text

Using account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Deposited 1 ETH
Balance after deposit: 1.0 ETH
Withdrew 0.5 ETH
Balance after withdrawal: 0.5 ETH
Expected Output for scripts/enhancedTest.js (Enhanced Script)
✅ Correct Output (after updating the address):

text

Using account1: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Using account2: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Account1 initial balance: 0.0 ETH (expected: 0)
Account2 initial balance: 0.0 ETH (expected: 0)
Account1 deposited 1 ETH
Account1 balance after deposit: 1.0 ETH (expected: 1)
Account2 deposited 0.5 ETH (first)
Account2 deposited 0.5 ETH (second)
Account2 balance after deposits: 1.0 ETH (expected: 1)
Account1 balance (unchanged): 1.0 ETH (expected: 1)
Account1 withdrew 0.5 ETH
Account1 balance after withdrawal: 0.5 ETH (expected: 0.5)
Invalid withdrawal failed as expected: reverted with reason string 'Insufficient balance'
Account2 final balance: 1.0 ETH (expected: 1)
🔍 Explanation of the "Invalid withdrawal failed" message:
This is the desired outcome. The catch block in our script successfully caught the error from the blockchain, proving our contract's require() statement is working correctly and preventing theft. A failed transaction does not change any balances, which is why Account 2's final balance remains 1.0 ETH.

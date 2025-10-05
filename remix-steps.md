# Bank Smart Contract Tutorial

## Step 3: Compile the Code (Check for Spelling Mistakes)
"Compiling" is a fancy word for turning our human-readable code into machine-readable code that the blockchain can understand. It's like a spell-checker for our contract.

1. On the far left, click on the **Solidity Compiler** icon. It looks like an "S" logo.
2. You will see a big blue button that says **Compile Bank.sol**. Click it!
3. If everything is okay, a green checkmark will appear on the compiler icon. This means your code is perfect!
4. If you see a red error, make sure you copied the code exactly and that the **Compiler** version selected is `0.8.28` or newer (but not `0.9.0`).

---

## Step 4: Deploy the Contract (Open the Bank for Business!)
"Deploying" means we are putting our compiled contract onto a blockchain. Remix has a fake, practice blockchain right in your browser, so we don't need real money.

1. On the far left, click the icon below the compiler. It's called **Deploy & Run Transactions** and looks like an Ethereum logo with an arrow.
2. **ENVIRONMENT:** Make sure this is set to `Remix VM (Shanghai)`. This is our fake practice blockchain.
3. **ACCOUNT:** You will see a list of accounts, each with 100 fake Ether. Use the first account.
4. Click the big orange **Deploy** button.
5. Success! Look under **Deployed Contracts** in the same panel. You will see your **BANK** contract with a little arrow to expand it.

🎉 You have now officially put a smart contract on a blockchain! High five! ✋

---

## Step 5: Let's Run Some Transactions! (Play with the Bank)
Click the little arrow next to your **BANK** contract to see the buttons for your functions.

- **Blue buttons** are for reading data. They are free and instant.  
- **Orange buttons** are for changing data (like depositing or withdrawing). They cost fake gas fees.

### Transaction 1: Deposit Some Fake Ether
1. Go to the **Deploy & Run Transactions** panel and find the **VALUE** field.
2. Type `1` into the box and change the dropdown from "Wei" to "Ether".
3. Find the orange **deposit** button under your deployed contract and click it.
4. Look at the terminal (black box at the bottom). A green checkmark means your transaction worked!
5. Your account balance at the top will now be slightly less than 99 Ether because you sent 1 Ether to the bank contract.

### Transaction 2: Check Your Balance Inside the Bank
1. Find the blue **getBalance** button under your contract.
2. Click it.
3. The result will show a giant number: `1000000000000000000`.  
   - Why? Computers handle money in the smallest unit (Wei) to avoid decimals.  
   - 1 Ether = 1,000,000,000,000,000,000 Wei.  
   - So this giant number just means **1 Ether**. ✅

### Transaction 3: Withdraw Your Fake Ether
1. Take half of your money back out: 0.5 Ether → `500000000000000000` Wei.
2. Find the orange **withdraw** button and type the amount in Wei.
3. Click **withdraw**.
4. Terminal shows a green checkmark.
5. Check your account balance — it should have gone up by 0.5 Ether (~99.5 Ether).
6. Click **getBalance** again. Your balance inside the bank is now half of what it was.

---

## You Did It!
Congratulations! You just:

- Compiled a smart contract.  
- Deployed it to a blockchain.  
- Sent a transaction to deposit funds (`deposit`).  
- Read data from the contract (`getBalance`).  
- Sent another transaction to get your funds back (`withdraw`).

---

## The Big Idea: The Bank's Master List
Think of `balanceOf` as the bank's big master spreadsheet or filing cabinet. It holds a list of every single person (address) and their balance.

```solidity
mapping(address => uint256) public balanceOf;

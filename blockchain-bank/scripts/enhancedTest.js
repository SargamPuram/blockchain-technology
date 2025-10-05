const { ethers } = require("hardhat");

async function main() {
  // Connect to the deployed contract (REPLACE with your actual deployed address!)
  const bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // e.g., from your deployment output
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.attach(bankAddress);

  // Get two fake accounts (signers) with fake ETH from Hardhat's local node
  const [account1, account2] = await ethers.getSigners();
  console.log("Using account1:", account1.address);
  console.log("Using account2:", account2.address);

  // Test 1: Check initial balance (should be 0 for new accounts)
  let initialBalance1 = await bank.connect(account1).getBalance();
  console.log("Account1 initial balance:", ethers.formatEther(initialBalance1), "ETH (expected: 0)");
  
  let initialBalance2 = await bank.connect(account2).getBalance();
  console.log("Account2 initial balance:", ethers.formatEther(initialBalance2), "ETH (expected: 0)");

  // Test 2: Deposit from account1 (1 ETH)
  const depositAmount1 = ethers.parseEther("1");
  await bank.connect(account1).deposit(depositAmount1, { value: depositAmount1 });
  console.log("Account1 deposited 1 ETH");

  // Check balance after deposit
  const balanceAfterDeposit1 = await bank.connect(account1).getBalance();
  console.log("Account1 balance after deposit:", ethers.formatEther(balanceAfterDeposit1), "ETH (expected: 1)");

  // Test 3: Multiple deposits from account2 (0.5 ETH + 0.5 ETH = 1 ETH total)
  const depositAmount2a = ethers.parseEther("0.5");
  await bank.connect(account2).deposit(depositAmount2a, { value: depositAmount2a });
  console.log("Account2 deposited 0.5 ETH (first)");

  const depositAmount2b = ethers.parseEther("0.5");
  await bank.connect(account2).deposit(depositAmount2b, { value: depositAmount2b });
  console.log("Account2 deposited 0.5 ETH (second)");

  // Check account2 balance after multiple deposits
  const balanceAfterDeposit2 = await bank.connect(account2).getBalance();
  console.log("Account2 balance after deposits:", ethers.formatEther(balanceAfterDeposit2), "ETH (expected: 1)");

  // Verify account1's balance is unchanged (independent balances)
  const unchangedBalance1 = await bank.connect(account1).getBalance();
  console.log("Account1 balance (unchanged):", ethers.formatEther(unchangedBalance1), "ETH (expected: 1)");

  // Test 4: Valid withdrawal from account1 (0.5 ETH)
  const withdrawAmount1 = ethers.parseEther("0.5");
  await bank.connect(account1).withdraw(withdrawAmount1);
  console.log("Account1 withdrew 0.5 ETH");

  // Check balance after withdrawal
  const balanceAfterWithdraw1 = await bank.connect(account1).getBalance();
  console.log("Account1 balance after withdrawal:", ethers.formatEther(balanceAfterWithdraw1), "ETH (expected: 0.5)");

  // Test 5: Invalid withdrawal attempt from account2 (try 2 ETH when only 1 available - should fail)
  const invalidWithdrawAmount = ethers.parseEther("2");
  try {
    await bank.connect(account2).withdraw(invalidWithdrawAmount);
    console.log("Invalid withdrawal succeeded (this should not happen!)");
  } catch (error) {
    console.log("Invalid withdrawal failed as expected:", error.message);  // Expected: Reverts due to insufficient balance
  }

  // Final check: Account2 balance should still be 1 ETH (unchanged by failed withdrawal)
  const finalBalance2 = await bank.connect(account2).getBalance();
  console.log("Account2 final balance:", ethers.formatEther(finalBalance2), "ETH (expected: 1)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
const { ethers } = require("hardhat");

async function main() {
  // Connect to the deployed contract
  const bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // e.g., "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.attach(bankAddress);

  // Get a fake account (signer) with fake ETH
  const [account] = await ethers.getSigners();
  console.log("Using account:", account.address);

  // Test Deposit: Deposit 1 ETH (in wei)
  const depositAmount = ethers.parseEther("1");
  await bank.deposit(depositAmount, { value: depositAmount });
  console.log("Deposited 1 ETH");

  // Test Get Balance
  const balance = await bank.getBalance();
  console.log("Balance after deposit:", ethers.formatEther(balance), "ETH");

  // Test Withdraw: Withdraw 0.5 ETH
  const withdrawAmount = ethers.parseEther("0.5");
  await bank.withdraw(withdrawAmount);
  console.log("Withdrew 0.5 ETH");

  // Check Balance Again
  const newBalance = await bank.getBalance();
  console.log("Balance after withdrawal:", ethers.formatEther(newBalance), "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
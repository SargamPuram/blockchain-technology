const { ethers } = require("hardhat");

async function main() {
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();

  await bank.waitForDeployment();

  console.log("Bank contract deployed to:", await bank.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
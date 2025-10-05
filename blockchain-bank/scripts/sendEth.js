const { ethers } = require("hardhat");

async function main() {
  const [sender] = await ethers.getSigners(); // first account from Hardhat
  const tx = await sender.sendTransaction({
    to: "0x0f29E5408C325f2FF71DEFA032eE5643f8BcF51A",
    value: ethers.parseEther("25.0"), // send 5 ETH
  });
  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

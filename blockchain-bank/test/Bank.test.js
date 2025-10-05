// test/Bank.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank Contract", function () {
  let Bank;
  let bank;
  let owner;
  let addr1;
  let addr2;

  // This runs before each test, giving you a fresh contract every time!
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const BankFactory = await ethers.getContractFactory("Bank");
    bank = await BankFactory.deploy();
    await bank.waitForDeployment();
  });

  it("Should have an initial balance of 0 for new accounts", async function () {
    // Assert that the initial balance is 0 using 'expect'
    expect(await bank.connect(addr1).getBalance()).to.equal(0);
    expect(await bank.connect(addr2).getBalance()).to.equal(0);
  });

  it("Should allow a user to deposit ETH", async function () {
    const depositAmount = ethers.parseEther("1.0");
    await bank.connect(addr1).deposit(depositAmount, { value: depositAmount });

    const newBalance = await bank.connect(addr1).getBalance();
    // Assert the balance is correct
    expect(newBalance).to.equal(depositAmount);
  });

  it("Should allow a user to withdraw ETH if they have sufficient balance", async function () {
    const depositAmount = ethers.parseEther("2.0");
    await bank.connect(addr1).deposit(depositAmount, { value: depositAmount });

    const withdrawAmount = ethers.parseEther("0.5");
    await bank.connect(addr1).withdraw(withdrawAmount);

    const finalBalance = await bank.connect(addr1).getBalance();
    expect(finalBalance).to.equal(ethers.parseEther("1.5"));
  });

  it("Should fail/revert if a user tries to withdraw more than their balance", async function () {
    const depositAmount = ethers.parseEther("1.0");
    await bank.connect(addr1).deposit(depositAmount, { value: depositAmount });

    const invalidWithdrawAmount = ethers.parseEther("2.0");

    // This is the correct way to test for failures (reverts)
    await expect(
      bank.connect(addr1).withdraw(invalidWithdrawAmount)
    ).to.be.revertedWith("Insufficient balance");
  });

  it("Should keep account balances separate", async function () {
    const depositAmount1 = ethers.parseEther("1.0");
    await bank.connect(addr1).deposit(depositAmount1, { value: depositAmount1 });
    
    const depositAmount2 = ethers.parseEther("3.0");
    await bank.connect(addr2).deposit(depositAmount2, { value: depositAmount2 });

    expect(await bank.connect(addr1).getBalance()).to.equal(depositAmount1);
    expect(await bank.connect(addr2).getBalance()).to.equal(depositAmount2);
  });
});
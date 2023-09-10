const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TurboStaking", () => {
  let contractTurboStaking;
  let contractTokenA;
  let owner;

  //I need these address later to send tokens between contract and accounts
  let addressTurboStaking;
  let addressTokenA;
 
  beforeEach(async () => {

    //TurboStaking  Deployment block
    const TurboStaking = await ethers.getContractFactory("TurboStaking");
    contractTurboStaking = await TurboStaking.deploy();
    await contractTurboStaking.deployed();
    //extra step for some functions
    addressTurboStaking = contractTurboStaking.address;
 
    //TokenA deployment Block
    const TokenA = await ethers.getContractFactory("TokenA");
    contractTokenA = await TokenA.deploy(1000000); // Set the initial supply to 1000000
    await contractTokenA.deployed();

    //extra steps for some test blocks
    addressTokenA = contractTokenA.address;

    //getting owner for some test blocks
    [owner] = await ethers.getSigners();
  });

  it("Should deploy contract and print success message", async () => {
      console.log("Deployment is successful");
  });

  it("Should return the symbol of TokenA as TOKA", async () => {
    const tokenName = await contractTokenA.symbol();
    expect(tokenName).to.equal("TOKA");
  })

  it("Should check the owner of TokenA", async () => {
    expect(await contractTokenA.owner()).to.equal(owner.address);
    let tokenAOwner = await contractTokenA.owner();
    console.log(`Hardhat Testing Owner for TokenA:  ${tokenAOwner}`);
  })

  it("Should check the owner of TurboStaking", async () => {
    expect(await contractTurboStaking.owner()).to.equal(owner.address);
    let turboStakingOwner = await contractTurboStaking.owner();
    console.log(`Hardhat Testing Owner for TurboStaking:  ${turboStakingOwner}`);
  })
  
  it("Should mint 1000 tokenA for Owner", async () => {
    await contractTokenA.mintToken(1000)
    const tokenBalance = await contractTokenA.getYourBalance();
    //as it returns a string, I need to convert it to Number
    expect(Number(tokenBalance)).to.equal(1000);
    console.log(`TokenA Balance of msg.sender/owner: ${tokenBalance}`);
  });

  it("Should set addresss of TokenA on TurboStaking contract", async () => {
    await contractTurboStaking.setToken(addressTokenA);
    let tokenAddress = await contractTurboStaking.tokenA();
    expect(addressTokenA).to.equal(tokenAddress);
    console.log(`TokenA Contract Address: ${tokenAddress}`);
  });

  it("Should pause TurboStaking contract", async () => {
    await contractTurboStaking.togglePause();
    let statusPause = await contractTurboStaking.isPaused();
    expect(statusPause).to.equal(true);
  });

  it("Should approve the TurboStaking contract with 1000 tokens", async () => {
    //first we will mint tokens. mintToken is an owner function
    await contractTokenA.mintToken(1000);
    //as we will use approve function erc20, we also need to manage decimals
    const valueWithDecimals = ethers.utils.parseUnits("1000", 18);
    //we call approve on token contract which is inheriting from erc20
    await contractTokenA.approve(addressTurboStaking, valueWithDecimals);
    //checking approve function result
    const allowedamount = await contractTokenA.allowance(contractTurboStaking.owner(), addressTurboStaking);
    console.log(`TurboStaking Contract has ${Number(allowedamount) / (10**18)} allowance`);
    expect(Number(allowedamount) / (10**18)).to.equal(1000);
  });

  it("Should deposit 50 tokens as liquidity to the TurboStaking contract", async () => {
    //1.mint 1000 tokens
    await contractTokenA.mintToken(1000);
    //2.approve turboStaking contract with 2000 tokens
    const valueWithDecimals = ethers.utils.parseEther("2000", 18);
    await contractTokenA.approve(addressTurboStaking, valueWithDecimals);

    //3.Set the tokenA contract addresss
    await contractTurboStaking.setToken(addressTokenA);
    //4.Depositing 50 tokens
    await contractTurboStaking.provideLiquidity(50);

    //5.getting the balance of TurboStaking contract, should return 50
    let turboBalance = await contractTurboStaking.getContractTokenABalance();
    expect(Number(turboBalance)).to.equal(50);
  });

  it("Should deposit 200 tokens as liquidity and withdraw all of it", async () => {
    //1.mint and approve operations - details above
    await contractTokenA.mintToken(1000);
    const valueWithDecimals = ethers.utils.parseEther("2000", 18);
    await contractTokenA.approve(addressTurboStaking, valueWithDecimals);
    //2. setting tokenA contract address
    await contractTurboStaking.setToken(addressTokenA);
    //3.depositing 200 tokens
    await contractTurboStaking.provideLiquidity(200);

    //4. getting the balances for before withdrawal
    let turboBalance1 = await contractTurboStaking.getContractTokenABalance();
    let depositorBalance1 = await contractTurboStaking.getYourTokenABalance();
    console.log(`Contract Balance before withdrawal: ${turboBalance1}`);
    console.log(`Depositor Balance before withdrawal: ${depositorBalance1}`);

    //5. witdrawing all tokens - onlyOwner
    await contractTurboStaking.withdrawBalance();

    //6. getting the balances after withdrawal
    let turboBalance2 = await contractTurboStaking.getContractTokenABalance();
    let depositorBalance2 = await contractTurboStaking.getYourTokenABalance();
    console.log(`Contract Balance after withdrawal: ${turboBalance2}`);
    console.log(`Depositor Balance after withdrawal: ${depositorBalance2}`);

    //7. an expect check
    expect(Number(turboBalance2)).to.equal(0);
  });


});
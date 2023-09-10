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


});
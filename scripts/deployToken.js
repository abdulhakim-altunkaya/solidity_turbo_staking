
const hre = require("hardhat");

async function main() {
  const TokenA = await hre.ethers.getContractFactory("TokenA");
  //deploying contract with 1 million tokens
  const tokenA = await TokenA.deploy(1000000);

  await tokenA.deployed();

  console.log(`tokenA  deployed to ${tokenA.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

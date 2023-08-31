
const hre = require("hardhat");

async function main() {
  const tokenA = await hre.ethers.deployContract("TokenA", [1000000], {});
  await tokenA.waitForDeployment();
  console.log(`tokenA deployed to ${tokenA.target}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

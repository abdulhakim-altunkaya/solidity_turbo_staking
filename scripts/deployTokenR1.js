
const hre = require("hardhat");

async function main() {
  const gasPrice2 = ethers.utils.parseUnits("50", "gwei"); // Set gas price to 20 Gwei (or adjust as needed)
  const gasPrice1 = await ethers.provider.getGasPrice();

  const tokenA = await hre.ethers.deployContract("TokenA", [1000000], {gasPrice2});
  await tokenA.waitForDeployment();
  console.log(`tokenA deployed to ${tokenA.target}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

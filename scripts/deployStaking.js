
const hre = require("hardhat");

async function main() {
  const TurboStaking = await hre.ethers.getContractFactory("TurboStaking");
  const turboStaking = await TurboStaking.deploy();
  await turboStaking.deployed();
  console.log(`turboStaking  deployed to ${turboStaking.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

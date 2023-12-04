const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const chatApp = await ethers.deployContract("ChatApp");
  await chatApp.waitForDeployment();

  console.log('ChatApp deployed to:', chatApp.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
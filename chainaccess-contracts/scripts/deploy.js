const { ethers } = require("hardhat");

async function main() {
  //? This is the new Way
  const AccessPass = await ethers.getContractFactory("AccessPass");
  const contract = await AccessPass.deploy();

  await contract.waitForDeployment(); // ✅ ethers v6 style
  const address = await contract.getAddress();

  console.log(`AccessPass deployed to: ${address}`);
}

main().catch((error) => {
  console.error("ERROR:", error);
  process.exitCode = 1;
});

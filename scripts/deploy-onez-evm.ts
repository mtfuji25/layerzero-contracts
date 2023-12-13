import hre, { ethers } from "hardhat";

import endpoints from "./endpoints.json";

async function main(): Promise<void> {
  console.log(`Running deploy script for evm network`, hre.network.name);

  const ONEZlz = await ethers.getContractFactory("ONEZlz");

  const args = [
    endpoints.linea, // address _lzEndpoint
  ];

  const contract = await ONEZlz.deploy(args[0]);
  await contract.deployTransaction.wait(3);

  console.log("deployed at", contract.address);
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: args,
    contract: "contracts/ONEZlz.sol:ONEZlz",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

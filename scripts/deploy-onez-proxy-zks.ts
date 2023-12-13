import hre from "hardhat";
import { getZkDeployer } from "./zkUtils";

async function main(): Promise<void> {
  console.log(`Running deploy script for zksync network`);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const d = getZkDeployer(hre);

  const ProxyONEZ = await d.deployer.loadArtifact("ProxyONEZlz");

  const args = [
    "0x90059C32Eeeb1A2aa1351a58860d98855f3655aD", // address _token, onez
    "0x9b896c0e23220469C7AE69cb4BbAE391eAa4C8da", // address _lzEndpoint, from documentation
  ];

  const contract = await d.deployer.deploy(ProxyONEZ, args);

  console.log("deployed at", contract.address);
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: args,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

import { task } from "hardhat/config";

import deployment from "./deployment.json";

import CHAIN_ID from "./chainIds.json";

const environments = {
  mainnet: [
    "arbitrumOne",
    "base",
    "ethereum",
    "linea",
    "scroll",
    "zkSyncMainnet",
  ],
};

task(`check-wire-up`).setAction(async ({}, hre) => {
  const environmentArray = environments.mainnet;

  const local = hre.network.name;

  // @ts-ignore
  const localaddr = deployment[local] as string;

  let trustedRemoteTable: any = {};

  trustedRemoteTable = {};

  await Promise.all(
    environmentArray.map(async (env) => {
      try {
        const contract = await hre.ethers.getContractAt("OFTV2", localaddr);

        // @ts-ignore
        const dstChainId = CHAIN_ID[env];

        const minDistGas = await contract.minDstGasLookup(dstChainId, 0);
        trustedRemoteTable[env] = {
          minDistGas: minDistGas.toNumber(),
          remote: await contract.trustedRemoteLookup(dstChainId),
        };
      } catch (error) {
        //catch error because checkWireUpAll is reading console log as input
      }
    })
  );

  console.log(JSON.stringify(trustedRemoteTable, undefined, 2));
});

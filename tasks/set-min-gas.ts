import { task } from "hardhat/config";

import chainIds from "./chainIds.json";
import deployment from "./deployment.json";
import { assert } from "chai";

task(`set-min-gas`)
  .addParam("remote")
  .addParam("packetType")
  .addParam("minGas")
  .setAction(async ({ remote, minGas, packetType }, hre) => {
    const local = hre.network.name;
    // @ts-ignore
    const localaddr = deployment[local] as string;

    // @ts-ignore
    const remotechainid = chainIds[remote] as number;

    assert(remotechainid > 0, "invald remote chain id");

    // get local contract
    const localContract = await hre.ethers.getContractAt("OFTV2", localaddr);

    const minDistGas = await localContract.minDstGasLookup(remotechainid, 0);

    if (minDistGas.toNumber() == minGas) {
      console.log("min gas already set");
      return;
    }

    const tx = await localContract.setMinDstGas(
      remotechainid,
      packetType,
      minGas
    );
    console.log(tx.hash);
  });

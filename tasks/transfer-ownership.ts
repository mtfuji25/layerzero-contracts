import { task } from "hardhat/config";

import chainIds from "./chainIds.json";
import deployment from "./deployment.json";
import { assert } from "chai";

task(`transfer-ownership`)
  .addParam("owner", "remote newtowrk id")
  .setAction(async ({ owner }, hre) => {
    const local = hre.network.name;

    // @ts-ignore
    const localaddr = deployment[local] as string;

    console.log("localaddr", localaddr);
    assert(localaddr.length > 0, "invald localaddr");

    const localContract = await hre.ethers.getContractAt("OFTV2", localaddr);
    const tx = await localContract.transferOwnership(owner);
    console.log(` tx: ${tx.hash}`);
  });

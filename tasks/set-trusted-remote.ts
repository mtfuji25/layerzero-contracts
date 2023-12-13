import { task } from "hardhat/config";

import chainIds from "./chainIds.json";
import deployment from "./deployment.json";
import { assert } from "chai";

task(`set-trusted-remote`)
  .addParam("remote", "remote newtowrk id")
  .setAction(async ({ remote }, hre) => {
    const local = hre.network.name;
    // @ts-ignore
    const localaddr = deployment[local] as string;
    // @ts-ignore
    const remoteaddr = deployment[remote] as string;

    // @ts-ignore
    const remotechainid = chainIds[remote] as number;

    console.log("remotechainid", remotechainid);
    console.log("remoteaddr", remoteaddr);
    console.log("localaddr", localaddr);

    assert(remotechainid > 0, "invald remote chain id");
    assert(remoteaddr.length > 0, "invald remoteaddr");
    assert(localaddr.length > 0, "invald localaddr");

    // get local contract
    const localContract = await hre.ethers.getContractAt("OFTV2", localaddr);

    // concat remote and local address
    const remoteAndLocal = hre.ethers.utils.solidityPack(
      ["address", "address"],
      [remoteaddr, localaddr]
    );

    // check if pathway is already set
    const isTrustedRemoteSet = await localContract.isTrustedRemote(
      remotechainid,
      remoteAndLocal
    );

    if (!isTrustedRemoteSet) {
      try {
        let tx = await (
          await localContract.setTrustedRemote(remotechainid, remoteAndLocal)
        ).wait();
        console.log(
          `✅ [${hre.network.name}] setTrustedRemote(${remotechainid}, ${remoteAndLocal})`
        );
        console.log(` tx: ${tx.transactionHash}`);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log("source already set");
    }
  });

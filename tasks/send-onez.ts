import { task } from "hardhat/config";

import chainIds from "./chainIds.json";
import deployment from "./deployment.json";
import { assert } from "chai";

task(`send-onez`)
  .addParam("remote", "remote newtowrk id")
  .addParam("amt", "amount")
  .setAction(async ({ remote, amt }, hre) => {
    const qty = hre.ethers.utils.parseEther(amt);
    const [deployer] = await hre.ethers.getSigners();
    const toAddress = deployer.address;

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
    // const onez = await hre.ethers.getContractAt(
    //   "ONEZ",
    //   "0x90059C32Eeeb1A2aa1351a58860d98855f3655aD"
    // );
    // await onez.approve(localaddr, qty);

    const localContract = await hre.ethers.getContractAt("OFTV2", localaddr);

    // quote fee with default adapterParams
    const adapterParams = hre.ethers.utils.solidityPack(
      ["uint16", "uint256"],
      [1, 200000]
    ); // default adapterParams example

    const toAddressBytes = hre.ethers.utils.defaultAbiCoder.encode(
      ["address"],
      [toAddress]
    );

    const fees = await localContract.estimateSendFee(
      remotechainid,
      toAddressBytes,
      qty,
      false,
      adapterParams
    );
    console.log(
      `fees[0] (wei): ${fees[0]} / (eth): ${hre.ethers.utils.formatEther(
        fees[0]
      )}`
    );

    const tx = await (
      await localContract.sendFrom(
        deployer.address, // 'from' address to send tokens
        remotechainid, // remote LayerZero chainId
        toAddressBytes, // 'to' address to send tokens
        qty, // amount of tokens to send (in wei)
        {
          refundAddress: deployer.address,
          zroPaymentAddress: hre.ethers.constants.AddressZero,
          adapterParams,
        },
        { value: fees[0] }
      )
    ).wait();

    console.log(
      `✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remotechainid}] token:[${deployer.address}]`
    );
    console.log(` tx: ${tx.transactionHash}`);
    console.log(
      `* check your address [${deployer.address}] on the destination chain, in the ERC20 transaction tab !"`
    );
  });

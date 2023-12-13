import "@matterlabs/hardhat-zksync-node/dist/type-extensions";
import "@matterlabs/hardhat-zksync-verify/dist/src/type-extensions";

import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider, Wallet } from "zksync-web3";
import * as hre from "hardhat";
import dotenv from "dotenv";

// Load env file
dotenv.config();

export const getProvider = () => {
  const rpcUrl = hre.network.config.url;
  if (!rpcUrl)
    throw `⛔️ RPC URL wasn't found in "${hre.network.name}"! Please add a "url" field to the network config in hardhat.config.ts`;
  return new Provider(rpcUrl);
};

export const getWallet = (privateKey?: string) => {
  if (!privateKey) {
    // Get wallet private key from .env file
    if (!process.env.WALLET_PRIVATE_KEY)
      throw "⛔️ Wallet private key wasn't found in .env file!";
  }

  const provider = getProvider();

  // Initialize zkSync Wallet
  return new Wallet(privateKey ?? process.env.WALLET_PRIVATE_KEY!, provider);
};

export const getZkDeployer = (hre: HardhatRuntimeEnvironment) => {
  // load wallet private key from env file
  const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

  if (!PRIVATE_KEY)
    throw "⛔️ Private key not detected! Add it to the .env file!";

  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);
  return { wallet, deployer };
};

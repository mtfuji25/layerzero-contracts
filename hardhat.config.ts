import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-abi-exporter";

import dotenv from "dotenv";
dotenv.config();

import "./tasks/set-trusted-remote";
import "./tasks/send-onez";
import "./tasks/set-min-gas";
import "./tasks/check-wire-up";
import "./tasks/transfer-ownership";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const privateKey = process.env.WALLET_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic:
          "burger broccoli appear involve admit own next member begin direct flee host seven game hat",
      },
    },
    arbitrumOne: {
      url: "https://1rpc.io/arb",
      accounts: [privateKey],
    },
    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io",
      accounts: [privateKey],
    },
    base: {
      url: "https://1rpc.io/base",
      accounts: [privateKey],
    },
    linea: {
      url: "https://1rpc.io/linea",
      accounts: [privateKey],
    },
    scroll: {
      url: "https://1rpc.io/scroll	",
      accounts: [privateKey],
    },
    ethereum: {
      url: "https://1rpc.io/eth",
      accounts: [privateKey],
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  abiExporter: {
    path: "abis",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
  },
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_KEY || "",
      base: process.env.BASESCAN_KEY || "",
      linea: process.env.LINEASCAN_KEY || "",
      scroll: process.env.BASESCAN_KEY || "",
    },
    customChains: [
      {
        network: "linea",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};

export default config;

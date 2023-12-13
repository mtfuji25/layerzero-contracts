import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-node";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import "hardhat-abi-exporter";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  defaultNetwork: "inMemoryNode",
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
  networks: {
    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io",
      ethNetwork: "mainnet",
      zksync: true,
      verifyURL:
        "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
    hardhat: {
      zksync: false,
    },
  },
  zksolc: {
    version: "1.3.16",
    settings: {
      // find all available options in the official documentation
      // https://era.zksync.io/docs/tools/hardhat/hardhat-zksync-solc.html#configuration
    },
  },
  solidity: {
    version: "0.8.19",
  },
};

export default config;

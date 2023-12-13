# LayerZero Integration

This repo contains the deployment scripts for the layerzero integartion.

### ONEZ OFT Addresses

zkSync ONEZ OFT: [0xAA3d499FbD32b2601936A3e6bA95aC397498D34C](https://explorer.zksync.io/address/0xAA3d499FbD32b2601936A3e6bA95aC397498D34C)

Arbitrum ONEZ OFT: [0x7614a017FD3D017D8d09507f88a0A083FebAaC0a](https://arbiscan.io/address/0x7614a017FD3D017D8d09507f88a0A083FebAaC0a)

Base ONEZ OFT: [0x7614a017FD3D017D8d09507f88a0A083FebAaC0a](https://basescan.org/address/0x7614a017FD3D017D8d09507f88a0A083FebAaC0a)

Linea ONEZ OFT: [0x7614a017FD3D017D8d09507f88a0A083FebAaC0a](https://lineascan.build/address/0x7614a017FD3D017D8d09507f88a0A083FebAaC0a)

### Deploy Commands

zkSync

```
npx hardhat --config hardhat.config.zksync.ts run scripts/deploy-onez-proxy-zks.ts --network zkSyncMainnet
```

Arbitrum One

```
npx hardhat --config hardhat.config.ts run scripts/deploy-onez-evm.ts --network arbitrumOne
```

Base

```
npx hardhat --config hardhat.config.ts run scripts/deploy-onez-evm.ts --network base
```

### Connect Commands

```
npx hardhat set-trusted-remote --remote zkSyncMainnet --network arbitrumOne
npx hardhat set-trusted-remote --remote arbitrumOne --network zkSyncMainnet

npx hardhat set-min-gas --packet-type 0 --remote arbitrumOne --min-gas 100000 --network zkSyncMainnet
```

### Send Commands

```
npx hardhat send-onez --remote base --amt 1 --network arbitrumOne
```

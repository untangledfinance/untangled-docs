---
id: contracts
title: Contract Addresses
sidebar_label: Contracts
sidebar_position: 1
description: Verified on-chain addresses for OctoGear contracts on Polygon mainnet.
---

# Contract Addresses

All OctoGear contracts are deployed on **Polygon mainnet** (chainId 137). The pool underlying is **USDC.e** (bridged USDC).

:::info
Addresses are sourced from `apps/web/src/lib/web3/manifests/polygon/{gearbox,network}.json`, cross-checked 2026-06-01.
:::

## Gearbox V3 core

| Contract | Address |
|---|---|
| PoolV3 (Pool Alpha) | `0x33850724CaEB88a40108Ea3d77a19Dc505Ec9AaF` |
| CreditFacadeV3 | `0x9A1bcA4AbBB2ea4683603c1EC85Eb3515BE9d859` |
| CreditManagerV3 | `0x31d46a82F80806ce006554555d1326c0283e81c6` |
| CreditConfiguratorV3 | `0x34E713b2c073f371F030cd82826173b482c90902` |
| PriceOracleV3 | `0xB7F7FC2dA9a9794EBc0C604ea2273CD386Ce4032` |
| Gauge | `0xbE31b2f1362B57357B8f8e832B645fBcb4C8928E` |
| PoolQuotaKeeperV3 | `0xD603de2816fa191A673E2D8952F4fBCD78e33a76` |
| AccountFactoryV3 | `0xFbbAbFd50A51C844D14055FEA121F4ae7149Fe17` |
| BotListV3 | `0x0be1F206AD71Db0Eb5278c0E30cCba6a1C1Ba0D3` |

## OctoGear adapters and registries

| Contract | Address | Role |
|---|---|---|
| PolymarketAdapter | `0x994B1A108d20235E9c056b8138b735132deFE7Fa` | Whitelisted adapter for Polymarket CTF custody |
| PUSDOnrampAdapter | `0x5A693770c4c5Faae0aff62D9CeF859c384c4B789` | Wraps USDC.e → pUSD |
| PUSDOfframpAdapter | `0xd0531a47c90437a01586315A801167679f2A7fce` | Unwraps pUSD → USDC.e |
| PUSDTransferAdapter | `0xD5466Fb312590c31C0B25dc34e5ac3F84B105ee1` | Transfers pUSD to SmartMaker |
| MarketRegistry | `0x88EC3D80B81460eDc076676c166Cf229B470f1E3` | Market whitelist, lockdown, and resolution state |
| SmartMakerRegistry | `0xffedE65494E3ce5a298ab96e7e674a4512BFDb81` | Per-credit-account CTF custody contracts |

## Assets

| Token | Address | Decimals |
|---|---|---|
| USDC.e (bridged USDC) | `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` | 6 |
| pUSD (Polymarket USDC wrapper) | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` | 6 |
| Polymarket CTF (ERC-1155) | `0x4D97DCd97eC945f40cF65F87097ACe5EA0476045` | n/a |
| CTFExchangeV2 (binary) | `0xE111180000d2663C0091e4f400237545B87B996B` | n/a |
| Multicall3 (canonical) | `0xcA11bde05977b3631167028862bE2a173976CA11` | n/a |

## Whitelisted markets

### Anthropic valued higher than OpenAI in 2026?

| Field | Value |
|---|---|
| Condition ID | `0xcd4d54b18c84e172b7d066c12bc0460e066814ce12a7402d01f7df73960efece` |
| YES Phantom token | `0x7F9296EC47292f9a4B176a32F4aD82b3B757c981` |
| NO Phantom token | `0x8dE9251D26773Ef8158184f020E55751961B856F` |
| YES Price Feed | `0x443485F77f1ae833d21b13d5bE7fd59f8e48Fbb4` |
| NO Price Feed | `0x834574531af73f053e02332CefcE2B331dBac2b2` |
| Resolution date | 2026-12-31 UTC |

More markets will be added as they are whitelisted by the OctoGear team.

## NEAR

| Resource | Value |
|---|---|
| NEAR MPC contract | `v1.signer` (mainnet) |
| NEAR RPC | `https://rpc.mainnet.near.org` |

## Verify addresses

All Polygon addresses can be verified on [Polygonscan](https://polygonscan.com). The canonical source is the manifests in the OctoGear repository.

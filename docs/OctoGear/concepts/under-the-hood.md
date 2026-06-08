---
id: under-the-hood
title: Technology Stack
sidebar_label: Technology Stack
sidebar_position: 3
description: The technology behind OctoGear — NEAR Chain Signatures, NEAR Intents, Gearbox V3, Polymarket adapters, and Hyperliquid HIP-3.
---

# Technology Stack

OctoGear is assembled from four core infrastructure layers. You do not need to understand any of this to use the app, but it helps to know what is running behind the scenes.

## NEAR Chain Signatures

Your passkey (Touch ID / Face ID / Windows Hello) creates a NEAR identity via WebAuthn. That NEAR identity controls your Polygon address via NEAR's **Chain Signatures MPC network** — a distributed key management system that produces valid secp256k1 signatures for any EVM chain without ever materialising a private key on a single device or server.

**What this means for you:** There is no seed phrase and no key file to lose. Your Polygon address is derived deterministically from your passkey — the same passkey on any device reaches the same on-chain account.

The MPC contract is `v1.signer` on NEAR mainnet. Every Polygon transaction requires a round-trip to the MPC network (~15 seconds). For Hyperliquid trading, session keys solve this — see below.

## Session keys for fast execution

15-second MPC latency is unusable for active trading. When you activate a Hyperliquid account, your master identity signs one approval that delegates trading authority to a temporary in-browser session key. From that point, the session key signs all orders locally — no MPC round-trip, no wallet prompt per trade.

Session keys are stored in your browser. The on-chain delegation persists until you revoke it from Hyperliquid's interface. Clearing browser storage removes the local key copy but does not revoke the on-chain delegation.

## NEAR Intents (coming soon)

NEAR Intents will enable cross-chain deposits into your Prime Account from any supported chain — without manually bridging to Polygon first. Send from Ethereum, Solana, or any supported chain and land USDC.e in your Polygon credit account. The library is built and will be wired to the UI in a coming release.

## Gearbox V3 credit accounts

OctoGear's borrowing layer is a fork of Gearbox Protocol V3 — an audited DeFi credit infrastructure. Key properties:

- **Isolated accounts** — each borrower has their own smart contract wallet; one account's failure cannot affect others
- **Atomic solvency check** — every transaction bundle is checked for HF ≥ 1.0 at exit; if the check fails, the entire transaction reverts
- **Adapter whitelisting** — only OctoGear-approved protocol interactions are executable inside a credit account, constraining what borrowed funds can do

## Polymarket whitelisted adapter

OctoGear deploys a whitelisted Gearbox adapter for Polymarket CTF outcome tokens. The adapter handles:

- CTF deposit into the SmartMaker (per-credit-account custody contract)
- Quota activation (enabling a position to count toward weighted collateral)
- Redemption of resolved positions

Polymarket trades are routed through OctoGear's API proxy, which attaches the required authentication headers for Polymarket's CLOB without storing your API credentials in the browser.

## Hyperliquid HIP-3

OctoGear's perpetual futures surface uses Hyperliquid's HIP-3 perp infrastructure via HyperEVM. All market data — prices, orderbook, positions, fills — comes directly from Hyperliquid's live REST and WebSocket gateways. There are no on-chain manifests for Hyperliquid on OctoGear's side.

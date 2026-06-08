---
id: intro
title: About OctoGear
sidebar_label: About OctoGear
sidebar_position: 1
description: OctoGear is the leveraged trading layer for prediction markets — one Prime Account for trading, borrowing, and earning across multiple chains and venues.
---

# About OctoGear

OctoGear is the leveraged trading layer for prediction markets. It gives traders, LPs, and AI agents a single account to trade prediction market outcomes, borrow against collateral, and earn yield on idle capital — across multiple chains and venues, under one identity.

## Key features

### One Prime Account, multiple venues

A single NEAR identity controls credit accounts across Polymarket (Polygon) and Hyperliquid perps (HyperEVM) through one interface. No manual bridging between venues. No separate accounts to manage.

### Trade, Borrow, Earn

- **Trade** — buy YES/NO outcome tokens on Polymarket and long/short perpetual futures on Hyperliquid
- **Borrow** — deposit prediction market positions or USDC as collateral, borrow USDC against them at the portfolio level
- **Earn** — deposit USDC into Pool Alpha and earn variable yield from borrower interest, with no exposure to prediction market outcomes

### Deposit and withdraw from any chain

NEAR Intents enables cross-chain deposits and withdrawals — fund your Prime Account from any supported chain without manual bridging. Coming soon.

### Non-custodial and permissionless

OctoGear never holds your funds. Your assets are controlled by your passkey or EVM wallet at all times. There is no KYC at the protocol layer.

### Fast execution via session keys

The Prime Account uses session keys on Hyperliquid — one master approval delegates signing to an in-browser agent key, enabling block-time order execution without a wallet prompt on every trade.

### Agent-native

The Prime Account is built for autonomous agents. Session keys and the OctoGear MCP server allow AI trading bots to operate at venue speed without MPC signature latency on every action.

---

## Under the hood

| Layer | Technology |
|---|---|
| Multi-chain identity | NEAR Chain Signatures (MPC) |
| Cross-chain deposits | NEAR Intents (coming soon) |
| Credit infrastructure | Gearbox V3 credit accounts |
| Prediction market venue | Polymarket (whitelisted adapter) |
| Perp venue | Hyperliquid HIP-3 |
| More venues | Coming soon |

---

## Current state

OctoGear is live on **Polygon mainnet** (Pool Alpha, USDC.e) and **HyperEVM** via Hyperliquid. The codebase is pre-audit — use small amounts until you are comfortable with the mechanics. See [Risk Disclosures](./reference/risk-disclosure) before depositing.

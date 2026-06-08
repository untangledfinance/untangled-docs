---
id: prime-account
title: The Prime Account
sidebar_label: Prime Account
sidebar_position: 1
description: The Prime Account is a single cross-chain identity that unifies trading, borrowing, and earning across prediction market venues.
---

# The Prime Account

The Prime Account is the core of OctoGear. It is a single identity — derived from your passkey or EVM wallet — that controls credit accounts across multiple chains and venues from one interface.

## What the Prime Account does

A standard on-chain setup requires separate accounts, wallets, and capital pools for each venue. The Prime Account collapses this into one login and one risk view.

From a single Prime Account you can:

- Trade Polymarket YES/NO outcome tokens on Polygon
- Long or short perpetual futures on Hyperliquid (HyperEVM)
- Borrow USDC against collateral — prediction market positions, USDC, and other supported assets
- Earn yield by depositing into Pool Alpha
- View your full portfolio — credit line, health factor, LP position, and open positions — on one dashboard

## Credit at the portfolio level

The Prime Account holds both PM and non-PM positions. Prediction market shares, USDC, and other collateral types all sit in the same credit account, and **credit is extended at the portfolio level** — not against individual positions in isolation.

This matters for jump risk. If a single prediction market outcome resolves to zero, the rest of the portfolio's collateral still supports the credit line. A diversified Prime Account is more resilient than a single-position borrow.

## Agent-native

The Prime Account is designed for autonomous agents. Session keys on Hyperliquid allow an AI agent to sign and submit orders at block speed without requiring a wallet confirmation on every action. The OctoGear MCP server lets agents interact with the Prime Account through standard tool-use protocols.

## Identity options

| Method | How it works | Best for |
|---|---|---|
| Passkey | Browser Touch ID / Face ID / Windows Hello creates a NEAR identity via WebAuthn. The passkey derives a NEAR account → Polygon address via NEAR Chain Signatures MPC. No seed phrase, no private key file. | New users; mobile-first |
| EVM wallet | Connect MetaMask, Coinbase Wallet, WalletConnect, or Rainbow. Standard wallet flow. | Users with an existing wallet holding POL and USDC.e |

Both identities can be active simultaneously. Switch the active identity from the connect dropdown without disconnecting either.

## Current limitations

- **Cross-chain margin**: unification of Polygon and HyperEVM credit accounts into a single health factor is on the roadmap. At launch, each chain has its own credit account.
- **Cross-chain deposits**: NEAR Intents (deposit from any chain) is built and on the roadmap. For now, fund your Polygon address directly.

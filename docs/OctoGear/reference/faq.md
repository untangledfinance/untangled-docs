---
id: faq
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 2
description: Common issues and how to resolve them when using OctoGear.
---

# Troubleshooting

## Connection and setup

**Passkey activation is stuck on "Activating…"**

The sponsor service tops up your NEAR balance once per 24 hours per account. If it shows `Cooldown` or `Daily ceiling`, the window has not reset. Wait and try again, or send a small amount of NEAR directly to your NEAR account address (visible in the connect dropdown).

**The app asks me to switch network**

You are connected on a chain other than Polygon mainnet (chainId 137). Click **Switch network** in the banner — your wallet will prompt you to confirm.

**I lost my passkey device**

If you registered a backup passkey on another device, use it to sign in. If you have no backup, the account is inaccessible — your on-chain assets remain at the derived Polygon address but cannot be signed for. This is why setting up a backup passkey before depositing is important.

---

## Borrowing

**"TokenIsNotQuotedException" error when borrowing**

The risk parameters for that market have not been activated yet. You can still buy outcome tokens, but depositing them as collateral and borrowing against them requires the OctoGear team to activate the quota for that market. Wait for the update.

**My health factor did not update after buying**

Polymarket's indexer lags on-chain settlement by a few seconds. The page re-polls at 3 and 8 seconds after a buy. If it still looks wrong after 15 seconds, the position may not be activated as collateral — look for the amber **"Activate as collateral"** button in the Collateral card on Home or Borrow.

**Full-debt repay reverts**

Interest accrues every Polygon block (~2 seconds). The app builds in a small tolerance, but occasionally the exact debt shifts between simulation and submission. Repay a slightly smaller amount and leave dust — a dedicated full-close flow is coming.

**"Maker address not allowed" on first buy**

This appears on your first trade from a new custody wallet. The app fires a balance-allowance update automatically — retry the buy once after a moment and it will succeed.

---

## Trading

**I can't buy outcomes as an EVM wallet user**

Polymarket outcome trading currently requires a passkey identity. EVM wallet users can lend and borrow. Outcome trading for EVM wallets is on the roadmap.

**My Hyperliquid position was liquidated but I didn't see it coming**

HyperCore (Hyperliquid's engine) liquidates positions autonomously when margin falls below the maintenance threshold — independently of OctoGear's interface. Always manage leverage within Hyperliquid's own margin requirements and monitor your Hyperliquid account directly for perp positions.

**My session key stopped working**

If browser storage was cleared, the local session key was deleted. Re-activate your Hyperliquid account from the Trade page to generate a new session key. To fully revoke the old delegation, use Hyperliquid's interface.

---

## General

**Not enough POL for gas**

You need POL on the Polygon address making the transaction. For passkey users, that is the derived chain-signatures address shown in the connect dropdown. Bridge POL from Ethereum or buy from an exchange that supports Polygon withdrawals.

**A modal appears stuck**

Hard refresh the page. If a transaction was mid-broadcast when the issue occurred, check [Polygonscan](https://polygonscan.com) for your address to see if it landed.

**Where can I report a bug?**

Open an issue in the OctoGear GitHub repository (link in the connect dropdown footer).

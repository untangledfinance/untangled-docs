---
id: risk-disclosure
title: Risk Disclosures
sidebar_label: Risk Disclosures
sidebar_position: 3
description: Risk disclosures for using OctoGear — smart contract risk, leverage, prediction market resolution, session keys, and more.
---

# Risk Disclosures

OctoGear is a non-custodial, pre-audit protocol. Read these disclosures before depositing or trading.

## Non-custodial — you hold the keys

Your account is controlled by a passkey on your device via NEAR multi-party computation (MPC). OctoGear does not store, escrow, or recover your private key. No one at OctoGear can move your funds or sign on your behalf.

If you lose access to your passkey and have no backup, you lose access to your funds permanently. Register a backup passkey before depositing significant amounts.

## Leverage can cause total loss

Borrowing against collateral amplifies both gains and losses. If your collateral value falls — because a prediction market resolves against you, or because a perp position moves against you — your credit account can be liquidated. Liquidation repays the outstanding debt from your collateral. You may receive nothing back if the collateral exactly covers the debt or is insufficient.

## Prediction market resolution risk

Prediction market collateral has a binary payoff. A YES position that resolves NO becomes worth zero in a single block — there is no gradual decline and no opportunity to liquidate at an intermediate price. OctoGear pre-prices this risk through decaying Liquidation Thresholds, but the risk cannot be eliminated. Do not borrow against PM collateral in amounts that would cause a loss you cannot recover from.

## Smart contract risk

OctoGear's adapters and registries are pre-audit. Gearbox V3 has been audited independently; OctoGear's extensions have not. Bugs, exploits, and unexpected contract behaviour can result in partial or total loss of deposited funds. Use amounts you are prepared to lose entirely while the audit is in progress.

## Liquidation is autonomous

Your credit account can be liquidated by a third-party liquidator when your health factor falls below 1.0. OctoGear's interface does not intervene. On Hyperliquid, HyperCore's engine can liquidate your perp position independently of OctoGear's credit account — a perp position may be closed by the exchange before OctoGear's interface reflects it.

## Session key risk

The Hyperliquid session key stored in your browser can sign perp orders on your behalf until you revoke it. If someone gains access to your browser session, they may be able to trade on your behalf. Clearing browser storage removes the local key copy but does not revoke the on-chain delegation — revoke via Hyperliquid's interface if you stop trusting the browser session.

## Passkey and device loss

Passkey-derived accounts cannot be recovered without the passkey. If you have only one registered passkey and lose the device, your funds are inaccessible. Register a backup passkey on a second device before depositing significant amounts.

## Geographic restrictions

Polymarket access is restricted in several jurisdictions (including the US, UK, Vietnam, Singapore, and others). OctoGear routes order traffic to Polymarket but does not change your legal status. Comply with your local laws and regulations. Hyperliquid applies its own geographic and KYC policy at the gateway level — OctoGear does not control that determination.

## Sponsor service limits

The NEAR sponsor service that tops up passkey accounts for gas is rate-limited (once per 24 hours per account). During high-traffic periods the daily ceiling may be reached. Fund your NEAR account directly if the sponsor is unavailable.

## No insurance

There is no insurance fund covering smart contract exploits or bad debt. Lender pool funds may absorb bad debt if liquidated collateral is insufficient to cover outstanding loans. Do not deposit amounts into Pool Alpha that you are not prepared to lose.

---

*This document was last updated 2026-06-08. It does not constitute financial or legal advice.*

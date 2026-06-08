---
id: credit-accounts
title: Credit Accounts and Health Factor
sidebar_label: Credit Accounts & Health Factor
sidebar_position: 2
description: How Gearbox V3 credit accounts work, and how the health factor determines borrowing capacity and liquidation risk.
---

# Credit Accounts and Health Factor

OctoGear's borrowing infrastructure is built on Gearbox V3 credit accounts. Understanding how they work helps you manage your borrowing position safely.

## What is a credit account?

A credit account is an isolated smart contract wallet deployed specifically for you. It holds your collateral and your borrowed funds together. Every action — depositing collateral, borrowing USDC, repaying debt — is checked against your account's health factor at the end of each transaction.

- **Health factor ≥ 1.0**: transaction succeeds
- **Health factor < 1.0**: transaction reverts — the protocol prevents you from creating an unhealthy state

Each credit account is isolated. A liquidation in your account cannot affect other accounts or drain the lending pool beyond your own position.

## Health factor

Your health factor measures the ratio of your weighted collateral value to your total debt:

```
Health Factor = Weighted Collateral Value (USD) / Total Debt (USD)
```

Each collateral type has a **Liquidation Threshold (LT)** — the fraction of its market value that counts toward your weighted collateral. Riskier collateral types have lower LTs and count for less.

| Band | Health Factor | What it means |
|---|---|---|
| Safe | ≥ 1.5 | Healthy margin |
| Watch | 1.2 – 1.5 | Monitor closely |
| Caution | 1.05 – 1.2 | Consider adding collateral or repaying |
| Danger | < 1.05 | Liquidation imminent |

Liquidation triggers automatically at **HF < 1.0**. A liquidator closes your position, repays the outstanding debt from your collateral, and returns any remaining collateral value to you.

## Liquidation Thresholds by collateral type

| Asset | LT |
|---|---|
| USDC.e | 95% |
| Polymarket YES / NO (> 7 days to resolution) | 40% |
| Polymarket YES / NO (3 – 7 days to resolution) | 30% |
| Polymarket YES / NO (1 – 3 days to resolution) | 20% |
| Polymarket YES / NO (< 24 hours to resolution) | 10% |

Prediction market collateral has a **time-decaying LT**. As a market approaches resolution, the LT decreases — reflecting the increasing probability of a binary outcome. Monitor your health factor closely in the final 72 hours of any whitelisted market.

## Activating collateral

After buying a Polymarket outcome token, the position lives in your custody wallet — it is not yet on your credit account. Two steps are required:

1. **Deposit** — transfer the position into your credit account's SmartMaker (done automatically after a Buy, or manually)
2. **Activate as collateral** — tap the amber **"Activate as collateral"** button in the Collateral card on the Borrow or Home page

Until step 2 is complete, the position does not count toward your weighted collateral or health factor.

## Repaying debt

You can repay any amount at any time. Interest accrues every Polygon block (~2 seconds), so the exact outstanding amount changes continuously. To repay the full balance, the app builds in a small tolerance — leave a dust amount if the exact repay fails and use the full-close flow when available.

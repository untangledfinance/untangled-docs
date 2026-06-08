---
id: add-strategies
title: Add Strategies (Credit Managers)
sidebar_label: 3. Add Strategies
sidebar_position: 4
description: How to attach borrowing strategies to an OctoGear market — leverage parameters, liquidation economics, and position limits.
---

# Add Strategies (Credit Managers)

A **Strategy** (technically a "Credit Manager") is the credit product offered to borrowers. While the Pool holds the liquidity, the Strategy defines *how that liquidity can be used*.

Examples:
- "USDC.e Conservative" — low risk, high LTV, whitelisted stablecoins only
- "PM Leveraged Trading" — prediction market collateral, moderate LTV, Polymarket adapter

You can attach multiple strategies to a single pool to segment risk and offer different terms for different borrower profiles.

## How to add a strategy

### Step 1 — Select a strategy bundle

In the curation interface, open the **New Strategy** tab and search for the collateral token you want to support (e.g. cUSDC, YES tokens). Strategy bundles are pre-configured recipes — selecting one automatically configures the smart contract adapters needed to enable leverage for that asset.

If no bundle exists for your target token, contact the OctoGear team to request one.

### Step 2 — Set leverage parameters

**Liquidation Threshold (LT)**

The primary lever for risk management. Sets the maximum leverage borrowers can take.

- Formula: `Max Leverage = 1 / (1 - LT)`
- Example: LT 90% → 10x leverage; LT 80% → 5x leverage

**Interest Fee (revenue)**

The percentage of borrowing interest captured as curator revenue, split 50/50 with the Protocol DAO by default. This is charged *on top* of the base rate — if the base rate is 5% and your fee is 20%, borrowers pay 6%. The Interest Fee is fixed at deployment; changing it later requires a new Credit Manager.

### Step 3 — Liquidation economics

These parameters incentivise third-party liquidators to keep the protocol solvent.

| Parameter | Description |
|---|---|
| **Liquidation Premium** | Percentage of collateral paid to the liquidator as a reward |
| **Liquidation Fee** | Percentage of collateral taken by the Protocol (Curator + DAO) during liquidation |

Set the premium high enough to cover slippage, gas, and oracle uncertainty. If liquidators are not incentivised to execute, the system will accumulate bad debt.

### Step 4 — Position limits

| Parameter | Description |
|---|---|
| **Min Debt** | Must be high enough to cover liquidator gas costs |
| **Max Debt** | Limits single-account exposure |
| **Max Enabled Tokens** | Maximum number of different collateral tokens a user can hold simultaneously (keep at 1 for efficiency) |

**Technical constraint:** `maxDebt / minDebt ≤ 100 / maxEnabledTokens`

Example: 4 tokens → ratio is 25 → if Min Debt = $10,000, Max Debt ≤ $250,000.

### Step 5 — Lifecycle (optional)

For fixed-term products (e.g. a "Season 1" pool), configure an expiration date. After this date, all accounts can be liquidated regardless of health factor, and new borrowing is disabled. You can set separate liquidation penalties for the expired period.

### Step 6 — Review and deploy

Review the configuration summary in the interface, then proceed to [Execute Onchain](./execute-onchain).

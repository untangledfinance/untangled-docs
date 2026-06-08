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

## OctoGear adapter architecture

Before configuring strategies, understand how OctoGear's adapters work together:

| Adapter | Role |
|---|---|
| **PolymarketAdapter** | Whitelisted adapter for Polymarket CTF custody — routes buy/sell orders through the CTFExchangeV2 |
| **PUSDOnrampAdapter** | Wraps USDC.e → pUSD (Polymarket's USDC wrapper) before placing orders |
| **PUSDOfframpAdapter** | Unwraps pUSD → USDC.e after closing positions |
| **PUSDTransferAdapter** | Transfers pUSD to a credit account's `SmartMaker` contract |

Polymarket outcome tokens (YES/NO) are **not** held directly in the credit account. Each account gets a dedicated `SmartMaker` custody contract (tracked by the `SmartMakerRegistry`) that holds the CTF ERC-1155 tokens. The credit account's collateral value is computed from the SmartMaker's CTF holdings via price feeds set in `PriceOracleV3`.

**Before enabling a prediction market as collateral**, confirm with the OctoGear team that:
1. The market is whitelisted in the `MarketRegistry`
2. Price feeds for its YES and NO phantom tokens exist in `PriceOracleV3`

## How to add a strategy

### Step 1 — Select a strategy bundle

In the curation interface, open the **New Strategy** tab and search for the collateral token you want to support. Strategy bundles are pre-configured recipes that automatically wire the necessary adapters (PolymarketAdapter, PUSD adapters) for that asset.

If no bundle exists for your target token, contact the OctoGear team to request one — adapter deployment and MarketRegistry whitelisting must happen before a bundle can be created.

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

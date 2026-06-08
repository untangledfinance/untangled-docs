---
id: create-market
title: Create a Market
sidebar_label: 2. Create a Market
sidebar_position: 3
description: How to deploy an OctoGear lending market — pool parameters, interest rate model, and loss policy.
---

# Create a Market

A **Market** consists of a liquidity pool and the risk rules that govern it. Lenders deposit into the pool; borrowers draw liquidity through attached strategies (credit managers).

## Prerequisites

Before creating a market, the underlying asset (the token lenders will deposit) must be whitelisted in the **Price Feed Store** for the target chain. Check the Price Feed Store in the curation interface — if your token is missing, you must add a price feed first.

## Market parameters

### Asset and identity

| Parameter | Description |
|---|---|
| **Pool version** | Select the latest verified version (currently v3.1) |
| **Underlying asset** | The token lenders deposit (e.g. USDC.e) |
| **Price feed** | Oracle feed used to value this asset |
| **Market name** | A descriptive name for your dashboard |

### Global capacity (Total Debt Limit)

The maximum amount of the underlying token that can be borrowed from the entire pool. Set this higher than your immediate target TVL to avoid frequent updates.

### Interest Rate Model

OctoGear uses a **Two-Kink Model** to create a stable optimal utilisation zone.

| Parameter | Description |
|---|---|
| **U1 (Optimal Low)** | Start of the target utilisation range |
| **U2 (Optimal High)** | End of the target utilisation range |
| **R_base** | Interest rate at 0% utilisation (minimum cost of capital) |
| **R_slope1 / R_slope2** | Rate increase as utilisation rises to U1 and U2 |
| **R_slope3 (Penalty)** | Sharp rate spike after U2 — forces borrowers to repay as liquidity tightens |

**Strategy tip:** Target 80–85% utilisation. Set the borrow rate in this range to roughly 60–70% of the expected yield of the collateral strategies, leaving a healthy spread for borrowers while attracting lenders.

**Important — the curator fee is additive.** The Interest Fee (curator and DAO revenue) is charged *on top* of the rate paid to lenders. If the IRM rate is 5% and your Interest Fee is 20%, borrowers pay 6% total. Account for this when calibrating the IRM.

### Rate governance (Tumbler)

- **Type:** Select **Tumbler** — allows the curator to manually update collateral-specific rates.
- **Epoch length:** The mandatory waiting period between rate updates (e.g. 2 days = rates can only change every 48 hours, giving borrowers predictability).

### Loss policy

Defines how the protocol handles bad debt (positions insolvent even after liquidation).

- **Policy type:** Select **Aliased**. During extreme market events (e.g. a collateral flash crash), the system can switch to a fundamental price (e.g. exchange rate) to prevent fire-sale liquidations and pause them until the market stabilises.

## Next steps

The liquidity pool is now deployed. Users cannot borrow yet because no **strategies** (credit managers) are attached. Continue to [Add Strategies](./add-strategies).

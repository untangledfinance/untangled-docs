---
id: claim-fees
title: Claim Accrued Fees
sidebar_label: 5. Claim Fees
sidebar_position: 6
description: How curators claim accrued interest and liquidation fees from their OctoGear markets.
---

# Claim Accrued Fees

Unclaimed fees sit in the protocol and act as a first line of defence against bad debt. If a liquidation results in a loss, the protocol can burn accrued fees to cover the deficit before touching the liquidity pool. Claim fees periodically to realise your revenue.

## Steps

### Step 1 — Initiate a proposal

In the curation interface:

1. Click **New GIP** (or select an existing draft).
2. Select the **Market** you want to claim fees from.

### Step 2 — Add the distribution action

1. Go to the **Details** tab of the market.
2. Locate the **Accrued Fees** section.
3. Click **Distribute** — this adds a fee distribution transaction to your GIP batch. It does not execute immediately.

### Step 3 — Execute via timelock

Like all governance actions, claiming fees follows the standard proposal lifecycle:

1. **Finalize** the GIP.
2. **Queue** the transaction in your Safe (starts the 24h timelock).
3. **Execute** the transaction after the timelock expires.

Once executed, the funds appear in your **Fee Collector** wallet.

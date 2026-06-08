---
id: execute-onchain
title: Execute Transactions Onchain
sidebar_label: 4. Execute Onchain
sidebar_position: 5
description: How to queue and execute OctoGear governance transactions through the 24-hour timelock.
---

# Execute Transactions Onchain

This is the final step. With the market configured and parameters verified, the changes are ready to be pushed to the live blockchain.

## The timelock lifecycle

The protocol enforces a **24-hour timelock** on all critical changes, giving lenders and borrowers time to exit if they disagree with a parameter change. Deployment is two distinct actions:

1. **Queue (Propose)** — submit the transaction to the Timelock contract. The 24-hour countdown begins.
2. **Execute (Apply)** — after the countdown ends, submit a second transaction to apply the changes.

## Steps

### Step 1 — Finalize the proposal

In the curation interface, navigate to your proposal (GIP) page.

1. Click **Finalize GIP** — this locks the configuration and prepares the transaction data.
2. Set the **Earliest Execution Date**: add at least a 2-hour signing buffer on top of the 24-hour timelock to give multisig signers time to collect signatures.

If last-minute edits are needed, click **Reopen for Changes** and re-finalize after editing.

### Step 2 — Queue the transaction

The interface generates a link to the Safe App.

1. Click the link to open the Safe.
2. Sign and submit the transaction — this initiates the onchain timer.

### Step 3 — Execute (after 24 hours)

Once the timelock expires:

1. Return to the Safe App.
2. Sign and submit the final execution transaction.

## Deployment complete

The market is now live on the blockchain.

- **New pools** — lenders can deposit assets.
- **New strategies** — borrowers can open Credit Accounts.

Continue to [Claim Accrued Fees](./claim-fees) to understand how curator revenue works after launch.

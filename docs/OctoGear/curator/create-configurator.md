---
id: create-configurator
title: Create a Market Configurator
sidebar_label: 1. Create a Configurator
sidebar_position: 2
description: How to deploy a Market Configurator — the root admin contract for your OctoGear lending market.
---

# Create a Market Configurator

The **Market Configurator** is the central administration contract for your lending business. It is the root permission node from which you deploy markets, adjust risk parameters, and manage fee distribution. Deploy it once per blockchain network.

## Before you start

**Drafting vs. signing are separate steps.** The OctoGear curation interface is a *drafting tool*, not a signing terminal.

- **Drafting** — connect any standard wallet to the UI to configure parameters and generate transaction files.
- **Signing** — execution happens in a Gnosis Safe. Operations teams can draft complex updates without requiring signers to connect high-security wallets to the web interface.

**Using an institutional MPC wallet (Fordefi, Fireblocks, etc.)?** MPC wallets often lack direct support for batch transaction builders. Deploy a 1/1 Safe multisig with your MPC address as the sole signer — this acts as a compatibility layer while retaining MPC custody.

## Deployment steps

### Step 1 — Define governance roles

In the OctoGear curation interface, set the following addresses:

| Role | Function | Recommendation |
|---|---|---|
| **Admin** | Primary governance. Can modify all parameters subject to a 24h timelock. | Main Safe multisig (or 1/1 Safe for MPC users) |
| **Emergency Admin** | Crisis response. Limited emergency actions that bypass the timelock. | Separate security multisig or hardware wallet |
| **Fee Collector** | Revenue destination. Receives all accrued interest and liquidation fees. | Ops wallet or multisig |

Select **SAFE** as the transaction format to generate a compatible JSON file.

### Step 2 — Execute in Safe

1. Navigate to your **Gnosis Safe** (using the Admin wallet defined in Step 1).
2. Open the **Transaction Builder** app.
3. Upload the generated JSON file.
4. Review the transaction details and execute.

### Step 3 — Sync the interface

Once the transaction is confirmed onchain:

1. Navigate to the **Curators** page in the OctoGear curation interface.
2. Click **Sync** on the relevant chain.
3. Wait for the sync to complete — your new Market Configurator will appear in the dashboard.

## Next steps

With the Market Configurator deployed, the infrastructure is ready to launch your first lending market. Continue to [Create a Market](./create-market).

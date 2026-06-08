---
id: curator-overview
title: What is an OctoGear Curator?
sidebar_label: Overview
sidebar_position: 1
description: How OctoGear curators work — risk parameter management, roles, the timelock, and economic model.
---

# What is an OctoGear Curator?

An **OctoGear Curator** is the operator of a specific lending market built on top of the OctoGear credit infrastructure (Gearbox V3). Curators act as **risk parameter managers**, not capital allocators — they define the rules under which borrowers and lenders interact, without ever having custody of user funds.

This role is permissionless: any entity can deploy a Market Configurator and launch a lending business on OctoGear.

## Parameters, not funds

The Curator does not touch depositor funds. Instead, they manage a set of smart contracts that enforce rules on how funds can be utilised:

- **No custody** — Curators cannot withdraw LP funds or seize borrower collateral.
- **No active allocation** — Curators set eligibility rules (e.g. "Strategy A is allowed up to $10M debt"). The protocol handles the flow based on user demand.

## Role architecture

Curator powers are split across distinct roles to balance agility with security.

### Administrator

The ultimate authority, controlling the **Market Configurator** contract.

- Can modify all risk parameters (LTVs, supply caps, interest models, fee splits).
- All actions are subject to a mandatory **24-hour timelock**.
- Recommended: a multisig safe.

### Emergency Admin

A crisis-response role with a limited subset of powers that bypass the timelock.

- Can pause contracts, set debt limits to zero, and forbid specific adapters or tokens.
- Cannot *increase* risk — can only restrict operations.
- Recommended: a separate security multisig or hardware wallet.

### Operational roles

- **Pausable/Unpausable Admin** — freeze or unfreeze specific market contracts.
- **Fee Collector** — designated recipient for accrued interest and liquidation fees.
- **Emergency Liquidator** — whitelisted address permitted to liquidate when the market is paused.

## The timelock

Any transaction that alters a risk parameter must be queued in the Timelock contract for a minimum of **24 hours** before execution. This gives lenders and borrowers time to audit pending changes and exit if they disagree.

## Economic model

Curators earn revenue by configuring fee parameters that are deducted automatically by the smart contracts.

| Revenue source | Description |
|---|---|
| Interest fee | A percentage of borrower interest, added on top of the base rate paid to lenders |
| Liquidation fee | A percentage of collateral seized during a liquidation |

**Default split:** 50% to the Curator / 50% to the Protocol DAO.

## Curator vs. active capital allocator

OctoGear curators are fundamentally different from vault managers on protocols like Morpho:

| Action | OctoGear Curator | Active allocator (e.g. Morpho) |
|---|---|---|
| Add collateral exposure | Set LTV and oracle for the token — borrowers use pool liquidity | Deposit vault funds into a new market |
| Modify LTV | Ramp LT to target value over ≥2 days | Deploy a new market; migrate liquidity |
| Adjust collateral-specific rate | Set a new quota rate on top of the IRM | Move allocation in/out of the market |
| Enable leverage for a collateral | Allow the relevant adapters in the strategy | Integrate with an external strategy provider |

---
id: whats-next
title: What's Next
sidebar_label: What's Next
sidebar_position: 5
description: Upcoming features on the OctoGear roadmap.
---

# What's Next

OctoGear is in early access. Here is what is coming next.

## Cross-chain deposits via NEAR Intents

Fund your Prime Account from any chain without manually bridging to Polygon. NEAR Intents enables cross-chain deposits — send from Ethereum, Solana, or any supported chain and land USDC.e in your Polygon credit account. The library is built; the UI surface is coming soon.

## Basket collateral

The current version accepts YES and NO outcome tokens as directional collateral, each with its own Liquidation Threshold.

The next version introduces **basket collateral**: deposit a complementary YES and NO pair together. Because a YES share and its corresponding NO share always sum to $1.00 USDC — a mathematical invariant enforced on-chain — the basket mints a delta-neutral `BasketReceipt` ERC-20. A lender holding BasketReceipt collateral has no directional exposure to which way the event resolves.

## Cross-chain margin unification

Today, Polygon and HyperEVM credit accounts are separate. The roadmap unifies them — one health factor across positions on both chains, one shared credit line.

## More prediction market venues

Polymarket is the first whitelisted adapter. Additional venues are on the integration roadmap.

## More collateral types

More collateral types will be whitelisted as risk parameters are established — including additional Polymarket markets, RWAs, and yield-bearing assets.

## Audit

Pool Alpha is pre-audit. The full audit is in progress. A broader rollout follows completion.

## Follow updates

- [@UntangledFi on X](https://x.com/UntangledFi)
- Changelog in the OctoGear GitHub repository

---
sidebar_position: 2
---

# Delta-Neutral Yield Strategies in Perps

When a trader opens a position on a perp DEX, their trade is matched against either another trader (via orderbook), a liquidity pool (via AMM), or a hybrid system. These design choices affect hedging accuracy, slippage, and rebalancing frequency

<p align="center">
  <img src="../img/DeFi-Perps-types.png" alt="DeFi-Perps-types" width="800"/>
</p>

## Architectural types of perp DEXs:

- Orderbook (on/off chain): Hyperliquid, dYdX v4, Vertex

- AMM-based: GMX, Jupiter, Ostium

-  Hybrid: Drift (vAMM + on-chain orderbook)

### Hyperliquid — Orderbook Model with Native Liquidity Vault

- Built on HyperBFT, a custom Layer 1 with HyperEVM

- Liquidity providers deposit into Hyperliquid Provider (HLP), which absorbs unmatched flow

- Yield comes from trading fees and funding imbalance

- Hedging requires querying net open interest via API

- Transparent, index-based funding rates

### GMX — AMM-Based Perpetuals on Arbitrum

- GM pools act as counterparties to traders

- Vaults like hedged GLP/GM earn predictable fees but face drift risk

- Per-asset funding uses borrow-fee based model

- Suitable for passive vaults and less frequent rebalancing

- Funding skew determines borrowing cost

### Drift — Hybrid Model on Solana

- Combines virtual AMM (vAMM) and Just-In-Time market making via DLOB

- Native support for programmable strategy vaults

- Epoch-based resets for efficient rebalancing

- Cross-margin and isolated markets allow multi-asset hedging

- Capped, dynamically tuned funding rates

**These models determine whether a hedge earns or pays funding, affecting overall strategy returns.**

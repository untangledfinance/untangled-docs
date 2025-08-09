---
sidebar_position: 3
---

# Future development - Synthetic Stake Token

Ethereum blockchain has just one single stake token - ETH - but a network on Symbiotic has to deal with multiple delegated collaterals, making it complex for optimisation. This vault will change that. Untangled Credio x OETH Vault brings risk-adjusted restaking yield to OETH deposits with a novel mechanism to abstract all collateral delegations to a network into a single token - Synthetic Stake Token - enabling new opportunities for networks and stakers to optimize risk/reward.

Current implementation requires networks to deal with fragmented collaterals, making it complex to optimise cost/benefit

- **Complexity**: Networks and operators have to deal with many collateral tokens which change at every epoch.

- **Collateral Variability**: Tokens exhibit diverse risk profiles (e.g., price volatility, staking variance, increasing cascade risk  and threatening network stability.

- **Reward**: Fixed or arbitrarily set reward rates many fail to reflect token-specific risks or network demand, leading to inefficiencies.

We propose Synthetic Stake Token (SST) to abstract all collateral delegations into a single token.

- Aggregates delegations into one SST per network.

- SST represents a share of total delegation.

- Enables dynamic rebalancing and a unified interface.

## How it works

<p align="center">
  <img src={require("../img/SST.png").default} alt="SST" width="600"/>
</p>

- Operators stake into networks and receive SST, representing their share of the network’s total delegated stakes.

- All collaterals are converted to their dollar value. This allows for fair valuation of operators' stakes, regardless of the asset type they are staking.

- Staking contracts must be connected to an oracle to quote the real-time price of each collateral asset.

Untangled is working with Symbiotic to implement SST layer.

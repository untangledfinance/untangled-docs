---
sidebar_position: 2
---

# How it works

1. Stake RWAs into Staking Vault and receive sRWA
2. Staking Vault borrows USDC from  RWA Market on Lending Protocol against RWA collateral
3. USDC is deposited into the delta-neutral vault USDn
4. Part of USDC is looped back to RWAs, increasing supply.
5. Staking Vault receives yield from underlying strategy, which accrues to sRWA
6. LPs supply USDC directly to USDn and earn high yield  

<p align="center">
  <img src={require('../img/RWA-stacked-yield-strategy.png').default} alt="RWA Stacking" width="1050" />
</p>

Credio, Untangled’s curation service, acts as a curator on both isolated lending markets and USDn2. Credio employs a proprietary optimisation engine to monitor and rebalance allocations among whitelisted markets. This strategy aims to earn a minimum yield equivalent to what lending protocols like Aave offer. During bull market cycles, the vault allocates more to perps to take advantage of high funding rates. In a market downturn, the vault allocates more to stable return options like Aave or RWAs.

USDn2 is live on Arbitrum mainnet. You can access it [here](https://app.untangled.finance/USDn2/42161).

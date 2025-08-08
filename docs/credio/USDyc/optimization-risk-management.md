---
sidebar_position: 2
---

How We Optimize for Performance
Our approach goes beyond simple yield chasing. The strategy seeks to optimize for available yields within the opportunity set while considering:
TVL impact: How our allocation size affects the underlying strategy performance
Market conditions: Dynamic adjustment based on anticipated market shifts
Liquidity constraints: Position sizing tied to real-time DEX and vault liquidity
Sustainable returns: Expected yield calculated over 30-day rolling periods to smooth out temporary spikes
Central to our curation approach across our vaults is ensuring each vault meets our robust risk guidelines, is attractive to the DeFi community, and remains resilient enough to handle inherent crypto market volatility. Our approach to risk on Gauntlet USD Alpha is no different. Below, we outline the strategy's main risks and how we mitigate them. 
Key Risk Considerations and Mitigation Strategies
Liquidity
Large moves in or out of the strategy may move rates or incur slippage on swaps and bridging. We address this by constraining positions and collateral caps to real-time DEX and vault liquidity, always monitoring to optimize for yield while protecting from longtail risk.
Stablecoin risk 
Risk-on stablecoins have a higher chance of depegging. To mitigate this, we maintain a hard floor on the ratio of risk-on versus blue-chip stables, ensuring the portfolio remains anchored to the most liquid and stable assets.
Smart contract risk
Smart contract or oracle failures in Morpho or vault adapters represent systematic risks. The vaults we allocate to follow strict risk standards that we regularly update, and we monitor health in real time across all positions.
Our Risk Constraints Framework
We impose systematic risk constraints to avoid undesirable positioning. Over time, these constraints will be refined and respond to market conditions:
Vault position sizes are constrained by vault and DEX liquidity in the underlying token
Aggregate exposure to vaults denominated in non-blue-chip stablecoins is limited to 40% of the Gauntlet USD Alpha strategy portfolio. Blue-chip stablecoins include USDC, USDT, and DAI.
Collateral exposure across all vault positions is constrained by DEX liquidity of each collateral token
Token turnover is constrained by spot DEX liquidity to minimize market impact

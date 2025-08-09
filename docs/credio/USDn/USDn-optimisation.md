---
sidebar_position: 4
---

# Strategy Vault Performance Optimisation Framework
Delta-neutral strategy success depends on multiple profit drivers and their optimization. Below is a summary framework for assessing PnL components:

<p align="center">
  Delta-neutral Strategy's Profit Function
</p>

| **PnL Driver**                               | **Optimisation Strategy** |
|----------------------------------------------|----------------------------|
| **Delta** <br> - P&L from spot exposure <br> - P&L from futures positions | Is the portfolio delta-neutral (Δ = 0)? If not, assess remaining exposure and determine if rebalancing is required. |
| **Funding Rate**                             | Reduce exposure when funding turns negative. Optimize timing and hedge composition based on projected funding trends. |
| **Funding Rate Arbitrage Spread**            | Short on exchanges with negative funding; long on those with positive/neutral funding to benefit from spread between funding rates. |
| **Interest on Balances**                     | Compare lending yields across assets (e.g., ETH, BTC, stables) and allocate accordingly. |
| **Interest Paid on Borrowing**               | Evaluate whether borrowed collateral should be closed based on spread between interest earned and interest paid. |
| **Leverage Impact**                          | Use leverage only when funding gain > borrow cost. Monitor for liquidation risks. |
| **Liquidation Bonus/Penalty**                 | Monitor liquidation parameters and avoid involuntary closures. Assess potential rewards vs. risks. |
| **Execution Slippage**                       | Use order execution strategies (TWAP, VWAP); size trades to reduce impact per block. |
| **Transaction Fees** <br> - Account fees <br> - Trading fees <br> - Gas costs | Choose low-fee networks and batching methods. Optimize for cost efficiency. |

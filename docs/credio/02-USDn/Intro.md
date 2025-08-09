---
sidebar_position: 1
---

# Strategy Vaults on Perps
## Introduction
Untangled is building vault infrastructure on top of Perps exchanges to enable any managers or DAOs to create delta-neutral strategies to optimise yields.

Delta-neutral strategies have emerged as one of the most effective ways to capture structural yield within DeFi. By neutralizing price exposure while extracting funding and fee revenue from perpetual futures markets, these strategies echo the relative value approaches familiar to institutional investors in traditional finance.

<p align="center">
  <img src={require("../img/5-year-Sharpe.png").default} alt="5-year-Sharpe" width="800"/>
</p>

Beyond crypto hedge funds, DeFi-native protocols such as Ethena have adopted this approach at scale. Although centralized exchanges still handle larger volumes, decentralized perpetual exchanges (perp DEXs) have grown significantly. 

## Primer on Perpetual Futures

Perpetual futures (perps) were first proposed by Robert Shiller in 1993 as a way to estimate the value of income-generating assets or hedge hard-to-trade instruments. They gained popularity in the cryptocurrency markets for enabling leveraged bets on price movements. For instance, Bitcoin miners use perps to lock in future revenue and reduce volatility. 

<p align="center">
  <img src={require("../img/TradFi-vs-Perp.png").default} alt="Perp 1" width="800"/>
</p>

Unlike traditional futures, which converge to spot prices at expiry, perps have no expiration. They maintain a floating price near spot through a funding rate mechanism: periodic payments between long and short positions.

## Funding Rates: A Market-Clearing Mechanism for Perps

<p align="center">
  <img src={require("../img/TradFi-vs-perp 2.png").default} alt="Perp 2" width="800"/>
</p>

Perps differ from traditional derivatives in several important ways:

- They can be held indefinitely until closed by the trader.

- Long positions typically pay a funding rate to short positions when the perp price is above spot, and vice versa.

- Funding represents the cost-of-carry, settled peer-to-peer.

- In contrast to variation margin in traditional finance (handled via clearinghouses), DeFi funding is decentralized and designed to balance open interest.

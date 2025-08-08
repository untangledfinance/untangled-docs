Untangled Credio OETH Vault on Symbiotic

0x245eB1c385798A07c8b6df8Ee22b7bE6E1e97313
Untangled
0x245e
May 16th, 2025

Mint
Curation Strategy for Restaking Vaults on Symbiotic

Introduction
Untangled Credio is launching an OETH restaking vault on Symbiotic, a protocol enabling assets like Origin Ether (OETH) to secure multiple networks simultaneously. Stakers deposit OETH to earn its intrinsic yield (from liquid staking and DeFi) plus additional rewards from restaked networks. The vault aims to maximize risk-adjusted returns by dynamically allocating OETH across high-reward networks while managing slashing risks. This post outlines the vault’s strategy, covering network selection, reallocation logic, risk management, and governance.

You could access the vault here:  Untangled Credio x OETH Vault 

Restaking primer
Since the launch in June 2023, restaking has rapidly evolved into a fully-fledged competitive sector. Restaking protocols like Eigen Layer, Symbiotic and Karak allow users to leverage Ethereum’s security by restaking their ETH and liquid staking tokens (LSTs) across multiple decentralized services (or networks).


Operators (or Actively Validated Services/AVSs) are essential in the restaking ecosystem, using restaked assets like OETH and liquid staking tokens to secure decentralized services through restaking protocols. By tapping into Ethereum’s validator set for pooled security, operators enhance the network's robustness and offer additional yield for restakers. This creates a mutually beneficial system where restakers earn more, while decentralized applications gain cost-effective security, driving both ecosystem growth and yield generation.

Overview of Symbiotic
Symbiotic provides a modular and flexible framework for restaking:

Vaults (with curator) delegate any collaterals (ERC20) to networks via operators with one of the following models: (1) Multiple networks, multiple operators (2) Multiple networks, single operator (3)Single network, multiple operators and (4) Single network, single operator
Single-token vaults comprise mainly of ETH/ETH derivatives, wBTC and some yielding stablecoins. Thus most of the collaterals are volatile.
So far there are around 70 vaults, 66 operators providing economic security to 15 networks

Future development - Synthetic Stake Token
Ethereum blockchain has just one single stake token - ETH - but a network on Symbiotic has to deal with multiple delegated collaterals, making it complex for optimisation. This vault will change that. Untangled Credio x OETH Vault brings risk-adjusted restaking yield to OETH deposits with a novel mechanism to abstract all collateral delegations to a network into a single token - Synthetic Stake Token - enabling new opportunities for networks and stakers to optimize risk/reward.

Current implementation requires networks to deal with fragmented collaterals, making it complex to optimise cost/benefit

Complexity: Networks and operators have to deal with many collateral tokens which change at every epoch.
Collateral Variability: Tokens exhibit diverse risk profiles (e.g., price volatility, staking variance, increasing cascade risk  and threatening network stability.
Reward: Fixed or arbitrarily set reward rates many fail to reflect token-specific risks or network demand, leading to inefficiencies.
We propose Synthetic Stake Token (SST) to abstract all collateral delegations into a single token

Aggregates delegations into one SST per network.
SST represents a share of total delegation.
Enables dynamic rebalancing and a unified interface.

How it works

Operators stake into networks and receive SST, representing their share of the network’s total delegated stakes.
All collaterals are converted to their dollar value. This allows for fair valuation of operators' stakes, regardless of the asset type they are staking.
Staking contracts must be connected to an oracle to quote the real-time price of each collateral asset.
Untangled is working with Symbiotic to implement SST layer.

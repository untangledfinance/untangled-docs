---
sidebar_position: 2
---

# Restaking Vault Strategy

<p align="center">
  <img src={require("../img/Untangled-Symbiotic-OETH.png").default} alt="Symbiotic Restaking" width="800"/>
</p>

The vault targets high-yield opportunities, including “slashable” networks that offer higher returns but risk collateral loss, and safer, non-slashable networks with lower yields. Key objectives include:

- Diversifying across networks and operators to spread risk.

- Capping exposure to high-risk networks to limit worst-case losses.

- Maximizing risk-free yields from non-slashable networks.

- Monitoring on-chain (e.g., validator uptime, slashing events) and off-chain signals for real-time adjustments.

## Delegation Target Selection
The vault selects networks using a rigorous framework:

- **Technical Risk Assessment**: Evaluates network smart contracts, slashing mechanics, and audits to score software risk, incorporating external analyses and Credio’s risk oracle.

- **On-Chain Metrics**: Tracks validator uptime, missed blocks, slashing history, and reward rates. Networks with strong performance and sustainable yields are prioritized.

- **Off-Chain Signals**: Uses risk models from Credio, assessing governance, communication, and community trust. Networks with poor governance (e.g., centralized control) are avoided.

- **Yield Potential**: Prioritizes high-APR networks with acceptable risk. Non-slashable networks (e.g., Radius, Ditto, Kalypso) are fully allocated for safe yield, while slashable networks (e.g., Primev, Hyperlane) start with small, conservative stakes.
OETH’s yield-bearing nature and liquidity make it ideal collateral, boosting overall APY by combining ETH staking returns with Symbiotic rewards.

## Dynamic Reallocation

The vault adjusts OETH allocations in real-time using:

- **Yield Tracking**: Shifts stake to higher-yield networks if risk is acceptable, or away from underperforming ones.

- **Slashing Risk Signals**: Automatically reduces exposure via a “delegator hook” if slashing occurs or validators show issues (e.g., downtime).

- **Periodic Rebalancing**: Weekly resets to target allocations based on yield and risk updates.

- **Allocation Caps**: Limits slashable network exposure (e.g., 20% max per risky network) to prevent over-concentration.

## Rebalancing Triggers
- **Validator Downtime**: Reduce stake if uptime drops.

- **Slashing Event**: Withdraw stake immediately.

- **Yield Spike/Drop**: Adjust allocations to capture or avoid opportunities.

- **Risk Downgrade**: Scale back if a network’s risk score worsens.

- **New Network**: Trial small stakes in vetted networks.

## Risk Management

To mitigate slashing:

- **Diversification**: Spreads OETH across multiple networks and 3–5 reputable operators.

- **Slashing Caps**: Sets maximum loss per network (e.g., 5% of vault).

- **Monitoring**: Tracks on-chain data and off-chain signals (e.g., governance changes) with alerts for quick action.

- **Risk Scoring**: Excludes high-risk networks; limits stake to riskier ones.

- **Simulations**: Stress-tests allocations to minimize worst-case losses.

No slashing has occurred on Symbiotic mainnet, but the vault is designed to prevent and respond to such events.

## Conclusion

The Untangled Credio OETH vault balances high yields with disciplined risk management. Key steps include:

- **Launch Mix**: Maximize non-slashable networks; allocate small stakes to vetted slashable networks (e.g., Primev, Hyperlane).

- **Operators**: Onboard multiple high-quality operators with slashing limits.

- **Safeguards**: Enable delegator hooks, set slashing caps, and deploy real-time monitoring.

- **Dynamic Tuning**: Test and refine rebalancing logic; adjust caps as performance data emerges.

- Transparency: Share weekly reports on allocations, yields, and risks.

This strategy positions the vault to outperform vanilla staking while safeguarding depositors, with ongoing refinements as Symbiotic evolves.

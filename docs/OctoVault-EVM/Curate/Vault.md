# Vault
<img src="/img/OctoEVM_Vault.png" alt="OctoEVM_Vault.png" width="100%" />

## Overview
A Vault is an ERC-4626 tokenised fund that extends the BasedVault base class to include allocation functionality across multiple Market vaults.  
It acts as a meta-vault, allowing curators to dynamically allocate assets among several underlying strategies — looping, RWA, or delta-neutral — while maintaining transparent accounting, timelocked governance, and isolated risk boundaries.

## Deposits
LPs deposit the Vault’s underlying asset, such as USDC.  
The Vault mints ERC-4626 shares representing their claim on pooled assets.  
These assets are then distributed across selected Markets based on the curator’s allocation policy.

## Withdrawals
Withdrawals are handled asynchronously, allowing predictable liquidity management aligned with vault parameters.  
LPs submit withdrawal requests, which are queued for settlement at the next epoch.  
The WithdrawModule, if enabled, manages batching and pro-rata settlement according to available liquidity.  
This ensures withdrawals are automated, fair, and transparent even when funds are deployed across multiple Markets.  
Asynchronous withdrawals also protect liquidity integrity by avoiding forced asset liquidation, an important feature for vaults combining RWA and DeFi strategies.

## Asset Composition
The Vault’s assets are shares of underlying Market vaults rather than direct protocol deposits.  
As Markets generate yield, the value of their shares increases, and this accrues naturally to the Vault’s total asset value and therefore its ERC-4626 share price.

## Allocation and Strategy Execution
Curators can specify allocations. Internally, this process:
- Calls deposits or withdrawals on the respective Market vaults  
- Updates the Vault’s allocation records (marketAllocations)  
- Ensures only accepted Markets, whitelisted post-timelock, are active  

## Customisation
While the default Vault implementation is designed for allocation across Market vaults, curators can extend or override its logic.  
To use the Vault for non-market strategies such as off-chain credit portfolios or synthetic RWA exposures, developers may override the share calculation mechanism (totalAssets(), convertToShares()) to reflect custom valuation logic.  
Hooks and Modules can be added for additional control, such as performance-based fees or NAV updates.

## Summary
The Vault is the orchestrator of OctoVault’s yield layer, acting as a meta-allocator that:
- Tokenises multi-strategy portfolios under ERC-4626  
- Manages asynchronous deposits and withdrawals  
- Keeps each strategy isolated and auditable  
- Supports AI-driven optimisation and timelocked governance  
- Works seamlessly with institutional treasuries  

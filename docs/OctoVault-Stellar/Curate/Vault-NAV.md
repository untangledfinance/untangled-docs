# Vault Valuation

In OctoVault, the **price of the vault share** is injected into the smart contract by the **Distributor Account**.  
The accuracy of this value is crucial since it determines:
- The amount of shares a user will get  
- The amount of assets a user will get at redemption  
- **Management and performance fee mechanism**: Currently no explicit fees, but Curators could deduct their own fees from the share price  

## Valuation Process

The valuation process to determine the share price is **offchain**. It is a critical factor in ensuring the vault's correct operation.  

It’s essential that the vault curator establishes a **robust offchain process** for validation of price updates before calling the `update_price` (`updt_price`) function:

- The valuation must **exclusively contain the positions held** on the curator address at the moment of the call  
- Vault valuation must **not take into account pending requests**  

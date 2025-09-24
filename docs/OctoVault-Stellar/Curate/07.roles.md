# Roles and capacities
Navigate between the different roles to discover their associated capacities.

## Issuer: 
- Issue assets to Distributor
- Can revert the issuance 
- Can set option to ‘clawback’ the issue
- Can set authorisation: who can hold that asset (whitelisting)
- For a full list refer to https://developers.stellar.org/docs/tokens/control-asset-access

## Distributor
- Update share price
- Can burn the share in redemption (by sending it back to Issuer)

## Treasury /Curator
- Settle epoch for asynchronous withdraw requests
- Allocates funds: Make fund allocations and other functions that a wallet can do within Stellar ecosystem

The Curator allocates assets in the vault according to the investment strategy via a treasury wallet. OctoVault supports the following multisig wallets: 
- LOBSTR multisig
- MPC Fireblocks (coming soon)

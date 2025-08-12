# User Guide: Create Asset, Deploy Vault, Initialize Vault

## Prerequisites

- Install and unlock the Freighter wallet.
  
- Connect your wallet in the app (switching accounts will reload the page).

- Ensure your wallet has enough XLM for fees.

## Step 1 — Create Asset

- Issuer: Auto-filled from your connected wallet.
  ![Create Asset](../img/Stellar-Vault-Create-Asset.png)

- Asset Code: Enter 1–12 uppercase alphanumeric characters (e.g., MYTOKEN).

- Click “Deploy Asset”.
  - The app deploys the SAC contract for your asset.
  - On success, you’ll see “Deployed” and the Contract Address (saved as `assetAddress`).

- Click “Next”.

## Step 2 — Deploy Vault

- Review summary: Code, Issuer, and Asset Address (copy buttons available).
 ![Deploy Vault](../img/Stellar-Vault-Deploy-Vault-1.png)
  
- Click “Deploy Vault”.
  - On success, the vault contract address is saved as `vaultAddress`.
![Deploy Vault](../img/Stellar-Vault-Deploy-Vault-2.png)

- Click “Next”.

## Step 3 — Initialize Vault

- Distributor: G… public key responsible for distributions.

- Treasury: G… public key for vault treasury.

- Sell Token: Contract address of the shares token you have just created.

- Buy Token: Contract address of the asset that you accept to be underlying.

- Initial Price (optional): The initial price for your shares (7 decimals)
 ![Initialize Vault](../img/Stellar-Vault-Initialize-Vault-3.png)

- Click “Initialize”.
  - Watch status: Initializing → Success/Error.
![Initialize Vault](../img/Stellar-Vault-Initialize-Vault-4.png)

- Continue or complete the flow after success.

## Assets Page

- Setup Trustline: Enter Asset Code, Asset Issuer, Receive Limit to add a trustline.
 ![Asset Trustline](../img/Stellar-Vault-Asset-Trustline-2.png)

- Distribute: Enter Asset Code, Receiver (public key), Amount to send tokens.
 ![Asset Distribute](../img/Stellar-Vault-Asset-Distribute-1.png)

- On success, you will see the token in the Distributor account
 ![Asset Distribute](../img/Stellar-Vault-Asset-Distribute-2.png)

## Tips and Troubleshooting

- Receivers must have a trustline for your asset before receiving it.
- If deployment/initialization fails, check wallet connection, network, and balance; then retry.
- Save both addresses:
  - Asset Contract Address: `assetAddress`
  - Vault Contract Address

---
sidebar_position: 1
---

# How to Supply
## Explore a vault on Stellar

On [Untangled App](https://stellar.untangled.finance) you can explore all strategy vaults currently open for investment.

![Vault](../img/Stellar-Vault-list.png)

Click on a vault to view its summary sheet.

![Vault Summary Sheet](../../credio/img/Stellar-Vault-Summary-Sheet.png)

Apart from the vault's summary information such as active Chain, Deposit Asset, TVL, APY and Age, its summary sheet also show performance charts (PnL, Share Price, Balance and Max Drawdown during the last 7, 30, 90 days.


## Select a Vault

Choose a vault from the list to view its details and to make deposit.

### Connect wallet

- On Stellar we support [Freighter wallet](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk?hl=en). You might need to download the Chrome extension and complete the account opening and funding process before connecting the wallet to the app



- Connect your wallet   
<p align="center">
  <img src={require("../img/Stellar-vault-Freighter.png").default} alt="Freighter Wallet" width="400"/>
</p>


### Deposit 
- The investment capacity for the selected vault is not already filled.
![Connect Wallet](../img/Stellar-Vault-Connect-Wallet.png)

- Enter the amount you would like to deposit in the deposit box
  ![Connect Wallet](../img/Stellar-Vault-Deposit.png)

- Sign wallet transactions: Note there are 2 operations to sign: first is to approve spend (add Trustline on Stellar) and second is to deposit  
<p align="center">
  <img src={require("../img/Stellar-Vault-Freighter-Signing.png").default} alt="Freighter Wallet Signing" width="400"/>
</p>

## Manage Your Portfolio

### View Your Balance
To view your balance in the vault, click on "Your performance" tab:
![Your Performance](../img/Stellar-Vault-Your-Performance.png)

### Withdrawal Process
If you hold vault share tokens (e.g. USDyc), you have the option to withdraw and claim your capital and earnings. Note that each vault has it own withdrawal epoch. For USDyc, it is maximum 24 hours.

Step 1: Make withdrawal request
Navigate to a vault's page, click on the "Withdraw" tab, enter the withdrawal amount and approve and submit your withdrawal request.
![Withdraw](../img/Stellar-Vault-Withdraw.png)

Step 2: Manage your withdrawal requests
You can cancel your withdraw request any time up until the epoch close. After the epoch is open again, you will be able to see the available liquidity ready for withdrawal. You can click claim to move the liquidity to your wallet

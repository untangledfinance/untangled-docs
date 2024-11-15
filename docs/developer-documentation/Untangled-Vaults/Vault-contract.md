# Untangled Vault

Inheriting and extending from ERC4626, Untangled Vault's goal is to gather liquidity and invest it effectively across different EVM-based blockchains.

Extensions from ERC4626 include asynchronous withdrawal and retrieving information from different chains.

- **Asynchronous withdrawal:**

  - Users will create withdrawal requests by calling the `withdraw` function.
  - At the end of the epoch, the safe wallet will decide the fulfillment percentage of all withdrawal requests in that epoch. 
  - After the epoch is fulfilled, users can call `claimWithdraw` to burn their shares and receive their assets back.

- **cross-chain interactions:**
  - Allow investors to deposit to a Vault that opens on a different chain
  - Cross-chain state is synchronised by Axelar GMP service.


## Variables

| Variable          | Type                           | Description                                                               |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------- |
| totalWithdraw     | uint256                        | Total withdrawal (in currency) of the current epoch                       |
| safeWallet        | address                        | Safe address of this vault                                                |
| go                | address                        | Address of the KYC validation contract                                    |
| gasService        | address                        | Address of the Axelar gas service contract                                |
| gateway           | address                        | Address of the Axelar gateway for GMP communication                       |
| currentEpochIdx   | uint32                         | Index of the current epoch                                                |
| tokenInfo         | mapping(address => Investment) | Stores information (balance, price, decimal) of tokens invested by this vault |
| remoteSafeAddress | mapping(uint => address)       | Stores information of the safe wallet on other chains                     |
| isTransmitter     | mapping(address => bool)       | Stores information on whether an address is a transmitter contract or not |
| fulfillment       | mapping(uint256 => uint256)    | Stores the fulfillment percentage of an epoch                             |
| tokenInvested     | address[]                      | List of tokens invested by this vault                                     |

## Methods

| Method                   | Type     | Description                                                                                                       |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------|
| `deposit`                | external | Deposit liquidity into the vault in exchange for vault shares                                                     |
| `withdraw`               | external | Request to withdraw liquidity from the pool                                                                       |
| `claimableRequest`       | view     | View the amount of liquidity available to claim from a withdrawal request                                         |
| `cancelWithdraw`         | external | Set the withdrawal amount of the corresponding request to 0                                                       |
| `claimWithdraw`          | external | Claim the amount of liquidity available to claim from a withdrawal request                                        |
| `totalAssets`            | view     | Return vault liquidity + the value of investments                                                                 |
| `closeEpoch`             | external | Temporarily disable creating withdrawal requests to snapshot and fulfill `withdrawRequest` in the current epoch   |
| `fulfillWithdrawRequest` | external | Fulfill all `withdrawRequest` in the current epoch and move to the new epoch                                      |
| `addAsset`               | external | Add a token to the investment list of the current vault                                                           |
| `removeAsset`            | external | Remove a token to the investment list of the current vault                                                        |
| `updateAsset`            | external | Update information (balance, price, decimals) of a token in the portfolio                                         |
| `setRemoteSafeAddres`    | external | Set the safe wallet to represent the vault to invest on a given chain id                                          |
| `setCrosschainHook`      | external | Whitelist a cross-chain hook contract to allow user from different chain deposit into the vault                   |
| `setBeneficiary`         | external | Set the beneficiary of the fee accrued from the vault                                                             |
| `setFeeIndex`            | external | Set the fee index to calculate fee                                                                                |
| `claimFee`               | external | Claim the accrued fee to the beneficiary                                                                          |
| `execute`                | external | Axelar GMP execution function                                                                                     |

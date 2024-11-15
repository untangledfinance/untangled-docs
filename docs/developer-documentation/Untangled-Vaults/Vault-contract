# Untangled Vault

Inheriting and extending from ERC4626, Untangled Vault's goal is to gather liquidity and invest it effectively across different EVM-based blockchains.

Extensions from ERC4626 include asynchronous withdrawal and retrieving information from different chains.

- **Asynchronous withdrawal:**

  - Users will create withdrawal requests by calling the `withdraw` function.
  - At the end of the epoch, the safe wallet will decide the fulfillment percentage of all withdrawal requests in that epoch. 
  - After the epoch is fulfilled, users can call `claimWithdraw` to burn their shares and receive their assets back.

- **Retrieve information cross-chain:**
  - The safe wallet will create a 2-way GMP call to the transmitter contract at the destination chain.
  - The transmitter contract will query the information given in the GMP call and send it back to the caller (vault contract).
  - The vault contract receives and updates the information of the given token.

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
| fulfillment       | mapping(uint256 => uint256)    | Stores the fulfillment percentage of an epoch                            |
| tokenInvested     | address[]                      | List of tokens invested by this vault                                     |

## Methods

| Method                   | Type     | Description                                                                                                         |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `deposit`                | external | Deposit liquidity into the vault in exchange for vault shares                                                       |
| `withdraw`               | external | Request to withdraw liquidity from the pool                                                                        |
| `claimableRequest`       | view     | View the amount of liquidity available to claim from a withdrawal request                                           |
| `cancelWithdraw`         | external | Set the withdrawal amount of the corresponding request to 0                                                        |
| `claimWithdraw`          | external | Claim the amount of liquidity available to claim from a withdrawal request                                          |
| `totalAssets`            | view     | Return vault liquidity + the value of investments                                                                  |
| `closeEpoch`             | external | Temporarily disable creating withdrawal requests to snapshot and fulfill `withdrawRequest` in the current epoch     |
| `fulfillWithdrawRequest` | external | Fulfill all `withdrawRequest` in the current epoch and move to the new epoch                                        |
| `addToken`               | external | Add a token to the investment list of the current vault                                                            |
| `totalInvestmentValue`   | view     | Return the total value of all the tokens in the investment list                                                    |
| `requestTokenInfor`      | external | Create a 2-way cross-chain request for token information on different chains                                       |
| `getTokenInfor`          | external | Get information of a token within the same chain                                                                  |

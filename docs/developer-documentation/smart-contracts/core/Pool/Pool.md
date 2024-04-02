## Pool

Main entry point for senior LPs (a.k.a. capital providers)
Automatically invests across borrower pools using an adjustable strategy.

### registry

```solidity
contract Registry registry
```

### InsertNFTAsset

```solidity
event InsertNFTAsset(address token, uint256 tokenId)
```

### Repay

```solidity
event Repay(address poolAddress, uint256 increaseInterestRepay, uint256 increasePrincipalRepay, uint256 timestamp)
```

### requirePoolAdminOrOwner

```solidity
modifier requirePoolAdminOrOwner()
```

### initialize

```solidity
function initialize(address _registryAddress, bytes params) public
```

CONSTRUCTOR

### tgeAddress

```solidity
function tgeAddress() public view returns (address)
```

_Returns the address of the TGE contract._

#### Return Values

| Name | Type    | Description                      |
| ---- | ------- | -------------------------------- |
| [0]  | address | The address of the TGE contract. |

### getNFTAssetsLength

```solidity
function getNFTAssetsLength() external view returns (uint256)
```

_This function returns the length of nftAssets array._

#### Return Values

| Name | Type    | Description                                                  |
| ---- | ------- | ------------------------------------------------------------ |
| [0]  | uint256 | The number of elements in the \_poolStorage.nftAssets array. |

### getRiskScoresLength

```solidity
function getRiskScoresLength() external view returns (uint256)
```

Riks scores length

#### Return Values

| Name | Type    | Description                         |
| ---- | ------- | ----------------------------------- |
| [0]  | uint256 | the length of the risk scores array |

### riskScores

```solidity
function riskScores(uint256 index) external view returns (struct DataTypes.RiskScore)
```

Returns the risk score of a specific pool index

_This function allows users to get the risk scores of pools._

#### Parameters

| Name  | Type    | Description                        |
| ----- | ------- | ---------------------------------- |
| index | uint256 | The index of the pool in the array |

#### Return Values

| Name | Type                       | Description                                |
| ---- | -------------------------- | ------------------------------------------ |
| [0]  | struct DataTypes.RiskScore | A struct containing the risk score details |

### nftAssets

```solidity
function nftAssets(uint256 idx) external view returns (struct DataTypes.NFTAsset)
```

_Returns the details of the nft asset at the given index in the pool storage._

#### Parameters

| Name | Type    | Description                                         |
| ---- | ------- | --------------------------------------------------- |
| idx  | uint256 | The index of the NFT asset to fetch from the array. |

#### Return Values

| Name | Type                      | Description                                                                 |
| ---- | ------------------------- | --------------------------------------------------------------------------- |
| [0]  | struct DataTypes.NFTAsset | The details of the requested NFT asset, including its token address and ID. |

### setupRiskScores

```solidity
function setupRiskScores(uint32[] _daysPastDues, uint32[] _ratesAndDefaults, uint32[] _periodsAndWriteOffs) external
```

_Setup risk scores for pool assets._

#### Parameters

| Name                  | Type     | Description                                |
| --------------------- | -------- | ------------------------------------------ |
| \_daysPastDues        | uint32[] | An array of days past due values.          |
| \_ratesAndDefaults    | uint32[] | An array of rates and defaults values.     |
| \_periodsAndWriteOffs | uint32[] | An array of periods and write offs values. |

### exportAssets

```solidity
function exportAssets(address tokenAddress, address toPoolAddress, uint256[] tokenIds) external
```

_Export assets from pool to another address._

#### Parameters

| Name          | Type      | Description                                                      |
| ------------- | --------- | ---------------------------------------------------------------- |
| tokenAddress  | address   | The address of the ERC721 token that is being exported.          |
| toPoolAddress | address   | The address where the tokens will be sent.                       |
| tokenIds      | uint256[] | An array containing the IDs of the NFTs that are being exported. |

### withdrawAssets

```solidity
function withdrawAssets(address[] tokenAddresses, uint256[] tokenIds, address[] recipients) external
```

Withdraws assets from the pool based on token addresses and IDs.

_The caller must have OWNER_ROLE. The contract must not be paused._

#### Parameters

| Name           | Type      | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| tokenAddresses | address[] | Array of token addresses to withdraw.        |
| tokenIds       | uint256[] | Array of token IDs to withdraw.              |
| recipients     | address[] | Array of recipient addresses for the tokens. |

### getLoansValue

```solidity
function getLoansValue(uint256[] tokenIds, struct DataTypes.LoanEntry[] loanEntries) external view returns (uint256, uint256[])
```

Returns the total value of loans based on tokenIds and loanEntries

#### Parameters

| Name        | Type                         | Description                |
| ----------- | ---------------------------- | -------------------------- |
| tokenIds    | uint256[]                    | Array of token IDs         |
| loanEntries | struct DataTypes.LoanEntry[] | Array of LoanEntry structs |

#### Return Values

| Name | Type      | Description                                                                 |
| ---- | --------- | --------------------------------------------------------------------------- |
| [0]  | uint256   | uint256 Total value of loans                                                |
| [1]  | uint256[] | uint256[] Array of values for each tokenId in the same order as input array |

### collectAssets

```solidity
function collectAssets(uint256[] tokenIds, struct DataTypes.LoanEntry[] loanEntries) external returns (uint256)
```

Collects assets from loan entries for given tokenIds

_Function can only be called by a registered loan kernel in the registry_

#### Parameters

| Name        | Type                         | Description                                               |
| ----------- | ---------------------------- | --------------------------------------------------------- |
| tokenIds    | uint256[]                    | Array of token ids to collect assets for                  |
| loanEntries | struct DataTypes.LoanEntry[] | Array of LoanEntry structs containing details about loans |

#### Return Values

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| [0]  | uint256 | uint256 Returns total amount of collected assets |

### setUpOpeningBlockTimestamp

```solidity
function setUpOpeningBlockTimestamp() external
```

_This function sets up the opening block timestamp of the pool.
Only the tge address can call this function._

### onERC721Received

```solidity
function onERC721Received(address, address, uint256 tokenId, bytes) external returns (bytes4)
```

_Function called when a NFT is received by this contract.
Requires that the sender be the Untangled loan asset token.
Adds the received NFT to the pool's list of assets.
Emits an event indicating the new NFT was added._

#### Parameters

| Name    | Type    | Description                           |
| ------- | ------- | ------------------------------------- |
|         | address |                                       |
|         | address |                                       |
| tokenId | uint256 | The id of the token being transferred |
|         | bytes   |                                       |

#### Return Values

| Name | Type   | Description                                       |
| ---- | ------ | ------------------------------------------------- |
| [0]  | bytes4 | Returns the magic value 0x150b7a02 by convention. |

### writeOff

```solidity
function writeOff(uint256 loan) public
```

Write off a specified amount of the pool's NAV.

_This function is used to write off an amount from the pool's nav, essentially reducing it by that much.
It also triggers the rebase function after writing off the loan._

#### Parameters

| Name | Type    | Description                                                    |
| ---- | ------- | -------------------------------------------------------------- |
| loan | uint256 | The amount to be written off in terms of the underlying asset. |

### repayLoan

```solidity
function repayLoan(uint256[] loans, uint256[] amounts) external returns (uint256[], uint256[])
```

Repays a loan by the sender. The repayment amount and loan IDs are provided as inputs.

_Only the LoanKernel can call this function._

#### Parameters

| Name    | Type      | Description                                                              |
| ------- | --------- | ------------------------------------------------------------------------ |
| loans   | uint256[] | An array of loan IDs to be repaid.                                       |
| amounts | uint256[] | An array of amounts to be repaid for each corresponding loan in `loans`. |

#### Return Values

| Name | Type      | Description                                                                                                                                                                                                                                       |
| ---- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [0]  | uint256[] | Returns two arrays: - The first one contains the actual repayment amounts, which may differ from the requested ones due to liquidity restrictions or other factors. - The second one contains the previous debts before the repayments were made. |
| [1]  | uint256[] |                                                                                                                                                                                                                                                   |

### getRepaidAmount

```solidity
function getRepaidAmount() external view returns (uint256, uint256)
```

_Returns the total principal and interest repaid by users in the pool._

#### Return Values

| Name | Type    | Description                                            |
| ---- | ------- | ------------------------------------------------------ |
| [0]  | uint256 | The total principal repaid, the total interest repaid. |
| [1]  | uint256 |                                                        |

### debt

```solidity
function debt(uint256 loan) external view returns (uint256 loanDebt)
```

_Calculates the debt for a given loan._

#### Parameters

| Name | Type    | Description                                   |
| ---- | ------- | --------------------------------------------- |
| loan | uint256 | The ID of the loan to calculate the debt for. |

#### Return Values

| Name     | Type    | Description                 |
| -------- | ------- | --------------------------- |
| loanDebt | uint256 | The calculated debt amount. |

### risk

```solidity
function risk(bytes32 nft_) external view returns (uint256 risk_)
```

_This function returns the risk level of a specific NFT in the pool._

#### Parameters

| Name  | Type    | Description                                            |
| ----- | ------- | ------------------------------------------------------ |
| nft\_ | bytes32 | The identifier of the NFT to check the risk level for. |

#### Return Values

| Name   | Type    | Description                          |
| ------ | ------- | ------------------------------------ |
| risk\_ | uint256 | The risk level of the specified NFT. |

### currentNAV

```solidity
function currentNAV() external view returns (uint256 nav_)
```

_Returns the current Net Asset Value (NAV) of the pool._

#### Return Values

| Name  | Type    | Description                  |
| ----- | ------- | ---------------------------- |
| nav\_ | uint256 | The current NAV of the pool. |

### currentNAVAsset

```solidity
function currentNAVAsset(bytes32 tokenId) external view returns (uint256)
```

_Returns the current NAV value of an asset._

#### Parameters

| Name    | Type    | Description                             |
| ------- | ------- | --------------------------------------- |
| tokenId | bytes32 | The ID of the asset to get the NAV for. |

#### Return Values

| Name | Type    | Description                                   |
| ---- | ------- | --------------------------------------------- |
| [0]  | uint256 | The current NAV value of the specified asset. |

### getReserves

```solidity
function getReserves() external view returns (uint256, uint256)
```

_Returns the current amount of income and capital reserves._

#### Return Values

| Name | Type    | Description                            |
| ---- | ------- | -------------------------------------- |
| [0]  | uint256 | The current amount of income reserve.  |
| [1]  | uint256 | The current amount of capital reserve. |

### futureValue

```solidity
function futureValue(bytes32 nft_) external view returns (uint256)
```

_This function allows to get the future value of an NFT in the pool._

#### Parameters

| Name  | Type    | Description                |
| ----- | ------- | -------------------------- |
| nft\_ | bytes32 | The identifier of the NFT. |

#### Return Values

| Name | Type    | Description                          |
| ---- | ------- | ------------------------------------ |
| [0]  | uint256 | Returns the future value of the NFT. |

### maturityDate

```solidity
function maturityDate(bytes32 nft_) external view returns (uint256)
```

_This function returns the maturity date of an NFT._

#### Parameters

| Name  | Type    | Description                                                    |
| ----- | ------- | -------------------------------------------------------------- |
| nft\_ | bytes32 | The ID of the NFT for which we want to know the maturity date. |

#### Return Values

| Name | Type    | Description                                             |
| ---- | ------- | ------------------------------------------------------- |
| [0]  | uint256 | uint256 Returns the maturity date of the specified NFT. |

### discountRate

```solidity
function discountRate() external view returns (uint256)
```

_Returns the discount rate of the pool._

#### Return Values

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| [0]  | uint256 | The current discount rate in basis points (bps). |

### updateAssetRiskScore

```solidity
function updateAssetRiskScore(bytes32 nftID_, uint256 risk_) external
```

\_Updates the risk score of an asset within the pool.
The risk score is used by the PoolNAVLogic to determine the value of the asset relative to other assets in the pool.
Requirements:

- The caller must have the POOL*ADMIN_ROLE role.*

#### Parameters

| Name    | Type    | Description                                           |
| ------- | ------- | ----------------------------------------------------- |
| nftID\_ | bytes32 | ID of the NFT representing the asset within the pool. |
| risk\_  | uint256 | New risk score for the asset.                         |

### getAsset

```solidity
function getAsset(bytes32 agreementId) external view returns (struct DataTypes.NFTDetails)
```

_Returns details about an NFT based on agreementId_

#### Parameters

| Name        | Type    | Description                                                        |
| ----------- | ------- | ------------------------------------------------------------------ |
| agreementId | bytes32 | The ID of the agreement for which we want to get the asset details |

#### Return Values

| Name | Type                        | Description                                                                           |
| ---- | --------------------------- | ------------------------------------------------------------------------------------- |
| [0]  | struct DataTypes.NFTDetails | An instance of DataTypes.NFTDetails containing all relevant information about the NFT |

### setPot

```solidity
function setPot(address _pot) external
```

_This function sets the pot for the pool._

#### Parameters

| Name  | Type    | Description                 |
| ----- | ------- | --------------------------- |
| \_pot | address | The address of the new pot. |

### setDebtCeiling

```solidity
function setDebtCeiling(uint256 _debtCeiling) external
```

\_Sets a new debt ceiling for the pool.
Requirements:

- The caller must be either the pool admin or owner.
- The contract must not be paused.\_

#### Parameters

| Name          | Type    | Description                        |
| ------------- | ------- | ---------------------------------- |
| \_debtCeiling | uint256 | The new value of the debt ceiling. |

### setMinFirstLossCushion

```solidity
function setMinFirstLossCushion(uint32 _minFirstLossCushion) external
```

_Set minimum first loss cushion for pool_

#### Parameters

| Name                  | Type   | Description                              |
| --------------------- | ------ | ---------------------------------------- |
| \_minFirstLossCushion | uint32 | The new minimum first loss cushion value |

### pot

```solidity
function pot() external view returns (address)
```

_Returns the address of the pot contract._

#### Return Values

| Name | Type    | Description                  |
| ---- | ------- | ---------------------------- |
| [0]  | address | Address of the pot contract. |

### increaseCapitalReserve

```solidity
function increaseCapitalReserve(uint256 currencyAmount) external
```

_Increases the capital reserve by a specified amount.
Can only be called by the SecuritizationManager or NoteTokenVault._

#### Parameters

| Name           | Type    | Description                                                |
| -------------- | ------- | ---------------------------------------------------------- |
| currencyAmount | uint256 | The amount of currency to increase the capital reserve by. |

### contributeToCapitalReserve

```solidity
function contributeToCapitalReserve(uint256 amount) external
```

Contributes specified amount of tokens to capital reserve

_The function is only callable when not paused_

#### Parameters

| Name   | Type    | Description                    |
| ------ | ------- | ------------------------------ |
| amount | uint256 | Amount of tokens to contribute |

### decreaseIncomeReserve

```solidity
function decreaseIncomeReserve(uint256 currencyAmount) external
```

_Decreases the income reserve by a specified amount.
Can only be called by the SecuritizationManager or DistributionOperator._

#### Parameters

| Name           | Type    | Description                                               |
| -------------- | ------- | --------------------------------------------------------- |
| currencyAmount | uint256 | The amount of currency to decrease the income reserve by. |

### decreaseCapitalReserve

```solidity
function decreaseCapitalReserve(uint256 currencyAmount) external
```

_Decreases capital reserve by a certain amount.
Can only be called by SecuritizationManager or DistributionOperator._

#### Parameters

| Name           | Type    | Description                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| currencyAmount | uint256 | The amount of currency to decrease the capital reserve with. |

### secondTGEAddress

```solidity
function secondTGEAddress() external view returns (address)
```

_Returns the address of the second TGE contract._

#### Return Values

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| [0]  | address | The address of the second TGE contract. |

### sotToken

```solidity
function sotToken() external view returns (address)
```

_Returns the address of the SOT token._

#### Return Values

| Name | Type    | Description                   |
| ---- | ------- | ----------------------------- |
| [0]  | address | The address of the SOT token. |

### jotToken

```solidity
function jotToken() external view returns (address)
```

_Returns the address of the JOT token used by this pool._

#### Return Values

| Name | Type    | Description                   |
| ---- | ------- | ----------------------------- |
| [0]  | address | The address of the JOT token. |

### underlyingCurrency

```solidity
function underlyingCurrency() external view returns (address)
```

_Returns the address of the underlying currency used by the pool._

#### Return Values

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| [0]  | address | The address of the underlying currency contract. |

### reserve

```solidity
function reserve() external view returns (uint256)
```

_Returns the current amount of tokens in the pool._

#### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| [0]  | uint256 | The amount of tokens currently in the pool. |

### debtCeiling

```solidity
function debtCeiling() external view returns (uint256)
```

_Returns the current debt ceiling of the pool._

#### Return Values

| Name | Type    | Description               |
| ---- | ------- | ------------------------- |
| [0]  | uint256 | The current debt ceiling. |

### interestRateSOT

```solidity
function interestRateSOT() external view returns (uint256)
```

_Returns the current interest rate of SOT (Stable Over Time)_

#### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| [0]  | uint256 | The current interest rate in uint256 format |

### setInterestRateSOT

```solidity
function setInterestRateSOT(uint32 _newRate) external
```

_Set new interest rate for SOT (Savings Over Time)_

#### Parameters

| Name      | Type   | Description             |
| --------- | ------ | ----------------------- |
| \_newRate | uint32 | New interest rate value |

### minFirstLossCushion

```solidity
function minFirstLossCushion() external view returns (uint32)
```

_Returns the minimum first loss cushion value set in the pool storage._

#### Return Values

| Name | Type   | Description                                   |
| ---- | ------ | --------------------------------------------- |
| [0]  | uint32 | The current minimum first loss cushion value. |

### totalAssetRepaidCurrency

```solidity
function totalAssetRepaidCurrency() external view returns (uint256)
```

_Returns the total amount of repaid currency from all loans.
This includes both principal and interest payments._

#### Return Values

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| [0]  | uint256 | The total amount of repaid currency in the pool. |

### injectTGEAddress

```solidity
function injectTGEAddress(address _tgeAddress, enum Configuration.NOTE_TOKEN_TYPE _noteToken) external
```

_Function for injecting TGE address into pool storage_

#### Parameters

| Name         | Type                               | Description                                             |
| ------------ | ---------------------------------- | ------------------------------------------------------- |
| \_tgeAddress | address                            | Address of the TGE contract                             |
| \_noteToken  | enum Configuration.NOTE_TOKEN_TYPE | Type of note token to be used in securitization process |

### increaseTotalAssetRepaidCurrency

```solidity
function increaseTotalAssetRepaidCurrency(uint256 amount) external
```

Increases total repaid currency by a specified amount.

_This function can only be called by loan kernels. It increases the total repaid currency in the pool._

#### Parameters

| Name   | Type    | Description                                          |
| ------ | ------- | ---------------------------------------------------- |
| amount | uint256 | The amount to increase the total repaid currency by. |

### disburse

```solidity
function disburse(address usr, uint256 currencyAmount) external
```

_Function for disbursement of funds from the pool to a user.
Can only be called by NoteTokenVault contract._

#### Parameters

| Name           | Type    | Description                                             |
| -------------- | ------- | ------------------------------------------------------- |
| usr            | address | The address of the user to whom the funds will be sent. |
| currencyAmount | uint256 | The amount of funds to be disbursed in wei.             |

### hasFinishedRedemption

```solidity
function hasFinishedRedemption() external view returns (bool)
```

checks if the redemption process has finished

### isDebtCeilingValid

```solidity
function isDebtCeilingValid() external view returns (bool)
```

check current debt ceiling is valid

### claimCashRemain

```solidity
function claimCashRemain(address recipientWallet) external
```

This function allows the owner of the contract to claim any remaining cash that has not been distributed yet.

_The function requires that the redemption period has already finished and only the owner can call this function._

#### Parameters

| Name            | Type    | Description                                    |
| --------------- | ------- | ---------------------------------------------- |
| recipientWallet | address | Address where the remaining cash will be sent. |

### openingBlockTimestamp

```solidity
function openingBlockTimestamp() external view returns (uint64)
```

_Returns the timestamp of when the pool was opened._

#### Return Values

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| [0]  | uint64 | The timestamp of when the pool was opened. |

### withdraw

```solidity
function withdraw(address to, uint256 amount) external
```

_Function to withdraw funds from the pool._

#### Parameters

| Name   | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| to     | address | Address where the funds will be sent.    |
| amount | uint256 | Amount of tokens that will be withdrawn. |

### validatorRequired

```solidity
function validatorRequired() external view returns (bool)
```

### rebase

```solidity
function rebase() public
```

_Rebases the pool by updating the NAV and reserve based on current market conditions._

### changeSeniorAsset

```solidity
function changeSeniorAsset(uint256 _seniorSupply, uint256 _seniorRedeem) external
```

_Function for changing senior asset parameters.
Can only be called by SecuritizationManager or NoteTokenVault.
Changes in supply/redemption of senior assets will trigger a rebase, which can lead to significant price changes.
If the new senior supply is greater than zero, it checks if the first loss after this change would exceed MinFirstLoss._

#### Parameters

| Name           | Type    | Description                            |
| -------------- | ------- | -------------------------------------- |
| \_seniorSupply | uint256 | Amount of senior asset to be supplied. |
| \_seniorRedeem | uint256 | Amount of senior asset to be redeemed. |

### seniorDebtAndBalance

```solidity
function seniorDebtAndBalance() external view returns (uint256, uint256)
```

_Returns the senior debt and balance._

#### Return Values

| Name | Type    | Description                           |
| ---- | ------- | ------------------------------------- |
| [0]  | uint256 | The total amount of senior debt.      |
| [1]  | uint256 | The current balance of senior tokens. |

### calcTokenPrices

```solidity
function calcTokenPrices() external view returns (uint256 juniorTokenPrice, uint256 seniorTokenPrice)
```

_Calculates the prices for junior and senior tokens based on current NAV, reserve, senior debt etc._

#### Return Values

| Name             | Type    | Description                                                 |
| ---------------- | ------- | ----------------------------------------------------------- |
| juniorTokenPrice | uint256 | The price of a junior token in terms of note tokens (1e18). |
| seniorTokenPrice | uint256 | The price of a senior token in terms of note tokens (1e18). |

### calcJuniorRatio

```solidity
function calcJuniorRatio() public view returns (uint256 juniorRatio)
```

_Calculates the junior ratio of the pool._

#### Return Values

| Name        | Type    | Description                  |
| ----------- | ------- | ---------------------------- |
| juniorRatio | uint256 | The calculated junior ratio. |

### isMinFirstLossValid

```solidity
function isMinFirstLossValid() public view returns (bool)
```

_Checks if the minimum first loss cushion is valid.
The function checks whether the minimum first loss cushion is less than or equal to the calculated junior ratio._

#### Return Values

| Name | Type | Description                                                                                                                  |
| ---- | ---- | ---------------------------------------------------------------------------------------------------------------------------- |
| [0]  | bool | bool - Returns true if the minimum first loss cushion is less than or equal to the calculated junior ratio, otherwise false. |

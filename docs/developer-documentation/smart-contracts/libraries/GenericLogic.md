## GenericLogic

Main entry point for senior LPs (a.k.a. capital providers)
Automatically invests across borrower pools using an adjustable strategy.

### SetRate

```solidity
event SetRate(bytes32 loan, uint256 rate)
```

### ChangeRate

```solidity
event ChangeRate(bytes32 loan, uint256 newRate)
```

### maturityDate

```solidity
function maturityDate(struct DataTypes.Storage _poolStorage, bytes32 nft_) internal view returns (uint256 maturityDate_)
```

getter function for the maturityDate

#### Parameters

| Name          | Type                     | Description                                                 |
| ------------- | ------------------------ | ----------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage |                                                             |
| nft\_         | bytes32                  | the id of the nft based on the hash of registry and tokenId |

#### Return Values

| Name           | Type    | Description                 |
| -------------- | ------- | --------------------------- |
| maturityDate\_ | uint256 | the maturityDate of the nft |

### risk

```solidity
function risk(struct DataTypes.Storage _poolStorage, bytes32 nft_) internal view returns (uint256 risk_)
```

getter function for the risk group

#### Parameters

| Name          | Type                     | Description                                                 |
| ------------- | ------------------------ | ----------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage |                                                             |
| nft\_         | bytes32                  | the id of the nft based on the hash of registry and tokenId |

#### Return Values

| Name   | Type    | Description               |
| ------ | ------- | ------------------------- |
| risk\_ | uint256 | the risk group of the nft |

### futureValue

```solidity
function futureValue(struct DataTypes.Storage _poolStorage, bytes32 nft_) internal view returns (uint256 fv_)
```

getter function for the future value

#### Parameters

| Name          | Type                     | Description                                                 |
| ------------- | ------------------------ | ----------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage |                                                             |
| nft\_         | bytes32                  | the id of the nft based on the hash of registry and tokenId |

#### Return Values

| Name | Type    | Description              |
| ---- | ------- | ------------------------ |
| fv\_ | uint256 | future value of the loan |

### recoveryRatePD

```solidity
function recoveryRatePD(struct DataTypes.RiskScore[] riskScores, uint256 riskID, uint256 termLength) internal view returns (uint256 recoveryRatePD_)
```

getter function for the recovery rate PD

#### Parameters

| Name       | Type                         | Description        |
| ---------- | ---------------------------- | ------------------ |
| riskScores | struct DataTypes.RiskScore[] |                    |
| riskID     | uint256                      | id of a risk group |
| termLength | uint256                      |                    |

#### Return Values

| Name             | Type    | Description                        |
| ---------------- | ------- | ---------------------------------- |
| recoveryRatePD\_ | uint256 | recovery rate PD of the risk group |

### borrowed

```solidity
function borrowed(struct DataTypes.Storage _poolStorage, uint256 loan) internal view returns (uint256 borrowed_)
```

getter function for the borrowed amount

#### Parameters

| Name          | Type                     | Description  |
| ------------- | ------------------------ | ------------ |
| \_poolStorage | struct DataTypes.Storage |              |
| loan          | uint256                  | id of a loan |

#### Return Values

| Name       | Type    | Description                 |
| ---------- | ------- | --------------------------- |
| borrowed\_ | uint256 | borrowed amount of the loan |

### getRiskScoreByIdx

```solidity
function getRiskScoreByIdx(struct DataTypes.RiskScore[] riskScores, uint256 idx) internal view returns (struct DataTypes.RiskScore)
```

UTILITY FUNCTION

### toUint128

```solidity
function toUint128(uint256 value) internal pure returns (uint128 converted)
```

converts a uint256 to uint128

#### Parameters

| Name  | Type    | Description               |
| ----- | ------- | ------------------------- |
| value | uint256 | the value to be converted |

#### Return Values

| Name      | Type    | Description      |
| --------- | ------- | ---------------- |
| converted | uint128 | value to uint128 |

### isLoanWrittenOff

```solidity
function isLoanWrittenOff(struct DataTypes.Storage _poolStorage, uint256 loan) internal view returns (bool)
```

returns if a loan is written off

#### Parameters

| Name          | Type                     | Description        |
| ------------- | ------------------------ | ------------------ |
| \_poolStorage | struct DataTypes.Storage |                    |
| loan          | uint256                  | the id of the loan |

### currentNAV

```solidity
function currentNAV(struct DataTypes.Storage _poolStorage) internal view returns (uint256 nav_)
```

calculates and returns the current NAV

#### Return Values

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| nav\_ | uint256 | current NAV |

### currentNAVAsset

```solidity
function currentNAVAsset(struct DataTypes.Storage _poolStorage, bytes32 tokenId) internal view returns (uint256)
```

### currentPVs

```solidity
function currentPVs(struct DataTypes.Storage _poolStorage) internal view returns (uint256 totalDiscount, uint256 overdue, uint256 writeOffs)
```

calculates the present value of the loans together with overdue and written off loans

#### Return Values

| Name          | Type    | Description                                |
| ------------- | ------- | ------------------------------------------ |
| totalDiscount | uint256 | the present value of the loans             |
| overdue       | uint256 | the present value of the overdue loans     |
| writeOffs     | uint256 | the present value of the written off loans |

### currentAV

```solidity
function currentAV(struct DataTypes.Storage _poolStorage, bytes32 tokenId) internal view returns (uint256 totalDiscount, uint256 overdue, uint256 writeOffs)
```

_This function calculates the total discount, overdue and write offs of a loan._

#### Parameters

| Name          | Type                     | Description                      |
| ------------- | ------------------------ | -------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object for the pool. |
| tokenId       | bytes32                  | The ID of the loan.              |

#### Return Values

| Name          | Type    | Description                           |
| ------------- | ------- | ------------------------------------- |
| totalDiscount | uint256 | The total discount of the loan.       |
| overdue       | uint256 | The amount that is overdue.           |
| writeOffs     | uint256 | The amount that has been written off. |

### currentWriteOffs

```solidity
function currentWriteOffs(struct DataTypes.Storage _poolStorage) internal view returns (uint256 sum)
```

returns the sum of all write off loans

#### Return Values

| Name | Type    | Description            |
| ---- | ------- | ---------------------- |
| sum  | uint256 | of all write off loans |

### calcUpdateNAV

```solidity
function calcUpdateNAV(struct DataTypes.Storage _poolStorage) internal returns (uint256 nav_)
```

calculates and returns the current NAV and updates the state

#### Return Values

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| nav\_ | uint256 | current NAV |

### reCalcNAV

```solidity
function reCalcNAV(struct DataTypes.Storage _poolStorage) internal returns (uint256 nav_)
```

re-calculates the nav in a non-optimized way
the method is not updating the NAV to latest block.timestamp

#### Return Values

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| nav\_ | uint256 | current NAV |

### nftID

```solidity
function nftID(uint256 loan) internal pure returns (bytes32 nftID_)
```

returns the nftID for the underlying collateral nft

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| loan | uint256 | the loan id |

#### Return Values

| Name    | Type    | Description           |
| ------- | ------- | --------------------- |
| nftID\_ | bytes32 | the nftID of the loan |

### currentValidWriteOffGroup

```solidity
function currentValidWriteOffGroup(struct DataTypes.Storage _poolStorage, uint256 loan) internal view returns (uint256 writeOffGroup_)
```

returns the current valid write off group of a loan

#### Parameters

| Name          | Type                     | Description |
| ------------- | ------------------------ | ----------- |
| \_poolStorage | struct DataTypes.Storage |             |
| loan          | uint256                  | the loan id |

#### Return Values

| Name            | Type    | Description                                 |
| --------------- | ------- | ------------------------------------------- |
| writeOffGroup\_ | uint256 | the current valid write off group of a loan |

### debt

```solidity
function debt(struct DataTypes.Storage _poolStorage, uint256 loan) internal view returns (uint256 loanDebt)
```

Calculates the debt of a loan based on its rate, interest rates and time elapsed since last update.

_If there's no penalty, it simply returns the amount after charging interest to chi_. Otherwise, it calculates the total debt by first applying interest to chi* then applies that to penaltyChi*.\_

#### Parameters

| Name          | Type                     | Description                                                    |
| ------------- | ------------------------ | -------------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage of the pool from which data is retrieved.          |
| loan          | uint256                  | The index of the loan for which we want to calculate the debt. |

#### Return Values

| Name     | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| loanDebt | uint256 | The calculated debt of the loan. |

### debtWithChi

```solidity
function debtWithChi(struct DataTypes.Storage _poolStorage, uint256 loan, uint256 chi, uint256 penaltyChi) internal view returns (uint256 loanDebt)
```

_Calculate the debt of a loan based on chi and penaltyChi._

#### Parameters

| Name          | Type                     | Description                     |
| ------------- | ------------------------ | ------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object of the pool. |
| loan          | uint256                  | The amount of loan.             |
| chi           | uint256                  | The amount of chi.              |
| penaltyChi    | uint256                  | The amount of penalty chi.      |

#### Return Values

| Name     | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| loanDebt | uint256 | The calculated debt of the loan. |

### chiAndPenaltyChi

```solidity
function chiAndPenaltyChi(struct DataTypes.Storage _poolStorage, uint256 loan) internal view returns (uint256 chi, uint256 penaltyChi)
```

_This function calculates chi and penaltyChi based on loan rate._

#### Parameters

| Name          | Type                     | Description                       |
| ------------- | ------------------------ | --------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object for the pool.  |
| loan          | uint256                  | The amount of loan taken by user. |

#### Return Values

| Name       | Type    | Description                       |
| ---------- | ------- | --------------------------------- |
| chi        | uint256 | The calculated chi value.         |
| penaltyChi | uint256 | The calculated penalty chi value. |

### rateDebt

```solidity
function rateDebt(struct DataTypes.Storage _poolStorage, uint256 rate) internal view returns (uint256 totalDebt)
```

_Calculates total debt for a specific rate._

#### Parameters

| Name          | Type                     | Description                                      |
| ------------- | ------------------------ | ------------------------------------------------ |
| \_poolStorage | struct DataTypes.Storage | The storage object containing all pool data.     |
| rate          | uint256                  | The index of the rate to calculate the debt for. |

#### Return Values

| Name      | Type    | Description                                                                                |
| --------- | ------- | ------------------------------------------------------------------------------------------ |
| totalDebt | uint256 | The total debt calculated based on the specified rate and any applicable interest charges. |

### setRate

```solidity
function setRate(struct DataTypes.Storage _poolStorage, uint256 loan, uint256 rate) internal
```

\_This function sets the rate for a specific loan in the pool storage.
Requirements:

- The debt associated with the loan must be zero.
- The specified rate category must already have been initiated.\_

#### Parameters

| Name          | Type                     | Description                             |
| ------------- | ------------------------ | --------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object for the pool.        |
| loan          | uint256                  | The ID of the loan to set the rate for. |
| rate          | uint256                  | The new rate to set for the loan.       |

### changeRate

```solidity
function changeRate(struct DataTypes.Storage _poolStorage, uint256 loan, uint256 newRate) internal
```

_Changes the interest rate of a loan._

#### Parameters

| Name          | Type                     | Description                                   |
| ------------- | ------------------------ | --------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object of the pool.               |
| loan          | uint256                  | The ID of the loan.                           |
| newRate       | uint256                  | The new interest rate to be set for the loan. |

### accrue

```solidity
function accrue(struct DataTypes.Storage _poolStorage, uint256 loan) internal
```

Accrue the loan interest based on the loan type and update the pool storage.

_Drip the interest to the pool from the specified loan._

#### Parameters

| Name          | Type                     | Description                                         |
| ------------- | ------------------------ | --------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage of the pool.                            |
| loan          | uint256                  | The loan type for which we want to accrue interest. |

### drip

```solidity
function drip(struct DataTypes.Storage _poolStorage, uint256 rate) internal
```

_This function updates the chi value of a specific rate in the pool storage. It also handles penalties if they exist._

#### Parameters

| Name          | Type                     | Description                                               |
| ------------- | ------------------------ | --------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The Storage object containing all data for this contract. |
| rate          | uint256                  | The index of the rate to update.                          |

### compounding

```solidity
function compounding(uint256 chi, uint256 ratePerSecond, uint256 lastUpdated, uint256 _pie) internal view returns (uint256, uint256)
```

Interest functions
This function provides compounding in seconds

#### Parameters

| Name          | Type    | Description                                                                         |
| ------------- | ------- | ----------------------------------------------------------------------------------- |
| chi           | uint256 | Accumulated interest rate over time                                                 |
| ratePerSecond | uint256 | Interest rate accumulation per second in RAD(10ˆ27)                                 |
| lastUpdated   | uint256 | When the interest rate was last updated                                             |
| \_pie         | uint256 | Total sum of all amounts accumulating under one interest rate, divided by that rate |

#### Return Values

| Name | Type    | Description                                                                                                             |
| ---- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| [0]  | uint256 | The new accumulated rate, as well as the difference between the debt calculated with the old and new accumulated rates. |
| [1]  | uint256 |                                                                                                                         |

### chargeInterest

```solidity
function chargeInterest(uint256 interestBearingAmount, uint256 ratePerSecond, uint256 lastUpdated) internal view returns (uint256)
```

This function charge interest on a interestBearingAmount

#### Parameters

| Name                  | Type    | Description                                         |
| --------------------- | ------- | --------------------------------------------------- |
| interestBearingAmount | uint256 | is the interest bearing amount                      |
| ratePerSecond         | uint256 | Interest rate accumulation per second in RAD(10ˆ27) |
| lastUpdated           | uint256 | last time the interest has been charged             |

#### Return Values

| Name | Type    | Description                      |
| ---- | ------- | -------------------------------- |
| [0]  | uint256 | interestBearingAmount + interest |

### \_chargeInterest

```solidity
function _chargeInterest(uint256 interestBearingAmount, uint256 ratePerSecond, uint256 lastUpdated, uint256 current) internal pure returns (uint256)
```

_Calculates the amount of interest to be charged on an interest bearing asset._

#### Parameters

| Name                  | Type    | Description                                                             |
| --------------------- | ------- | ----------------------------------------------------------------------- |
| interestBearingAmount | uint256 | The total value of the interest bearing asset.                          |
| ratePerSecond         | uint256 | The interest rate per second, as a fractional number (e.g., 1% = 0.01). |
| lastUpdated           | uint256 | The timestamp when the balance was last updated.                        |
| current               | uint256 | The current timestamp.                                                  |

#### Return Values

| Name | Type    | Description                                        |
| ---- | ------- | -------------------------------------------------- |
| [0]  | uint256 | The amount of interest to be charged on the asset. |

### toAmount

```solidity
function toAmount(uint256 chi, uint256 _pie) internal pure returns (uint256)
```

_This function converts an amount of pie into chi._

#### Parameters

| Name  | Type    | Description                                    |
| ----- | ------- | ---------------------------------------------- |
| chi   | uint256 | The number of chi units that will be returned. |
| \_pie | uint256 | The number of pie units to convert.            |

#### Return Values

| Name | Type    | Description                         |
| ---- | ------- | ----------------------------------- |
| [0]  | uint256 | The equivalent number of chi units. |

### toPie

```solidity
function toPie(uint256 chi, uint256 amount) internal pure returns (uint256)
```

_This function calculates how many pieces (pies) can be obtained from a given amount of chi._

#### Parameters

| Name   | Type    | Description                                         |
| ------ | ------- | --------------------------------------------------- |
| chi    | uint256 | The number of chi units available for distribution. |
| amount | uint256 | The total amount to distribute.                     |

#### Return Values

| Name | Type    | Description                                                                   |
| ---- | ------- | ----------------------------------------------------------------------------- |
| [0]  | uint256 | Returns the number of pies that can be made with the provided chi and amount. |

### getAsset

```solidity
function getAsset(struct DataTypes.Storage _poolStorage, bytes32 agreementId) internal view returns (struct DataTypes.NFTDetails)
```

_Function to get details about an asset from a pool storage_

#### Parameters

| Name          | Type                     | Description                                                           |
| ------------- | ------------------------ | --------------------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage of the pool where the agreement is stored                 |
| agreementId   | bytes32                  | The id of the agreement for which we want to retrieve the NFT details |

#### Return Values

| Name | Type                        | Description                                                           |
| ---- | --------------------------- | --------------------------------------------------------------------- |
| [0]  | struct DataTypes.NFTDetails | Returns the details of the NFT associated with the given agreement ID |

### reserve

```solidity
function reserve(struct DataTypes.Storage _poolStorage) internal view returns (uint256)
```

_This function returns the total reserve of a pool which is sum of capital and income reserves._

#### Parameters

| Name          | Type                     | Description                     |
| ------------- | ------------------------ | ------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object of the pool. |

#### Return Values

| Name | Type    | Description                       |
| ---- | ------- | --------------------------------- |
| [0]  | uint256 | Total reserve amount in the pool. |

### unpackParamsForAgreementID

```solidity
function unpackParamsForAgreementID(struct DataTypes.LoanEntry loan) internal view returns (struct UnpackLoanParamtersLib.InterestParams params)
```

Unpacks parameters from a loan entry to calculate interest rates and other terms.

_This function unpacks the parameters of a loan, calculates the term length in seconds based on the amortization unit type,
and returns an InterestParams struct containing all these values._

#### Parameters

| Name | Type                       | Description                                      |
| ---- | -------------------------- | ------------------------------------------------ |
| loan | struct DataTypes.LoanEntry | The loan entry from which to extract parameters. |

#### Return Values

| Name   | Type                                         | Description                                                                                                                                                                  |
| ------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params | struct UnpackLoanParamtersLib.InterestParams | A struct containing the principal amount, interest rate, start and end timestamps of the term, the amortization unit type, and the length of the term in amortization units. |

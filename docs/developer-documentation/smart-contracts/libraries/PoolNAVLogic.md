## PoolNAVLogic

Main entry point for senior LPs (a.k.a. capital providers)
Automatically invests across borrower pools using an adjustable strategy.

### IncreaseDebt

```solidity
event IncreaseDebt(bytes32 loan, uint256 currencyAmount)
```

### DecreaseDebt

```solidity
event DecreaseDebt(bytes32 loan, uint256 currencyAmount)
```

### SetLoanMaturity

```solidity
event SetLoanMaturity(bytes32 loan, uint256 maturityDate_)
```

### WriteOff

```solidity
event WriteOff(bytes32 loan, uint256 writeOffGroupsIndex, bool override_)
```

### AddLoan

```solidity
event AddLoan(bytes32 loan, uint256 principalAmount, struct DataTypes.NFTDetails nftdetails)
```

### Repay

```solidity
event Repay(bytes32 loan, uint256 currencyAmount)
```

### UpdateAssetRiskScore

```solidity
event UpdateAssetRiskScore(bytes32 loan, uint256 risk)
```

### getExpectedLoanvalue

```solidity
function getExpectedLoanvalue(struct DataTypes.Storage _poolStorage, struct DataTypes.LoanEntry loanEntry) public view returns (uint256 principalAmount)
```

_This function calculates the expected loan value based on the principal amount, interest rate, and risk score._

#### Parameters

| Name          | Type                       | Description                                                |
| ------------- | -------------------------- | ---------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage   | The storage object for the pool.                           |
| loanEntry     | struct DataTypes.LoanEntry | Details about the loan agreement including the risk score. |

#### Return Values

| Name            | Type    | Description                                                    |
| --------------- | ------- | -------------------------------------------------------------- |
| principalAmount | uint256 | The calculated principal amount after applying the risk score. |

### addLoan

```solidity
function addLoan(struct DataTypes.Storage _poolStorage, uint256 loan, struct DataTypes.LoanEntry loanEntry) public returns (uint256)
```

Adds a loan to the pool.

_This function is used to add a new loan to the pool. It initializes the loan details, sets the interest rate and accrues the interest._

#### Parameters

| Name          | Type                       | Description              |
| ------------- | -------------------------- | ------------------------ |
| \_poolStorage | struct DataTypes.Storage   | The storage of the pool. |
| loan          | uint256                    | The ID of the loan.      |
| loanEntry     | struct DataTypes.LoanEntry | The details of the loan. |

#### Return Values

| Name | Type    | Description                                          |
| ---- | ------- | ---------------------------------------------------- |
| [0]  | uint256 | principalAmount The amount of principal in the loan. |

### setLoanMaturityDate

```solidity
function setLoanMaturityDate(struct DataTypes.Storage _poolStorage, bytes32 nftID_, uint256 maturityDate_) internal
```

_This function sets the maturity date for a loan. The maturity date is the last day that the borrower can repay their debt._

#### Parameters

| Name           | Type                     | Description                                                                    |
| -------------- | ------------------------ | ------------------------------------------------------------------------------ |
| \_poolStorage  | struct DataTypes.Storage | A reference to the pool storage where all data related to this pool is stored. |
| nftID\_        | bytes32                  | The ID of the NFT representing the loan.                                       |
| maturityDate\_ | uint256                  | The new maturity date for the loan, represented as a Unix timestamp.           |

### file

```solidity
function file(struct DataTypes.Storage _poolStorage, bytes32 name, uint256 value) public
```

This function allows to update certain parameters of a pool.
It currently supports only 'discountRate' parameter, which affects the NAV calculation.

_The discount rate is updated and if it was already set before (oldDiscountRate != 0), then the NAV needs to be recalculated._

#### Parameters

| Name          | Type                     | Description                                                                                   |
| ------------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | A reference to the storage of a pool.                                                         |
| name          | bytes32                  | The name of the parameter that we want to update. Currently only 'discountRate' is supported. |
| value         | uint256                  | The new value for the specified parameter.                                                    |

### file

```solidity
function file(struct DataTypes.Storage _poolStorage, bytes32 name, uint256 rate_, uint256 writeOffPercentage_, uint256 overdueDays_, uint256 penaltyRate_, uint256 riskIndex) public
```

Function to create a new write off group and set its parameters.

_The function creates a new WriteOffGroup struct, calculates the interest rate, overdue days, penalty rate and risk index for the new group._

#### Parameters

| Name                 | Type                     | Description                                              |
| -------------------- | ------------------------ | -------------------------------------------------------- |
| \_poolStorage        | struct DataTypes.Storage | Pool storage variable.                                   |
| name                 | bytes32                  | Name of the write off group.                             |
| rate\_               | uint256                  | Interest rate in basis points.                           |
| writeOffPercentage\_ | uint256                  | Write-off percentage in basis points.                    |
| overdueDays\_        | uint256                  | Number of days after which a loan is considered overdue. |
| penaltyRate\_        | uint256                  | Penalty rate in basis points per day.                    |
| riskIndex            | uint256                  | Risk index for the new write off group.                  |

### repayLoan

```solidity
function repayLoan(struct DataTypes.Storage _poolStorage, uint256[] loans, uint256[] amounts) external returns (uint256[], uint256[])
```

Repays a loan by reducing its debt and potentially decreasing future value.

_The function accrues interest, updates NAV if necessary,
calculates repayment amounts and decreases future values accordingly._

#### Parameters

| Name          | Type                     | Description                                             |
| ------------- | ------------------------ | ------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | Storage of the pool where the loans are located.        |
| loans         | uint256[]                | Array of loan IDs to be repaid.                         |
| amounts       | uint256[]                | Amounts by which each respective loan should be repaid. |

#### Return Values

| Name | Type      | Description                                                     |
| ---- | --------- | --------------------------------------------------------------- |
| [0]  | uint256[] | repayAmounts The actual amounts that were repaid for each loan. |
| [1]  | uint256[] | previousDebts Previous debts before the repayments.             |

### writeOff

```solidity
function writeOff(struct DataTypes.Storage _poolStorage, uint256 loan) public
```

Write off a loan from the pool

_The function allows authorized users to write off loans that are past due. It checks if the loan exists, whether it's healthy or not, and if its maturity date is in the future.
If all conditions are met, it then proceeds with the write-off process._

#### Parameters

| Name          | Type                     | Description                          |
| ------------- | ------------------------ | ------------------------------------ |
| \_poolStorage | struct DataTypes.Storage | The storage of the pool              |
| loan          | uint256                  | The ID of the loan to be written off |

### \_writeOff

```solidity
function _writeOff(struct DataTypes.Storage _poolStorage, uint256 loan, uint256 writeOffGroupIndex_, bytes32 nftID_, uint256 maturityDate_) internal
```

internal function for the write off

#### Parameters

| Name                 | Type                     | Description                     |
| -------------------- | ------------------------ | ------------------------------- |
| \_poolStorage        | struct DataTypes.Storage |                                 |
| loan                 | uint256                  | the id of the loan              |
| writeOffGroupIndex\_ | uint256                  | the index of the writeoff group |
| nftID\_              | bytes32                  | the nftID of the loan           |
| maturityDate\_       | uint256                  | the maturity date of the loan   |

### updateAssetRiskScore

```solidity
function updateAssetRiskScore(struct DataTypes.Storage _poolStorage, bytes32 nftID_, uint256 risk_) public
```

updateAssetRiskScore updates the risk score of an asset and recalculates the future value, interest rate and NAV

_This function changes the risk group of an nft, might lead to a new interest rate for the dependant loan.
New interest rate leads to a future value. Recalculation required._

#### Parameters

| Name          | Type                     | Description                    |
| ------------- | ------------------------ | ------------------------------ |
| \_poolStorage | struct DataTypes.Storage | The storage object of the pool |
| nftID\_       | bytes32                  | The ID of the NFT asset        |
| risk\_        | uint256                  | The new risk score             |

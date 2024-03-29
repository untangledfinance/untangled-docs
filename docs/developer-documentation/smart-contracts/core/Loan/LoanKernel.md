## LoanKernel

Upload loan, Repay Loan and conclude loan

### registry

```solidity
contract Registry registry
```

### initialize

```solidity
function initialize(contract Registry _registry) public
```

### validFillingOrderAddresses

```solidity
modifier validFillingOrderAddresses(address[] _orderAddresses)
```

### \_concludeLoan

```solidity
function _concludeLoan(address creditor, bytes32 agreementId) internal
```

_This function concludes a loan agreement by burning the associated LoanAssetToken._

#### Parameters

| Name        | Type    | Description                                    |
| ----------- | ------- | ---------------------------------------------- |
| creditor    | address | The address of the borrower who owes the debt. |
| agreementId | bytes32 | A unique identifier for the loan agreement.    |

### getLoansValue

```solidity
function getLoansValue(struct ILoanKernel.FillDebtOrderParam fillDebtOrderParam) public view returns (uint256, uint256[][])
```

Calculates the value of loans based on provided parameters.

_This function calculates the expected value of assets in a loan order, taking into account the terms and conditions of each loan.
It also checks if the LAT token IDs match with the agreement IDs from the issuance data.
The function returns two values: an overall expected asset value and an array of individual expected loan values for each LAT._

#### Parameters

| Name               | Type                                  | Description                                                                   |
| ------------------ | ------------------------------------- | ----------------------------------------------------------------------------- |
| fillDebtOrderParam | struct ILoanKernel.FillDebtOrderParam | Structure containing all necessary information to calculate the loans' value. |

#### Return Values

| Name | Type        | Description                                                                |
| ---- | ----------- | -------------------------------------------------------------------------- |
| [0]  | uint256     | expectedAssetsValue Total expected value of assets in the loan order.      |
| [1]  | uint256[][] | expectedAssetValues Array of individual expected loan values for each LAT. |

### fillDebtOrder

```solidity
function fillDebtOrder(struct ILoanKernel.FillDebtOrderParam fillDebtOrderParam) external
```

This function is used to fill a debt order. It mints loan assets and collects assets from the pool.

_The function requires that the sender has the necessary permissions and that the parameters are valid._

#### Parameters

| Name               | Type                                  | Description                          |
| ------------------ | ------------------------------------- | ------------------------------------ |
| fillDebtOrderParam | struct ILoanKernel.FillDebtOrderParam | Parameters for filling a debt order. |

### repayInBatch

```solidity
function repayInBatch(bytes32[] agreementIds, uint256[] amounts, address tokenAddress) external returns (bool)
```

This function is used to repay a loan in batch. It checks all the loans must have the same owner and updates the pool's state accordingly.

_The function requires that the sender has the necessary permissions, that the parameters are valid, and that the repayment request is successful._

#### Parameters

| Name         | Type      | Description                                 |
| ------------ | --------- | ------------------------------------------- |
| agreementIds | bytes32[] | Array of loan agreement IDs to be repaid.   |
| amounts      | uint256[] | Amounts to be repaid for each loan.         |
| tokenAddress | address   | Address of the currency used for repayment. |

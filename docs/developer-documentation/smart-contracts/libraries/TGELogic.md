## TGELogic

### UpdateTGEAddress

```solidity
event UpdateTGEAddress(address tge, enum Configuration.NOTE_TOKEN_TYPE noteType)
```

### IncreaseReserve

```solidity
event IncreaseReserve(uint256 increasingAmount, uint256 currencyAmount)
```

### IncreaseCapitalReserve

```solidity
event IncreaseCapitalReserve(uint256 increasingAmount, uint256 currencyAmount)
```

### DecreaseReserve

```solidity
event DecreaseReserve(uint256 decreasingAmount, uint256 currencyAmount)
```

### DecreaseCapitalReserve

```solidity
event DecreaseCapitalReserve(uint256 decreasingAmount, uint256 currencyAmount)
```

### DecreaseIncomeReserve

```solidity
event DecreaseIncomeReserve(uint256 decreasingAmount, uint256 currencyAmount)
```

### UpdateDebtCeiling

```solidity
event UpdateDebtCeiling(uint256 _debtCeiling)
```

### UpdateMintFirstLoss

```solidity
event UpdateMintFirstLoss(uint32 _mintFirstLoss)
```

### UpdateInterestRateSot

```solidity
event UpdateInterestRateSot(uint32 _interestRateSot)
```

### Withdraw

```solidity
event Withdraw(address originatorAddress, uint256 amount)
```

### ClaimCashRemain

```solidity
event ClaimCashRemain(address pot, address recipientWallet, uint256 balance)
```

### sotToken

```solidity
function sotToken(struct DataTypes.Storage _poolStorage) public view returns (address)
```

_Returns the address of the SOT (Senior Obligation Token) for this pool._

#### Parameters

| Name          | Type                     | Description                                                        |
| ------------- | ------------------------ | ------------------------------------------------------------------ |
| \_poolStorage | struct DataTypes.Storage | The storage object containing all data related to a specific pool. |

#### Return Values

| Name | Type    | Description                                                    |
| ---- | ------- | -------------------------------------------------------------- |
| [0]  | address | The address of the SOT token, or zero if no TGE is set up yet. |

### jotToken

```solidity
function jotToken(struct DataTypes.Storage _poolStorage) public view returns (address)
```

_Returns the address of the JOT (Junior Obligation Token) for this pool._

#### Parameters

| Name          | Type                     | Description                                                        |
| ------------- | ------------------------ | ------------------------------------------------------------------ |
| \_poolStorage | struct DataTypes.Storage | The storage object containing all data related to a specific pool. |

#### Return Values

| Name | Type    | Description                                                    |
| ---- | ------- | -------------------------------------------------------------- |
| [0]  | address | The address of the JOT token, or zero if no TGE is set up yet. |

### underlyingCurrency

```solidity
function underlyingCurrency(struct DataTypes.Storage _poolStorage) public view returns (address)
```

Returns the address of the underlying currency used by the pool.

_This information is stored in storage and can be accessed without any external calls._

#### Return Values

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| [0]  | address | The address of the underlying currency. |

### minFirstLossCushion

```solidity
function minFirstLossCushion(struct DataTypes.Storage _poolStorage) public view returns (uint32)
```

Returns the value of the min first loss cushion used by the pool.

_This information is stored in storage and can be accessed without any external calls._

#### Return Values

| Name | Type   | Description                              |
| ---- | ------ | ---------------------------------------- |
| [0]  | uint32 | the value of the min first loss cushion. |

### debtCeiling

```solidity
function debtCeiling(struct DataTypes.Storage _poolStorage) public view returns (uint256)
```

Returns the current debt ceiling of the pool

_The debt ceiling is the maximum amount that can be borrowed from the pool at any given time_

#### Return Values

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| [0]  | uint256 | The current debt ceiling value |

### interestRateSOT

```solidity
function interestRateSOT(struct DataTypes.Storage _poolStorage) public view returns (uint256)
```

_This function returns the interest rate of SOT_

#### Parameters

| Name          | Type                     | Description                      |
| ------------- | ------------------------ | -------------------------------- |
| \_poolStorage | struct DataTypes.Storage | - The storage object of the pool |

#### Return Values

| Name | Type    | Description                                                         |
| ---- | ------- | ------------------------------------------------------------------- |
| [0]  | uint256 | uint256 - Returns the interestRateSOT value from the storage object |

### totalAssetRepaidCurrency

```solidity
function totalAssetRepaidCurrency(struct DataTypes.Storage _poolStorage) public view returns (uint256)
```

Returns total amount of repaid assets in the pool.

#### Parameters

| Name          | Type                     | Description                     |
| ------------- | ------------------------ | ------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object of the pool. |

#### Return Values

| Name | Type    | Description                                |
| ---- | ------- | ------------------------------------------ |
| [0]  | uint256 | Total amount of repaid assets in the pool. |

### injectTGEAddress

```solidity
function injectTGEAddress(struct DataTypes.Storage _poolStorage, address _tgeAddress, enum Configuration.NOTE_TOKEN_TYPE _noteType) external
```

_This function is used to inject TGE address and token into pool storage._

#### Parameters

| Name          | Type                               | Description                         |
| ------------- | ---------------------------------- | ----------------------------------- |
| \_poolStorage | struct DataTypes.Storage           | The storage of securitization pool. |
| \_tgeAddress  | address                            | Address of TGE contract.            |
| \_noteType    | enum Configuration.NOTE_TOKEN_TYPE | Type of note (SENIOR or JUNIOR).    |

### disburse

```solidity
function disburse(struct DataTypes.Storage _poolStorage, address usr, uint256 currencyAmount) external
```

_This function transfers specified amount of currency from pool's pot to user address._

#### Parameters

| Name           | Type                     | Description                              |
| -------------- | ------------------------ | ---------------------------------------- |
| \_poolStorage  | struct DataTypes.Storage | The storage object for the pool.         |
| usr            | address                  | The address that will receive the funds. |
| currencyAmount | uint256                  | The amount of currency to transfer.      |

### isDebtCeilingValid

```solidity
function isDebtCeilingValid(struct DataTypes.Storage _poolStorage) public view returns (bool)
```

_This function checks if the total amount of debt raised by both TGE contracts
doesn't exceed the pool's debt ceiling._

#### Parameters

| Name          | Type                     | Description                      |
| ------------- | ------------------------ | -------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object for the pool. |

#### Return Values

| Name | Type | Description                                                                              |
| ---- | ---- | ---------------------------------------------------------------------------------------- |
| [0]  | bool | Returns true if the totalDebt is less than or equal to the debtCeiling, false otherwise. |

### increaseTotalAssetRepaidCurrency

```solidity
function increaseTotalAssetRepaidCurrency(struct DataTypes.Storage _poolStorage, uint256 amount) external
```

_Increase total repaid currency by specific amount._

#### Parameters

| Name          | Type                     | Description                                        |
| ------------- | ------------------------ | -------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object for pool data.                  |
| amount        | uint256                  | Amount to increase the total repaid currency with. |

### hasFinishedRedemption

```solidity
function hasFinishedRedemption(struct DataTypes.Storage _poolStorage) public view returns (bool)
```

Checks whether the redemptions of both Senior and Junior tokens have finished.

_The function requires that both SOT and JOT tokens must not have any supply left._

#### Parameters

| Name          | Type                     | Description                        |
| ------------- | ------------------------ | ---------------------------------- |
| \_poolStorage | struct DataTypes.Storage | Pool storage object to check from. |

#### Return Values

| Name | Type | Description                                                    |
| ---- | ---- | -------------------------------------------------------------- |
| [0]  | bool | Returns true if all redemptions are complete, false otherwise. |

### setPot

```solidity
function setPot(struct DataTypes.Storage _poolStorage, address _pot) external
```

_This function sets the pot address for the securitization pool.
It also checks if the new pot is this contract and approves it to spend all underlying currency tokens on behalf of the pool._

#### Parameters

| Name          | Type                     | Description                                    |
| ------------- | ------------------------ | ---------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object of the securitization pool. |
| \_pot         | address                  | The address of the new pot.                    |

### setMinFirstLossCushion

```solidity
function setMinFirstLossCushion(struct DataTypes.Storage _poolStorage, uint32 _minFirstLossCushion) external
```

Set the minimum first loss cushion.

_This function sets the minimum first loss cushion in the pool storage._

#### Parameters

| Name                  | Type                     | Description                                                        |
| --------------------- | ------------------------ | ------------------------------------------------------------------ |
| \_poolStorage         | struct DataTypes.Storage | The storage of the pool to set the minimum first loss cushion for. |
| \_minFirstLossCushion | uint32                   | The new minimum first loss cushion value.                          |

### \_setMinFirstLossCushion

```solidity
function _setMinFirstLossCushion(struct DataTypes.Storage _poolStorage, uint32 _minFirstLossCushion) internal
```

Set minimum first loss cushion value

_The minFirstLossCushion must not exceed 100% (i.e., 100 \* RATE_SCALING_FACTOR)_

#### Parameters

| Name                  | Type                     | Description                                |
| --------------------- | ------------------------ | ------------------------------------------ |
| \_poolStorage         | struct DataTypes.Storage | storage of the pool                        |
| \_minFirstLossCushion | uint32                   | minimum first loss cushion value to be set |

### setDebtCeiling

```solidity
function setDebtCeiling(struct DataTypes.Storage _poolStorage, uint256 _debtCeiling) external
```

Sets the debt ceiling of a pool.

_This function sets the maximum amount that can be borrowed from the pool._

#### Parameters

| Name          | Type                     | Description                         |
| ------------- | ------------------------ | ----------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object for the pool.    |
| \_debtCeiling | uint256                  | The new value for the debt ceiling. |

### \_setDebtCeiling

```solidity
function _setDebtCeiling(struct DataTypes.Storage _poolStorage, uint256 _debtCeiling) internal
```

Setter for debt ceiling in pool storage

_Sets a new value for the debt ceiling of the pool_

#### Parameters

| Name          | Type                     | Description                          |
| ------------- | ------------------------ | ------------------------------------ |
| \_poolStorage | struct DataTypes.Storage | Pool's storage object                |
| \_debtCeiling | uint256                  | New value to set as the debt ceiling |

### \_setInterestRateSOT

```solidity
function _setInterestRateSOT(struct DataTypes.Storage _poolStorage, uint32 _newRate) external
```

This function sets the interest rate for SOT.

_It updates the 'interestRateSOT' in storage and emits an event to notify about the change._

#### Parameters

| Name          | Type                     | Description                         |
| ------------- | ------------------------ | ----------------------------------- |
| \_poolStorage | struct DataTypes.Storage |                                     |
| \_newRate     | uint32                   | The new value of the interest rate. |

### increaseCapitalReserve

```solidity
function increaseCapitalReserve(struct DataTypes.Storage _poolStorage, uint256 currencyAmount) public
```

_This function increases the capital reserve by a certain amount._

#### Parameters

| Name           | Type                     | Description                                    |
| -------------- | ------------------------ | ---------------------------------------------- |
| \_poolStorage  | struct DataTypes.Storage | The storage object for the pool.               |
| currencyAmount | uint256                  | The amount to increase the capital reserve by. |

### contributeToCapitalReserve

```solidity
function contributeToCapitalReserve(struct DataTypes.Storage _poolStorage, address contributor, uint256 currencyAmount) external
```

_This function allows a contributor to contribute capital into the pool.
The amount of currency is transferred from the contributor's address to the pool's pot, and then increases the total capital reserve._

#### Parameters

| Name           | Type                     | Description                                            |
| -------------- | ------------------------ | ------------------------------------------------------ |
| \_poolStorage  | struct DataTypes.Storage | A reference to the storage object for this pool.       |
| contributor    | address                  | The address of the contributor.                        |
| currencyAmount | uint256                  | The amount of currency contributed by the contributor. |

### decreaseCapitalReserve

```solidity
function decreaseCapitalReserve(struct DataTypes.Storage _poolStorage, uint256 currencyAmount) external
```

_This function decreases the capital reserve by a certain amount.
Requires that there is sufficient balance of capital reserve.
Emits an event DecreaseCapitalReserve with the decreased amount and new total after decrease._

#### Parameters

| Name           | Type                     | Description                                    |
| -------------- | ------------------------ | ---------------------------------------------- |
| \_poolStorage  | struct DataTypes.Storage | The storage object for the pool.               |
| currencyAmount | uint256                  | The amount to decrease the capital reserve by. |

### decreaseIncomeReserve

```solidity
function decreaseIncomeReserve(struct DataTypes.Storage _poolStorage, uint256 currencyAmount) external
```

_Decreases the income reserve by a certain amount.
Requires that there is enough balance in the income reserve to decrease it by the specified amount.
Emits an event indicating the decreased amount and the new total income reserve._

#### Parameters

| Name           | Type                     | Description                                         |
| -------------- | ------------------------ | --------------------------------------------------- |
| \_poolStorage  | struct DataTypes.Storage | The storage object of the pool.                     |
| currencyAmount | uint256                  | The amount to be decreased from the income reserve. |

### claimCashRemain

```solidity
function claimCashRemain(struct DataTypes.Storage _poolStorage, address recipientWallet) external
```

_This function allows the owner of the pool to transfer any remaining funds from the pot to another address after the pool have been closed._

#### Parameters

| Name            | Type                     | Description                                          |
| --------------- | ------------------------ | ---------------------------------------------------- |
| \_poolStorage   | struct DataTypes.Storage | The storage object for the securitization pool.      |
| recipientWallet | address                  | The address that will receive the transferred funds. |

### withdraw

```solidity
function withdraw(struct DataTypes.Storage _poolStorage, address to, uint256 amount) public
```

_Function to withdraw funds from the capital reserve of a securitization pool.
Requires that there are sufficient funds in the capital reserve.
Emits an event indicating the amount withdrawn and remaining balance._

#### Parameters

| Name          | Type                     | Description                                      |
| ------------- | ------------------------ | ------------------------------------------------ |
| \_poolStorage | struct DataTypes.Storage | The storage object for this securitization pool. |
| to            | address                  | The address to send the withdrawal to.           |
| amount        | uint256                  | The amount of underlying currency to withdraw.   |

## RebaseLogic

Provides pool's rebase functions

### dripSeniorDebt

```solidity
function dripSeniorDebt(struct DataTypes.Storage _poolStorage) public returns (uint256)
```

accumulates the senior interest

#### Return Values

| Name | Type    | Description                  |
| ---- | ------- | ---------------------------- |
| [0]  | uint256 | \_seniorDebt the senior debt |

### seniorDebt

```solidity
function seniorDebt(struct DataTypes.Storage _poolStorage) public view returns (uint256 _seniorDebt)
```

returns the senior debt with up to date interest

#### Return Values

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| \_seniorDebt | uint256 | senior debt |

### rebase

```solidity
function rebase(struct DataTypes.Storage _poolStorage, uint256 _nav, uint256 _reserve) public
```

This function is used to rebase the pool's assets. It updates the senior debt and balance based on the provided NAV and reserve values.

_The expected senior asset is calculated using the calcExpectedSeniorAsset function, which takes into account the current senior balance and the dripped senior debt._

#### Parameters

| Name          | Type                     | Description                               |
| ------------- | ------------------------ | ----------------------------------------- |
| \_poolStorage | struct DataTypes.Storage | A reference to the pool's storage object. |
| \_nav         | uint256                  | The new net asset value of the pool.      |
| \_reserve     | uint256                  | The amount of reserve in the pool.        |

### changeSeniorAsset

```solidity
function changeSeniorAsset(struct DataTypes.Storage _poolStorage, uint256 _nav, uint256 _reserve, uint256 _seniorSupply, uint256 _seniorRedeem) external
```

_Function to change senior asset parameters._

#### Parameters

| Name           | Type                     | Description                   |
| -------------- | ------------------------ | ----------------------------- |
| \_poolStorage  | struct DataTypes.Storage |                               |
| \_nav          | uint256                  | The new net asset value.      |
| \_reserve      | uint256                  | The new reserve amount.       |
| \_seniorSupply | uint256                  | The new senior supply amount. |
| \_seniorRedeem | uint256                  | The new senior redeem amount. |

### \_rebase

```solidity
function _rebase(uint256 _nav, uint256 _reserve, uint256 _seniorAsset) public pure returns (uint256, uint256)
```

This function re-balances the senior and junior assets according to the new ratio.

_The senior asset will own all of its debt if it has more than 100% of the NAV, otherwise it will own what's left after subtracting the debt from the total senior asset._

#### Parameters

| Name          | Type    | Description                                      |
| ------------- | ------- | ------------------------------------------------ |
| \_nav         | uint256 | The Net Asset Value of the pool.                 |
| \_reserve     | uint256 | The reserve amount in the pool.                  |
| \_seniorAsset | uint256 | The current amount of senior assets in the pool. |

#### Return Values

| Name | Type    | Description                                                       |
| ---- | ------- | ----------------------------------------------------------------- |
| [0]  | uint256 | The new balance and debt for the senior asset after re-balancing. |
| [1]  | uint256 |                                                                   |

### calcSeniorRatio

```solidity
function calcSeniorRatio(uint256 seniorAsset, uint256 nav, uint256 reserve) public pure returns (uint256 seniorRatio)
```

calculates the senior ratio

#### Parameters

| Name        | Type    | Description                    |
| ----------- | ------- | ------------------------------ |
| seniorAsset | uint256 | the current senior asset value |
| nav         | uint256 | the current NAV                |
| reserve     | uint256 | the current reserve            |

#### Return Values

| Name        | Type    | Description      |
| ----------- | ------- | ---------------- |
| seniorRatio | uint256 | the senior ratio |

### calcExpectedSeniorAsset

```solidity
function calcExpectedSeniorAsset(uint256 _seniorRedeem, uint256 _seniorSupply, uint256 _seniorBalance, uint256 _seniorDebt) public pure returns (uint256 expectedSeniorAsset)
```

expected senior return if no losses occur

#### Parameters

| Name            | Type    | Description                |
| --------------- | ------- | -------------------------- |
| \_seniorRedeem  | uint256 | the senior redeem amount   |
| \_seniorSupply  | uint256 | the senior supply amount   |
| \_seniorBalance | uint256 | the current senior balance |
| \_seniorDebt    | uint256 | the current senior debt    |

#### Return Values

| Name                | Type    | Description                     |
| ------------------- | ------- | ------------------------------- |
| expectedSeniorAsset | uint256 | the expected senior asset value |

### calcExpectedSeniorAsset

```solidity
function calcExpectedSeniorAsset(uint256 _seniorDebt, uint256 _seniorBalance) public pure returns (uint256 seniorAsset)
```

calculates the expected Senior asset value

#### Parameters

| Name            | Type    | Description                |
| --------------- | ------- | -------------------------- |
| \_seniorDebt    | uint256 | the current senior debt    |
| \_seniorBalance | uint256 | the current senior balance |

#### Return Values

| Name        | Type    | Description                    |
| ----------- | ------- | ------------------------------ |
| seniorAsset | uint256 | returns the senior asset value |

### calcSeniorTokenPrice

```solidity
function calcSeniorTokenPrice(uint256 _nav, uint256 _reserve, uint256 _seniorDebt, uint256 _seniorBalance, uint256 _sotTotalSupply) external pure returns (uint256 seniorTokenPrice)
```

Calculates the price per Senior Token based on various parameters

_This calculation ensures fair distribution of rewards to seniors_

#### Parameters

| Name             | Type    | Description                            |
| ---------------- | ------- | -------------------------------------- |
| \_nav            | uint256 | The Net Asset Value                    |
| \_reserve        | uint256 | The reserve amount                     |
| \_seniorDebt     | uint256 | The senior debt amount                 |
| \_seniorBalance  | uint256 | The balance of the senior tokens       |
| \_sotTotalSupply | uint256 | The total supply of SOT (Senior Token) |

#### Return Values

| Name             | Type    | Description                |
| ---------------- | ------- | -------------------------- |
| seniorTokenPrice | uint256 | The price per Senior Token |

### calcJuniorTokenPrice

```solidity
function calcJuniorTokenPrice(uint256 _nav, uint256 _reserve, uint256 _seniorDebt, uint256 _seniorBalance, uint256 _jotTotalSupply) external pure returns (uint256 juniorTokenPrice)
```

Calculates the junior token price

#### Parameters

| Name             | Type    | Description                       |
| ---------------- | ------- | --------------------------------- |
| \_nav            | uint256 | the NAV                           |
| \_reserve        | uint256 | the reserve                       |
| \_seniorDebt     | uint256 | the senior debt                   |
| \_seniorBalance  | uint256 | the senior balance                |
| \_jotTotalSupply | uint256 | the total supply of junior tokens |

#### Return Values

| Name             | Type    | Description                                   |
| ---------------- | ------- | --------------------------------------------- |
| juniorTokenPrice | uint256 | the junior token price in RAY decimal (10^27) |

### calcTokenPrices

```solidity
function calcTokenPrices(uint256 _nav, uint256 _reserve, uint256 _seniorDebt, uint256 _seniorBalance, uint256 _jotTotalSupply, uint256 _sotTotalSupply) external pure returns (uint256 juniorTokenPrice, uint256 seniorTokenPrice)
```

Calculates the price of junior and senior tokens.

#### Parameters

| Name             | Type    | Description                 |
| ---------------- | ------- | --------------------------- |
| \_nav            | uint256 | The nav value.              |
| \_reserve        | uint256 | The reserve value.          |
| \_seniorDebt     | uint256 | The senior debt value.      |
| \_seniorBalance  | uint256 | The senior balance value.   |
| \_jotTotalSupply | uint256 | Total supply of JOT tokens. |
| \_sotTotalSupply | uint256 | Total supply of SOT tokens. |

#### Return Values

| Name             | Type    | Description                |
| ---------------- | ------- | -------------------------- |
| juniorTokenPrice | uint256 | Price of the junior token. |
| seniorTokenPrice | uint256 | Price of the senior token. |

### \_calcSeniorTokenPrice

```solidity
function _calcSeniorTokenPrice(uint256 _nav, uint256 _reserve, uint256 _seniorDebt, uint256 _seniorBalance, uint256 _sotTotalSupply) internal pure returns (uint256 seniorTokenPrice)
```

internal function to calculate the senior token price

#### Parameters

| Name             | Type    | Description        |
| ---------------- | ------- | ------------------ |
| \_nav            | uint256 | the NAV            |
| \_reserve        | uint256 | the reserve        |
| \_seniorDebt     | uint256 | the senior debt    |
| \_seniorBalance  | uint256 | the senior balance |
| \_sotTotalSupply | uint256 | the token supply   |

#### Return Values

| Name             | Type    | Description                                   |
| ---------------- | ------- | --------------------------------------------- |
| seniorTokenPrice | uint256 | the senior token price in RAY decimal (10^27) |

### \_calcJuniorTokenPrice

```solidity
function _calcJuniorTokenPrice(uint256 _nav, uint256 _reserve, uint256 _seniorDebt, uint256 _seniorBalance, uint256 _jotTotalSupply) internal pure returns (uint256 juniorTokenPrice)
```

internal function to calculate the junior token price

#### Parameters

| Name             | Type    | Description        |
| ---------------- | ------- | ------------------ |
| \_nav            | uint256 | the NAV            |
| \_reserve        | uint256 | the reserve        |
| \_seniorDebt     | uint256 | the senior debt    |
| \_seniorBalance  | uint256 | the senior balance |
| \_jotTotalSupply | uint256 | the token supply   |

#### Return Values

| Name             | Type    | Description                                   |
| ---------------- | ------- | --------------------------------------------- |
| juniorTokenPrice | uint256 | the junior token price in RAY decimal (10^27) |

### calcJuniorRatio

```solidity
function calcJuniorRatio(uint256 _nav, uint256 _reserve, uint256 _seniorDebt, uint256 _seniorBalance) external pure returns (uint256 juniorRatio_)
```

_Calculates junior ratio based on NAV, reserve, senior debt and senior balance.
Uses safe arithmetic operations to prevent overflows or underflows._

#### Parameters

| Name            | Type    | Description                                            |
| --------------- | ------- | ------------------------------------------------------ |
| \_nav           | uint256 | The Net Asset Value of the portfolio.                  |
| \_reserve       | uint256 | The amount of funds that are currently in the reserve. |
| \_seniorDebt    | uint256 | The total debt owed by senior holders.                 |
| \_seniorBalance | uint256 | The balance of assets held by senior holders.          |

#### Return Values

| Name          | Type    | Description                  |
| ------------- | ------- | ---------------------------- |
| juniorRatio\_ | uint256 | The calculated junior ratio. |

## SecuritizationPoolValueService

_Calculate pool's values_

### RATE_SCALING_FACTOR

```solidity
uint256 RATE_SCALING_FACTOR
```

### YEAR_LENGTH_IN_DAYS

```solidity
uint256 YEAR_LENGTH_IN_DAYS
```

### MINUTE_LENGTH_IN_SECONDS

```solidity
uint256 MINUTE_LENGTH_IN_SECONDS
```

### HOUR_LENGTH_IN_SECONDS

```solidity
uint256 HOUR_LENGTH_IN_SECONDS
```

### DAY_LENGTH_IN_SECONDS

```solidity
uint256 DAY_LENGTH_IN_SECONDS
```

### YEAR_LENGTH_IN_SECONDS

```solidity
uint256 YEAR_LENGTH_IN_SECONDS
```

### getAssetInterestRates

```solidity
function getAssetInterestRates(address poolAddress, bytes32[] tokenIds) public view returns (uint256[])
```

Returns an array of interest rates for each token in `tokenIds`.

_The length of the returned array will be equal to the length of `tokenIds`._

#### Parameters

| Name        | Type      | Description                                                              |
| ----------- | --------- | ------------------------------------------------------------------------ |
| poolAddress | address   | Address of the securitization pool from which to get the interest rates. |
| tokenIds    | bytes32[] | Array of bytes32 IDs for each asset whose interest rate is requested.    |

#### Return Values

| Name | Type      | Description                                                                       |
| ---- | --------- | --------------------------------------------------------------------------------- |
| [0]  | uint256[] | interestRates An array containing the interest rates corresponding to `tokenIds`. |

### getAssetInterestRate

```solidity
function getAssetInterestRate(address poolAddress, bytes32 tokenId) public view returns (uint256)
```

_This function returns the interest rate of an asset in a pool._

#### Parameters

| Name        | Type    | Description                                                     |
| ----------- | ------- | --------------------------------------------------------------- |
| poolAddress | address | The address of the pool where the asset resides.                |
| tokenId     | bytes32 | The id of the token for which we want to get the interest rate. |

#### Return Values

| Name | Type    | Description                                       |
| ---- | ------- | ------------------------------------------------- |
| [0]  | uint256 | Returns the interest rate of the specified asset. |

### getAssetRiskScores

```solidity
function getAssetRiskScores(address poolAddress, bytes32[] tokenIds) public view returns (uint256[])
```

_This function retrieves the risk scores of a list of assets in a pool._

#### Parameters

| Name        | Type      | Description                                                                     |
| ----------- | --------- | ------------------------------------------------------------------------------- |
| poolAddress | address   | The address of the pool from which to retrieve the asset risk scores.           |
| tokenIds    | bytes32[] | An array containing the IDs of the tokens for which to retrieve the risk score. |

#### Return Values

| Name | Type      | Description                                                                                             |
| ---- | --------- | ------------------------------------------------------------------------------------------------------- |
| [0]  | uint256[] | Returns an array of uint256 values representing the risk scores of each respective token in `tokenIds`. |

### getExpectedLATAssetValue

```solidity
function getExpectedLATAssetValue(address poolAddress) public view returns (uint256)
```

Get the expected LAT asset value from a securitization pool

#### Parameters

| Name        | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| poolAddress | address | The address of the securitization pool |

#### Return Values

| Name | Type    | Description                                           |
| ---- | ------- | ----------------------------------------------------- |
| [0]  | uint256 | uint256 The current net asset value (NAV) of the pool |

### getExpectedAssetValue

```solidity
function getExpectedAssetValue(address poolAddress, bytes32 tokenId) public view returns (uint256)
```

Returns the expected asset value of an asset in a pool.

_This is used by the SecuritizationPoolValueService contract to calculate the total value of all assets in a pool._

#### Parameters

| Name        | Type    | Description                                                |
| ----------- | ------- | ---------------------------------------------------------- |
| poolAddress | address | The address of the pool from which to get the asset value. |
| tokenId     | bytes32 | The ID of the token for which to get the value.            |

#### Return Values

| Name | Type    | Description                               |
| ---- | ------- | ----------------------------------------- |
| [0]  | uint256 | uint256 Returns the expected asset value. |

### getExpectedAssetValues

```solidity
function getExpectedAssetValues(address poolAddress, bytes32[] tokenIds) public view returns (uint256[] expectedAssetsValues)
```

Retrieves expected asset values for given token IDs in a pool

#### Parameters

| Name        | Type      | Description                             |
| ----------- | --------- | --------------------------------------- |
| poolAddress | address   | Address of the pool                     |
| tokenIds    | bytes32[] | Array of bytes32 representing token IDs |

#### Return Values

| Name                 | Type      | Description                                            |
| -------------------- | --------- | ------------------------------------------------------ |
| expectedAssetsValues | uint256[] | An array of uint256 representing expected asset values |

### getDebtAssetValues

```solidity
function getDebtAssetValues(address poolAddress, bytes32[] tokenIds) public view returns (uint256[] debtAssetsValues)
```

Returns an array of values representing the current value of each debt asset in a pool.

#### Parameters

| Name        | Type      | Description                                                                                |
| ----------- | --------- | ------------------------------------------------------------------------------------------ |
| poolAddress | address   | The address of the pool from which to retrieve the data.                                   |
| tokenIds    | bytes32[] | An array of bytes32 IDs corresponding to the debt assets whose values are being requested. |

#### Return Values

| Name             | Type      | Description                                                                        |
| ---------------- | --------- | ---------------------------------------------------------------------------------- |
| debtAssetsValues | uint256[] | An array of uint256 representing the current value of each debt asset in the pool. |

### getExpectedAssetsValue

```solidity
function getExpectedAssetsValue(address poolAddress) public view returns (uint256)
```

Get the expected assets value from a securitization pool.

_This function returns the expected LAT asset value of a given securitization pool address._

#### Parameters

| Name        | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| poolAddress | address | The address of the securitization pool. |

#### Return Values

| Name | Type    | Description                                   |
| ---- | ------- | --------------------------------------------- |
| [0]  | uint256 | uint256 Returns the expected LAT asset value. |

### getPoolValue

```solidity
function getPoolValue(address poolAddress) public view returns (uint256)
```

_Returns the total value of a securitization pool including the expected assets value and the current balance in the pool._

#### Parameters

| Name        | Type    | Description                                |
| ----------- | ------- | ------------------------------------------ |
| poolAddress | address | Address of the pool to get the value from. |

#### Return Values

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| [0]  | uint256 | Total value of the securitization pool. |

### getJuniorRatio

```solidity
function getJuniorRatio(address poolAddress) public view returns (uint256)
```

Returns the junior ratio of a pool.

#### Parameters

| Name        | Type    | Description                                           |
| ----------- | ------- | ----------------------------------------------------- |
| poolAddress | address | The address of the pool to get the junior ratio from. |

#### Return Values

| Name | Type    | Description                           |
| ---- | ------- | ------------------------------------- |
| [0]  | uint256 | uint256 The junior ratio of the pool. |

### getApprovedReserved

```solidity
function getApprovedReserved(address poolAddress) public view returns (uint256 approvedReserved)
```

_Returns the current allowance for the pool pot to spend on behalf of the pool address._

#### Parameters

| Name        | Type    | Description              |
| ----------- | ------- | ------------------------ |
| poolAddress | address | The address of the pool. |

#### Return Values

| Name             | Type    | Description                                                       |
| ---------------- | ------- | ----------------------------------------------------------------- |
| approvedReserved | uint256 | The amount that is currently allowed to be spent by the pool pot. |

### getMaxAvailableReserve

```solidity
function getMaxAvailableReserve(address poolAddress, uint256 sotRequest) public view returns (uint256, uint256, uint256)
```

Get the maximum available reserve to withdraw.

#### Parameters

| Name        | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| poolAddress | address | Address of the pool.                    |
| sotRequest  | uint256 | Amount of SOT requested for withdrawal. |

#### Return Values

| Name | Type    | Description                                                                                        |
| ---- | ------- | -------------------------------------------------------------------------------------------------- |
| [0]  | uint256 | The amount of JOT and SOT that can be withdrawn, along with the corresponding amounts in currency. |
| [1]  | uint256 |                                                                                                    |
| [2]  | uint256 |                                                                                                    |

### getSOTTokenPrice

```solidity
function getSOTTokenPrice(address securitizationPool) public view returns (uint256)
```

_This function returns the current price of SOT tokens in the specified securitization pool._

#### Parameters

| Name               | Type    | Description                                      |
| ------------------ | ------- | ------------------------------------------------ |
| securitizationPool | address | The address of the Securitization Pool contract. |

#### Return Values

| Name | Type    | Description                                           |
| ---- | ------- | ----------------------------------------------------- |
| [0]  | uint256 | sotTokenPrice The current price of SOT tokens in wei. |

### calcCorrespondingTotalAssetValue

```solidity
function calcCorrespondingTotalAssetValue(address tokenAddress, address investor) public view returns (uint256)
```

Calculates the corresponding total asset value of a specific token and an investor.

#### Parameters

| Name         | Type    | Description                                                |
| ------------ | ------- | ---------------------------------------------------------- |
| tokenAddress | address | The address of the token to calculate the value for.       |
| investor     | address | The address of the investor whose assets are being valued. |

#### Return Values

| Name | Type    | Description                       |
| ---- | ------- | --------------------------------- |
| [0]  | uint256 | The calculated total asset value. |

### \_calcCorrespondingAssetValue

```solidity
function _calcCorrespondingAssetValue(address tokenAddress, address investor) internal view returns (uint256)
```

_Calculates the corresponding asset value of an investor's token balance based on the price per token from a pool._

#### Parameters

| Name         | Type    | Description                             |
| ------------ | ------- | --------------------------------------- |
| tokenAddress | address | The address of the note token contract. |
| investor     | address | The address of the investor.            |

#### Return Values

| Name | Type    | Description                  |
| ---- | ------- | ---------------------------- |
| [0]  | uint256 | The calculated value in wei. |

### calcCorrespondingAssetValue

```solidity
function calcCorrespondingAssetValue(address tokenAddress, address[] investors) external view returns (uint256[] values)
```

Calculates corresponding asset value for each investor

#### Parameters

| Name         | Type      | Description                     |
| ------------ | --------- | ------------------------------- |
| tokenAddress | address   | Address of the token            |
| investors    | address[] | Array of addresses of investors |

#### Return Values

| Name   | Type      | Description                                               |
| ------ | --------- | --------------------------------------------------------- |
| values | uint256[] | An array containing calculated corresponding asset values |

### calcTokenPrice

```solidity
function calcTokenPrice(address pool, address tokenAddress) public view returns (uint256)
```

_Calculates the price of a token in a securitization pool._

#### Parameters

| Name         | Type    | Description                                                |
| ------------ | ------- | ---------------------------------------------------------- |
| pool         | address | The address of the securitization pool.                    |
| tokenAddress | address | The address of the token for which to calculate the price. |

#### Return Values

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| [0]  | uint256 | The price of the token in wei. |

### getTokenPrices

```solidity
function getTokenPrices(address[] pools, address[] tokenAddresses) public view returns (uint256[] tokenPrices)
```

Retrieve token prices for each pool in the given list

_Calculates the price of a specific token in each pool_

#### Parameters

| Name           | Type      | Description                                          |
| -------------- | --------- | ---------------------------------------------------- |
| pools          | address[] | List of securitization pools to retrieve prices from |
| tokenAddresses | address[] | List of tokens to calculate prices for               |

#### Return Values

| Name        | Type      | Description                                   |
| ----------- | --------- | --------------------------------------------- |
| tokenPrices | uint256[] | Array of calculated prices, one for each pool |

### getTokenValues

```solidity
function getTokenValues(address[] tokenAddresses, address[] investors) public view returns (uint256[] tokenValues)
```

_Calculates corresponding asset value for each investor based on their tokens_

#### Parameters

| Name           | Type      | Description                                         |
| -------------- | --------- | --------------------------------------------------- |
| tokenAddresses | address[] | Array of addresses representing different tokens    |
| investors      | address[] | Array of addresses representing different investors |

#### Return Values

| Name        | Type      | Description                                                 |
| ----------- | --------- | ----------------------------------------------------------- |
| tokenValues | uint256[] | An array containing the calculated values for each investor |

### getJOTTokenPrice

```solidity
function getJOTTokenPrice(address securitizationPool) public view returns (uint256)
```

Returns the current price of JOT tokens in the securitization pool

#### Parameters

| Name               | Type    | Description                        |
| ------------------ | ------- | ---------------------------------- |
| securitizationPool | address | Address of the Securitization Pool |

#### Return Values

| Name | Type    | Description                                   |
| ---- | ------- | --------------------------------------------- |
| [0]  | uint256 | jotTokenPrice The current price of JOT tokens |

### getCashBalance

```solidity
function getCashBalance(address pool) external view returns (uint256)
```

_Returns the current cash balance of the pool._

#### Parameters

| Name | Type    | Description              |
| ---- | ------- | ------------------------ |
| pool | address | The address of the pool. |

#### Return Values

| Name | Type    | Description                                                           |
| ---- | ------- | --------------------------------------------------------------------- |
| [0]  | uint256 | The current cash balance of the pool in terms of underlying currency. |

## Discounting

Discounting contract without a state which defines the relevant formulas for the navfeed

### calcDiscount

```solidity
function calcDiscount(uint256 discountRate, uint256 fv, uint256 normalizedBlockTimestamp, uint256 maturityDate) internal pure returns (uint256 result)
```

calculates the discount for a given loan

#### Parameters

| Name                     | Type    | Description                                      |
| ------------------------ | ------- | ------------------------------------------------ |
| discountRate             | uint256 | the discount rate                                |
| fv                       | uint256 | the future value of the loan                     |
| normalizedBlockTimestamp | uint256 | the normalized block time (each day to midnight) |
| maturityDate             | uint256 | the maturity date of the loan                    |

#### Return Values

| Name   | Type    | Description           |
| ------ | ------- | --------------------- |
| result | uint256 | discount for the loan |

### calcFutureValue

```solidity
function calcFutureValue(uint256 loanInterestRate, uint256 amount, uint256 maturityDate, uint256 recoveryRatePD) internal view returns (uint256 fv)
```

calculate the future value based on the amount, maturityDate interestRate and recoveryRate

#### Parameters

| Name             | Type    | Description                                                            |
| ---------------- | ------- | ---------------------------------------------------------------------- |
| loanInterestRate | uint256 | the interest rate of the loan                                          |
| amount           | uint256 | of the loan (principal)                                                |
| maturityDate     | uint256 | the maturity date of the loan                                          |
| recoveryRatePD   | uint256 | the recovery rate together with the probability of default of the loan |

#### Return Values

| Name | Type    | Description              |
| ---- | ------- | ------------------------ |
| fv   | uint256 | future value of the loan |

### secureSub

```solidity
function secureSub(uint256 x, uint256 y) internal pure returns (uint256 result)
```

substracts to values if the result smaller than 0 it returns 0

#### Parameters

| Name | Type    | Description                   |
| ---- | ------- | ----------------------------- |
| x    | uint256 | the first value (minuend)     |
| y    | uint256 | the second value (subtrahend) |

#### Return Values

| Name   | Type    | Description               |
| ------ | ------- | ------------------------- |
| result | uint256 | result of the subtraction |

### uniqueDayTimestamp

```solidity
function uniqueDayTimestamp(uint256 timestamp) internal pure returns (uint256 nTimestamp)
```

normalizes a timestamp to round down to the nearest midnight (UTC)

#### Parameters

| Name      | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| timestamp | uint256 | the timestamp which should be normalized |

#### Return Values

| Name       | Type    | Description          |
| ---------- | ------- | -------------------- |
| nTimestamp | uint256 | normalized timestamp |

### rpow

```solidity
function rpow(uint256 x, uint256 n, uint256 base) internal pure returns (uint256 z)
```

rpow peforms a math pow operation with fixed point number
adopted from ds-math

#### Parameters

| Name | Type    | Description                        |
| ---- | ------- | ---------------------------------- |
| x    | uint256 | the base for the pow operation     |
| n    | uint256 | the exponent for the pow operation |
| base | uint256 | the base of the fixed point number |

#### Return Values

| Name | Type    | Description                     |
| ---- | ------- | ------------------------------- |
| z    | uint256 | the result of the pow operation |

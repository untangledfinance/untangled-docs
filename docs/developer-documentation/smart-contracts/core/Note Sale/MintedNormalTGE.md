## MintedNormalTGE

_Note sale for JOT_

### registry

```solidity
contract Registry registry
```

### pool

```solidity
address pool
```

_Pool address which this sale belongs to_

### hasStarted

```solidity
bool hasStarted
```

### token

```solidity
address token
```

_The token being sold_

### currency

```solidity
address currency
```

_The token being sold_

### firstNoteTokenMintedTimestamp

```solidity
uint256 firstNoteTokenMintedTimestamp
```

_Timestamp at which the first asset is collected to pool_

### \_currencyRaised

```solidity
uint256 _currencyRaised
```

_Amount of currency raised_

### tokenRaised

```solidity
uint256 tokenRaised
```

_Amount of token raised_

### totalCap

```solidity
uint256 totalCap
```

_Target raised currency amount_

### minBidAmount

```solidity
uint256 minBidAmount
```

_Minimum currency bid amount for note token_

### initialAmount

```solidity
uint256 initialAmount
```

### openingTime

```solidity
uint256 openingTime
```

### \_currencyRaisedByInvestor

```solidity
mapping(address => uint256) _currencyRaisedByInvestor
```

### isOpen

```solidity
function isOpen() public view returns (bool)
```

### initialize

```solidity
function initialize(contract Registry _registry, address _pool, address _token, address _currency, uint256 _openingTime) public
```

### securitizationPoolRestricted

```solidity
modifier securitizationPoolRestricted()
```

### smpRestricted

```solidity
modifier smpRestricted()
```

### currencyRaisedByInvestor

```solidity
function currencyRaisedByInvestor(address investor) public view returns (uint256)
```

_This function returns the amount of currency raised by a specific investor._

#### Parameters

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| investor | address | The address of the investor. |

#### Return Values

| Name | Type    | Description                                    |
| ---- | ------- | ---------------------------------------------- |
| [0]  | uint256 | The amount of currency raised by the investor. |

### setMinBidAmount

```solidity
function setMinBidAmount(uint256 _minBidAmount) external
```

_Function to set minimum bid amount_

#### Parameters

| Name           | Type    | Description                |
| -------------- | ------- | -------------------------- |
| \_minBidAmount | uint256 | The new minimum bid amount |

### setHasStarted

```solidity
function setHasStarted(bool _hasStarted) public
```

\_This function allows the owner or securitization manager to set whether the TGE has started.

Requirements:

- The caller must have either OWNER*ROLE or be the SecuritizationManager.*

#### Parameters

| Name         | Type | Description                                  |
| ------------ | ---- | -------------------------------------------- |
| \_hasStarted | bool | A boolean indicating if the TGE has started. |

### setOpeningTime

```solidity
function setOpeningTime(uint256 _openingTime) external
```

\_Allows the owner or manager to set the opening time for the token sale.

Requirements:

- The caller must have either OWNER*ROLE or be the securitization manager.*

#### Parameters

| Name          | Type    | Description                                   |
| ------------- | ------- | --------------------------------------------- |
| \_openingTime | uint256 | The timestamp when the token sale will start. |

### onRedeem

```solidity
function onRedeem(uint256 currencyAmount) public virtual
```

_Function for redeeming currency from the TGE contract.
The caller must be the Note token vault, and the amount of raised currency
is reduced by the specified amount._

#### Parameters

| Name           | Type    | Description                                  |
| -------------- | ------- | -------------------------------------------- |
| currencyAmount | uint256 | Amount to be deducted from \_currencyRaised. |

### getTokenRemainAmount

```solidity
function getTokenRemainAmount() public view returns (uint256)
```

_Returns the amount of tokens remaining in this contract's balance._

#### Return Values

| Name | Type    | Description                                                |
| ---- | ------- | ---------------------------------------------------------- |
| [0]  | uint256 | The number of tokens remaining in this contract's balance. |

### getTokenPrice

```solidity
function getTokenPrice() public view returns (uint256)
```

_Calculates the token price for a given pool and token._

#### Return Values

| Name | Type    | Description                 |
| ---- | ------- | --------------------------- |
| [0]  | uint256 | The calculated token price. |

### getTokenAmount

```solidity
function getTokenAmount(uint256 currencyAmount) public view returns (uint256)
```

_Calculates the amount of tokens that can be minted for a given currency amount._

#### Parameters

| Name           | Type    | Description                                    |
| -------------- | ------- | ---------------------------------------------- |
| currencyAmount | uint256 | The amount of currency to convert into tokens. |

#### Return Values

| Name | Type    | Description                                                                |
| ---- | ------- | -------------------------------------------------------------------------- |
| [0]  | uint256 | The number of tokens that can be minted from the provided currency amount. |

### \_preValidatePurchase

```solidity
function _preValidatePurchase(address beneficiary, uint256 currencyAmount, uint256 tokenAmount) internal view virtual
```

\_Validates that the purchase meets all requirements before minting tokens.

Requirements:

- Sale must have started.
- Currency amount should be greater than or equal to minBidAmount.
- Beneficiary address cannot be zero.
- Token amount cannot be 0.
- Currency amount should not exceed the total cap.\_

#### Parameters

| Name           | Type    | Description                                |
| -------------- | ------- | ------------------------------------------ |
| beneficiary    | address | The address receiving the tokens.          |
| currencyAmount | uint256 | Amount of currency being used to purchase. |
| tokenAmount    | uint256 | Number of tokens being minted.             |

### \_deliverTokens

```solidity
function _deliverTokens(address beneficiary, uint256 tokenAmount) internal
```

_This function mints new tokens to an address and sets up the opening block timestamp if this is the first note token being minted._

#### Parameters

| Name        | Type    | Description                                            |
| ----------- | ------- | ------------------------------------------------------ |
| beneficiary | address | The address that will receive the newly minted tokens. |
| tokenAmount | uint256 | The amount of tokens to be minted.                     |

### \_claimPayment

```solidity
function _claimPayment(address payee, uint256 currencyAmount) internal
```

_This internal function is used to claim payment. It transfers the specified amount of currency
from the payee to the contract address using transferFrom method of ERC20 standard._

#### Parameters

| Name           | Type    | Description                                |
| -------------- | ------- | ------------------------------------------ |
| payee          | address | The address that will receive the payment. |
| currencyAmount | uint256 | The amount of currency being transferred.  |

### \_forwardFunds

```solidity
function _forwardFunds(address beneficiary, uint256 currencyAmount) internal
```

_Transfers `currencyAmount` tokens to `beneficiary` address.
Requires that the contract has enough balance in terms of ERC20 token._

#### Parameters

| Name           | Type    | Description                                  |
| -------------- | ------- | -------------------------------------------- |
| beneficiary    | address | The address where the currency will be sent. |
| currencyAmount | uint256 | The amount of currency to send.              |

### currencyRaised

```solidity
function currencyRaised() public view virtual returns (uint256)
```

Returns the total amount of currency that has been raised so far.

_The \_currencyRaised variable holds this information._

#### Return Values

| Name | Type    | Description                                       |
| ---- | ------- | ------------------------------------------------- |
| [0]  | uint256 | uint256 - Total amount of currency raised in wei. |

### isDistributedFully

```solidity
function isDistributedFully() public view returns (bool)
```

Checks if the total amount of currency raised is equal to the total cap.

_This comparison is made between the \_currencyRaised variable and the totalCap variable._

#### Return Values

| Name | Type | Description                                                                               |
| ---- | ---- | ----------------------------------------------------------------------------------------- |
| [0]  | bool | bool - True if the total amount of currency raised equals the total cap, False otherwise. |

### getCurrencyRemainAmount

```solidity
function getCurrencyRemainAmount() public view virtual returns (uint256)
```

Calculates the remaining amount of currency available for purchase.

_This calculation subtracts the \_currencyRaised variable from the totalCap variable._

#### Return Values

| Name | Type    | Description                                                                |
| ---- | ------- | -------------------------------------------------------------------------- |
| [0]  | uint256 | uint256 - Remaining amount of currency in wei that can still be purchased. |

### setTotalCap

```solidity
function setTotalCap(uint256 cap_) external
```

_Allows owner or manager to set total cap for minting_

#### Parameters

| Name  | Type    | Description       |
| ----- | ------- | ----------------- |
| cap\_ | uint256 | The new total cap |

### \_setTotalCap

```solidity
function _setTotalCap(uint256 cap) internal
```

\_Set the total cap of the token sale.
Requirements:

- The new cap must be greater than zero.
- The new cap must be equal to or higher than the amount that has already been raised.
  Emits an \{UpdateTotalCap\} event.\_

### totalCapReached

```solidity
function totalCapReached() public view returns (bool)
```

Checks if the total amount of currency raised is greater than or equal to the total cap

### isUnderTotalCap

```solidity
function isUnderTotalCap(uint256 currencyAmount) public view returns (bool)
```

Checks if the sum of the current currency raised and the specified currency amount is less than or equal to the total cap

### setInitialAmount

```solidity
function setInitialAmount(uint256 _initialAmount) external
```

Setup initial amount currency raised for JOT condition

#### Parameters

| Name            | Type    | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| \_initialAmount | uint256 | Expected minimum amount of JOT before SOT start |

### buyTokens

```solidity
function buyTokens(address payee, address beneficiary, uint256 currencyAmount) public returns (uint256)
```

_Function to buy tokens from the TGE contract_

#### Parameters

| Name           | Type    | Description                                       |
| -------------- | ------- | ------------------------------------------------- |
| payee          | address | The address that receives payment                 |
| beneficiary    | address | The address that receives the purchased tokens    |
| currencyAmount | uint256 | The amount of currency to be paid by the investor |

#### Return Values

| Name | Type    | Description                                             |
| ---- | ------- | ------------------------------------------------------- |
| [0]  | uint256 | tokenAmount The number of tokens bought by the investor |

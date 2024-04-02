## SecuritizationManager

You can use this contract for creating new pool, setting up note toke sale, buying note token

### POOL_INIT_FUNC_SELECTOR

```solidity
bytes4 POOL_INIT_FUNC_SELECTOR
```

### allowedUIDTypes

```solidity
uint256[] allowedUIDTypes
```

### initialize

```solidity
function initialize(contract Registry _registry, address _factoryAdmin) public
```

### onlyPoolExisted

```solidity
modifier onlyPoolExisted(address pool)
```

### onlyIssuer

```solidity
modifier onlyIssuer(address pool)
```

### doesSOTExist

```solidity
modifier doesSOTExist(address pool)
```

### doesJOTExist

```solidity
modifier doesJOTExist(address pool)
```

### setFactoryAdmin

```solidity
function setFactoryAdmin(address _factoryAdmin) public
```

_Sets the address that can create new instances of contracts._

#### Parameters

| Name           | Type    | Description                           |
| -------------- | ------- | ------------------------------------- |
| \_factoryAdmin | address | The address of the new factory admin. |

### getPoolsLength

```solidity
function getPoolsLength() public view returns (uint256)
```

### newPoolInstance

```solidity
function newPoolInstance(bytes32 salt, address poolOwner, bytes params) external returns (address)
```

_Deploys a new instance of Securitization Pool contract with given parameters._

#### Parameters

| Name      | Type    | Description                                                                 |
| --------- | ------- | --------------------------------------------------------------------------- |
| salt      | bytes32 | A unique value to determine the location of the new pool in the blockchain. |
| poolOwner | address | Address that will own this new pool and can grant roles to other addresses. |
| params    | bytes   | Additional parameters for initializing the pool.                            |

#### Return Values

| Name | Type    | Description                                                     |
| ---- | ------- | --------------------------------------------------------------- |
| [0]  | address | The address of the newly deployed Securitization Pool contract. |

### registerPot

```solidity
function registerPot(address pot) external
```

_Registers a new pot for a SecuritizationPool.
Only existing pools can register pots.
A pot can only be registered once.
Emits a \{UpdatePotToPool\} event._

### \_initialTGEForSOT

```solidity
function _initialTGEForSOT(address issuerTokenController, address pool, uint8 saleType, string ticker, uint256 openingTime) internal returns (address, address)
```

_Deploys Senior Obligation Token (SOT) for a given pool.
This function creates SOT token, sets up the initial TGE and injects its address into the pool._

#### Parameters

| Name                  | Type    | Description                                      |
| --------------------- | ------- | ------------------------------------------------ |
| issuerTokenController | address | The address of IssuerTokenController.            |
| pool                  | address | Address of the Pool.                             |
| saleType              | uint8   | Type of Sale (0 for presale, 1 for public sale). |
| ticker                | string  | Ticker symbol of SOT token.                      |
| openingTime           | uint256 | The timestamp when the TGE starts.               |

#### Return Values

| Name | Type    | Description                                               |
| ---- | ------- | --------------------------------------------------------- |
| [0]  | address | sotToken Address of the created Senior Obligation Token.  |
| [1]  | address | tgeAddress Address of the created Token Generation Event. |

### setUpTGEForSOT

```solidity
function setUpTGEForSOT(struct ISecuritizationManager.TGEParam tgeParam, uint32 interestRate) public
```

_Function for setting up TGE for SOT (Securitized Token Offering)_

#### Parameters

| Name         | Type                                   | Description                                       |
| ------------ | -------------------------------------- | ------------------------------------------------- |
| tgeParam     | struct ISecuritizationManager.TGEParam | Struct containing parameters related to TGE setup |
| interestRate | uint32                                 | Interest rate for the Securitized Token Offering  |

### setUpTGEForJOT

```solidity
function setUpTGEForJOT(struct ISecuritizationManager.TGEParam tgeParam, uint256 initialJOTAmount) public
```

_This function sets up the Initial Token Generation Event (TGE) for JOT. It initializes various parameters of the TGE such as total cap, has started status, min bid amount and initial amount._

#### Parameters

| Name             | Type                                   | Description                                                                                                                            |
| ---------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| tgeParam         | struct ISecuritizationManager.TGEParam | Struct containing details about the TGE like issuer token controller address, pool address, sale type, ticker symbol and opening time. |
| initialJOTAmount | uint256                                | Initial JOT amount to be set for the TGE.                                                                                              |

### \_initialTGEForJOT

```solidity
function _initialTGEForJOT(address issuerTokenController, address pool, uint8 saleType, string ticker, uint256 openingTime) public returns (address, address)
```

Deploys Junior Note Token (JOT) and corresponding Token Generation Event (TGE).

_Only callable by Pool contract._

#### Parameters

| Name                  | Type    | Description                                    |
| --------------------- | ------- | ---------------------------------------------- |
| issuerTokenController | address | Address of the Issuer Token Controller.        |
| pool                  | address | Address of the Pool.                           |
| saleType              | uint8   | Type of the Sale.                              |
| ticker                | string  | String representing the token's symbol/ticker. |
| openingTime           | uint256 | Timestamp when the TGE starts.                 |

#### Return Values

| Name | Type    | Description                                                     |
| ---- | ------- | --------------------------------------------------------------- |
| [0]  | address | jotToken Address of the deployed Junior Note Token (JOT).       |
| [1]  | address | tgeAddress Address of the created Token Generation Event (TGE). |

### buyTokens

```solidity
function buyTokens(address tgeAddress, uint256 currencyAmount) external
```

_This function allows users to buy tokens from a TGE (Token Generation Event)._

#### Parameters

| Name           | Type    | Description                                          |
| -------------- | ------- | ---------------------------------------------------- |
| tgeAddress     | address | The address of the TGE.                              |
| currencyAmount | uint256 | The amount of currency to be used for buying tokens. |

### setAllowedUIDTypes

```solidity
function setAllowedUIDTypes(uint256[] ids) external
```

_Allows an admin to set the allowed UID types._

#### Parameters

| Name | Type      | Description                            |
| ---- | --------- | -------------------------------------- |
| ids  | uint256[] | The array of IDs that are now allowed. |

### hasAllowedUID

```solidity
function hasAllowedUID(address sender) public view returns (bool)
```

Check if an user has valid UID type

### updateTgeInfo

```solidity
function updateTgeInfo(struct ISecuritizationManager.TGEInfoParam[] tgeInfos) public
```

_Update TGE information for multiple projects.
Only controller of each project can call this function._

#### Parameters

| Name     | Type                                         | Description                                                                                   |
| -------- | -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| tgeInfos | struct ISecuritizationManager.TGEInfoParam[] | An array of TGEInfoParam structs containing information about each project's new TGE details. |

## TokenGenerationEventFactory

### TGE_INIT_FUNC_SELECTOR

```solidity
bytes4 TGE_INIT_FUNC_SELECTOR
```

### registry

```solidity
contract Registry registry
```

### tgeAddresses

```solidity
address[] tgeAddresses
```

### isExistingTge

```solidity
mapping(address => bool) isExistingTge
```

### TGEImplAddress

```solidity
mapping(enum ITokenGenerationEventFactory.SaleType => address) TGEImplAddress
```

### \_\_TokenGenerationEventFactory_init

```solidity
function __TokenGenerationEventFactory_init(contract Registry _registry, address _factoryAdmin) internal
```

### initialize

```solidity
function initialize(contract Registry _registry, address _factoryAdmin) public
```

### setFactoryAdmin

```solidity
function setFactoryAdmin(address _factoryAdmin) public
```

_This function sets the address of the factory admin.
Can only be called by the admin role._

#### Parameters

| Name           | Type    | Description                            |
| -------------- | ------- | -------------------------------------- |
| \_factoryAdmin | address | The new address for the factory admin. |

### setTGEImplAddress

```solidity
function setTGEImplAddress(enum ITokenGenerationEventFactory.SaleType tgeType, address newImpl) public
```

\_Allows an admin or role holder to set a new implementation address for TokenGenerationEvent contracts of specified type.
Requirements:

- The caller must have admin rights or be assigned with the DEFAULT_ADMIN_ROLE.
- The `newImpl` cannot be zero address.\_

#### Parameters

| Name    | Type                                       | Description                                                          |
| ------- | ------------------------------------------ | -------------------------------------------------------------------- |
| tgeType | enum ITokenGenerationEventFactory.SaleType | Type of TokenGenerationEvent contract to set new implementation for. |
| newImpl | address                                    | New implementation address to use.                                   |

### createNewSaleInstance

```solidity
function createNewSaleInstance(address issuerTokenController, address token, address currency, uint8 saleType, uint256 openingTime) external returns (address)
```

\_This function creates a new sale instance of the specified type.
Requirements:

- The caller must be registered as a securitization manager in the registry.
- The saleType parameter should be either NORMAL*SALE_JOT or NORMAL_SALE_SOT.*

#### Parameters

| Name                  | Type    | Description                                            |
| --------------------- | ------- | ------------------------------------------------------ |
| issuerTokenController | address | Address of the Issuer Token Controller contract.       |
| token                 | address | Address of the note token being sold.                  |
| currency              | address | Address of the currency in which to make the sale.     |
| saleType              | uint8   | Type of the sale (NORMAL_SALE_JOT or NORMAL_SALE_SOT). |
| openingTime           | uint256 | The timestamp when the sale should start.              |

#### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| [0]  | address | Address of the newly created Sale contract. |

### pauseUnpauseTge

```solidity
function pauseUnpauseTge(address tgeAdress) external
```

Pauses or unpauses a TokenGenerationEvent (TGE) contract.

_Only callable by an admin role, and only if the TGE exists._

#### Parameters

| Name      | Type    | Description                                   |
| --------- | ------- | --------------------------------------------- |
| tgeAdress | address | The address of the TGE to be paused/unpaused. |

### pauseUnpauseAllTges

```solidity
function pauseUnpauseAllTges() external
```

This function pauses or unpauses all TokenGenerationEvents (TGEs) based on their current state.
If the TGE is currently paused, it will be unpaused; if not, it will be paused.

_Only callable by the DEFAULT_ADMIN_ROLE and only when contract is not paused._

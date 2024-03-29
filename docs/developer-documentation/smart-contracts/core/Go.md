## Go

_Provides functions with UID_

### ID_TYPE_0

```solidity
uint256 ID_TYPE_0
```

### ID_TYPE_1

```solidity
uint256 ID_TYPE_1
```

### ID_TYPE_2

```solidity
uint256 ID_TYPE_2
```

### ID_TYPE_3

```solidity
uint256 ID_TYPE_3
```

### ID_TYPE_4

```solidity
uint256 ID_TYPE_4
```

### ID_TYPE_5

```solidity
uint256 ID_TYPE_5
```

### ID_TYPE_6

```solidity
uint256 ID_TYPE_6
```

### ID_TYPE_7

```solidity
uint256 ID_TYPE_7
```

### ID_TYPE_8

```solidity
uint256 ID_TYPE_8
```

### ID_TYPE_9

```solidity
uint256 ID_TYPE_9
```

### ID_TYPE_10

```solidity
uint256 ID_TYPE_10
```

### uniqueIdentity

```solidity
contract IUniqueIdentity uniqueIdentity
```

Returns the address of the UniqueIdentity contract.

### allIdTypes

```solidity
uint256[11] allIdTypes
```

### onlyAdmin

```solidity
modifier onlyAdmin()
```

### initialize

```solidity
function initialize(address owner, contract IUniqueIdentity _uniqueIdentity) public
```

### performUpgrade

```solidity
function performUpgrade() external
```

_Update allIdTypes values_

### \_performUpgrade

```solidity
function _performUpgrade() internal
```

### goOnlyIdTypes

```solidity
function goOnlyIdTypes(address account, uint256[] onlyIdTypes) public view returns (bool)
```

Returns whether the provided account is:

1. go-listed for use of the Untangled protocol for any of the provided UID token types
2. is allowed to act on behalf of the go-listed EOA initiating this transaction
   Go-listed is defined as: whether `balanceOf(account, id)` on the UniqueIdentity
   contract is non-zero (where `id` is a supported token id on UniqueIdentity), falling back to the
   account's status on the legacy go-list.

_If tx.origin is 0x0 (e.g. in blockchain explorers such as Etherscan) this function will
throw an error if the account is not go listed._

#### Parameters

| Name        | Type      | Description                           |
| ----------- | --------- | ------------------------------------- |
| account     | address   | The account whose go status to obtain |
| onlyIdTypes | uint256[] | Array of id types to check balances   |

#### Return Values

| Name | Type | Description             |
| ---- | ---- | ----------------------- |
| [0]  | bool | The account's go status |

### getAllIdTypes

```solidity
function getAllIdTypes() public view returns (uint256[])
```

Returns a dynamic array of all UID types

### go

```solidity
function go(address account) public view returns (bool)
```

Returns whether the provided account is go-listed for any UID type

#### Parameters

| Name    | Type    | Description                           |
| ------- | ------- | ------------------------------------- |
| account | address | The account whose go status to obtain |

#### Return Values

| Name | Type | Description             |
| ---- | ---- | ----------------------- |
| [0]  | bool | The account's go status |

### initZapperRole

```solidity
function initZapperRole() external
```

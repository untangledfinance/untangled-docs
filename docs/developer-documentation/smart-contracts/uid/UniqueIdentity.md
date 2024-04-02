## UniqueIdentity

UniqueIdentity is an ERC1155-compliant contract for representing
the identity verification status of addresses.

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

### MINT_COST_PER_TOKEN

```solidity
uint256 MINT_COST_PER_TOKEN
```

### nonces

```solidity
mapping(address => uint256) nonces
```

_We include a nonce in every hashed message, and increment the nonce as part of a
state-changing operation, so as to prevent replay attacks, i.e. the reuse of a signature._

### supportedUIDTypes

```solidity
mapping(uint256 => bool) supportedUIDTypes
```

### initialize

```solidity
function initialize(address owner, string uri) public
```

### \_\_UniqueIdentity_init

```solidity
function __UniqueIdentity_init(address owner) internal
```

### \_\_UniqueIdentity_init_unchained

```solidity
function __UniqueIdentity_init_unchained(address owner) internal
```

### addSuperAdmin

```solidity
function addSuperAdmin(address account) public
```

\_This function allows an admin to grant superadmin rights to another address.
Only admins can call this function.
Requirements:

- The calling contract must have the 'ADMIN*ROLE'.*

#### Parameters

| Name    | Type    | Description                        |
| ------- | ------- | ---------------------------------- |
| account | address | The address of the new superadmin. |

### setSupportedUIDTypes

```solidity
function setSupportedUIDTypes(uint256[] ids, bool[] values) public
```

_Sets whether a given UID type is supported by the system._

#### Parameters

| Name   | Type      | Description                                                                    |
| ------ | --------- | ------------------------------------------------------------------------------ |
| ids    | uint256[] | The IDs of the UID types to be set.                                            |
| values | bool[]    | Whether each corresponding UID type should be supported (true) or not (false). |

### name

```solidity
function name() public pure returns (string)
```

_Gets the token name._

#### Return Values

| Name | Type   | Description                        |
| ---- | ------ | ---------------------------------- |
| [0]  | string | string representing the token name |

### symbol

```solidity
function symbol() public pure returns (string)
```

_Gets the token symbol._

#### Return Values

| Name | Type   | Description                          |
| ---- | ------ | ------------------------------------ |
| [0]  | string | string representing the token symbol |

### mint

```solidity
function mint(uint256 id, uint256 expiresAt, bytes signature) public payable
```

_Mints a new token to the caller's address. The function requires a valid signature from the signer contract, which proves that the caller has permission to mint tokens.
It also checks if the provided id and expiresAt parameters match with the ones signed in the signature parameter._

#### Parameters

| Name      | Type    | Description                                                                                 |
| --------- | ------- | ------------------------------------------------------------------------------------------- |
| id        | uint256 | The unique identifier of the token.                                                         |
| expiresAt | uint256 | The timestamp after which the token is no longer valid.                                     |
| signature | bytes   | A signature from the signer contract proving that the caller has permission to mint tokens. |

### mintTo

```solidity
function mintTo(address recipient, uint256 id, uint256 expiresAt, bytes signature) public payable
```

_Mints a new UniqueIdentity (UID) token for a specified recipient. The UID will have the given id, and it will expire at the provided timestamp.
This function can only be called by an authorized signer with the correct signature._

#### Parameters

| Name      | Type    | Description                                                                         |
| --------- | ------- | ----------------------------------------------------------------------------------- |
| recipient | address | Address of the person to receive the new UID.                                       |
| id        | uint256 | Unique identifier for this UID.                                                     |
| expiresAt | uint256 | Timestamp after which this UID will no longer be valid.                             |
| signature | bytes   | Signature from an authorized signer proving they have permission to mint a new UID. |

### burn

```solidity
function burn(address account, uint256 id, uint256 expiresAt, bytes signature) public
```

Burns a token from the specified account.

_The caller must have signed the message with their private key to be approved._

#### Parameters

| Name      | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| account   | address | Address of the account that owns the tokens. |
| id        | uint256 | ID of the token to burn.                     |
| expiresAt | uint256 | Expiry time for the signature.               |
| signature | bytes   | Signature from the signer.                   |

### burnFrom

```solidity
function burnFrom(address account, uint256 id) public
```

_Burn tokens from an account_

#### Parameters

| Name    | Type    | Description                                 |
| ------- | ------- | ------------------------------------------- |
| account | address | The address of the user who owns the tokens |
| id      | uint256 | The unique identifier for the token         |

### \_beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data) internal
```

_Overrides the \_beforeTokenTransfer function from ERC1155PresetPauserUpgradeable contract.
Only minting (from zero address to non-zero) or burning (from non-zero address to zero) transfers are allowed._

#### Parameters

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| operator | address   | The address which initiated the transfer.        |
| from     | address   | The address which is sending tokens.             |
| to       | address   | The address which is receiving tokens.           |
| ids      | uint256[] | An array of token IDs being transferred.         |
| amounts  | uint256[] | An array of numbers of tokens being transferred. |
| data     | bytes     | Additional data with no specified format.        |

### onlySigner

```solidity
modifier onlySigner(address account, uint256 id, uint256 expiresAt, bytes signature)
```

### onlySignerMintTo

```solidity
modifier onlySignerMintTo(address mintToAddress, uint256 id, uint256 expiresAt, bytes signature)
```

### incrementNonce

```solidity
modifier incrementNonce(address account)
```

### unlockWrongToken

```solidity
function unlockWrongToken(address token) public
```

This function can only be called by an admin. It is used to recover tokens or native currency sent to the contract by mistake.

_Allows the admin to unlock and transfer any wrongfully sent tokens from the contract to the admin's address._

#### Parameters

| Name  | Type    | Description                                                                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| token | address | The address of the token to be unlocked. If the token address is 0, it will transfer the native currency (e.g. ETH) instead. |

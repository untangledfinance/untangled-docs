## NoteTokenFactory

### TOKEN_INIT_FUNC_SELECTOR

```solidity
bytes4 TOKEN_INIT_FUNC_SELECTOR
```

### registry

```solidity
contract Registry registry
```

### tokens

```solidity
contract INoteToken[] tokens
```

### noteTokenImplementation

```solidity
address noteTokenImplementation
```

### isExistingTokens

```solidity
mapping(address => bool) isExistingTokens
```

### onlySecuritizationManager

```solidity
modifier onlySecuritizationManager()
```

### initialize

```solidity
function initialize(contract Registry _registry, address _factoryAdmin) public
```

### setFactoryAdmin

```solidity
function setFactoryAdmin(address _factoryAdmin) public
```

_Sets the address that can manage the factory contract._

#### Parameters

| Name           | Type    | Description                            |
| -------------- | ------- | -------------------------------------- |
| \_factoryAdmin | address | The new address for the factory admin. |

### changeMinterRole

```solidity
function changeMinterRole(address tokenAddress, address newController) external
```

Changes the minter role for a given token

_Only callable by the securitization manager_

#### Parameters

| Name          | Type    | Description                                        |
| ------------- | ------- | -------------------------------------------------- |
| tokenAddress  | address | Address of the token to change the minter role for |
| newController | address | New controller that will have the minter role      |

### setNoteTokenImplementation

```solidity
function setNoteTokenImplementation(address newAddress) external
```

_This function allows an admin to set a new implementation address for NoteToken._

#### Parameters

| Name       | Type    | Description                                                         |
| ---------- | ------- | ------------------------------------------------------------------- |
| newAddress | address | The new address of the NoteToken implementation. It cannot be zero. |

### createToken

```solidity
function createToken(address _poolAddress, enum Configuration.NOTE_TOKEN_TYPE _noteTokenType, uint8 _nDecimals, string ticker) external returns (address)
```

_Creates a new note token instance._

#### Parameters

| Name            | Type                               | Description                                                   |
| --------------- | ---------------------------------- | ------------------------------------------------------------- |
| \_poolAddress   | address                            | The address of the pool that will own this note token.        |
| \_noteTokenType | enum Configuration.NOTE_TOKEN_TYPE | The type of the note token (Senior or Junior).                |
| \_nDecimals     | uint8                              | The number of decimals for the note token's underlying asset. |
| ticker          | string                             | The ticker symbol for the note token.                         |

#### Return Values

| Name | Type    | Description                                                           |
| ---- | ------- | --------------------------------------------------------------------- |
| [0]  | address | address Returns the address of the newly created note token instance. |

### pauseUnpauseToken

```solidity
function pauseUnpauseToken(address tokenAddress) external
```

_This function allows an admin to pause or unpause any ERC20 token. If the token is currently paused, it will be unpaused; if not, it will be paused._

#### Parameters

| Name         | Type    | Description                                                      |
| ------------ | ------- | ---------------------------------------------------------------- |
| tokenAddress | address | The address of the ERC20 token that needs to be paused/unpaused. |

### pauseAllTokens

```solidity
function pauseAllTokens() external
```

Pauses all tokens that are not already paused.

_This function can only be called by the default admin role and cannot be re-entered until it finishes execution.
It will loop through each token in the `tokens` array, check if it is not paused, and if so, pause it._

### unPauseAllTokens

```solidity
function unPauseAllTokens() external
```

_This function unpauses all paused ERC20 tokens in the contract. Only callable by admins._

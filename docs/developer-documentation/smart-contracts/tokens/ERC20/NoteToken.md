## NoteToken

_Template for SOT/JOT token_

### \_poolAddress

```solidity
address _poolAddress
```

### \_noteTokenType

```solidity
uint8 _noteTokenType
```

### \_decimals

```solidity
uint8 _decimals
```

### initialize

```solidity
function initialize(string name, string symbol, uint8 decimalsOfToken, address poolAddressOfToken, uint8 typeOfToken) public
```

### \_beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual
```

_This function is used to check if the transfer from one address to another is valid.
It uses the registry contract's `isValidNoteTokenTransfer` method to verify this.
If the 'from' address is zero, it means that we are minting new tokens and there is no need for validation._

#### Parameters

| Name   | Type    | Description                             |
| ------ | ------- | --------------------------------------- |
| from   | address | The address of the sender.              |
| to     | address | The address of the receiver.            |
| amount | uint256 | The amount of tokens being transferred. |

### poolAddress

```solidity
function poolAddress() external view returns (address)
```

_The address of the pool is stored in a private variable `_poolAddress`._

#### Return Values

| Name | Type    | Description              |
| ---- | ------- | ------------------------ |
| [0]  | address | The address of the pool. |

### noteTokenType

```solidity
function noteTokenType() external view returns (uint8)
```

_Returns the type of Note Token used by this contract._

#### Return Values

| Name | Type  | Description                             |
| ---- | ----- | --------------------------------------- |
| [0]  | uint8 | uint8 representing the note token type. |

### decimals

```solidity
function decimals() public view returns (uint8)
```

_Returns the number of decimals used to get the user representation of a token amount.
For example, if `name` returns `"MyToken"`, then a user might see `123456` MyTokens in their wallet,
with `decimals()` returning `6`, because the base unit (or "unit") is `0.000001` MyToken.
See \{ERC20-\_setupDecimals\} to change the number of decimals._

### burn

```solidity
function burn(uint256 amount) public
```

\_Burns a specific amount of tokens from the caller's account, reducing its total supply.
Requirements:

- The caller must have at least `amount` tokens.
  Emits a \{Burn\} event.\_

#### Parameters

| Name   | Type    | Description                  |
| ------ | ------- | ---------------------------- |
| amount | uint256 | The amount of token to burn. |

### mint

```solidity
function mint(address receiver, uint256 amount) public
```

_Function to mint new tokens_

#### Parameters

| Name     | Type    | Description                                                        |
| -------- | ------- | ------------------------------------------------------------------ |
| receiver | address | Address of the account that will receive the newly created tokens. |
| amount   | uint256 | Amount of tokens to be minted.                                     |

### pause

```solidity
function pause() public virtual
```

_Pauses all token transfers. See \{ERC20PresetMinterPauserUpgradeable-pause\}._

### paused

```solidity
function paused() public view virtual returns (bool)
```

_This function is used to check if the contract is paused._

#### Return Values

| Name | Type | Description                                                     |
| ---- | ---- | --------------------------------------------------------------- |
| [0]  | bool | bool - Returns true if the contract is paused, false otherwise. |

### unpause

```solidity
function unpause() public virtual
```

_Unpauses the contract, re-enabling token transfers and minting._

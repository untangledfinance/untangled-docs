## Registry

This contract stores mappings of useful "protocol config state", giving a central place
for all other contracts to access it. These config vars
are enumerated in the `Configuration` library, and can only be changed by admins of the protocol.

### contractAddresses

```solidity
mapping(uint8 => address) contractAddresses
```

### whiteListToAddresses

```solidity
mapping(address => bool) whiteListToAddresses
```

### whiteListFromAddresses

```solidity
mapping(address => bool) whiteListFromAddresses
```

### AddressUpdated

```solidity
event AddressUpdated(address owner, uint8 index, address oldValue, address newValue)
```

### initialize

```solidity
function initialize() public
```

### getAddress

```solidity
function getAddress(uint8 index) public view returns (address)
```

Returns the address of a registered contract.

_The contracts are stored in an array and can be accessed by their index._

#### Parameters

| Name  | Type  | Description                          |
| ----- | ----- | ------------------------------------ |
| index | uint8 | The index of the contract to return. |

#### Return Values

| Name | Type    | Description                                     |
| ---- | ------- | ----------------------------------------------- |
| [0]  | address | The address of the contract at the given index. |

### isValidNoteTokenTransfer

```solidity
function isValidNoteTokenTransfer(address from, address to) external view returns (bool)
```

_Checks whether a note token transfer from the given address 'from' or to the given address 'to' is valid.
A transfer is considered valid if it originates from or goes to an address in either of the whitelists._

#### Parameters

| Name | Type    | Description                  |
| ---- | ------- | ---------------------------- |
| from | address | The sender of the tokens.    |
| to   | address | The recipient of the tokens. |

#### Return Values

| Name | Type | Description                                                  |
| ---- | ---- | ------------------------------------------------------------ |
| [0]  | bool | bool Returns true if the transfer is valid, false otherwise. |

### setWhiteListAddresses

```solidity
function setWhiteListAddresses(address[] addresses, bool[] boolFroms, bool[] boolTos) public
```

_This function sets addresses in whitelist for both from and to transfers._

#### Parameters

| Name      | Type      | Description                                                                                 |
| --------- | --------- | ------------------------------------------------------------------------------------------- |
| addresses | address[] | The list of addresses to be added to the whiteList.                                         |
| boolFroms | bool[]    | A boolean array indicating whether each address should be allowed to send tokens or not.    |
| boolTos   | bool[]    | A boolean array indicating whether each address should be allowed to receive tokens or not. |

### setSecuritizationManager

```solidity
function setSecuritizationManager(address newAddress) public
```

_Sets the address of the securitization manager contract.
Only callable by admin.
The function is paused during emergency shutdowns to prevent any misuse._

#### Parameters

| Name       | Type    | Description                                         |
| ---------- | ------- | --------------------------------------------------- |
| newAddress | address | Address of the new Securitization Manager Contract. |

### setSecuritizationPool

```solidity
function setSecuritizationPool(address newAddress) public
```

_This function sets the address of SecuritizationPool contract._

#### Parameters

| Name       | Type    | Description                                         |
| ---------- | ------- | --------------------------------------------------- |
| newAddress | address | The address of the new Securitization Pool contract |

### setNoteTokenFactory

```solidity
function setNoteTokenFactory(address newAddress) public
```

_This function sets the address of NoteTokenFactory contract._

#### Parameters

| Name       | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| newAddress | address | The address to set as the Note Token Factory |

### setTokenGenerationEventFactory

```solidity
function setTokenGenerationEventFactory(address newAddress) public
```

_This function sets the address of TokenGenerationEventFactory contract._

#### Parameters

| Name       | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| newAddress | address | The address of the new TokenGenerationEventFactory contract. |

### setLoanAssetToken

```solidity
function setLoanAssetToken(address newAddress) public
```

_This function sets the address of LoanAssetToken contract._

#### Parameters

| Name       | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| newAddress | address | The address of the new loan asset token. |

### setSecuritizationPoolValueService

```solidity
function setSecuritizationPoolValueService(address newAddress) public
```

_This function sets the address of SecuritizationPoolValueService contract._

#### Parameters

| Name       | Type    | Description                                            |
| ---------- | ------- | ------------------------------------------------------ |
| newAddress | address | The new address of the SecuritizationPoolValueService. |

### setLoanKernel

```solidity
function setLoanKernel(address newAddress) public
```

_This function sets the address of LoanKernel contract._

#### Parameters

| Name       | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| newAddress | address | The new address of the LoanKernel. |

### setGo

```solidity
function setGo(address newAddress) public
```

_This function sets the address of Go contract._

#### Parameters

| Name       | Type    | Description                |
| ---------- | ------- | -------------------------- |
| newAddress | address | The new address of the Go. |

### setNoteTokenVault

```solidity
function setNoteTokenVault(address newAddress) public
```

Sets the address of NoteTokenVault.

_This function should only be called by an admin. It also updates the whitelist status for old and new addresses._

#### Parameters

| Name       | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| newAddress | address | The new address of NoteTokenVault. |

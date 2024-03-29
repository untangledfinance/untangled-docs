## UntangledERC721

### registry

```solidity
contract Registry registry
```

### **UntangledERC721**init

```solidity
function __UntangledERC721__init(string name, string symbol, string baseTokenURI) internal
```

### **UntangledERC721**init_unchained

```solidity
function __UntangledERC721__init_unchained(string name, string symbol, string baseTokenURI) internal
```

### mint

```solidity
function mint(address to, uint256 tokenId) public virtual
```

_Function to mint a new NFT. Can only be called by the minter role._

#### Parameters

| Name    | Type    | Description                   |
| ------- | ------- | ----------------------------- |
| to      | address | Address of the receiver.      |
| tokenId | uint256 | ID of the token to be minted. |

### safeMint

```solidity
function safeMint(address to, uint256 tokenId) public virtual
```

_Function to mint an NFT. Only the minter role can call this function._

#### Parameters

| Name    | Type    | Description                   |
| ------- | ------- | ----------------------------- |
| to      | address | Address of the receiver.      |
| tokenId | uint256 | ID of the token to be minted. |

### setBaseURI

```solidity
function setBaseURI(string baseTokenURI) public virtual
```

_Sets the base URI for all tokens. It's used to create the full tokenURI in \{\_tokenURI\}.
Can only be called by the contract owner (DEFAULT_ADMIN_ROLE)._

#### Parameters

| Name         | Type   | Description       |
| ------------ | ------ | ----------------- |
| baseTokenURI | string | The new base URI. |

### \_baseURI

```solidity
function _baseURI() internal view virtual returns (string)
```

_Returns the base URI for computing \{tokenURI\}.
The format of the returned value is always '\{base\}\{id\}', where 'base' is set in the constructor and 'id' is the token id.
This function returns \_baseTokenURI which is a string containing the base URI for all tokens._

#### Return Values

| Name | Type   | Description                                           |
| ---- | ------ | ----------------------------------------------------- |
| [0]  | string | string memory - Returns the base URI of the contract. |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view virtual returns (string)
```

_Returns the URI for a given token ID.
Throws if the token ID has not been minted yet.
The resulting string concatenates the baseURI, hexadecimal representation of the tokenId and chain id in query parameters._

#### Parameters

| Name    | Type    | Description                                    |
| ------- | ------- | ---------------------------------------------- |
| tokenId | uint256 | - The ID of the token to retrieve the URI for. |

#### Return Values

| Name | Type   | Description                 |
| ---- | ------ | --------------------------- |
| [0]  | string | A URI for a given token ID. |

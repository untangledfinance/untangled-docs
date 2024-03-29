## LATValidator

### LAT_TYPEHASH

```solidity
bytes32 LAT_TYPEHASH
```

### \_nonces

```solidity
mapping(uint256 => uint256) _nonces
```

### validateCreditor

```solidity
modifier validateCreditor(address creditor, struct DataTypes.LoanAssetInfo info)
```

### requireValidator

```solidity
modifier requireValidator(struct DataTypes.LoanAssetInfo info)
```

### requireNonceValid

```solidity
modifier requireNonceValid(struct DataTypes.LoanAssetInfo info)
```

### \_checkNonceValid

```solidity
function _checkNonceValid(struct DataTypes.LoanAssetInfo info) internal
```

_This function checks if nonces are valid for each tokenId in info.tokenIds array.
It requires that the nonce at index i matches \_nonces[info.tokenIds[i]].
If it does, then increment \_nonces[info.tokenIds[i]] by one and emit a NonceChanged event._

#### Parameters

| Name | Type                           | Description                                                 |
| ---- | ------------------------------ | ----------------------------------------------------------- |
| info | struct DataTypes.LoanAssetInfo | LoanAssetInfo containing tokenIds and corresponding nonces. |

### \_\_LATValidator_init

```solidity
function __LATValidator_init() internal
```

_Initializes the contract, setting the name and version for EIP712 signature generation._

### \_\_LATValidator_init_unchained

```solidity
function __LATValidator_init_unchained() internal
```

### isValidator

```solidity
function isValidator(address pool, address sender) public view virtual returns (bool)
```

### nonce

```solidity
function nonce(uint256 tokenId) external view returns (uint256)
```

\_Returns the nonce for a given token ID.

Requirements:

- The index must exist.\_

#### Parameters

| Name    | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| tokenId | uint256 | The ID of the token to get the nonce of. |

#### Return Values

| Name | Type    | Description             |
| ---- | ------- | ----------------------- |
| [0]  | uint256 | The nonce of the token. |

### \_checkValidator

```solidity
function _checkValidator(struct DataTypes.LoanAssetInfo latInfo) internal view returns (bool)
```

Checks if the provided loan asset information is valid.

_The function takes in LoanAssetInfo struct which contains tokenIds, nonces and validator address. It calculates a hash of this data using keccak256 and abi encode. Then it checks if the signature is valid by calling `isValidSignatureNow` on the validator's address with the calculated digest and provided signature._

#### Parameters

| Name    | Type                           | Description                               |
| ------- | ------------------------------ | ----------------------------------------- |
| latInfo | struct DataTypes.LoanAssetInfo | The loan asset information to be checked. |

#### Return Values

| Name | Type | Description                                                   |
| ---- | ---- | ------------------------------------------------------------- |
| [0]  | bool | bool Returns true if the signature is valid, false otherwise. |

### domainSeparatorV4

```solidity
function domainSeparatorV4() external view returns (bytes32)
```

_Returns the domain separator used in the encoding of the signature for \{permit\}._

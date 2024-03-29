## PoolAssetLogic

Provides pool's asset related functions

### ExportNFTAsset

```solidity
event ExportNFTAsset(address tokenAddress, address toPoolAddress, uint256[] tokenIds)
```

### WithdrawNFTAsset

```solidity
event WithdrawNFTAsset(address[] tokenAddresses, uint256[] tokenIds, address[] recipients)
```

### UpdateOpeningBlockTimestamp

```solidity
event UpdateOpeningBlockTimestamp(uint256 newTimestamp)
```

### CollectNFTAsset

```solidity
event CollectNFTAsset(uint256[] tokenIds, uint256 expectedAssetsValue)
```

### CollectERC20Asset

```solidity
event CollectERC20Asset(address token, uint256 currentBalance)
```

### WithdrawERC20Asset

```solidity
event WithdrawERC20Asset(address[] tokenAddresses, address[] recipients, uint256[] amounts)
```

### SetRiskScore

```solidity
event SetRiskScore(struct DataTypes.RiskScore[] riskscores)
```

### setupRiskScores

```solidity
function setupRiskScores(struct DataTypes.Storage _poolStorage, uint32[] _daysPastDues, uint32[] _ratesAndDefaults, uint32[] _periodsAndWriteOffs) external
```

_This function sets up risk scores for securitization pool.
It requires that the input arrays are sorted and have equal lengths,
where each element of one array corresponds to an index in the other two arrays.
The function also emits a 'SetRiskScore' event with the new risk scores as parameter._

#### Parameters

| Name                  | Type                     | Description                                                               |
| --------------------- | ------------------------ | ------------------------------------------------------------------------- |
| \_poolStorage         | struct DataTypes.Storage | storage object for pool details                                           |
| \_daysPastDues        | uint32[]                 | array of days past due periods                                            |
| \_ratesAndDefaults    | uint32[]                 | array of rates and defaults corresponding to each day past due period     |
| \_periodsAndWriteOffs | uint32[]                 | array of periods and write offs corresponding to each day past due period |

### exportAssets

```solidity
function exportAssets(struct DataTypes.NFTAsset[] _nftAssets, address tokenAddress, address toPoolAddress, uint256[] tokenIds) external
```

_This function exports NFT assets from the pool to another address._

#### Parameters

| Name          | Type                        | Description                                                  |
| ------------- | --------------------------- | ------------------------------------------------------------ |
| \_nftAssets   | struct DataTypes.NFTAsset[] | The array of NFT assets in the pool.                         |
| tokenAddress  | address                     | The address of the ERC721 token contract.                    |
| toPoolAddress | address                     | The address where the assets will be transferred to.         |
| tokenIds      | uint256[]                   | The IDs of the tokens that are being exported from the pool. |

### withdrawAssets

```solidity
function withdrawAssets(struct DataTypes.NFTAsset[] _nftAssets, address[] tokenAddresses, uint256[] tokenIds, address[] recipients) external
```

_This function allows users to withdraw their NFT assets from the pool._

#### Parameters

| Name           | Type                        | Description                                           |
| -------------- | --------------------------- | ----------------------------------------------------- |
| \_nftAssets    | struct DataTypes.NFTAsset[] | The array of NFT assets in the pool.                  |
| tokenAddresses | address[]                   | The addresses of the tokens that represent the NFTs.  |
| tokenIds       | uint256[]                   | The IDs of the NFTs to be withdrawn.                  |
| recipients     | address[]                   | The addresses of the users who will receive the NFTs. |

### getLoansValue

```solidity
function getLoansValue(struct DataTypes.Storage _poolStorage, uint256[] tokenIds, struct DataTypes.LoanEntry[] loanEntries) external view returns (uint256 expectedAssetsValue, uint256[] expectedAssetValues)
```

Calculates the total value of loans and individual loan values.

_The function calculates the expected asset value based on the provided loan entries for each tokenId. It also returns an array with the calculated values for each tokenId._

#### Parameters

| Name          | Type                         | Description                                           |
| ------------- | ---------------------------- | ----------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage     | Pool storage object.                                  |
| tokenIds      | uint256[]                    | Array of token IDs.                                   |
| loanEntries   | struct DataTypes.LoanEntry[] | Array of loan entries corresponding to the token IDs. |

#### Return Values

| Name                | Type      | Description                                         |
| ------------------- | --------- | --------------------------------------------------- |
| expectedAssetsValue | uint256   | Total value of all loans.                           |
| expectedAssetValues | uint256[] | Array with individual loan values for each tokenId. |

### collectAssets

```solidity
function collectAssets(struct DataTypes.Storage _poolStorage, uint256[] tokenIds, struct DataTypes.LoanEntry[] loanEntries) external returns (uint256)
```

_This function collects NFT assets from users and adds them to the pool. It also updates the pool's NAV (Net Asset Value)._

#### Parameters

| Name          | Type                         | Description                                                           |
| ------------- | ---------------------------- | --------------------------------------------------------------------- |
| \_poolStorage | struct DataTypes.Storage     | The storage of the pool.                                              |
| tokenIds      | uint256[]                    | An array of token IDs representing the NFT assets being collected.    |
| loanEntries   | struct DataTypes.LoanEntry[] | An array of LoanEntry structs containing information about each loan. |

#### Return Values

| Name | Type    | Description                                                  |
| ---- | ------- | ------------------------------------------------------------ |
| [0]  | uint256 | expectedAssetsValue The total value of the collected assets. |

### setUpOpeningBlockTimestamp

```solidity
function setUpOpeningBlockTimestamp(struct DataTypes.Storage _poolStorage) public
```

_This function sets up the opening block timestamp for a pool._

#### Parameters

| Name          | Type                     | Description                     |
| ------------- | ------------------------ | ------------------------------- |
| \_poolStorage | struct DataTypes.Storage | The storage object of the pool. |

### \_setOpeningBlockTimestamp

```solidity
function _setOpeningBlockTimestamp(struct DataTypes.Storage _poolStorage, uint64 _openingBlockTimestamp) internal
```

_This function sets the opening block timestamp._

#### Parameters

| Name                    | Type                     | Description                      |
| ----------------------- | ------------------------ | -------------------------------- |
| \_poolStorage           | struct DataTypes.Storage | The storage of the pool.         |
| \_openingBlockTimestamp | uint64                   | The new opening block timestamp. |

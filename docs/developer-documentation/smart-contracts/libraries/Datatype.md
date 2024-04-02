## DataTypes

### RiskScore

```solidity
struct RiskScore {
  uint32 daysPastDue;
  uint32 advanceRate;
  uint32 penaltyRate;
  uint32 interestRate;
  uint32 probabilityOfDefault;
  uint32 lossGivenDefault;
  uint32 writeOffAfterGracePeriod;
  uint32 gracePeriod;
  uint32 collectionPeriod;
  uint32 writeOffAfterCollectionPeriod;
  uint32 discountRate;
}
```

### LoanEntry

```solidity
struct LoanEntry {
  address debtor;
  address principalTokenAddress;
  bytes32 termsParam;
  uint256 salt;
  uint256 issuanceBlockTimestamp;
  uint256 expirationTimestamp;
  uint8 riskScore;
  enum Configuration.ASSET_PURPOSE assetPurpose;
}
```

### NFTAsset

```solidity
struct NFTAsset {
  address tokenAddress;
  uint256 tokenId;
}
```

### NewPoolParams

```solidity
struct NewPoolParams {
  address currency;
  uint32 minFirstLossCushion;
  bool validatorRequired;
  uint256 debtCeiling;
}
```

### NFTDetails

```solidity
struct NFTDetails {
  uint128 futureValue;
  uint128 maturityDate;
  uint128 risk;
  address debtor;
  address principalTokenAddress;
  uint256 salt;
  uint256 issuanceBlockTimestamp;
  uint256 expirationTimestamp;
  enum Configuration.ASSET_PURPOSE assetPurpose;
  bytes32 termsParam;
  uint256 principalAmount;
  uint256 termStartUnixTimestamp;
  uint256 termEndUnixTimestamp;
  enum UnpackLoanParamtersLib.AmortizationUnitType amortizationUnitType;
  uint256 termLengthInAmortizationUnits;
  uint256 interestRate;
}
```

### Rate

```solidity
struct Rate {
  uint256 pie;
  uint256 chi;
  uint256 ratePerSecond;
  uint256 penaltyRatePerSecond;
  uint256 penaltyChi;
  uint48 lastUpdated;
  uint48 timeStartPenalty;
}
```

### LoanDetails

```solidity
struct LoanDetails {
  uint128 borrowed;
  bool authWriteOff;
}
```

### WriteOffGroup

```solidity
struct WriteOffGroup {
  uint128 percentage;
  uint128 overdueDays;
  uint128 riskIndex;
}
```

### Storage

```solidity
struct Storage {
  bool validatorRequired;
  uint64 firstAssetTimestamp;
  struct DataTypes.RiskScore[] riskScores;
  struct DataTypes.NFTAsset[] nftAssets;
  address tgeAddress;
  address secondTGEAddress;
  address sotToken;
  address jotToken;
  address underlyingCurrency;
  uint256 incomeReserve;
  uint256 capitalReserve;
  uint32 minFirstLossCushion;
  uint64 openingBlockTimestamp;
  address pot;
  uint256 interestRateSOT;
  uint256 totalAssetRepaidCurrency;
  uint256 debtCeiling;
  mapping(uint256 => struct DataTypes.Rate) rates;
  mapping(uint256 => uint256) pie;
  mapping(uint256 => uint256) loanRates;
  uint256 loanCount;
  mapping(uint256 => uint256) balances;
  uint256 balance;
  mapping(bytes32 => struct DataTypes.NFTDetails) details;
  mapping(uint256 => struct DataTypes.LoanDetails) loanDetails;
  mapping(uint256 => uint256) buckets;
  struct DataTypes.WriteOffGroup[] writeOffGroups;
  uint256 discountRate;
  uint256 latestNAV;
  uint256 latestDiscount;
  uint256 lastNAVUpdate;
  uint256 overdueLoans;
  mapping(bytes32 => uint256) latestDiscountOfNavAssets;
  mapping(bytes32 => uint256) overdueLoansOfNavAssets;
  mapping(uint256 => bytes32) loanToNFT;
  uint256 totalPrincipalRepaid;
  uint256 totalInterestRepaid;
  uint256 seniorDebt;
  uint256 seniorBalance;
  uint64 lastUpdateSeniorInterest;
}
```

### LoanAssetInfo

```solidity
struct LoanAssetInfo {
  uint256[] tokenIds;
  uint256[] nonces;
  address validator;
  bytes validateSignature;
}
```

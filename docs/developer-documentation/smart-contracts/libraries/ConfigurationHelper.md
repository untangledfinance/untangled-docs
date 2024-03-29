## ConfigHelper

A convenience library for getting easy access to other contracts and constants within the
protocol, through the use of the Registry contract

### getAddress

```solidity
function getAddress(contract Registry registry, enum Configuration.CONTRACT_TYPE contractType) internal view returns (address)
```

### getSecuritizationManager

```solidity
function getSecuritizationManager(contract Registry registry) internal view returns (contract ISecuritizationManager)
```

### getSecuritizationPool

```solidity
function getSecuritizationPool(contract Registry registry) internal view returns (contract IPool)
```

### getNoteTokenFactory

```solidity
function getNoteTokenFactory(contract Registry registry) internal view returns (contract INoteTokenFactory)
```

### getTokenGenerationEventFactory

```solidity
function getTokenGenerationEventFactory(contract Registry registry) internal view returns (contract ITokenGenerationEventFactory)
```

### getLoanAssetToken

```solidity
function getLoanAssetToken(contract Registry registry) internal view returns (contract LoanAssetToken)
```

### getLoanKernel

```solidity
function getLoanKernel(contract Registry registry) internal view returns (contract ILoanKernel)
```

### getSecuritizationPoolValueService

```solidity
function getSecuritizationPoolValueService(contract Registry registry) internal view returns (contract ISecuritizationPoolValueService)
```

### getGo

```solidity
function getGo(contract Registry registry) internal view returns (contract IGo)
```

### getNoteTokenVault

```solidity
function getNoteTokenVault(contract Registry registry) internal view returns (contract INoteTokenVault)
```

### requireSecuritizationManager

```solidity
function requireSecuritizationManager(contract Registry registry, address account) internal view
```

### requireLoanKernel

```solidity
function requireLoanKernel(contract Registry registry, address account) internal view
```

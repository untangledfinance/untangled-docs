## LoanAssetToken

LoanAssetToken: The representative for ownership of a Loan

### initialize

```solidity
function initialize(contract Registry _registry, string name, string symbol, string baseTokenURI) public
```

CONSTRUCTOR

### safeMint

```solidity
function safeMint(address creditor, struct DataTypes.LoanAssetInfo latInfo) public
```

_Function to mint loan assets to creditor_

#### Parameters

| Name     | Type                           | Description                                           |
| -------- | ------------------------------ | ----------------------------------------------------- |
| creditor | address                        | The address of the creditor                           |
| latInfo  | struct DataTypes.LoanAssetInfo | Struct containing information about the loan asset(s) |

### isValidator

```solidity
function isValidator(address pool, address sender) public view virtual returns (bool)
```

\_Checks if an address has the validator role within a specific pool.
Requirements:

- The caller must have been granted the VALIDATOR*ROLE in the specified pool.*

#### Parameters

| Name   | Type    | Description                           |
| ------ | ------- | ------------------------------------- |
| pool   | address | Address of the pool to check against. |
| sender | address | Address to check for validator role.  |

#### Return Values

| Name | Type | Description                                                             |
| ---- | ---- | ----------------------------------------------------------------------- |
| [0]  | bool | bool Whether or not the address has the validator role within the pool. |

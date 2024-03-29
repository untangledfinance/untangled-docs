## NoteTokenVault

NoteToken redemption

### registry

```solidity
contract Registry registry
```

### poolRedeemDisabled

```solidity
mapping(address => bool) poolRedeemDisabled
```

_Pool redeem disabled value_

### poolTotalSOTRedeem

```solidity
mapping(address => uint256) poolTotalSOTRedeem
```

_Pool total SOT redeem_

### poolTotalJOTRedeem

```solidity
mapping(address => uint256) poolTotalJOTRedeem
```

_Pool total JOT redeem_

### poolUserRedeems

```solidity
mapping(address => mapping(address => struct INoteTokenVault.UserOrder)) poolUserRedeems
```

_Pool user redeem order_

### nonces

```solidity
mapping(address => uint256) nonces
```

_We include a nonce in every hashed message, and increment the nonce as part of a
state-changing operation, so as to prevent replay attacks, i.e. the reuse of a signature._

### epochBatchs

```solidity
mapping(address => mapping(uint256 => mapping(uint256 => bool))) epochBatchs
```

### epochPreDistributed

```solidity
mapping(address => mapping(uint256 => bool)) epochPreDistributed
```

### orderAllowed

```solidity
modifier orderAllowed(address pool)
```

_Checks if redeeming is allowed for a given pool._

#### Parameters

| Name | Type    | Description                       |
| ---- | ------- | --------------------------------- |
| pool | address | The address of the pool to check. |

### \_incrementNonce

```solidity
function _incrementNonce(address account) internal
```

### initialize

```solidity
function initialize(contract Registry _registry) public
```

### hasAllowedUID

```solidity
function hasAllowedUID(address sender) public view returns (bool)
```

_This function checks if the sender has an allowed UID._

#### Parameters

| Name   | Type    | Description                                                         |
| ------ | ------- | ------------------------------------------------------------------- |
| sender | address | The address of the user who is trying to access this functionality. |

#### Return Values

| Name | Type | Description                                                          |
| ---- | ---- | -------------------------------------------------------------------- |
| [0]  | bool | bool Returns true if the sender has an allowed UID, false otherwise. |

### \_validateRedeemParam

```solidity
function _validateRedeemParam(struct INoteTokenVault.RedeemOrderParam redeemParam, bytes signature) internal view
```

_Validates redeem parameters.
The function checks if the user who called the function is authorized by verifying the signature against the hash of the parameters.
It also ensures that the chain id matches with the current blockchain's chain id._

#### Parameters

| Name        | Type                                    | Description                                               |
| ----------- | --------------------------------------- | --------------------------------------------------------- |
| redeemParam | struct INoteTokenVault.RedeemOrderParam | Structure containing information about the redeem order.  |
| signature   | bytes                                   | Signature provided by the user to confirm their identity. |

### redeemOrder

```solidity
function redeemOrder(struct INoteTokenVault.RedeemOrderParam redeemParam, bytes signature) public
```

Redeems note tokens for JOT or SOT in a securitization pool

_The caller must have allowed UID to redeem note tokens_

#### Parameters

| Name        | Type                                    | Description                                      |
| ----------- | --------------------------------------- | ------------------------------------------------ |
| redeemParam | struct INoteTokenVault.RedeemOrderParam | Struct containing details about the redeem order |
| signature   | bytes                                   | Signature of the redeem order by the user        |

### preDistribute

```solidity
function preDistribute(struct INoteTokenVault.EpochParam epochParam, address poolAddress, uint256 incomeAmount, uint256 capitalAmount, address[] noteTokenAddresses, uint256[] totalRedeemedNoteAmounts) public
```

This function is used to distribute income and capital from a pool.

_The function requires that the caller has the BACKEND_ADMIN_ROLE role,
that the epoch hasn't been pre-distributed yet for this pool,
and that it doesn't cause MinFirstLoss to be exceeded._

#### Parameters

| Name                     | Type                              | Description                                        |
| ------------------------ | --------------------------------- | -------------------------------------------------- |
| epochParam               | struct INoteTokenVault.EpochParam | The parameters of the epoch.                       |
| poolAddress              | address                           | The address of the pool.                           |
| incomeAmount             | uint256                           | The amount of income to distribute.                |
| capitalAmount            | uint256                           | The amount of capital to distribute.               |
| noteTokenAddresses       | address[]                         | An array of addresses of the note tokens involved. |
| totalRedeemedNoteAmounts | uint256[]                         | An array of amounts of redeemed note tokens.       |

### disburseAll

```solidity
function disburseAll(struct INoteTokenVault.EpochParam epochParam, address noteTokenAddress, address[] toAddresses, uint256[] currencyAmounts, uint256[] redeemedNoteAmounts) public
```

_This function allows backend admin to disburse tokens from vault.
It requires that batchId does not exist in epochBatchs mapping,
and noteTokenAddress must be either jot or sot token of the pool.
If it's a jot token, update totalJOTRedeem for the pool and call onRedeem function from MintedNormalTGE contract.
If it's a sot token, update totalSOTRedeem for the pool and call onRedeem function from MintedNormalTGE contract.
After disbursement, subtract redeemed note amounts from user's redeem amount in poolUserRedeems mapping.
Emits a DisburseOrder event with all relevant information._

#### Parameters

| Name                | Type                              | Description                                                                                 |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| epochParam          | struct INoteTokenVault.EpochParam | Contains the pool address and epoch/batch id.                                               |
| noteTokenAddress    | address                           | Address of the token to be disbursed.                                                       |
| toAddresses         | address[]                         | Array of addresses where tokens will be sent.                                               |
| currencyAmounts     | uint256[]                         | Array of amounts in same order as toAddresses, representing how much each address receives. |
| redeemedNoteAmounts | uint256[]                         | Array of note amounts that were redeemed by users.                                          |

### \_validateCancelParam

```solidity
function _validateCancelParam(struct INoteTokenVault.CancelOrderParam cancelParam, bytes signature) internal view
```

_Validates cancel order parameters.
Requires that the current block timestamp is less than or equal to the maxTimestamp in the cancelParam struct.
Also checks if the signature matches the expected signer for this message._

#### Parameters

| Name        | Type                                    | Description                                                                                                 |
| ----------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| cancelParam | struct INoteTokenVault.CancelOrderParam | The cancel order parameter containing information about the pool, note token address and maximum timestamp. |
| signature   | bytes                                   | The ECDSA signature of the user confirming their intent to cancel the order.                                |

### cancelOrder

```solidity
function cancelOrder(struct INoteTokenVault.CancelOrderParam cancelParam, bytes signature) public
```

Cancels a note token redeem order for a user

_The caller must have approved this contract to transfer their tokens_

#### Parameters

| Name        | Type                                    | Description                                                            |
| ----------- | --------------------------------------- | ---------------------------------------------------------------------- |
| cancelParam | struct INoteTokenVault.CancelOrderParam | Parameters required for the cancellation of a note token redeem order  |
| signature   | bytes                                   | Signature proving that the caller is authorized to perform this action |

### setRedeemDisabled

```solidity
function setRedeemDisabled(address pool, bool _redeemDisabled) public
```

Set whether a pool allows redeeming tokens

_This function can only be called by backend admins_

#### Parameters

| Name             | Type    | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| pool             | address | The address of the token pool              |
| \_redeemDisabled | bool    | Whether to disable redemption for the pool |

### redeemDisabled

```solidity
function redeemDisabled(address pool) public view returns (bool)
```

_This function is used to check if the redemption of tokens in a specific pool is disabled._

#### Parameters

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| pool | address | The address of the token pool. |

#### Return Values

| Name | Type | Description                                                   |
| ---- | ---- | ------------------------------------------------------------- |
| [0]  | bool | bool Returns true if redemption is disabled, false otherwise. |

### totalJOTRedeem

```solidity
function totalJOTRedeem(address pool) public view returns (uint256)
```

Returns the total amount of JOT tokens redeemed by a specific pool.

_This information is stored in `poolTotalJOTRedeem` mapping._

#### Parameters

| Name | Type    | Description                           |
| ---- | ------- | ------------------------------------- |
| pool | address | The address of the pool to check for. |

#### Return Values

| Name | Type    | Description                                                        |
| ---- | ------- | ------------------------------------------------------------------ |
| [0]  | uint256 | uint256 Total number of JOT tokens redeemed by the specified pool. |

### totalSOTRedeem

```solidity
function totalSOTRedeem(address pool) public view returns (uint256)
```

Returns the total amount of SOT tokens redeemed from a specific pool.

#### Parameters

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| pool | address | The address of the token pool. |

#### Return Values

| Name | Type    | Description                                                  |
| ---- | ------- | ------------------------------------------------------------ |
| [0]  | uint256 | Total amount of SOT tokens redeemed from the specified pool. |

### userRedeemJOTOrder

```solidity
function userRedeemJOTOrder(address pool, address usr) public view returns (uint256)
```

_Returns the amount of JOT tokens that have been redeemed by a user from a specific pool._

#### Parameters

| Name | Type    | Description                                                         |
| ---- | ------- | ------------------------------------------------------------------- |
| pool | address | The address of the pool where the user has made a redemption order. |
| usr  | address | The address of the user who made the redemption order.              |

#### Return Values

| Name | Type    | Description                                                                                  |
| ---- | ------- | -------------------------------------------------------------------------------------------- |
| [0]  | uint256 | uint256 The amount of JOT tokens that have been redeemed by the user from the specific pool. |

### userRedeemSOTOrder

```solidity
function userRedeemSOTOrder(address pool, address usr) public view returns (uint256)
```

Returns the amount of SOT tokens that have been redeemed by a user from a specific pool.

#### Parameters

| Name | Type    | Description                                                          |
| ---- | ------- | -------------------------------------------------------------------- |
| pool | address | The address of the pool from which the user has redeemed their SOTs. |
| usr  | address | The address of the user who has redeemed their SOTs.                 |

#### Return Values

| Name | Type    | Description                                                                                      |
| ---- | ------- | ------------------------------------------------------------------------------------------------ |
| [0]  | uint256 | uint256 Returns the amount of SOT tokens that have been redeemed by a user from a specific pool. |

### \_isJotToken

```solidity
function _isJotToken(address noteToken, address jotToken) internal pure returns (bool)
```

_Checks if the given note token is equal to the given JOT token._

#### Parameters

| Name      | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| noteToken | address | The address of the note token. |
| jotToken  | address | The address of the JOT token.  |

#### Return Values

| Name | Type | Description                                                      |
| ---- | ---- | ---------------------------------------------------------------- |
| [0]  | bool | bool Returns true if both tokens are identical, false otherwise. |

### \_isSotToken

```solidity
function _isSotToken(address noteToken, address sotToken) internal pure returns (bool)
```

_Checks if the given note token and SOT (Sweepable Over-the-Counter) token are identical._

#### Parameters

| Name      | Type    | Description                                    |
| --------- | ------- | ---------------------------------------------- |
| noteToken | address | The address of the note token to check.        |
| sotToken  | address | The address of the SOT token to check against. |

#### Return Values

| Name | Type | Description                                      |
| ---- | ---- | ------------------------------------------------ |
| [0]  | bool | bool True if they're identical, otherwise false. |

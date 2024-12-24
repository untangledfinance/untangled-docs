# Untangled Vault

## Overall Architecture

![Overall architecture](./docs/img/Vault%20Modular%20Architecture.png)

Untangled Vault consists of 2 main parts:

- Core: including ERC4626 vault and Treasury
- Modules: Custom logic to serve a specific purpose

## Core

At its core, Untangled Vault is an ERC4626 vault, extended with custom logic to support its modular architecture.

In this architecture, treasury is incharge of holding the vault's asset. It also plays a role as the vault's manager. It has the complete control over the vault's module like enable, disable and replace those modules.

## Modules

Modules are custom logic that serves a specific purpose of the vault. There are 5 type of modules:

- Withdraw Module: define the custom withdraw logic for the vault like asynchronous withdraw.
- Valuation Module: define logic to calculate the value of the asset that is currently under the management of the treasury
- Authentication Module: define the access control over the entity that want to interact (deposit, withdraw, transfer shares) with the vault.
- Fee Module: define the fee calculation that used within the vault
- Crosschain Module: define the logic for crosschain interaction.

Modules can be enable at any time after the vault is created. They could be upgradeable or non-upgradable depend on the appetite of the vault issuer.

Although module's logic can be customize base on the demand of the creator, each module must follow the corresponding interface structure for its purpose, defined by Untangled Vault.

### Asynchronous Withdraw Module

As part of the Withdraw Module implementation, the asynchronous withdraw allows the vault to have a delay period before fulfill user's redeem request. This delay period allow the tresury to have time to convert its asset back to the currency of the vault. Whether those assets are liquid asset, like ERC20 that can be swap to the currency or it could be illiquid like real-world tokenize asset.

To create redeem request, users will call `requestRedeem(uint256 shares,address receiver,address owner)`. An event of `RequestRedeem(address indexed receiver,address indexed owner,uint256 indexed requestId,address sender,uint256 shares)` will be emit if the redeem request is successfully created. Within that epoch, if the receiver want to reduce the amount of shares they want to redeem, they could call `decreaseRedeemRequest(uint256 shares)` and receive back the corresponding amount of shares they want to reduce. Event `DecreaseRedeemRequest(address indexed receiver,uint256 indexed epochId,uint256 oldRequest,uint256 reduceAmount)` will be emitted if the decrease request is success. Users could also call `requestRedeem` again to adding more shares to withdraw to the existing request.

After the epoch is settle, receiver of the above request could check the amount of shares fulfill by calling `claimableRedeemRequest(address receiver)`. This view function will return 2 results, the first number indicate the amount of asset the this receiver will receive and the second number indicate how many shares have been burn to redeem this amount of asset.
User can also view how many shares pending to be fulfill with `pendingRedeemRequest(address receiver)` function. It will return the pending amount of shares to be fulfilled. To claim the asset after epoch settle, receiver will need to call `claimRedeemRequest(address receiver)`. This function will emit event event `ClaimRedeem(uint256 requestId,address receiver,uint256 assets,uint256 shares,uint256 timestamp)` if it is successfully executed.

### Valuation Module

The valuation module provide evaluation logic to calculate the value of assets that is under control of the treasury. This logic could be implemented by many way.

Untangled Vault provides an example of valuation module in the form of a portfolio. Each asset under the management of the treasury will be added into the portfolio which is an array of address. Each address will be the entry for corresponding asset informations. It including current asset balance, price, decimals, oracle and its origin chainId. Value of each asset is determine by the formula:

    	Value = (Balance x Price) / 10^decimals

The total value of the portfolio is the sum of each asset value.

### Authentication Module

Authentication module allows vault issuer to have access controls on their vault and vault shares. This module can be customize based on the demand of the issuer to fit with the authentication method that it have.

### Fee Module

Fee module is incharge of the fee calculation of the vault. There are many way to apply fee on a yield vault. Fee could be charge based on the Asset Under Management (AUM) or it could be charge based on the performance of the investment that the treasury made.

Untangled provided a template for AUM fee. Fee will be calculated based on an index caller Fee Index. This index indicate the percentage of AUM will be used to pay fee annually.

For example: if the treasury is holding 100.000 USDC for 1 year and the fee index is 1%. Then the fee for this vault is 1.000 USDC every year. The fee will be accumulated in secondly basis. So in this case every second the vault will be charge an amount of 1.000 / 315.360.000 (seconds in 1 year) = 0.0000032 USDC. This will be accumulate linearly.

In case there is any change in the total asset, the fee will be accured to the moment when the total asset change. This will make sure that the fee will always charge base on existing total asset.

The formular to calculate fee:

    Fee = totalAsset x (lastAccureTimestamp - block.timestamp) x feeIndex / (ONE_HUNDRED_PERCENT x 315360000)

The beneficiary for this fee is appointed by the treasury and the `claimFee` function could be by anyone claim fee to this beneficiary.

### Crosschain Module

Crosschain Module provide the ability to have crosschain interaction for both treasury and the vault.

Untangled provide an example of crosschain module that enhance the valuation module with crosschain portfolio management. This allow the treasury to hold assets on different chain while maintain the ability to keep track of those assets's value and account it into the total value of the vault. Moreover, this crosschain module example also provide the ability to receive crosschain deposit, in other word, depositors can deposit into a vault on a different chain and receive its shares on the vault's chain. This will allow the vault to generate liquidity for investment possibity on a target chain.

## Auxiliary contract

Testnet contract address:

|               | Polygon                                    | Sepolia                                    | Amoy                                       |
| ------------- | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| VaultFactory  |0x2562883f006d04cCc2907635E38089fBFc6BE45b  | 0x149A1513B0E588a8cd1D80875d133F274E633724 | 0xFf631f59b70c6D53bE7eD63833a3B7424Cb081BE |
| ModuleFactory |0x974e1F25ae092116314bA02964625deD74a0Bc9e  | 0xbcDEA113cFd0a26E2F4fC0DcEDcaDF9788663Ba0 | 0xE1EC27bCa289862b39dFE482AA4d26A2C6F26602 |


## Vault Factory
A factory contract to create new vault instances

## Module Factory
A factory contract to create new module instances

---
sidebar_position: 1
---

# Untangled Vault

## Overall Architecture

![Overall architecture](../img/Vault%20Modular%20Architecture%20copy.png)

Untangled Vault consists of two main parts:

- Core: Including the ERC4626 vault and Treasury
- Modules: Custom logic to serve a specific purpose


## Core

At its core, Untangled Vault is an ERC4626 vault, extended with custom logic to support its modular architecture.

In this architecture, the Treasury is in charge of holding the vault's assets. It also acts as the vault's manager. It has control over the vault's modules, such as enabling, disabling, and replacing them.

## Modules

Modules are custom logic that serve a specific purpose for the vault. There are five types of modules:

- Withdraw Module: Defines the custom withdrawal logic for the vault, such as asynchronous withdrawal.
- Valuation Module: Defines the logic to calculate the value of the assets currently under the Treasury's management.
- Authentication Module: Defines access control for entities interacting with the vault (e.g., depositing, withdrawing, or transferring shares).
- Fee Module: Defines the fee calculation used within the vault.
- Crosschain Module: Defines the logic for crosschain interaction.

Modules can be enabled at any time after the vault is created. They may be upgradeable or non-upgradeable, depending on the vault issuer's preference.

Although the module's logic can be customized based on the creator's requirements, each module must follow the corresponding interface structure for its purpose, as defined by Untangled Vault.
### Asynchronous Withdraw Module

As part of the Withdraw Module implementation, asynchronous withdrawal allows the vault to have a delay period before fulfilling a user's redemption request. This delay period provides the Treasury with time to convert its assets back to the vault's currency, whether the assets are liquid (e.g., ERC20 tokens that can be swapped to the currency) or illiquid (e.g., real-world tokenized assets).

To create a redemption request, users will call `requestRedeem(uint256 shares, address receiver, address owner)`. An event, `RequestRedeem(address indexed receiver, address indexed owner, uint256 indexed requestId, address sender, uint256 shares)`, will be emitted if the redemption request is successfully created. Within that epoch, if the receiver wants to reduce the number of shares they wish to redeem, they can call `decreaseRedeemRequest(uint256 shares)` and receive back the corresponding amount of shares. An event, `DecreaseRedeemRequest(address indexed receiver, uint256 indexed epochId, uint256 oldRequest, uint256 reduceAmount)`, will be emitted if the decrease request is successful. Users can also call requestRedeem again to add more shares to withdraw to the existing request.

After the epoch is settled, the receiver of the above request can check the number of shares fulfilled by calling `claimableRedeemRequest(address receiver)`. This view function will return two results: the first indicates the amount of assets the receiver will receive, and the second indicates how many shares have been burned to redeem this amount of assets. Users can also view how many shares are pending fulfillment with the `pendingRedeemRequest(address receiver)` function, which will return the pending number of shares to be fulfilled. To claim the assets after the epoch is settled, the receiver will need to call `claimRedeemRequest(address receiver)`. This function will emit an event, `ClaimRedeem(uint256 requestId, address receiver, uint256 assets, uint256 shares, uint256 timestamp)`, if it is successfully executed.

### Valuation Module

The Valuation Module provides evaluation logic to calculate the value of assets under the Treasury's control. This logic can be implemented in various ways.

Untangled Vault provides an example of a valuation module in the form of a portfolio. Each asset under the Treasury's management will be added to the portfolio, which is an array of addresses. Each address corresponds to asset information, including current asset balance, price, decimals, oracle, and origin chain ID. The value of each asset is determined by the formula:

    	Value = (Balance x Price) / 10^decimals

The total value of the portfolio is the sum of each asset's value.

### Authentication Module

The Authentication Module allows the vault issuer to have access controls on their vault and vault shares. This module can be customized based on the issuer's requirements to fit their authentication method.

### Fee Module

The Fee Module handles the fee calculation of the vault. There are various ways to apply fees on a yield vault. Fees can be charged based on the Assets Under Management (AUM) or the performance of the investments made by the Treasury.

Untangled provides a template for AUM fees. Fees are calculated based on an index called the Fee Index, which indicates the percentage of AUM used to pay fees annually.

For example, if the Treasury holds 100,000 USDC for one year and the fee index is 1%, the fee for this vault is 1,000 USDC annually. The fee will accumulate on a per-second basis. In this case, the vault will be charged an amount of 1,000 / 31,536,000 (seconds in one year) = 0.0000032 USDC per second, accumulating linearly.

If there is any change in the total assets, the fee will be accrued up to the moment the total assets change. This ensures the fee is always charged based on the existing total assets.

The formula to calculate the fee is:

    Fee = totalAsset x (lastAccureTimestamp - block.timestamp) x feeIndex / (ONE_HUNDRED_PERCENT x 315360000)

The beneficiary of this fee is appointed by the Treasury, and the claimFee function can be called by anyone to claim the fee for this beneficiary.

### Crosschain Module

The Crosschain Module provides the ability to enable crosschain interaction for both the Treasury and the vault.

Untangled provides an example of a crosschain module that enhances the Valuation Module with crosschain portfolio management. This allows the Treasury to hold assets on different chains while maintaining the ability to track the value of these assets and account for them in the vault's total value. Moreover, this crosschain module example also enables crosschain deposits. In other words, depositors can deposit into a vault on a different chain and receive its shares on the vault's chain. This feature allows the vault to generate liquidity for investment opportunities on a target chain.

## Auxiliary contract

### Vault Factory
A factory contract to create new vault instances.

### Module Factory
A factory contract to create new module instances.

## Implementation 
Untangled Vault's Core has been implemented with [ERC 4626](https://eips.ethereum.org/EIPS/eip-4626) and [Safe](https://docs.safe.global/home/what-is-safe). 

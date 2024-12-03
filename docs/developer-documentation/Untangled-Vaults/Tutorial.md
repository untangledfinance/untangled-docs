

# Installation
## Prerequisite

 `node` version must be >= 16;
 
## Installation

Create a folder name CLI with `mkdir CLI | cd CLI`

Install `eth-sdk`,`zodiac-roles-sdk` and `untangled-vault-cli`: 

````
npm i --save @gnosis-guild/eth-sdk @gnosis-guild/eth-sdk-client zodiac-roles-sdk untangled-vault-cli
````

## Configuration 

The next step is to create a config file that lists all the contracts we want to permit calling.

Create a folder named `eth-sdk` in your project root (where your package.json is located). Inside this folder, create a `config.js` file with the following content structure:

```javascript
const { defineConfig } = require("@gnosis-guild/eth-sdk");

  
module.exports = defineConfig({
  contracts: {
    sepolia: {
      vault: "0x05C8D188292020504F360a97c6b0676396aAC641",
      vaultFactory: "0xdF390B7D8EE3Fcc00E6BA098Aa66a848e83a338b",
      untangledSecuritizationManager:
        "0xe3f840Fa081f7b1c81a5F5958bab1786FE6d7c36",
      mapplePool: "0x15f260e366545188f992400D4500EF44C660c3a7",
      role: "0x56B8e347E800CC2a6C89317aEfa4948f6Cb41D63",
    },
  },
});
```

## Generate allow kit

Now, and after any update to the `eth-sdk/config.js` file, make sure to run the following command:

```
yarn eth-sdk
```

This command will fetch the ABIs of the contracts listed in the config file and generate TypeScript types for them directly into your node_modules. If the ABI of any listed contract cannot be fetched automatically, the command will return an error code. In that case, you need to manually create a JSON file with the ABI at a location inside `eth-sdk/abi` matching the path of the contract in the `eth-sdk/config.js` file.

# Using the CLI

## Login 

Before you can use any functionality in the CLI, you need to login. Run `npx login` in the terminal to login. 

There're 2 types of account that can be use: EOA and Safe wallet

With EOA, you will need to enter you private key (with "0x" prefix) 

With Safe wallet, you will need an extra step of entering the safe address. And also remember that the private key that you enter is from one of the signer of the corresponding Safe.

## Logout 

After using the CLI, we suggested that you should logout.

Run `npx logout` to logout

## Setup Roles

**Note: This option is only available for Safe wallet login**

**Note: Actions that created with this CLI require an extra step of safe wallet confirmation before it can be executed**

Run `npx setupRoles` to browse you options.

### Deploy role modifier contract 

Choosing this option to deploy a new roles modifier contract. This contract is used to store role and permissions and authorize users to execute actions that is granted to their roles. 

Demo video: https://jam.dev/c/51116e83-68fa-4d7c-b399-f6db40686427

### Setup role 

Before you can actually setup the roles with CLI you need to granted the roles for at least one address for it to be appear on the subgraph. Here is how you do it: https://jam.dev/c/2c57eda8-49c5-476f-a353-25239075ae39

Now, the role `CURATOR` has been created, you can use the CLI to setup permissions for this role. 

First, you will need to enter the roles modifier contract address. Then, enter the role name, which in this case is `CURATOR`. After that, you will build the permission for this role by selecting the protocol and its corresponding functions that this role could act on behalf of the Safe Wallet.

Demo video: https://jam.dev/c/767a2ffb-fae0-4d61-9d25-d87797a4105c

### Apply role

This options allow you to apply a given role for a given set of address. You can extend, replace or remove the current members list of this role. 

Demo video: https://jam.dev/c/2fab0a61-772a-47b0-8f53-383bbcda2e4d

## Operating role

Run `npx operateRoles` to start operating your role with permissions.

Demo video: https://jam.dev/c/5fd45a97-3789-47fa-b70e-4ad36c3f323b

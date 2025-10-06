## Octo Vault Protocol – Monorepo Overview

Octo Vault is a modular ERC4626 vault system designed for safe, timelocked governance and composable strategies. It provides:

- A base ERC4626 vault with an optional execution hook and timelocked governance (BasedVault)
- A Market vault that delegates execution to whitelisted Adapters (strategy drivers)
- A meta Vault that allocates capital across one or more Market vaults under a timelock
- A Hook that can queue and batch user flows via plug-in modules
- Pluggable Modules (Withdraw, Valuation; Deposit module optional in the architecture)

This repository includes Solidity contracts, Hardhat configuration, deploy pipelines (hardhat-deploy), and scripts for interacting with deployed contracts on Arbitrum and Arbitrum Sepolia.

## Features at a glance

- ERC4626-compatible vaults and share accounting (OpenZeppelin v5)
- Optional Hook layer to intercept deposits/withdrawals/transfers
- Timelocked governance for cap, timelock, fee parameters; guardian veto
- Role-based access control (admin, curator, guardian)
- Market vault with allowlisted Adapters for supply/withdraw/harvest/multicall
- Meta Vault that allocates underlying across Markets (increase/decrease allocations)
- WithdrawModule for batched withdrawal requests and epoch settlement
- ValuationModule with high-water-mark performance fee accrual

## Architecture

![Octo Vault Architecture – Untangled Vault V2](./img/Untangled_Vault_V2.drawio.png)

High level data flow:

1. Users interact with a BasedVault directly or through a Hook. If a Hook is set, it intercepts ERC4626 flows.
2. Market vaults accept underlying and forward execution to allowlisted Adapters (e.g., leveraged loops, lending, etc.).
3. The meta Vault allocates capital across Markets via deposits/withdrawals, subject to a timelock and guardian oversight.
4. Optional Modules extend Hook behavior (queue withdrawals, accrue performance fees, etc.).

Key roles:

- Admin: Full control; can set hook, set guardian/curators, transfer admin, stage/accept governance changes
- Curator: Executes operational strategy actions (e.g., Market.supply/withdraw, Vault.allocate)
- Guardian: Can veto staged changes before acceptance (cap, timelock, fee)

## Contracts overview

- `contracts/BasedVault.sol`

  - ERC4626 vault with:
    - Optional `hook` to delegate flow and accounting
    - Timelock-governed parameters: `cap`, `timelock`, `fee` (via hook)
    - Roles: `admin`, `guardian`, `isCurator`
    - Optional `treasury` for asset custody when no hook is set
  - Notable methods: `setCap/acceptCap`, `setTimelock/acceptTimelock`, `setFee/acceptFee`, `setHook`, `setCurator`, `setGuardian`

- `contracts/Market.sol`

  - ERC4626 Market vault that delegates to whitelisted `IAdapter` implementations
  - Admin allowlists adapters and manages allowances; curators call `supply/withdraw/harvest/multicall`

- `contracts/Vault.sol`

  - Meta vault that manages allocations across approved Market vaults
  - Add/queue/veto/accept/remove markets with a timelock
  - `allocate()` increases/decreases target Market positions

- `contracts/Hook.sol`

  - Execution hook for a BasedVault
  - Integrates optional modules: DepositModule (optional), `WithdrawModule`, `ValuationModule`
  - Handles `onDeposit`, `onWithdraw`, and `onTransfer` hooks

- `contracts/modules/WithdrawModule.sol`

  - Queues withdrawal requests by epoch and settles pro-rata at a provided assets-per-share rate

- `contracts/modules/ValuationModule.sol`

  - Tracks portfolio value and accrues performance fees against a high-water mark

- `contracts/adapters/*`

  - Strategy adapters callable by `Market` (e.g., `BorrowAdapter`, `DNAdapter`, `EulerBorrowAdapter`, etc.)

- `contracts/interfaces/*`
  - Interfaces for vaults, adapters, hooks, and modules

## Security model and cautions

- Use only trusted Adapters, Hooks, and Modules. The Market forwards external calls to adapters, and the Hook can move user funds and shares.
- ERC20 approval caveats: some tokens require allowance to be set to 0 before updating. The code attempts to set/clear allowances carefully but integration tokens may differ.
- Timelocked governance: parameter updates are staged then accepted after `timelock`. Guardians can veto while pending.
- When no Hook is set, BasedVault can move assets to an external `treasury`. Confirm custody expectations before use.
- This code is provided as-is; conduct audits and reviews before mainnet usage.

## Prerequisites

- Node.js 18+
- Yarn or npm (commands below use npm)
- A funded deployer account private key for live networks

## Install

```powershell
npm install
```

## Build and type generation

Hardhat Toolbox generates types automatically on compile.

```powershell
npx hardhat compile
```

## Test

```powershell
npx hardhat test
```

Tests live under `test/` (e.g., `Market.ts`, `Timelock.ts`, `Vault*.ts`).

## Operational workflows

### Market adapters

Admin allowlists an adapter and sets allowance for the Market’s underlying:

- `Market.addAdapter(adapter, maxAllowance)`

Curator executes strategies via adapters:

- `Market.supply(adapter, bytes[] calldata data)`
- `Market.withdraw(adapter, bytes[] calldata data)`
- `Market.harvest(adapter, bytes[] calldata data)`
- `Market.multicall(adapter, bytes[] calldata data)`

Important: Adapter calldata is adapter-specific; review each adapter’s ABI.

### Meta Vault allocations

Process (subject to roles and timelock):

1. Queue/accept Markets in the Vault:
   - `addMarket(market)` → (wait timelock) → `acceptMarket(market)`
   - Guardian may `vetoMarket(market)` while pending
2. Adjust allocations across Markets:
   - `allocate([{ market, amount }, ...])` where `amount` is target underlying units

### Hook and modules

Admin configures modules on the hook:

- `Hook.setModules(depositModule, withdrawModule, valuationModule)`

Hook callbacks invoked by BasedVault when a hook is set:

- `onDeposit(caller, receiver, assets, shares)`
- `onWithdraw(caller, receiver, owner, assets, shares)`
- `onTransfer(from, to, shares)`

WithdrawModule workflow:

- Queue request: Hook → `WithdrawModule.request(caller, receiver, owner, shares)`
- Curator settles epoch: Hook → `WithdrawModule.settle(totalShares, rate)`
- Receiver claims via Hook which calls `withdrawModule.claim()` and transfers assets

ValuationModule workflow:

- Hook notifies deposits/withdrawals: `onDeposit(assets)`, `onWithdraw(assets)`
- Curator (via Hook) can `updatePortfolioValue(newValue)`
- Vault (via Hook) sets fee: `setFee(bps)` and claims: `claimFee()`; fees accrue above high-water mark

## Scripts

Example interactive scripts (addresses inside scripts may need editing):

- `scripts/market_supply.ts` – Calls `Market.supply()` on a BorrowAdapter
- `scripts/market_withdraw.ts` – Calls `Market.withdraw()` on a BorrowAdapter
- `scripts/vault_allocate.ts` – Calls `Vault.allocate()` to target an amount on a Market

Run scripts:

```powershell
npx hardhat run --network arbitrum scripts/market_supply.ts
npx hardhat run --network arbitrum scripts/market_withdraw.ts
npx hardhat run --network arbitrum scripts/vault_allocate.ts
```

Additional adapter scripts exist under `scripts/` (e.g., for Euler and DN adapters).

## License

SPDX-License-Identifier: MIT

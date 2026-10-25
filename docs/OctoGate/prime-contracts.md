---
id: prime-contracts
title: Prime contracts on Stellar
sidebar_label: Prime contracts on Stellar
sidebar_position: 1.5
description: The OctoGate contracts behind Untangled Prime on Stellar - custody gate, execution contract and policy interpreter - with their mainnet code hashes.
---

# Prime contracts on Stellar

[Untangled Prime](../Prime/01.welcome-to-prime.md) runs on OctoGate contracts.
A Prime Account is an OpenZeppelin smart account on Stellar; OctoGate adds the
custody gate, the execution contract and the policy interpreter that let an
agent use custody's funds under rules the account checks on chain.
[Prime PayFi](../payfi/01.introduction.md) uses the same contracts for its
settlement account. This page describes how the contracts behave and lists the
code they run on mainnet. The Prime pages cover how to set them up in the app.

## Custody gate

Custody deploys the gate and grants it an allowance per asset. The gate pays out
to the addresses listed when it was created, up to the allowance, until the
allowance expires.

- **Fixed at creation:** the address list, the minimum wait and run window, and
  the optional recovery address. The gate has no admin and no settings, so a
  different list means a new gate.
- **Changeable by custody at any time:** the allowance for each asset, which
  custody can raise, lower or revoke.
- **One caller:** only one Prime Account's execution contract can call the
  gate.

A move that custody's allowance does not cover fails, whatever the account's
rules allow.

## Execution contract

Each Prime Account has one execution contract. It runs a move, made of calls, as
one transaction: if one call fails, none of them take effect. Prime Execution in
the app builds moves of up to eight calls.

A move that has to wait is stored on chain until its wait is over, and custody
or the account's signers can cancel it before it runs. A move not run within the
gate's run window lapses. A rule can ask for a longer wait than the gate's
minimum.

## Policy interpreter

A rule on a Prime Account lets a wallet, usually an agent's, act without the
account's full approval count. The rule carries policies, and the account checks
them before it lets the rule authorise anything. Spending limits and threshold
approvals use OpenZeppelin's policy contracts. Conditions those cannot express,
such as a venue, a method and an amount band per move, are judged by the policy
interpreter, which is our own contract.

Prime PayFi's rules run on a later interpreter version on testnet whose rules
can read the lending market's debt, token balances and oracle prices while the
account authorises a call. Its payout rule uses those reads to check collateral
cover and price age before every advance.

## Recovery

When the gate is created, custody can name a recovery address, such as a
trustee's wallet. If custody's signers lose their keys, the Prime Account's
signers can send custody's funds to that address.

A recovery runs under the account's own authority, which no rule checks. The
gate still pays only addresses on its list, but the list also holds the Prime
Account, custody and the venues. So at the account's full approval count, its
signers can draw custody's funds to any of those as well, within custody's
allowance. Agents can't: their rules fix where funds go.

## Third-party code

Spending limits and threshold approvals use OpenZeppelin's example contracts,
built from OpenZeppelin's source and deployed by us. OpenZeppelin publishes them
as experimental. Our internal review covered OctoGate, and these OpenZeppelin
contracts sat outside its scope.

The policy interpreter that evaluates your rules is our own. Its address and
code hash are in the table below, so you can check what the account is
running.

## Mainnet contracts

| | Address or code hash |
|---|---|
| Prime Account code (OpenZeppelin smart account) | `91a2cd56…` |
| Policy interpreter address | `CAOBQ4ZXANKXAGEJWJLIGQJDFCTHMEZVUPLPX277KSDMEU4MEWVVXO2R` |
| Policy interpreter code | `5143e641…` |
| Custody gate code | `b01024f3…` |
| Execution contract code | `3dd675c0…` (earlier setups run `68d012e7…`) |
| Spending limit policy (OpenZeppelin) | `CA7IBD266HIHFDUIBZLPIAITJUA3DVY4JAG6K3QMGBKLZCXXLP5E2F7A` |
| Simple threshold policy (OpenZeppelin) | `CDOGPGUFGGUDG25P3TG6XIXJKRRYOZ3PXUZIEPVH74KXRZIDKZ5HYEOS` |
| Weighted threshold policy (OpenZeppelin) | `CDWPZ4YZ3YIJ64XSHRMERRF2L2H7XD6SPUZDP3KI56T7QXQCICC25V3J` |

When you set up your Prime Account, gate and execution contract, each is
created from this code and gets its own address. The app refuses a gate or
execution contract that runs any other code. Full hashes and the deployment
transactions are in the mainnet deployment record in the
[oz-policy-builder repository](https://github.com/untangledfinance/oz-policy-builder/blob/6553e06afa2ebf73553830aa3d5f13ac2d0448a6/deployments/prime-mainnet.json).

The interpreter, gate and execution contract have no admin and no upgrade
function, so the wallet that uploaded their code and created the interpreter
has no control over them.

## Audit status

OctoGate has been through our internal adversarial review and threat
modelling. An external audit is in progress.

---
id: integration
title: Integration - What You Have To Build
sidebar_label: Integration
sidebar_position: 2
description: The Policy Builder extends an OpenZeppelin smart account rather than replacing it. Which roles need a package, which need only a wallet, and what a wallet must support.
---

# Integration: what you have to build

Short answer: **on the wallet side, nothing.**

A policy is enforced by the smart account, not by any client. Installing one
changes what the account permits; it does not change what a client has to
implement.

## The Policy Builder is an extension, not a replacement

OpenZeppelin's smart account already has the concept of a **context rule**: a
named slot carrying a set of signers and a set of policies. Before authorising a
call, the account asks every policy on the matching rule whether the call may
proceed.

The Policy Builder supplies a policy for that slot. It is a contract the
*account* calls. **A wallet never talks to it, never imports it, and does not
need to know it exists.**

```
wallet  ──signs──▶  smart account  ──asks──▶  policy (interpreter)
                          │
                          └── refuses the call if the policy says no
```

The consequence is the one that matters for integration: **a wallet that can
already act for an OpenZeppelin smart account can act under a policy with no
changes.** Support is inherited from the account standard rather than added for
us.

## Who needs what

Three roles, and only one of them touches our packages.

| Role | What they do | What they need |
|---|---|---|
| **Policy author** | Creates the policy and produces the install transaction | The SDK, CLI or MCP server |
| **Account owner** | Reviews and signs the install | A wallet. No package |
| **Delegated key** | Acts under the policy afterwards | A wallet. No package |

Creating a policy needs a tool because a policy is a compiled predicate
document, not a form field. Using one needs nothing, because by then the rule is
on chain and the account does the work.

An owner who is handed an unsigned transaction by someone else never installs
anything at all.

## What a wallet must support

One thing, and it is an OpenZeppelin requirement rather than ours.

To act *for* a smart account, a client builds the account's authorization entry:
an `AuthPayload` carrying the signers and the **context rule ids** the call is
made under, with the account's `__check_auth` verifying a digest over it. That
requirement exists for every OpenZeppelin smart account, with or without a
policy attached. A policy does not add to it.

Two consequences worth stating plainly:

- **Signing an install needs nothing special.** The install is an ordinary
  Soroban transaction: one `invokeHostFunction` operation, standard
  authorization entries, resource footprint and fee already attached, no custom
  or vendor field anywhere. Any wallet that signs Soroban transactions can sign
  it.
- **Acting under a policy needs smart-account support.** Not because of the
  policy, but because the caller must name the context rule it is acting under.
  A client that signs only as a plain account cannot do this and will fail
  before the policy is ever consulted - the account has no way to tell which
  rule was meant.

That second point is the one to check when evaluating a client. A tool that
treats every signer as a plain account is not a smart-account client, however
well it handles Soroban. The reference `stellar` CLI is in that category today:
it signs as a plain account and reports `Missing signing key for account C...`
when handed a smart account, because it has no way to construct the payload.
This is a property of the tooling ecosystem's maturity, not of the policy.

## Packages

Needed only to **author** a policy. All three are published on the public npm
registry, version together, and live in
[`untangledfinance/oz-policy-builder`](https://github.com/untangledfinance/oz-policy-builder).

| Package | What it is | Entry point |
|---|---|---|
| `@crediolabs/policy-synth` | The synthesis core. Everything else is a front-end over it | library |
| `@crediolabs/policy-builder-mcp` | MCP server for agent tool-use | `policy-builder-mcp` |
| `@crediolabs/policy-builder-cli` | CLI for scripted authoring | `policy-builder` |

The on-chain interpreter is a Rust contract in the same repository, under
`contracts/policy-interpreter`. It is deployed and pinned; you do not deploy it.

## What the builder never does

It holds no key, requests no key, and submits nothing. Every tool that changes
on-chain state returns an **unsigned transaction** and stops. The wallet
reviews, signs and submits, and that signature is the confirmation step.

This is why the integration surface is so small: the builder is an authoring
tool that emits a transaction, and the enforcement lives on chain.

## Next

- [User Guide](user-guide.md) - for the person who owns the funds
- [Developer Guide](developer-guide.md) - authoring policies with the SDK, CLI or MCP server

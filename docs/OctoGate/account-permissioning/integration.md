---
id: integration
title: Integration - What You Have To Build
sidebar_label: Integration
sidebar_position: 3
description: Nothing, on the wallet side. A policy is enforced by the smart account itself, so only the person creating a policy needs a tool. What your wallet needs to support, and what it does not.
---

# Integration: what you have to build

**Nothing, even when you are creating a policy.**

A policy is a rule your account checks before it approves anything. The account
does the checking. So there is no library to add to your app, no service to run,
and no change to how your wallet signs.

Three things follow from that:

1. **Your account enforces the policy, so your software does not.**
2. **Only the person who creates a policy needs one of our tools.**
3. **Your wallet needs to understand smart accounts - which it already must, policy or not.**

---

## 1. Your account enforces the policy

An OpenZeppelin smart account already has numbered permission slots, called
**context rules**. Each slot holds a list of keys, and a list of rules those keys
must obey. Before the account approves anything, it checks the slot the caller is
using.

The Policy Builder writes one of those rules. The account reads it. Nothing else
in the chain of custody changes:

```
your wallet  ──signs──▶  your smart account  ──checks──▶  the policy
                                  │
                                  └── refuses if the policy says no
```

Read that middle arrow carefully: **the account calls the policy, not your
wallet.** Your wallet never contacts the policy, never imports anything from us,
and does not need to know it exists.

That is why there is nothing to integrate. A policy changes what your account
will agree to; it does not change how anything talks to it.

### The builder never touches your keys

Every tool we ship stops at an **unsigned transaction**. It holds no key, asks
for no key, and submits nothing. You review it in your wallet, you sign it, and
your wallet submits it. If you do not like what you see, do not sign - nothing
has happened yet.

## 2. Only the policy's author needs a tool

Three people are usually involved, and only the first installs anything:

| Who | What they do | What they need |
|---|---|---|
| **The author** | Writes the policy and prepares the transaction | One of our tools |
| **The owner** | Reads it and signs it | Just a wallet |
| **The delegated key** | Works under the policy afterwards | Just a wallet |

Creating a policy needs a tool because a policy is compiled, not typed into a
form - the tool turns "at most 100 USDC a month" into something the chain can
check.

Using a policy needs nothing, because by then the rule is already on the account
and the account does the work.

## 3. Your wallet needs to understand smart accounts

One requirement, and it comes from OpenZeppelin, not from us. It applies to every
smart account whether or not a policy is attached.

**Signing the install is ordinary.** It is a standard Stellar transaction with
nothing custom in it. Any wallet that signs Stellar smart-contract transactions
can sign it.

**Acting under a policy afterwards needs a bit more.** A key can sit in several
permission slots, so when it acts it has to say *which slot it is using*. A tool
that only knows how to sign as a plain account cannot say that, and the account
will turn it away before the policy is even consulted.

That is the thing to check when choosing a wallet or library: not "does it
support Stellar smart contracts", but **"can it act on behalf of a smart
account?"**

:::note Worth knowing

Tooling here is still maturing. The standard `stellar` command-line tool cannot
do this yet - it signs as a plain account and reports
`Missing signing key for account C...` when given a smart account.

That is a gap in the wider ecosystem's tooling, not something the policy causes,
and it is the same for any OpenZeppelin smart account with or without a policy.

:::

<details>
<summary>The protocol detail, for implementers</summary>

To act for the account, a client builds an `AuthPayload` carrying the signers and
the `context_rule_ids` for the call. The account's `__check_auth` verifies a
digest over it. This is OpenZeppelin's own mechanism, defined in
`stellar-contracts/packages/accounts/src/smart_account/`, and a policy adds
nothing to it.

</details>

---

## The packages

Needed only to **author** a policy. Published on the public npm registry,
versioned together, in
[`untangledfinance/oz-policy-builder`](https://github.com/untangledfinance/oz-policy-builder).

| Package | What it is | Entry point |
|---|---|---|
| `@crediolabs/policy-synth` | The core. The other two are front-ends over it | library |
| `@crediolabs/policy-builder-mcp` | For AI agents, over MCP | `policy-builder-mcp` |
| `@crediolabs/policy-builder-cli` | For scripts and terminals | `policy-builder` |

The on-chain part is already deployed and pinned. You do not deploy anything.

## Next

- [User Guide](user-guide.md) - if you own the funds
- [Developer Guide](developer-guide.md) - if you are writing policies

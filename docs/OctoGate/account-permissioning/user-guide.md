---
id: user-guide
title: User Guide - Delegating a Key Under a Policy
sidebar_label: User Guide
sidebar_position: 1
description: What a policy is, how to delegate a key under one, what your wallet shows you before you sign, and what a policy does not protect.
---

# User Guide: delegating a key under a policy

This guide is for the person who owns the funds. It covers what a policy does, how to put a key under one, and - the part most guides skip - what a policy does **not** protect.

You do not need to read any code to follow it.

## What a policy is

A policy is a rule stored on chain that your smart account checks **before** it authorises a call. If the call does not satisfy the rule, the account refuses and nothing moves.

The rule is attached to a **context rule**: a named slot on your account that carries a set of signers and a set of policies. A key placed on that slot can only act within the policies attached to it.

The point is delegation without trust. You can hand a key to an automated agent, a service, or a colleague, and bound what that key is able to do, rather than relying on it to behave.

## What you can bound today

| You want to say | Supported | How |
|---|---|---|
| "Only this contract" | Yes | The rule is scoped to one contract |
| "Only this method" | Yes | The policy pins the method name |
| "At most X per call" | Yes | A cap on the amount argument |
| "Only these recipients" | Yes | An allowlist on the recipient argument |
| "At most X per day / month in total" | Yes | An OpenZeppelin `spending_limit` alongside the policy |
| "The trade must return at least 99% of what it spends" | Yes | A slippage floor comparing one argument to another |
| "Two people must approve" | On chain, not yet in the chat card | An OpenZeppelin `simple_threshold` alongside the policy |
| "Stop working after 30 days" | On chain and in the CLI, not yet in the chat card | An expiry on the context rule |
| "At most 10 calls a day" | **No** | Not expressible today. See [limits](#what-a-policy-does-not-protect) |

## Three worked examples

Each was installed on Stellar testnet and both its permit and its refusal were exercised. Each has a short recording below: the policy is asked for in plain English, the transaction is signed in a terminal, and the result is read back on a block explorer. Every transaction hash shown is real and can be checked on any Stellar explorer.

In the first two the two calls are **identical** - same amount, same recipient, same key - and only the running total differs. That is the thing a per-call cap cannot do.

### 1. Delegating a yield claim

You hold a position that pays yield and you want an agent to claim it for you, without being able to drain the account.

- **Rule**: the agent key may call `transfer` on XLM only, and no more than **15.3 XLM per day** in total.
- **What happened**: a 15.3 XLM claim was permitted. The same 15.3 XLM claim, repeated, was refused by the account with error `#3221` - the day's allowance was already spent.

<video controls width="100%" preload="none" poster="/img/walkthroughs/walkthrough-1-poster.jpg" src="/video/walkthrough-1-blend-yield-claim-daily-total.mp4">
  Your browser does not support the video tag.
</video>

### 2. A subscription that bills you

A merchant needs to charge you monthly, and you want a hard ceiling on what they can take.

- **Rule**: the merchant key may call `transfer` on one token only, and no more than **100 USDC per month** in total.
- **What happened**: a 100 USDC charge was permitted. The identical charge, repeated, was refused with `#3221`.

<video controls width="100%" preload="none" poster="/img/walkthroughs/walkthrough-2-poster.jpg" src="/video/walkthrough-2-subscription-monthly-cap.mp4">
  Your browser does not support the video tag.
</video>

### 3. A bounded swap

You want an agent to trade for you, but never at a bad price.

- **Rule**: the agent may call the swap method on one router, and the trade must return at least a set minimum.
- **What happened**: against SoroSwap's live testnet router, a swap selling 10 XLM and demanding at least 1.5 USDC back was permitted and executed. The same swap, with the agent willing to accept **one stroop less**, was refused with `#107` and never reached the venue - the account would not let the key take a worse price than you allowed. The floor is compared against the trade's own size, so one rule covers every trade amount rather than pinning you to a single one.

<video controls width="100%" preload="none" poster="/img/walkthroughs/walkthrough-3-poster.jpg" src="/video/walkthrough-3-bounded-swap-slippage-floor.mp4">
  Your browser does not support the video tag.
</video>

## What your wallet shows you

The builder never holds a key and never submits anything. It produces an **unsigned transaction** and hands it to your wallet - Freighter, or any wallet that can sign a Soroban transaction.

1. You describe the constraint, or point at a transaction you already made.
2. The builder produces the policy and shows you a review card in plain language: which contract, which method, which cap, which recipients.
3. The builder returns an unsigned transaction.
4. **Your wallet shows it to you and you sign it.** That signature is the confirmation step. Nothing is installed until you sign.
5. Your wallet submits it.

If you do not like what the review card says, do not sign. Nothing has happened yet.

## What a policy does not protect

This section matters more than the rest of the page.

**A key is only as constrained as the loosest rule it sits on.** The caller chooses which rule authorises a call. If the same key is also a signer on a rule with no policy attached, it can name that rule instead and the policy never runs. Put a delegated key on the policed rule and **nowhere else**.

**Adding a second signer does not create dual approval.** On an OpenZeppelin smart account, a rule with no policy requires every signer to approve. Attaching a policy changes that: any one signer on the rule can act alone. So adding a second signer to a policed rule gives you the opposite of "two approvals". Use a threshold policy for that, which is on chain but not yet offered in the chat card.

**The account owner is not constrained.** A policy bounds the keys you place under it. Your own admin rule keeps full authority by design - that is what lets you revoke.

**Total-spend caps count ledgers, not clock time.** A "per day" cap is really a cap per 17,280 ledgers, and Stellar closes a ledger in roughly five seconds. The period is approximate, and the chain enforces the ledger count.

**A total-spend cap only meters transfers.** The OpenZeppelin spend limit reads the amount from a call named `transfer`. It cannot see value moved by a method with another name.

**Changing the signers stops the rule working.** If you add or remove a signer on a rule that carries a policy, the policy notices and starts refusing, rather than silently applying to a different set of people than you intended. It stops working rather than quietly meaning less. Reinstall the rule after changing signers.

**Call frequency cannot be bounded.** "At most ten times a day" is not expressible. A spend cap bounds *how much*, not *how often*: a key capped at 100 a day can still make a thousand calls of 0.1.

## Revoking

Revoking removes the policy from the rule. The builder produces an unsigned revoke transaction the same way, and your wallet signs it.

Removing a policy from a rule also resets any counters that policy was keeping, including a spend cap's running total for the period.

## Third-party components

Total-spend caps and threshold approvals are OpenZeppelin **example** contracts. We built them from OpenZeppelin's published source at tag v0.7.2 and deployed them ourselves. We have not audited them, and OpenZeppelin describes that code as experimental software provided "as is". Anything relying on them inherits that.

The policy interpreter - the part that evaluates the rule you wrote - is ours, and its addresses and build hash are published in the repository.

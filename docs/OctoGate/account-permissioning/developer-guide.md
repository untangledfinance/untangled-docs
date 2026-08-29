---
id: developer-guide
title: Developer Guide - MCP Server, Skill, and Synthesizer
sidebar_label: Developer Guide
sidebar_position: 2
description: Installing the MCP server and the CLI, the eight tools they expose, choosing between the two synthesis front-ends, and how the deny-case harness gates an install.
---

# Developer Guide

Setting up the toolkit, the tool surface it exposes, and how to choose between the two ways of producing a policy.

## Packages

All three are published on the public npm registry and version together.

| Package | What it is | Entry point |
|---|---|---|
| `@crediolabs/policy-synth` | The synthesis core. Everything below is a front-end over it | library |
| `@crediolabs/policy-builder-mcp` | MCP server for agent tool-use | `policy-builder-mcp` |
| `@crediolabs/policy-builder-cli` | CLI for scripted authoring | `policy-builder` |

## MCP server setup

```bash
npm install -g @crediolabs/policy-builder-mcp
```

Two transports. Stdio is the default and is what Claude Desktop and local agents use:

```bash
policy-builder-mcp                # stdio
policy-builder-mcp --http         # Streamable HTTP on localhost:3001
policy-builder-mcp --http-port 8080
```

For Claude Desktop, add it to the MCP server list:

```json
{
  "mcpServers": {
    "policy-builder": {
      "command": "policy-builder-mcp"
    }
  }
}
```

The server is **stateless**. There is no session, no `action_id` two-call handshake, and no key material at any point. Every tool takes its whole input in one call and returns its whole result.

## CLI setup

```bash
npm install -g @crediolabs/policy-builder-cli

policy-builder record --network mainnet --hash <tx-hash> --out recording.json
policy-builder synthesize --recorded-tx recording.json --network mainnet --explain
policy-builder declare --fn transfer --max-amount 25 --token native
```

## The eight tools

| Tool | Does | Touches the network |
|---|---|---|
| `record_transaction` | Decodes a transaction by hash or envelope into a normalised recording | Reads |
| `synthesize_policy` | Turns a recording into a proposed policy | No |
| `declare_policy` | Turns a stated constraint into a proposed policy | No |
| `simulate_policy` | Evaluates one call against a predicate and returns permit or deny with a reason | No |
| `verify_policy` | Runs the permit case AND the generated deny battery | No |
| `install_policy` | Builds the unsigned `add_context_rule` transaction, with an optional rolling total | Simulates only |
| `revoke_policy` | Builds the unsigned revoke transaction | Simulates only |
| `get_interpreter_info` | Returns the pinned interpreter address, grammar version and wasm hash | Reads |

### Bounding a total, not just a call

A predicate bounds one call. The interpreter is handed that call and keeps no
state, so a per-call cap of 15.3 XLM authorises 15.3 XLM again on the very next
call - which is not what anyone means by "15.3 XLM a day".

A rolling total is an OpenZeppelin `spending_limit` policy on the same rule.
Policies on one rule compose as all-of, so the predicate bounds each call and the
built-in bounds the sum. Since 1.1.0, `install_policy` attaches both in one
transaction:

```json
{
  "smartAccount": "C...",
  "sourceAccount": "G...",
  "fromHash": { "transactionHash": "...", "signers": ["G..."] },
  "spendingLimit": { "amount": "153000000", "periodLedgers": 17280 }
}
```

`periodLedgers` counts **ledgers**, not seconds - a day is about 17,280 of them.
The rule must be scoped to the token contract whose transfers the cap meters, and
`install_policy` refuses a rolling total on a rule that is not, because the
built-in would otherwise install and meter nothing.

### install_policy never signs

`install_policy` returns base64 transaction XDR and nothing else. It holds no key, requests no key, and submits nothing:

```jsonc
{
  "unsignedXdr": "AAAAAgAAAABluOIIsEQYfsG10B+MjzIOKhfYgv7aPKBy...",
  "smartAccount": "CCH6GOK5S6BDXOGGXICRIOPMN6T4NNWJ3MGWI37TQD73PHKX4AKYW5CK",
  "sourceAccount": "GBS3RYQIWBCBQ7WBWXIB7DEPGIHCUF6YQL7NUPFAOKZ3BCPJSSIWP5QS"
}
```

Hand that XDR to Freighter, or to any wallet that can sign a Soroban envelope. The wallet reviews, signs, and submits. **The wallet signature is the user-confirmation step**, which is why there is no separate confirm call in the tool surface.

Nothing in this layer is Freighter-specific. That is what wallet-agnostic means here: the MCP layer emits a standard unsigned envelope and expresses no opinion about who signs it.

## Using it from Claude

Point an MCP client at `policy-builder-mcp` using the configuration in the
previous section and the eight tools appear. That is all a client needs.

A Claude skill ships in the repository at `.claude/skills/oz-policy-builder/`,
and a Claude Code session working in a checkout loads it from there. It is an
operating manual rather than a wrapper: which tool answers which intent, the
failure modes that install cleanly and enforce less than you expect, and the
interpreter's error codes. Nothing is published to the Anthropic marketplace, so
there is no separate package to install.

**How the user confirms.** The server advertises `capabilities: { tools: {} }`
and does not use MCP elicitation. The confirmation step is the wallet signature:
`install_policy` returns an unsigned envelope, the wallet shows the user what
they are approving, and nothing installs until they sign. There is deliberately
no second confirm call, because the server keeps no session to correlate one
with, and the component that holds the key is the right place to ask.

## Choosing a front-end: record or declare

Two ways in, one composition core.

| | `record` | `declare` |
|---|---|---|
| Input | A transaction that already happened | The constraint, stated outright |
| Needs an RPC | Yes | No |
| Needs the contract to be recognised | Yes | No |
| Reaches values nested inside a struct | **Yes** | Yes, via `--amount-path` |
| Emits a slippage floor | No, deliberately | **Yes** |
| Best for | "let this key do what I just did" | "let this key do exactly this" |

**Use `record`** when the flow is easier to perform than to describe - a Blend supply, a multi-hop swap - and when you want the arguments pinned to what actually happened.

**Use `declare`** when the contract is not in the registry, when there is no transaction to point at, or when you need a slippage floor.

A slippage floor is never inferred from a recording. A recorded rate is a price at one moment, and freezing it as policy would deny ordinary trades later. You state the ratio.

### Path A and Path B

**Path A** is what the OpenZeppelin primitives express directly: a rule scoped to a contract, a total-spend cap, a threshold, an expiry.

**Path B** is everything else, and it is the reason the interpreter exists. Rather than generating a new contract per policy, the synthesizer emits a **predicate document** - policy as data - which one audited, immutable, versioned interpreter evaluates. A new combination of constraints needs no deployment and no re-audit.

Grammar 4 covers: `and`, `or`, the comparisons `eq`, `lt`, `lte`, `gt`, `gte`, set membership `in`, and eleven leaves including the call's contract, method, positional arguments, a value nested inside a struct argument, an argument's list length, and `call_arg_scaled` - an argument scaled by a ratio, which is what a slippage floor compares against.

## The deny-case harness

Producing a policy that permits the intended call is the easy half. The harness does the other half: it mutates the recorded call along each dimension the predicate constrains and asserts every mutation is **denied**.

`verify_policy` reports `ok` only when the recorded call is permitted **and** every generated deny case is denied. Against the three reference recordings:

| Recording | Deny cases | Dimensions |
|---|---|---|
| SEP-41 transfer | 4 of 4 denied | contract scope, function scope, argument bound, argument reorder |
| Blend submit | 3 of 3 denied | contract scope, function scope, argument bound |
| SoroSwap swap | 4 of 4 denied | contract scope, function scope, argument bound, allowed path |

Coverage is derived from the predicate, so it is not a fixed number: a dimension the predicate does not constrain produces no case for it. `ok` means "nothing the harness could construct got through", not "this policy is tight".

The synthesizer is replayed against a corpus of **33 real mainnet transaction envelopes covering 26 distinct call shapes**, well beyond the ten shapes the award asks for.

## Attaching an OpenZeppelin primitive alongside

A context rule can carry more than one policy, and OpenZeppelin composes them as **all-of**: every attached policy must permit. That is what makes a spend cap attached beside a predicate a real bound rather than a bypassable one, and it was established by experiment rather than read from documentation.

Two things to know before relying on it:

- The install builder in `@crediolabs/policy-synth` takes **interpreter policies only**. It refuses any other kind rather than dropping it, because a dropped policy is a missing restriction. Attaching an OpenZeppelin primitive is done at the account layer.
- The on-chain policies map is **sorted by contract address**, so which policy sits at index 0 is alphabetical accident. Read every policy on a rule, not the first one.

## Error codes

Deny codes come back from the account when it refuses. The ones you will see most:

| Code | Means |
|---|---|
| `#100` | An argument did not match the predicate |
| `#101` | The call went to a contract the rule does not cover |
| `#105` | The recipient was not on the allowlist |
| `#107` | The slippage floor was not met |
| `#204` | The rule's signer set changed after install |
| `#3221` | The OpenZeppelin spend cap was exceeded |
| `#3202` | The OpenZeppelin threshold was not met |

## Limits worth knowing before you build on this

- **Call frequency cannot be bounded.** A spend cap bounds how much, not how often, so a key capped at 100 a day can still make a thousand calls of 0.1. The synthesizer raises `FREQUENCY_BOUND_MISSING` when asked and has nothing to offer against it.
- **A spend cap only meters `transfer`.** It reads the amount from the third argument of a call by that name.
- **Spend-cap periods are ledger counts**, roughly five seconds each, so a "per day" window is approximate.
- **A threshold is fixed at install** and is not told when the rule's signers change. Our interpreter notices the change and refuses with `#204`, so the rule stops working rather than quietly applying to a different set of people.
- **A predicate constrains the rule it is attached to**, not the key. A key on a second, unpoliced rule routes around it.

## Reproducing the evidence

The published CLI needs nothing else:

```bash
npm install -g @crediolabs/policy-builder-cli
policy-builder record --network mainnet --hash <tx-hash> --out recording.json
policy-builder synthesize --recorded-tx recording.json --network mainnet --explain
```

Installed rules are public ledger entries and can be read on any Stellar explorer without our tooling. The pinned interpreter answers `grammar_version()` to any caller.

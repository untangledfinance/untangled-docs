---
id: intro
title: About OctoGate
sidebar_label: About OctoGate
sidebar_position: 1
description: OctoGate is Untangled Finance's permissioning layer — controlling which venues and counterparties an account can interact with on Stellar.
---

# About OctoGate

OctoGate is Untangled Finance's **permissioning layer** for Stellar DeFi. It governs two separate controls:

1. **Account permissioning** — which operations an OpenZeppelin (OZ) smart account is authorized to perform, synthesized from recorded transaction traces.
2. **Venue permissioning** — which venues, markets, and counterparties an account is allowed to reach.

Both components are under active development on Stellar testnet.

---

## Account permissioning: OZ Policy Builder

The OZ Policy Builder is an off-chain toolkit that records a Soroban transaction and synthesises the minimal policy that permits exactly that flow.

```
Recorded Transaction ──▶ Synthesizer ──▶ OZ Policy ──▶ Install on smart account
     (off-chain)              │                │
                             ▼                ▼
                    PolicyIR (intermediate)  ProposedPolicy
```

Key components:

| Package | Role |
|---|---|
| `@crediolabs/policy-synth` | TypeScript synthesis core |
| `@crediolabs/policy-builder-mcp` | MCP server for AI agent integration |
| `apps/policy-builder-web` | Browser UI for the install flow |
| `apps/policy-builder-cli` | CLI for scripted policy authoring |

The tool analyses a transaction trace, extracts the authorized call scope and spending bounds, and compiles them into an OZ-native policy. Where the OZ built-in primitives cannot express a constraint (e.g. per-method scoping or oracle price bounds), those are surfaced as **Path B** warnings — the policy is not silently weakened.

Install, on-chain verify, simulate, and the Rust interpreter are **later phases**.

## Venue permissioning gate

The venue permissioning gate controls which venues, markets, and counterparties an account can interact with. It is implemented across three packages:

| Package | Role |
|---|---|
| `packages/venue-wrapper` | Holds restricted-asset wrappers (1:1 wrap of AUTH_REQUIRED + AUTH_REVOCABLE + AUTH_CLAWBACK_ENABLED classic assets) |
| `packages/venue-market` | Facade between the venue-wrapper and a Blend v2 pool, needed because a single `InvokeHostFunction` cannot atomically wrap-then-supply |
| `apps/venue-demo-web` | Browser UI demonstrating the full venue gate flow on Stellar testnet |

The permissioning itself lives in the wrapper's **transfer gate** — the venue-market is a pure facade with no durable enforcement.

---

## Current state

OctoGate is **under active development** on Stellar testnet. It is not yet live on mainnet.

- The OZ Policy Builder — recorder, synthesizer, OZ Accounts adapter (Path A), MCP server, and CLI — are implemented and unit-test-covered.
- The venue permissioning gate — venue-wrapper + venue-market + Blend v2 integration — is implemented and demonstrated on testnet.
- Install, on-chain verify, simulate, and the Rust interpreter predicate are **later phases**.

**Do not use on mainnet with significant funds.**

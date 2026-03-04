# Development Plan — Universal Account Contract (Asset Manager)

> NEAR smart contract enabling cross-chain account abstraction via Chain Signatures (MPC)  
> Timeline: Feb 18, 2026 → Mar 4, 2026 (current)

---

## Project Overview

| Metric | Value |
|--------|-------|
| Language | Rust (edition 2024, NEAR SDK 5.23) |
| Target | WASM (wasm32-unknown-unknown) for NEAR Protocol |
| Total Lines of Code | ~4,055 |
| Source Files | 9 modules + 1 integration test |
| First Commit | Feb 18, 2026 |
| Current Date | Mar 4, 2026 |

---

## Phase 1 — Project Scaffolding & Core Contract (Day 1–2)

**Estimated Effort:** 2 days  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 1.1 | Initialize NEAR project with `cargo-near`, configure `Cargo.toml`, Rust toolchain (1.86), WASM build profile | 2h | ✅ |
| 1.2 | Define contract state struct (`Contract`) — owner, mpc_signer, paused, min_sign_deposit, next_request_id | 2h | ✅ |
| 1.3 | Implement `new()` initializer with default MPC signer (`v1.signer-prod.testnet`) | 1h | ✅ |
| 1.4 | Implement access control guards — `assert_owner()`, `assert_not_paused()` | 1h | ✅ |
| 1.5 | Set up `deploy.sh` script for build & deploy | 1h | ✅ |
| 1.6 | Define `#[ext_contract]` interfaces for MPC signer, FT transfer, and self callbacks | 1h | ✅ |

### Deliverables
- [src/lib.rs](../src/lib.rs) — Contract root with state definition and initialization
- [Cargo.toml](../Cargo.toml) — Dependencies and build configuration
- [rust-toolchain.toml](../rust-toolchain.toml) — Rust 1.86 toolchain pinning
- [deploy.sh](../deploy.sh) — Deployment script

---

## Phase 2 — Data Types & Chain Abstractions (Day 2–3)

**Estimated Effort:** 2 days  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 2.1 | Define `ChainType` enum — Ethereum, Bitcoin, Solana, Cosmos, Near, Stellar, Custom | 2h | ✅ |
| 2.2 | Implement `derivation_prefix()` and `default_domain_id()` for each chain type | 1h | ✅ |
| 2.3 | Define `SignatureRequest`, `RequestStatus`, `ChainSignature` (AffinePoint, Scalar, recovery_id) | 2h | ✅ |
| 2.4 | Define `SignRequest` struct for MPC signer calls | 1h | ✅ |
| 2.5 | Define Ethereum transaction types — Legacy (EIP-155), EIP-1559, EIP-7702 with `Eip7702Authorization` | 3h | ✅ |
| 2.6 | Define Stellar types — `StellarNetwork`, `StellarAsset`, `StellarPaymentParams` | 2h | ✅ |
| 2.7 | Define Soroban types — `SorobanScVal` (13 variants), `SorobanContractAddress`, `StellarInvokeContractParams`, `SorobanResources` | 3h | ✅ |
| 2.8 | Define `UniversalAccount` view model | 1h | ✅ |

### Deliverables
- [src/types.rs](../src/types.rs) — 309 lines of data structures covering all supported chains

---

## Phase 3 — Encoding Utilities (Day 3–5)

**Estimated Effort:** 2.5 days  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 3.1 | Implement hex parsing utilities — `u64_to_big_endian()`, `hex_to_bytes_trimmed()`, `hex_to_bytes_raw()` | 2h | ✅ |
| 3.2 | Implement RLP encoding for Ethereum — `rlp_encode_bytes()`, `rlp_encode_u64()`, `rlp_encode_list()` | 4h | ✅ |
| 3.3 | Implement XDR encoding for Stellar — fixed-width integers (`xdr_encode_uint32`, `int32`, `int64`) | 2h | ✅ |
| 3.4 | Implement XDR muxed account encoding (`KEY_TYPE_ED25519`) | 2h | ✅ |
| 3.5 | Implement XDR asset encoding — Native and CreditAlphanum4 | 2h | ✅ |
| 3.6 | Implement XDR opaque/variable data encoding with padding | 2h | ✅ |
| 3.7 | Implement recursive `xdr_encode_sc_val()` for all SorobanScVal variants | 4h | ✅ |
| 3.8 | Implement `xdr_encode_invoke_contract_args()` — contract_id + function + args | 2h | ✅ |

### Deliverables
- [src/encoding.rs](../src/encoding.rs) — 276 lines of RLP and XDR encoding primitives

---

## Phase 4 — Account Management & Balance System (Day 5–6)

**Estimated Effort:** 1.5 days  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 4.1 | Implement `derive_address()` — deterministic derivation path generation per chain/index | 2h | ✅ |
| 4.2 | Implement `deposit_near()` — payable method, internal balance tracking | 2h | ✅ |
| 4.3 | Implement `ft_on_transfer()` — NEP-141 receiver hook with whitelist check | 3h | ✅ |
| 4.4 | Implement `withdraw_near()` — owner-only NEAR withdrawal from internal balance | 2h | ✅ |
| 4.5 | Implement `withdraw_ft()` — cross-contract FT transfer back to owner | 2h | ✅ |

### Deliverables
- [src/account.rs](../src/account.rs) — 161 lines of account and balance management

---

## Phase 5 — Admin Controls (Day 6–7)

**Estimated Effort:** 1 day  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 5.1 | Implement `set_mpc_signer()`, `set_min_sign_deposit()`, `set_paused()` | 2h | ✅ |
| 5.2 | Implement `transfer_ownership()` — admin role transfer | 1h | ✅ |
| 5.3 | Implement `set_ft_whitelisted()` — FT whitelist management | 1h | ✅ |
| 5.4 | Implement `set_near_deposit_enabled()` — toggle NEAR deposits | 1h | ✅ |
| 5.5 | Implement policy admin methods — `set_policy()`, `remove_policy()`, `set_default_behavior()` (deferred until policy engine complete) | 2h | ✅ |

### Deliverables
- [src/admin.rs](../src/admin.rs) — 113 lines of admin controls

---

## Phase 6 — Signing Engine & Payload Builders (Day 7–10)

**Estimated Effort:** 3.5 days  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 6.1 | Implement `request_signature()` — main entry point with chain detection, deposit resolution, request tracking | 4h | ✅ |
| 6.2 | Implement `request_raw_signature()` — raw 32-byte hash signing (no policy) | 2h | ✅ |
| 6.3 | Implement `on_sign_complete()` — private callback, stores MPC signature result | 2h | ✅ |
| 6.4 | Build `build_eth_legacy_payload()` — RLP encode EIP-155 fields → keccak256 | 3h | ✅ |
| 6.5 | Build `build_eth_eip1559_payload()` — RLP encode EIP-1559 with `0x02` prefix → keccak256 | 3h | ✅ |
| 6.6 | Build `build_eth_eip7702_payload()` — RLP encode EIP-7702 with authorization list + `0x04` prefix → keccak256 | 4h | ✅ |
| 6.7 | Build `build_stellar_payment_payload()` — XDR encode payment tx → SHA-256 | 3h | ✅ |
| 6.8 | Build `build_stellar_invoke_contract_payload()` — XDR encode Soroban call with optional resources → SHA-256 | 4h | ✅ |
| 6.9 | Build `build_stellar_raw_payload()` — wrap raw XDR with network hash → SHA-256 | 1h | ✅ |
| 6.10 | Integrate policy checks into `request_signature()` for EVM and Stellar payloads | 3h | ✅ |

### Deliverables
- [src/signing.rs](../src/signing.rs) — 594 lines covering 5 payload builders + policy-enforced signing

---

## Phase 7 — View Functions (Day 10–11)

**Estimated Effort:** 1 day  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 7.1 | Implement account/balance views — `get_account()`, `get_near_balance()`, `get_ft_balance()`, `get_all_ft_balances()` | 2h | ✅ |
| 7.2 | Implement FT whitelist views — `is_ft_whitelisted()`, `get_whitelisted_ft()` | 1h | ✅ |
| 7.3 | Implement signing views — `get_signature_request()`, `get_account_requests()` | 1h | ✅ |
| 7.4 | Implement admin/config views — `get_owner()`, `get_mpc_signer()`, `is_paused()`, `get_total_requests()` | 1h | ✅ |
| 7.5 | Implement policy views — `get_policy()`, `get_default_behavior()`, `simulate_policy()` | 2h | ✅ |

### Deliverables
- [src/views.rs](../src/views.rs) — 159 lines of read-only query methods

---

## Phase 8 — Transaction Policy Engine (Day 11–13)

**Estimated Effort:** 3 days  
**Status:** ✅ Completed

This phase involved significant design iteration, documented in the planning and migration documents.

### Design Iterations

| Iteration | Approach | Outcome |
|-----------|----------|---------|
| 1 (Initial) | Offset-based `Vec<MaskRule>` with `offset`, `length`, `expected` fields | Replaced — too fragile, requires caller to compute byte offsets |
| 2 (Migration) | Bitwise `HashMap<PolicyKey, MaskPolicy>` with full-calldata `mask & condition` | Adopted — simpler, more flexible, chain-agnostic |

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 8.1 | Design initial policy architecture — `CallPolicy`, `MaskRule`, field-level validation | 4h | ✅ |
| 8.2 | Research and decide: combined vs split contract architecture for policy | 3h | ✅ |
| 8.3 | Design bitwise mask migration — `MaskPolicy`, `PolicyKey`, `PolicyRegistration` structs | 4h | ✅ |
| 8.4 | Implement `apply_mask_policy()` — universal `payload & mask == condition` validator | 2h | ✅ |
| 8.5 | Implement policy key helpers — `parse_hex_u128()`, `normalize_address()`, `build_policy_key_str()` | 2h | ✅ |
| 8.6 | Implement `stellar_policy_bytes_payment()` — 88-byte fixed layout | 2h | ✅ |
| 8.7 | Implement `stellar_policy_bytes_invoke()` — variable layout for Soroban calls | 2h | ✅ |
| 8.8 | Implement `simulate_policy()` — dry-run mask validation for debugging | 2h | ✅ |
| 8.9 | Integrate policy checks into EVM signing path (selector lookup → expiry → value_limit → mask) | 3h | ✅ |
| 8.10 | Integrate policy checks into Stellar signing path (payment/invoke lookup → expiry → mask) | 3h | ✅ |

### Design Documents Produced
- [policy-implementation-plan.md](../policy-implementation-plan.md) — Original 6-phase implementation plan (EVM calldata reader, XDR reader, validators, contract integration)
- [policy-migration-plan.md](../policy-migration-plan.md) — Migration from offset-based to bitwise mask approach (8-step migration checklist)
- [docs/policy-split-tradeoffs.md](policy-split-tradeoffs.md) — Analysis: combined vs split contract for policy (decided: combined)

### Deliverables
- [src/policy.rs](../src/policy.rs) — 183 lines of bitwise mask policy engine

---

## Phase 9 — Testing (Day 13–15)

**Estimated Effort:** 2.5 days  
**Status:** ✅ Completed

### Tasks

| # | Task | Est. | Status |
|---|------|------|--------|
| 9.1 | Unit tests — contract initialization and default values | 1h | ✅ |
| 9.2 | Unit tests — address derivation (format, owner-only, paused check) | 1h | ✅ |
| 9.3 | Unit tests — admin controls (pause, deposit config, MPC signer, non-owner rejection) | 2h | ✅ |
| 9.4 | Unit tests — NEAR deposit/withdraw (cumulative, zero-rejection, disabled, partial/full withdraw) | 3h | ✅ |
| 9.5 | Unit tests — FT deposit/withdraw (whitelist, ft_on_transfer, accumulation, multi-FT) | 3h | ✅ |
| 9.6 | Unit tests — ChainType (derivation prefixes, domain IDs) | 1h | ✅ |
| 9.7 | Unit tests — RLP encoding (empty, single byte, short strings, integers, lists) | 2h | ✅ |
| 9.8 | Unit tests — Hex parsing edge cases | 1h | ✅ |
| 9.9 | Unit tests — ETH payload builders (legacy with known hash, EIP-1559, calldata, bad address) | 3h | ✅ |
| 9.10 | Unit tests — Stellar payload builders (native payment, credit, bad source, raw, network diff) | 3h | ✅ |
| 9.11 | Unit tests — EIP-7702 (unsigned/signed auth, multiple auths, hash diff, bad address) | 2h | ✅ |
| 9.12 | Unit tests — Stellar invoke (basic, transfer args, resources, no args, all ScVal types, determinism) | 3h | ✅ |
| 9.13 | Unit tests — Policy validation (apply_mask_policy: valid, wrong condition, length mismatch, selector, amount) | 2h | ✅ |
| 9.14 | Unit tests — Policy registration (set/get/remove policy, mask/condition mismatch, selector length, non-owner) | 2h | ✅ |
| 9.15 | Unit tests — Stellar policy bytes (payment 88-byte layout, credit asset, invoke layout) | 2h | ✅ |
| 9.16 | Unit tests — Stellar mask policy (valid payment, wrong destination, amount over limit, invoke, wrong function) | 2h | ✅ |
| 9.17 | Unit tests — simulate_policy (valid, wrong condition, length mismatch) | 1h | ✅ |
| 9.18 | Unit tests — Helper functions (parse_hex_u128, normalize_address, build_policy_key_str, TransactionPayload) | 1h | ✅ |
| 9.19 | Integration test — sandbox deploy, init, verify state via RPC calls | 3h | ✅ |

### Deliverables
- [src/tests.rs](../src/tests.rs) — 2,006 lines of unit tests
- [tests/test_basics.rs](../tests/test_basics.rs) — 89 lines sandbox integration test

---

## Summary Timeline

```
Week 1 (Feb 18–22)
├── Day 1-2: Project scaffolding, contract state, initialization
├── Day 3-4: Data types (ChainType, EVM types, Stellar types, Soroban)
└── Day 5:   Encoding utilities (RLP, XDR)

Week 2 (Feb 23–Mar 1)
├── Day 6-7:  Account management, balance system, admin controls
├── Day 8-10: Signing engine — 5 payload builders (ETH Legacy/1559/7702, Stellar Payment/Invoke)
└── Day 11:   View functions

Week 3 (Mar 2–4)
├── Day 12-13: Policy engine — design iterations, bitwise mask implementation
├── Day 14-15: Comprehensive test suite (2,000+ lines)
└── Day 15:    Documentation, integration test, current state
```

---

## Codebase Summary (as of Mar 4, 2026)

| File | Lines | Purpose |
|------|-------|---------|
| [src/lib.rs](../src/lib.rs) | 165 | Contract state, init, ext interfaces |
| [src/types.rs](../src/types.rs) | 309 | All data structures (EVM, Stellar, Soroban, Policy) |
| [src/encoding.rs](../src/encoding.rs) | 276 | RLP + XDR encoding primitives |
| [src/account.rs](../src/account.rs) | 161 | Account ops, deposits, withdrawals |
| [src/admin.rs](../src/admin.rs) | 113 | Owner-only admin controls |
| [src/signing.rs](../src/signing.rs) | 594 | Signing engine + 5 payload builders |
| [src/policy.rs](../src/policy.rs) | 183 | Bitwise mask policy engine |
| [src/views.rs](../src/views.rs) | 159 | Read-only view methods |
| [src/tests.rs](../src/tests.rs) | 2,006 | Unit tests |
| [tests/test_basics.rs](../tests/test_basics.rs) | 89 | Sandbox integration test |
| **Total** | **4,055** | |

---

## Supported Transaction Types

| Chain | Type | Payload Builder | Policy Support |
|-------|------|-----------------|----------------|
| Ethereum | Legacy (EIP-155) | `build_eth_legacy_payload()` | ✅ Bitwise mask on calldata |
| Ethereum | EIP-1559 | `build_eth_eip1559_payload()` | ✅ Bitwise mask on calldata |
| Ethereum | EIP-7702 | `build_eth_eip7702_payload()` | ✅ Bitwise mask on calldata |
| Stellar | Payment | `build_stellar_payment_payload()` | ✅ 88-byte fixed layout mask |
| Stellar | Soroban Invoke | `build_stellar_invoke_contract_payload()` | ✅ Variable layout mask |
| Any | Raw hash | `request_raw_signature()` | ❌ No policy (raw 32-byte hash) |

---

## Outstanding / Future Work

| # | Task | Priority | Est. |
|---|------|----------|------|
| F.1 | E2E integration test — EVM DeFi signing (OETH → Morpho supply → USDC borrow → bridge to Stellar) | High | 3d |
| F.2 | E2E integration test — Stellar Soroban signing (supply USDC to Blend lending pool) | High | 2d |
| F.3 | Sequential cross-chain e2e — OETH → Morpho → borrow USDC → bridge → Stellar Blend | High | 3d |
| F.4 | Policy expiry integration tests | Medium | 0.5d |
| F.5 | Multicall detection and blocking for EVM | Medium | 1d |
| F.6 | Security audit — encoding canonicality, dynamic ABI pointer bounds, negative Stellar amounts | High | 3d |
| F.7 | Off-chain policy management tooling (read/write via RPC) | Medium | 2d |
| F.8 | Monitoring — alerts on policy rejections, unusual signing patterns | Low | 2d |
| F.9 | Mainnet deployment preparation and initial policy configuration | High | 1d |
| F.10 | Add Bitcoin and Cosmos payload builders | Low | 3d |
| F.11 | State migration method for contract upgrades | Medium | 1d |

---

## F.1 — E2E Integration Test: EVM DeFi Signing (OETH → Morpho → USDC Borrow → Bridge)

Validates the full EVM DeFi signing path: a 5-transaction sequence that supplies OETH as collateral to Morpho Blue, borrows USDC, and bridges the borrowed USDC to Stellar via CCTP. Each transaction is a separate `request_signature` → MPC sign → reconstruct → broadcast cycle, executed sequentially with nonce management.

### Target Flow

```
OETH.approve(Morpho) → Morpho.supply(OETH) → Morpho.borrow(USDC) → USDC.approve(CCTP) → CCTP.depositForBurn(→ Stellar)
```

### Contract Addresses (Ethereum Mainnet / Sepolia Equivalents)

| Contract | Mainnet | Selector | Function |
|----------|---------|----------|----------|
| OETH (ERC-20) | `0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3` | `0x095ea7b3` | `approve(address,uint256)` |
| Morpho Blue | `0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb` | `0x0c0a769b` | `supply(MarketParams,uint256,uint256,address,bytes)` |
| Morpho Blue | (same) | `0x50d8cd4b` | `borrow(MarketParams,uint256,uint256,address,address)` |
| USDC (ERC-20) | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` | `0x095ea7b3` | `approve(address,uint256)` |
| CCTP TokenMessenger | `0xBd3fa81B58Ba92a82136038B25aDec7066af3155` | `0x6fd3504e` | `depositForBurn(uint256,uint32,bytes32,address)` |

> On testnet: use Sepolia deployments of Morpho Blue and CCTP, with testnet OETH/USDC mocks if the canonical contracts are not deployed.

### Prerequisites

- NEAR testnet account funded with ≥ 5 NEAR (covers 5 MPC signing fees)
- Contract deployed and initialized (`mpc_signer = v1.signer-prod.testnet`)
- Sepolia RPC endpoint
- `eth_address` = `derive_address(chain=Ethereum, index=0)`, funded with:
  - OETH collateral (e.g. 1 OETH)
  - ETH for gas (≥ 0.05 ETH for 5 txs)
- Morpho Blue market exists for OETH/USDC pair with known `MarketParams`
- CCTP TokenMessenger deployed and operational on Sepolia

### Test Steps

```
Step 1 — Setup
  ├── Deploy contract to NEAR testnet (or reuse)
  ├── Call deposit_near() with ≥ 5 × min_sign_deposit
  ├── Call derive_address(chain=Ethereum, index=0) → record eth_address
  ├── Fund eth_address with OETH + ETH on Sepolia
  ├── Query eth_getTransactionCount(eth_address) → initial_nonce
  └── Assert get_total_requests() == 0

Step 2 — TX-0: Approve OETH for Morpho Blue (request_id = 0, nonce = N)
  ├── Construct EthEip1559TransactionParams:
  │     chain_id=11155111, nonce=N, to=<OETH_address>,
  │     value="0x0", gas_limit=60000,
  │     data=0x095ea7b3                                          ← approve selector
  │          + <Morpho_Blue_address padded to 32 bytes>          ← spender
  │          + <supply_amount padded to 32 bytes>                ← amount
  ├── Call request_signature(payload=EvmEip1559(...), use_balance=true)
  ├── Poll get_signature_request(0) → assert Completed
  ├── Reconstruct signed tx → broadcast → assert receipt.status == 0x1
  └── Verify: OETH.allowance(eth_address, Morpho_Blue) ≥ supply_amount

Step 3 — TX-1: Supply OETH to Morpho Blue (request_id = 1, nonce = N+1)
  ├── Construct EthEip1559TransactionParams:
  │     chain_id=11155111, nonce=N+1, to=<Morpho_Blue_address>,
  │     value="0x0", gas_limit=300000,
  │     data=0x0c0a769b                                          ← supply selector
  │          + ABI-encode(marketParams, supply_amount, 0, eth_address, "")
  ├── Call request_signature(payload=EvmEip1559(...), use_balance=true)
  ├── Poll get_signature_request(1) → assert Completed
  ├── Reconstruct signed tx → broadcast → assert receipt.status == 0x1
  └── Verify: Morpho position shows OETH collateral for eth_address

Step 4 — TX-2: Borrow USDC from Morpho Blue (request_id = 2, nonce = N+2)
  ├── Construct EthEip1559TransactionParams:
  │     chain_id=11155111, nonce=N+2, to=<Morpho_Blue_address>,
  │     value="0x0", gas_limit=300000,
  │     data=0x50d8cd4b                                          ← borrow selector
  │          + ABI-encode(marketParams, borrow_amount, 0, eth_address, eth_address)
  ├── Call request_signature(payload=EvmEip1559(...), use_balance=true)
  ├── Poll get_signature_request(2) → assert Completed
  ├── Reconstruct signed tx → broadcast → assert receipt.status == 0x1
  └── Verify: USDC.balanceOf(eth_address) ≥ borrow_amount

Step 5 — TX-3: Approve USDC for CCTP TokenMessenger (request_id = 3, nonce = N+3)
  ├── Construct EthEip1559TransactionParams:
  │     chain_id=11155111, nonce=N+3, to=<USDC_address>,
  │     value="0x0", gas_limit=60000,
  │     data=0x095ea7b3                                          ← approve selector
  │          + <CCTP_TokenMessenger padded to 32 bytes>          ← spender
  │          + <borrow_amount padded to 32 bytes>                ← amount
  ├── Call request_signature(payload=EvmEip1559(...), use_balance=true)
  ├── Poll get_signature_request(3) → assert Completed
  ├── Reconstruct signed tx → broadcast → assert receipt.status == 0x1
  └── Verify: USDC.allowance(eth_address, CCTP_TokenMessenger) ≥ borrow_amount

Step 6 — TX-4: Bridge USDC to Stellar via CCTP (request_id = 4, nonce = N+4)
  ├── Construct EthEip1559TransactionParams:
  │     chain_id=11155111, nonce=N+4, to=<CCTP_TokenMessenger>,
  │     value="0x0", gas_limit=200000,
  │     data=0x6fd3504e                                          ← depositForBurn selector
  │          + <borrow_amount padded to 32 bytes>                ← amount
  │          + <stellar_destination_domain padded to 32 bytes>   ← destinationDomain
  │          + <stellar_pubkey_as_bytes32>                       ← mintRecipient
  │          + <USDC_address padded to 32 bytes>                 ← burnToken
  ├── Call request_signature(payload=EvmEip1559(...), use_balance=true)
  ├── Poll get_signature_request(4) → assert Completed
  ├── Reconstruct signed tx → broadcast → assert receipt.status == 0x1
  └── Verify: USDC.balanceOf(eth_address) == 0 (burned)

Step 7 — Final EVM assertions
  ├── Assert get_total_requests() == 5
  ├── Assert all 5 signature requests have status == Completed
  ├── Assert get_near_balance() == initial_deposit - (5 × min_sign_deposit)
  └── Assert all receipt.from == eth_address (same derived key throughout)
```

### Signature Reconstruction (EIP-1559, all 5 txs)

- MPC returns `ChainSignature { big_r: AffinePoint, s: Scalar, recovery_id: u8 }`
- `r = big_r.affine_point` (32 bytes), `s = s.scalar` (32 bytes), `v = recovery_id` (0 or 1)
- RLP-encode: `[chain_id, nonce, max_priority_fee, max_fee, gas, to, value, data, [], v, r, s]`
- Prefix with `0x02` → `eth_sendRawTransaction`

### Policy Configuration Required

| Policy Key | Selector | Purpose |
|------------|----------|---------|
| `evm:<OETH_addr>:095ea7b3` | approve | Gate OETH approval to Morpho only |
| `evm:<Morpho_addr>:0c0a769b` | supply | Validate MarketParams, cap collateral amount |
| `evm:<Morpho_addr>:50d8cd4b` | borrow | Validate MarketParams, cap borrow amount |
| `evm:<USDC_addr>:095ea7b3` | approve | Gate USDC approval to CCTP only |
| `evm:<CCTP_addr>:6fd3504e` | depositForBurn | Validate destination domain + recipient |

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | All 5 Sepolia tx receipts have `status=0x1` |
| AC-2 | All `receipt.from` match `derive_address(Ethereum, 0)` |
| AC-3 | Morpho position shows OETH collateral after TX-1 |
| AC-4 | USDC balance appears after TX-2 (borrow) and disappears after TX-4 (bridge burn) |
| AC-5 | All 5 `SignatureRequest` records have `status=Completed` with non-null signatures |
| AC-6 | Nonces are sequential (N through N+4) with no gaps |
| AC-7 | Internal NEAR balance decremented by exactly 5 × `min_sign_deposit` |

---

## F.2 — E2E Integration Test: Stellar Soroban Signing (Supply USDC to Blend Lending Pool)

Validates the Stellar Soroban contract invocation path: signing a Blend protocol `supply` call that deposits USDC into a Blend lending pool. This is the canonical single-chain Stellar e2e test for the production DeFi flow.

### Target Flow

```
StellarInvokeContract(blend_pool, "supply", [from, usdc_reserve, amount])
```

### Contract Addresses (Stellar Mainnet / Testnet Equivalents)

| Contract | Purpose | Function |
|----------|---------|----------|
| Blend Pool | Lending pool accepting USDC deposits | `supply(address, address, i128)` |
| USDC (Stellar) | Circle-issued USDC on Stellar | Soroban token contract |

> On testnet: deploy mock Blend pool contract and use testnet USDC issued by a test issuer, or use Blend's official testnet deployment if available.

### Prerequisites

- NEAR testnet account funded with ≥ 1 NEAR
- Contract deployed and initialized (`mpc_signer = v1.signer-prod.testnet`)
- Stellar Testnet Horizon endpoint (`https://horizon-testnet.stellar.org`)
- `stellar_pubkey` = `derive_address(chain=Stellar, index=0)`, with:
  - XLM balance (via Friendbot) for transaction fees
  - USDC trustline established
  - USDC balance ≥ supply amount (manually funded for standalone test, or from bridge in F.3)
- Blend pool contract deployed on Stellar testnet with USDC reserve active

### Test Steps

```
Step 1 — Setup
  ├── Deploy contract to NEAR testnet (or reuse)
  ├── Call deposit_near() with ≥ min_sign_deposit
  ├── Call derive_address(chain=Stellar, index=0) → record stellar_pubkey (32-byte hex)
  ├── Fund stellar_pubkey via Friendbot (XLM for fees)
  ├── Establish USDC trustline for stellar_pubkey (if Classic asset)
  ├── Transfer USDC to stellar_pubkey (manual funding for standalone test)
  └── Assert get_total_requests() == 0

Step 2 — Fetch on-chain state from Horizon
  ├── GET /accounts/<stellar_pubkey> → extract sequence_number
  ├── Verify USDC balance ≥ supply_amount
  └── Next sequence = sequence_number + 1

Step 3 — Request signature for Blend supply
  ├── Construct StellarInvokeContractParams:
  │     source_account = <stellar_pubkey_hex>
  │     fee = 100
  │     sequence_number = <fetched + 1>
  │     contract = { contract_id: <blend_pool_contract_id_hex> }
  │     function_name = "supply"
  │     args = [
  │       Address { address_type: 0, key: <stellar_pubkey_hex> },   ← from (depositor)
  │       Address { address_type: 1, key: <usdc_reserve_id_hex> },  ← reserve token
  │       I128(<supply_amount_str>)                                  ← amount in USDC base units
  │     ]
  │     network = Testnet
  │     resources = Some(SorobanResources {
  │       instructions: 5_000_000,
  │       read_bytes: 2048,
  │       write_bytes: 1024,
  │       resource_fee: 100_000
  │     })
  ├── Call request_signature(payload=StellarInvokeContract(...), use_balance=true)
  └── Record request_id = 0

Step 4 — Wait for MPC signature
  ├── Poll get_signature_request(0) until status != Processing
  ├── Assert status == Completed
  └── Extract ChainSignature { big_r, s, recovery_id }

Step 5 — Reconstruct and submit signed Stellar envelope
  ├── Concatenate r (32 bytes) || s (32 bytes) → 64-byte signature
  ├── Compute hint = last 4 bytes of stellar_pubkey
  ├── Re-encode TransactionEnvelope XDR:
  │     ├── TransactionV1Envelope { tx: <same XDR as built by
  │     │     build_stellar_invoke_contract_payload()> }
  │     └── signatures: [DecoratedSignature { hint, signature }]
  ├── Base64-encode the envelope
  └── POST /transactions with body tx=<base64_envelope>

Step 6 — Assertions
  ├── Assert Horizon response successful == true
  ├── Assert source_account == stellar_pubkey
  ├── Assert Blend pool ledger shows supply position for stellar_pubkey
  ├── Assert USDC balance of stellar_pubkey decreased by supply_amount
  └── Assert get_near_balance() == initial_deposit - min_sign_deposit
```

### Signature Reconstruction Notes

- MPC returns `ChainSignature` with `big_r` (affine point) and `s` (scalar); for Ed25519-scheme Stellar, the signature bytes are `r_bytes || s_bytes` (64 bytes total)
- Stellar `DecoratedSignature.hint` = last 4 bytes of the raw Ed25519 public key
- The XDR for the envelope must be **identical** to what `build_stellar_invoke_contract_payload()` produced (same contract_id, function_name, args, fee, sequence, resources)
- Soroban resource parameters must be pre-simulated via Horizon's `simulateTransaction` endpoint to avoid resource exhaustion failures

### Policy Configuration Required

| Policy Key | Selector | Purpose |
|------------|----------|---------|
| `stellar:<stellar_pubkey>:<hex("supply")>` | `supply` | Validate Blend pool contract_id and cap supply amount |

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | Horizon response has `successful=true` |
| AC-2 | `source_account` matches `derive_address(Stellar, 0)` |
| AC-3 | Blend pool ledger entry confirms supply position for `stellar_pubkey` |
| AC-4 | USDC balance decreased by exactly `supply_amount` |
| AC-5 | `get_signature_request(0).status == Completed` with non-null signature |
| AC-6 | Internal NEAR balance decremented by exactly `min_sign_deposit` |

---

## F.3 — Sequential Cross-Chain E2E: OETH → Morpho → Borrow USDC → Bridge → Stellar Blend

The production-grade cross-chain e2e test. Exercises the **complete DeFi pipeline** end-to-end: 5 sequential EVM transactions (F.1) deposit OETH to Morpho, borrow USDC, and bridge it to Stellar via CCTP — then after bridge finality, 1 Stellar Soroban invocation (F.2) supplies the bridged USDC to Blend's lending pool. All 6 signatures flow through the same asset-manager contract instance.

### Target Flow (6 Signed Transactions)

```
EVM (Sepolia)                                           Stellar (Testnet)
─────────────                                           ─────────────────
TX-0: OETH.approve(Morpho, amount)
TX-1: Morpho.supply(OETH collateral)
TX-2: Morpho.borrow(USDC)
TX-3: USDC.approve(CCTP, amount)
TX-4: CCTP.depositForBurn(→ Stellar)
                │
                ├── Bridge finality (~20 min CCTP attestation)
                │   Poll: USDC balance appears on stellar_pubkey
                │
                └──────────────────────────────────────► TX-5: Blend.supply(USDC)
```

### Prerequisites

- NEAR testnet account funded with ≥ 6 NEAR (covers 6 MPC signing fees)
- Contract deployed and initialized (`mpc_signer = v1.signer-prod.testnet`)
- Sepolia RPC endpoint + Stellar Testnet Horizon endpoint
- `eth_address` = `derive_address(Ethereum, 0)` — funded with OETH + ETH for gas
- `stellar_pubkey` = `derive_address(Stellar, 0)` — funded with XLM (Friendbot) + USDC trustline
- Morpho Blue market for OETH/USDC pair deployed on Sepolia
- CCTP TokenMessenger operational on Sepolia → Stellar Testnet
- Blend pool with USDC reserve deployed on Stellar Testnet
- Policies registered for all 6 transaction types (see table below)

### Test Steps

```
Step 1 — Setup
  ├── Deploy contract to NEAR testnet (or reuse)
  ├── Call deposit_near() with ≥ 6 × min_sign_deposit
  ├── derive_address(Ethereum, 0) → eth_address
  ├── derive_address(Stellar, 0) → stellar_pubkey
  ├── Fund eth_address: OETH (1e18) + ETH (0.05e18) on Sepolia
  ├── Fund stellar_pubkey: XLM via Friendbot + establish USDC trustline
  ├── Register all 6 policies (see Policy Configuration below)
  ├── Query eth_getTransactionCount(eth_address) → initial_nonce = N
  └── Assert get_total_requests() == 0

═══════════════════════════════════════════════════════
  PHASE A — EVM DeFi (5 sequential signed transactions)
═══════════════════════════════════════════════════════

Step 2 — TX-0: Approve OETH for Morpho (request_id = 0, nonce = N)
  ├── data = 0x095ea7b3 + abi.encode(Morpho_Blue, supply_amount)
  ├── request_signature(EvmEip1559{to: OETH, ...}) → poll → Completed
  ├── Reconstruct → broadcast → receipt.status == 0x1
  └── Gate: OETH.allowance(eth_address, Morpho) ≥ supply_amount

Step 3 — TX-1: Supply OETH to Morpho (request_id = 1, nonce = N+1)
  ├── data = 0x0c0a769b + abi.encode(marketParams, supply_amount, 0, eth_address, "")
  ├── request_signature(EvmEip1559{to: Morpho_Blue, ...}) → poll → Completed
  ├── Reconstruct → broadcast → receipt.status == 0x1
  └── Gate: Morpho position shows OETH collateral

Step 4 — TX-2: Borrow USDC from Morpho (request_id = 2, nonce = N+2)
  ├── data = 0x50d8cd4b + abi.encode(marketParams, borrow_amount, 0, eth_address, eth_address)
  ├── request_signature(EvmEip1559{to: Morpho_Blue, ...}) → poll → Completed
  ├── Reconstruct → broadcast → receipt.status == 0x1
  └── Gate: USDC.balanceOf(eth_address) ≥ borrow_amount

Step 5 — TX-3: Approve USDC for CCTP (request_id = 3, nonce = N+3)
  ├── data = 0x095ea7b3 + abi.encode(CCTP_TokenMessenger, borrow_amount)
  ├── request_signature(EvmEip1559{to: USDC, ...}) → poll → Completed
  ├── Reconstruct → broadcast → receipt.status == 0x1
  └── Gate: USDC.allowance(eth_address, CCTP) ≥ borrow_amount

Step 6 — TX-4: Bridge USDC to Stellar via CCTP (request_id = 4, nonce = N+4)
  ├── data = 0x6fd3504e + abi.encode(borrow_amount, stellar_domain, stellar_pubkey_bytes32, USDC)
  ├── request_signature(EvmEip1559{to: CCTP_TokenMessenger, ...}) → poll → Completed
  ├── Reconstruct → broadcast → receipt.status == 0x1
  └── Gate: USDC.balanceOf(eth_address) == 0 (all burned)

Step 7 — Verify EVM phase completed
  ├── Assert get_total_requests() == 5
  ├── Assert all request_ids 0..4 have status == Completed
  ├── Assert all receipt.from == eth_address
  └── Record all 5 EVM tx hashes for audit trail

═══════════════════════════════════════════════
  PHASE B — Bridge Finality (CCTP attestation)
═══════════════════════════════════════════════

Step 8 — Wait for USDC to arrive on Stellar
  ├── Poll Horizon GET /accounts/<stellar_pubkey> every 30s
  ├── Check USDC balance ≥ borrow_amount (bridged USDC minted)
  ├── Timeout: 30 minutes (CCTP attestation ~20 min typical)
  └── Gate: USDC balance confirmed before proceeding

═══════════════════════════════════════════════════════
  PHASE C — Stellar DeFi (1 signed Soroban invocation)
═══════════════════════════════════════════════════════

Step 9 — TX-5: Supply USDC to Blend lending pool (request_id = 5)
  ├── Fetch sequence_number from Horizon
  ├── Simulate transaction via Horizon simulateTransaction → get resource params
  ├── Construct StellarInvokeContractParams:
  │     contract = { contract_id: <blend_pool_id> }
  │     function_name = "supply"
  │     args = [
  │       Address { address_type: 0, key: <stellar_pubkey_hex> },
  │       Address { address_type: 1, key: <usdc_reserve_id_hex> },
  │       I128(<borrow_amount>)
  │     ]
  │     resources = <from simulation>
  │     network = Testnet
  ├── request_signature(StellarInvokeContract{...}) → poll → Completed
  ├── Reconstruct XDR envelope → DecoratedSignature(hint, r||s)
  ├── POST /transactions → assert successful == true
  └── Gate: Blend pool ledger shows supply position for stellar_pubkey

═══════════════════════════════
  PHASE D — Final Assertions
═══════════════════════════════

Step 10 — End-to-end validation
  ├── Assert get_total_requests() == 6
  ├── Assert get_account_requests(owner) == [0, 1, 2, 3, 4, 5]
  ├── Assert request_ids 0..4 → chain_type == Ethereum
  ├── Assert request_id 5 → chain_type == Stellar
  ├── Assert get_near_balance() == initial_deposit - (6 × min_sign_deposit)
  ├── Assert Morpho position: OETH collateral + USDC debt
  ├── Assert Blend position: USDC supply
  └── Assert USDC flow: Morpho borrow → bridge burn → Stellar mint → Blend supply
```

### Signature Reconstruction Notes

**EVM (TX-0 through TX-4, EIP-1559)**
- `r = big_r.affine_point`, `s = s.scalar`, `v = recovery_id`
- RLP: `[chain_id, nonce, max_priority_fee, max_fee, gas, to, value, data, [], v, r, s]`
- Prefix `0x02` → `eth_sendRawTransaction`

**Stellar (TX-5, Soroban invocation)**
- Signature = `r_bytes || s_bytes` (64 bytes, Ed25519-scheme)
- `hint` = last 4 bytes of stellar_pubkey
- Wrap in `DecoratedSignature`, append to `TransactionV1Envelope.signatures`
- Must include Soroban resource extension matching the simulated values

### Policy Configuration Required (6 policies)

| # | Policy Key | Selector | Purpose |
|---|------------|----------|---------|
| 1 | `evm:<OETH>:095ea7b3` | `approve` | Spender must be Morpho Blue address |
| 2 | `evm:<Morpho>:0c0a769b` | `supply` | Validate OETH market, cap collateral |
| 3 | `evm:<Morpho>:50d8cd4b` | `borrow` | Validate USDC market, cap borrow amount |
| 4 | `evm:<USDC>:095ea7b3` | `approve` | Spender must be CCTP TokenMessenger |
| 5 | `evm:<CCTP>:6fd3504e` | `depositForBurn` | Destination domain = Stellar, recipient = stellar_pubkey |
| 6 | `stellar:<stellar_pubkey>:<hex("supply")>` | `supply` | Blend pool contract_id, cap supply amount |

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | All 5 EVM tx receipts have `status=0x1` |
| AC-2 | Bridged USDC arrives on Stellar within 30-minute timeout |
| AC-3 | Blend `supply` tx confirmed on Horizon with `successful=true` |
| AC-4 | All 6 `SignatureRequest` records have `status=Completed` |
| AC-5 | `get_total_requests() == 6` after full pipeline |
| AC-6 | Internal NEAR balance decremented by exactly 6 × `min_sign_deposit` |
| AC-7 | EVM nonces sequential (N through N+4), no gaps |
| AC-8 | Phase A completes entirely before Phase C begins (sequential gate enforced) |
| AC-9 | End-state: Morpho has OETH collateral + USDC debt, Blend has USDC supply position |

---

## F.4 — Policy Expiry Integration Tests

Verifies that time-based policy expiry is enforced correctly: a policy with an `expires_at` timestamp blocks signing after the deadline and permits it before.

### Scope

The `MaskPolicy` struct has an optional `expires_at: Option<u64>` (NEAR block timestamp in nanoseconds). The enforcement in `signing.rs` is:
```rust
if let Some(expires_at) = policy.expires_at {
    require!(env::block_timestamp() < expires_at, "Policy expired at ...");
}
```
These tests confirm this guard works end-to-end in the sandbox.

### Test Cases

```
TC-1: Policy not yet expired — signing succeeds
  ├── Register policy with expires_at = now + 60_000_000_000 (60 seconds in ns)
  ├── Call request_signature with matching payload
  └── Assert on_sign_complete status == Completed

TC-2: Policy already expired — signing panics
  ├── Register policy with expires_at = now - 1 (already in the past)
  ├── Call request_signature with matching payload
  └── Assert transaction panics with message containing "Policy expired"

TC-3: Policy with no expiry — always valid
  ├── Register policy with expires_at = None
  ├── Call request_signature
  └── Assert status == Completed (no expiry check triggered)

TC-4: Policy expires between two requests
  ├── Register policy with expires_at = now + 5 seconds
  ├── First request_signature → assert Completed
  ├── Advance sandbox block time past expiry
  ├── Second request_signature with identical payload
  └── Assert second call panics with "Policy expired"

TC-5: Expired policy removed and re-registered — resumes working
  ├── Remove expired policy via remove_policy()
  ├── Register fresh policy with expires_at = now + 60s
  ├── Call request_signature
  └── Assert Completed
```

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | TC-1: signing succeeds before expiry |
| AC-2 | TC-2: signing panics with correct error message after expiry |
| AC-3 | TC-3: policies without expiry are unaffected |
| AC-4 | TC-4: expiry enforced on subsequent call after time advance |
| AC-5 | TC-5: re-registered policy restores signing ability |

---

## F.5 — Multicall Detection and Blocking for EVM

Prevents the contract from signing EVM transactions that invoke multicall contracts, which could batch unauthorized operations that individually bypass policy checks.

### Motivation

The policy engine validates a single `(to, selector)` pair per transaction. A multicall transaction bundles multiple calls into one, where each inner call may target a different contract and selector. A policy registered for multicall's outer selector cannot validate the inner calls' targets or values, so the safest approach is to detect known multicall selectors and reject signing outright.

### Known Multicall Selectors to Block

| Selector | Function | Contract |
|----------|----------|----------|
| `0xac9650d8` | `aggregate(calls[])` | Multicall (Makerdao) |
| `0x252dba42` | `aggregate((address,bytes)[])` | Multicall2/3 |
| `0x174dea71` | `aggregate3((address,bool,bytes)[])` | Multicall3 |
| `0x82ad56cb` | `aggregate3Value(...)` | Multicall3 |
| `0xbce38bd7` | `tryAggregate(bool,(address,bytes)[])` | Multicall2 |
| `0x399542e9` | `tryBlockAndAggregate(bool,(address,bytes)[])` | Multicall2 |

### Implementation Approach

In `signing.rs`, before the existing policy lookup in `request_signature()`, add a selector-based blocklist check for `PolicyChain::Evm` payloads:

```
if calldata.len() >= 4:
    selector = calldata[0..4]
    if selector in BLOCKED_SELECTORS:
        panic!("Multicall transactions are not permitted")
```

`BLOCKED_SELECTORS` is a compile-time `const` array of `[u8; 4]` values. No storage is needed — the blocklist is hardcoded.

### Test Cases

```
TC-1: aggregate(calls[]) selector 0xac9650d8 → rejected
TC-2: aggregate3(...) selector 0x174dea71 → rejected
TC-3: Normal ERC-20 transfer selector 0xa9059cbb → not blocked (proceeds to policy check)
TC-4: Empty calldata (simple ETH transfer) → not blocked (no selector)
TC-5: 3-byte calldata (below selector threshold) → not blocked
TC-6: Custom address with blocked selector → still rejected (address-agnostic check)
```

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | All 6 known multicall selectors are rejected with `"Multicall transactions are not permitted"` |
| AC-2 | Non-multicall selectors pass through to normal policy evaluation |
| AC-3 | Simple ETH transfers (no calldata) are unaffected |
| AC-4 | Selector check occurs before MPC call (no NEAR fee consumed on rejection) |
| AC-5 | Blocklist is a compile-time constant (no contract storage overhead) |

---

## F.6 — Security Audit: Encoding Canonicality, ABI Pointer Bounds, Negative Stellar Amounts

A targeted security review of the three highest-risk areas in the encoding and signing pipeline, where malformed inputs could produce incorrect signing digests or bypass policy validation.

### Audit Area 1 — RLP Encoding Canonicality (`src/encoding.rs`)

**Risk:** Non-canonical RLP (e.g. leading zeros in integer fields, over-length list headers) produces a different hash than a canonical encoder, meaning the signed digest does not match what an Ethereum node would compute.

**Review checklist:**
- `rlp_encode_bytes`: verify empty input encodes as `0x80`, single byte <128 encodes as itself
- `rlp_encode_u64`: verify `0` encodes as `0x80` (empty bytes), leading zeros are stripped
- `rlp_encode_list`: verify short list (<56 bytes payload) uses single-byte length prefix `0xc0 + len`
- `hex_to_bytes_trimmed`: verify leading zero bytes are removed (used for `value`, `gas_price`)
- `hex_to_bytes_raw`: verify no trimming occurs (used for `to`, `data`)
- Fuzz test: generate 1000 random EIP-1559 transactions, compare hash against `ethers-rs` reference

**Risk:** Non-canonical XDR (wrong padding, wrong discriminant values) produces a Stellar signing hash that Horizon will reject.

**Review checklist:**
- `xdr_encode_muxed_account`: discriminant must be `0x00000000` (KEY_TYPE_ED25519)
- `xdr_encode_asset` Native: discriminant `0x00000000`, no trailing bytes
- `xdr_encode_opaque`: padding must bring length to next multiple of 4
- `xdr_encode_sc_val`: verify all 14 discriminants match Stellar XDR spec exactly
- Compare encoded bytes against stellar-base reference implementation for known test vectors

### Audit Area 2 — Dynamic ABI Pointer Bounds (`src/signing.rs`, `src/encoding.rs`)

**Risk:** EVM ABI-encoded calldata with dynamic types (arrays, bytes, strings) includes internal offset pointers. A malicious payload could set an offset that points outside the calldata, causing the policy mask to check the wrong bytes (or cause an out-of-bounds panic).

**Review checklist:**
- `hex_to_bytes_raw`: confirm no panic on empty or odd-length hex strings
- Policy mask: `apply_mask_policy` checks `payload_bytes.len() != policy.mask.len()` — verify this covers ABI-padded calldata
- Identify if any code dereferences ABI offsets (currently none — policy applies mask to raw calldata bytes)
- Document that current design is offset-agnostic (mask applies positionally), which is safe but limits expressiveness for dynamic ABI types
- Add test: calldata shorter than registered mask → `apply_mask_policy` returns false, request rejected

### Audit Area 3 — Negative Stellar Amounts (`src/signing.rs`, `src/policy.rs`)

**Risk:** `StellarPaymentParams.amount` is `i64`. A negative value would XDR-encode as a valid signed integer but represent a negative payment, which Stellar nodes reject. However, the contract signs the hash and the MPC signer returns a valid signature — so a signed-but-invalid tx could be broadcast and fail silently at the Horizon layer.

**Review checklist:**
- Add `require!(params.amount > 0, "Payment amount must be positive")` in `build_stellar_payment_payload()`
- Similarly validate `StellarInvokeContractParams` resource fee: `SorobanResources.resource_fee` is `i64` — verify it cannot be negative
- `stellar_policy_bytes_payment`: encodes `params.amount.to_be_bytes()` — a negative value would still produce a valid 8-byte encoding; the policy mask would not catch it unless the mask explicitly checks the sign bit
- Add unit test: amount=-1 → `request_signature` panics with "Payment amount must be positive"
- Add policy test: mask bit 0x80 on byte 80 catches negative amounts via `(b & 0x80) == 0x00`

### Deliverables

- Audit report documenting findings per area, severity (Critical/High/Medium/Low), and recommended fix
- PRs addressing any Critical or High findings before mainnet deployment
- Updated test coverage for each identified edge case

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | RLP output matches `ethers-rs` for 1000 fuzz-generated transactions |
| AC-2 | XDR output matches `stellar-base` for known payment and invoke test vectors |
| AC-3 | Negative Stellar amounts are rejected at `request_signature` call time |
| AC-4 | Calldata shorter than policy mask returns `false` (no panic) |
| AC-5 | All Critical and High audit findings resolved before F.9 (mainnet deployment) |

---

## F.7 — Off-Chain Policy Management Tooling

A CLI tool for reading and writing policies via NEAR RPC without requiring manual JSON construction. Operators use this to configure, inspect, and dry-run policies for the deployed contract.

### Motivation

Policy management currently requires manually constructing JSON for `set_policy()`, `remove_policy()`, and `simulate_policy()` calls. This is error-prone at scale — masks and conditions are hex byte arrays that must match exactly. A dedicated CLI reduces operator error and makes audit trails clearer.

### Commands

```
# Register a new EVM policy (e.g. ERC-20 transfer to specific recipient, max 100 USDC)
policy-cli set \
  --contract <asset_manager.testnet> \
  --chain evm \
  --to 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 \
  --selector 0xa9059cbb \
  --mask 0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000005f5e100 \
  --condition 0x000000000xDeAdBeEf... \
  --value-limit 100000000 \
  --expires-at 2026-06-01T00:00:00Z

# Inspect a registered policy
policy-cli get --contract <...> --chain evm --to <addr> --selector 0xa9059cbb

# Remove a policy
policy-cli remove --contract <...> --chain evm --to <addr> --selector 0xa9059cbb

# Dry-run a transaction against its policy (simulate_policy)
policy-cli simulate \
  --contract <...> \
  --chain evm \
  --to <addr> \
  --calldata 0xa9059cbb000000000000000000000000deadbeef...

# List all policies (via get_whitelisted_ft and get_policy in a loop — requires indexer or enumeration)
policy-cli list --contract <...>
```

### Implementation Notes

- Built as a standalone Rust CLI using `near-api` and `clap`
- Calls `set_policy()`, `remove_policy()`, `simulate_policy()`, `get_policy()` via `near_api::Contract::call_function`
- Mask/condition inputs are hex strings; CLI validates `mask.len() == condition.len()` before sending
- `--expires-at` accepts RFC3339 datetime and converts to NEAR block timestamp nanoseconds
- Output is human-readable (pretty-printed JSON) plus raw hex for audit

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | `set` command registers policy readable via `get_policy()` RPC |
| AC-2 | `remove` command removes policy; subsequent `get` returns null |
| AC-3 | `simulate` output matches `simulate_policy()` contract response |
| AC-4 | CLI validates mask/condition length parity before sending tx |
| AC-5 | `--expires-at` correctly converts to nanosecond NEAR block timestamp |

---

## F.8 — Monitoring: Alerts on Policy Rejections and Unusual Signing Patterns

Operational visibility layer that detects and alerts on anomalous signing activity — policy rejections, high signing frequency, and unexpected chain targets.

### Motivation

The contract emits log strings (`env::log_str`) for key events but has no push notifications. Operators need real-time alerts when: (1) a signing request is rejected by policy (potential attack), (2) an unusual number of requests arrive in a short window (potential replay or DoS attempt), (3) a request targets an unexpected chain type.

### Log Events to Monitor

| Log message prefix | Event | Alert level |
|--------------------|-------|-------------|
| `"Transaction violates registered policy"` | Policy mask check failed | Critical |
| `"Policy expired at"` | Request after policy expiry | High |
| `"No policy found and default behavior is DenyAll"` | Missing policy + deny-all | High |
| `"Value ... exceeds policy limit"` | Value limit exceeded | High |
| `"Multicall transactions are not permitted"` (F.5) | Multicall blocked | High |
| `"Signature request N created"` | Normal signing | Info |
| `"Signature request N completed"` | Signing completed | Info |
| `"Signature request N failed"` | MPC failure | Medium |

### Implementation Approach

```
Option A — NEAR Indexer (recommended for production)
  ├── Run near-indexer-for-explorer or custom indexer against testnet/mainnet
  ├── Filter transactions to asset-manager contract account
  ├── Parse receipt logs for monitored prefixes
  └── Emit alerts via webhook (PagerDuty, Slack, email)

Option B — Polling via NEAR RPC (simpler, higher latency)
  ├── Cron job: GET /block (latest) every 2s
  ├── For each new block, fetch receipts for contract account
  ├── Scan logs for alert prefixes
  └── Alert if threshold exceeded (e.g. >5 policy rejections in 60s)
```

### Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Policy rejections per hour | ≥3 | ≥10 |
| Signing requests per minute | ≥5 | ≥20 |
| MPC failures per hour | ≥2 | ≥5 |
| Requests to unexpected chain type | any | — |

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | Policy rejection log triggers alert within 30 seconds |
| AC-2 | Alert includes contract account, request_id, and rejection reason |
| AC-3 | Normal signing events do not trigger alerts |
| AC-4 | Threshold-based rate alerts fire correctly under simulated load |
| AC-5 | Monitoring survives contract restart / re-deploy without reconfiguration |

---

## F.9 — Mainnet Deployment Preparation and Initial Policy Configuration

Checklist-driven process to build, audit, and deploy the contract to NEAR mainnet with production-ready access control and an initial policy set.

### Pre-Deployment Checklist

```
Build verification
  ├── cargo near build --release → reproducible WASM hash
  ├── Compare WASM sha256 against local build (deterministic build check)
  └── Verify contract size < 4MB (NEAR contract size limit)

Access control review
  ├── Confirm owner account is a multisig (e.g. near-multisig or Gnosis-equivalent)
  ├── Confirm mpc_signer = "v1.signer-prod.testnet" for mainnet OR correct mainnet MPC account
  ├── Confirm near_deposit_enabled = false (disable open deposits until policies are set)
  └── Confirm default_behavior = DenyAll (deny-by-default posture)

Security audit sign-off (F.6)
  ├── All Critical findings resolved
  ├── All High findings resolved or accepted with documented rationale
  └── Audit report attached to deployment PR

Testnet validation
  ├── F.1 (EVM DeFi: OETH → Morpho → borrow USDC → bridge) passing on Sepolia
  ├── F.2 (Stellar Soroban: supply USDC to Blend) passing on Stellar Testnet
  ├── F.3 (Full pipeline: EVM → bridge → Stellar Blend) passing end-to-end
  └── Policy expiry tests (F.4) passing on testnet
```

### Deployment Steps

```
Step 1 — Build
  ├── cargo near build --release
  └── Record WASM sha256 hash

Step 2 — Deploy to mainnet
  ├── near deploy <contract_account.near> <wasm_path>
  ├── Call new(mpc_signer=<mainnet_mpc_account>) with multisig
  └── Verify get_mpc_signer() and get_owner() return expected values

Step 3 — Initial policy configuration (production DeFi flow)
  ├── Register EVM policies via policy-cli (F.7):
  │     ├── OETH.approve → spender locked to Morpho Blue
  │     ├── Morpho.supply → OETH/USDC market only, collateral cap
  │     ├── Morpho.borrow → OETH/USDC market only, borrow cap
  │     ├── USDC.approve → spender locked to CCTP TokenMessenger
  │     └── CCTP.depositForBurn → destination domain locked to Stellar
  ├── Register Stellar policy:
  │     └── Blend.supply → pool contract_id locked, supply cap
  ├── Set default_behavior = DenyAll
  └── Verify simulate_policy() returns valid for each of the 6 registered policies

Step 4 — Smoke test
  ├── Call request_signature with a known-good Morpho supply tx → assert Completed
  ├── Call request_signature with a known-good Blend supply tx → assert Completed
  └── Attempt request with unregistered selector → assert rejected (DenyAll)

Step 5 — Enable deposits
  └── set_near_deposit_enabled(true) after successful smoke test
```

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | WASM sha256 matches reproducible build |
| AC-2 | `get_owner()` returns multisig account |
| AC-3 | `get_default_behavior()` returns `DenyAll` at launch |
| AC-4 | At least one EVM and one Stellar policy registered and validated via `simulate_policy()` |
| AC-5 | Smoke test signing requests succeed on mainnet |
| AC-6 | Unregistered selector signing attempt returns policy rejection error |

---

## F.10 — Add Bitcoin and Cosmos Payload Builders

Extends the signing engine with two additional payload builders so the contract can sign Bitcoin and Cosmos transactions using the MPC network.

### Bitcoin — P2WPKH (SegWit v0)

Bitcoin signing digest is the BIP143 sighash for P2WPKH inputs.

**Input type:** new `BitcoinTransactionParams` struct:
```rust
pub struct BitcoinTransactionParams {
    pub version: u32,
    pub inputs: Vec<BitcoinInput>,   // { txid, vout, sequence, value_sat }
    pub outputs: Vec<BitcoinOutput>, // { script_pubkey_hex, value_sat }
    pub locktime: u32,
    pub sighash_type: u8,           // typically 0x01 (SIGHASH_ALL)
}
```

**Digest construction (BIP143 sighash):**
```
hash_prevouts = dsha256(concat(txid || vout for each input))
hash_sequence = dsha256(concat(sequence for each input))
hash_outputs  = dsha256(concat(script_pubkey_len || script_pubkey || value for each output))
preimage = version || hash_prevouts || hash_sequence ||
           outpoint || scriptCode || value || sequence ||
           hash_outputs || locktime || sighash_type
digest = dsha256(preimage)
```

**ChainType:** `ChainType::Bitcoin` (already defined, `derivation_prefix = "bitcoin"`, `domain_id = 0` Secp256k1)

### Cosmos — Amino JSON Sign Doc

Cosmos signing digest is `sha256(amino_json(sign_doc))`.

**Input type:** new `CosmosTransactionParams` struct:
```rust
pub struct CosmosTransactionParams {
    pub chain_id: String,
    pub account_number: u64,
    pub sequence: u64,
    pub fee: CosmosFee,         // { amount: [{denom, amount}], gas: u64 }
    pub memo: String,
    pub msgs: Vec<CosmosMsg>,   // JSON-serializable message array
}
```

**Digest construction:**
```
sign_doc_json = amino_json_canonical({
    "account_number": "<u64 as string>",
    "chain_id": "...",
    "fee": { "amount": [...], "gas": "<u64 as string>" },
    "memo": "...",
    "msgs": [...],
    "sequence": "<u64 as string>"
})
digest = sha256(sign_doc_json)
```

Note: Amino JSON requires keys in sorted order, numbers as strings. Use `env::sha256()`.

**ChainType:** `ChainType::Cosmos` (already defined, `domain_id = 1` Ed25519)

### Test Cases

```
Bitcoin:
  ├── TC-1: P2WPKH single input, single output → match known BIP143 test vector
  ├── TC-2: Multiple inputs → verify hash_prevouts covers all inputs
  ├── TC-3: SIGHASH_ALL (0x01) only — other types → panic "Unsupported sighash type"
  └── TC-4: Zero-value output → valid (OP_RETURN outputs)

Cosmos:
  ├── TC-1: Simple MsgSend → match known Cosmos SDK sign doc hash
  ├── TC-2: Amino JSON key sort order is canonical (account_number before chain_id etc.)
  ├── TC-3: Numeric fields encoded as strings (not integers)
  └── TC-4: Empty memo → serialized as ""
```

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | Bitcoin digest matches BIP143 reference test vectors |
| AC-2 | Cosmos digest matches Cosmos SDK `amino.MustMarshalJSON` for equivalent sign doc |
| AC-3 | `ChainType::Bitcoin` and `ChainType::Cosmos` route correctly through `request_signature` |
| AC-4 | New `TransactionPayload` variants added: `BitcoinTx(BitcoinTransactionParams)`, `CosmosTx(CosmosTransactionParams)` |
| AC-5 | Policy integration deferred — new variants return `DefaultBehavior` check only (no chain-specific policy bytes yet) |

---

## F.11 — State Migration Method for Contract Upgrades

Provides a safe upgrade path that migrates existing contract state (borsh-serialized) to a new schema when fields are added, removed, or renamed between versions.

### Motivation

NEAR contracts store state as borsh-serialized bytes keyed by `STATE`. When the `Contract` struct changes (new fields, removed fields, type changes), a naive re-deploy will fail to deserialize the old state. A migration method deserializes the old state manually and writes the new schema.

### Design

**Versioned state approach:**
- Add a `version: u8` field to `Contract` (current = 1)
- On upgrade deploy, call a `migrate()` method (owner-only, one-time) that:
  1. Reads raw state bytes from storage
  2. Deserializes as `ContractV1` (old schema, kept as a frozen struct)
  3. Constructs `Contract` (new schema) from `ContractV1` fields + defaults for new fields
  4. Writes new state via `env::state_write()`

**Method signature:**
```rust
#[private]
pub fn migrate() -> Self {
    assert_eq!(env::predecessor_account_id(), env::current_account_id(),
        "Only callable during upgrade");
    let old: ContractV1 = env::state_read().expect("No state found");
    Contract {
        owner: old.owner,
        mpc_signer: old.mpc_signer,
        // ... map existing fields
        new_field: DefaultValue,  // new fields get defaults
        version: 2,
    }
}
```

### Migration Checklist

```
Pre-upgrade
  ├── Snapshot all get_* view call results for comparison after migration
  ├── Ensure no in-flight signing requests (get_total_requests matches completed count)
  └── Test migration on sandbox fork with production state dump

During upgrade
  ├── near deploy <contract> <new_wasm> --init-function migrate --init-args '{}'
  └── Verify deploy transaction succeeded

Post-upgrade
  ├── Compare get_* view results against pre-upgrade snapshot
  ├── Verify get_owner(), get_mpc_signer(), is_paused() unchanged
  ├── Verify all policies preserved (get_policy for each registered key)
  ├── Verify all FT balances preserved
  └── Run smoke test: request_signature for EVM and Stellar
```

### Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | `migrate()` succeeds on sandbox with production-equivalent state |
| AC-2 | All pre-existing policies, balances, and request records preserved after migration |
| AC-3 | New fields initialized to documented defaults |
| AC-4 | `migrate()` panics if called twice (idempotency guard via version check) |
| AC-5 | `ContractV1` frozen struct kept in codebase until next major version |

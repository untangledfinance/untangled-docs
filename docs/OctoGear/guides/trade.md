---
id: trade
title: How to Trade
sidebar_label: Trade
sidebar_position: 2
description: How to buy YES/NO prediction market outcomes on Polymarket and trade perpetual futures on Hyperliquid through your OctoGear Prime Account.
---

# How to Trade

The **Trade** page has two surfaces: **Polygon** (Polymarket outcome tokens) and **HyperEVM** (Hyperliquid perpetual futures). Switch between them with the toggle in the page header.

---

## Polymarket outcomes (Polygon tab)

Buy YES or NO positions on whitelisted prediction markets. Your trades settle into your OctoGear credit account, where they can immediately serve as collateral for borrowing.

:::note
Polymarket outcome trading currently requires a **passkey** identity. EVM wallet users can lend and borrow, but cannot yet buy outcomes directly from the Polygon tab.
:::

### Before your first trade

Your passkey account must be fully set up:
- NEAR funded (sponsor activation from the Home page)
- POL in your Polygon address (for gas)
- USDC.e for the trade amount

If setup is incomplete, the page shows a banner directing you to Home.

### Buy YES or Buy NO

1. Go to **Trade → Polygon tab**
2. Browse or search the list of authorised markets
3. Tap **Buy YES** or **Buy NO** on a market row
4. Enter the USDC amount (minimum $1)
5. **Wrap** — one transaction wraps your USDC.e into pUSD in your Polymarket custody wallet
6. **Sign order** — Touch ID / Face ID prompt signs the order. The order goes to Polymarket's CLOB — marketable buys typically fill in milliseconds
7. **Settle** — Polymarket settles on-chain. Your position appears in the Borrow Positions table on Home within a few seconds

### After buying: activate as collateral

After a buy, your outcome token sits in your custody wallet — not yet on your credit account. To use it as collateral for borrowing:

1. On **Home** or **Borrow**, look for the amber **"Activate as collateral"** button in the Collateral card
2. Tap it — one transaction enables the position on your credit account
3. Your weighted collateral and health factor update immediately

Until this step is done, the position does not count toward your borrowing capacity.

### Market states

| Pill | Meaning |
|---|---|
| (none) | Active — buy enabled |
| Locked | Within 6 hours of resolution — buy still works, new borrows are gated |
| Resolved | Market has settled — buy disabled, redeem your positions via the Collateral card |

---

## Hyperliquid perps (HyperEVM tab)

Trade perpetual futures across all Hyperliquid markets. Both passkey and EVM wallet identities can trade perps.

### Activate your perp account (one-time)

1. Go to **Trade → HyperEVM tab**
2. The **Activate** card walks you through three steps:
   - **Approve builder fee** — one master signature authorising OctoGear's builder address (shown on testnet; omitted on mainnet until configured)
   - **Approve agent** — one master signature delegating a session key to your browser. After this step, every order signs silently — no Touch ID per trade
   - **Fund perp** — move USDC from your spot account into your perp account (one transfer)
3. Once all three steps show green, the order modal is unlocked

### Long or Short

1. Find a market (search or scroll the markets list)
2. Tap **Long** or **Short**
3. Set order type (IOC / GTC / ALO), size, price, and leverage
4. Submit — the session key signs in the background. No wallet prompt.
5. Your position and open orders appear in the panel immediately

### Session key security

The session key stored in your browser can sign perp orders on your behalf until revoked. If you stop using OctoGear on a device, revoke the session key from Hyperliquid's own interface to remove the on-chain delegation. Clearing browser storage removes the local key copy but does **not** revoke the delegation.

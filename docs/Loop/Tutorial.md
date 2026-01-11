# Tutorial
## UI

// UI image

Untangled Loop provides a **Trade** interface to open and close long/short positions on a selected pair (e.g., XLM/USDC).

The trade ticket includes:
- Amount and selected margin asset
- Leverage slider
- Slippage tolerance
- Mark price and estimated entry price
- Estimated position (collateral and debt)
- Supply APR / Borrow APR
- Liquidation price / buffer and health factor
- Fee info (flashloan fee, service fee)

## FAQ

### What is Untangled Loop?
Untangled Loop is a looping layer on Stellar that lets you create leverage positions by combining spot swaps and money markets into an atomic flash-loan transaction.

### Do I need to deposit before trading?
No. You connect your wallet and trade directly; the protocol constructs the position atomically through flash loans, swaps, and money market actions.

### What pairs can be listed on Untangled Loop?
Pairs depend on:
- availability of the two assets on the underlying money market (Blend), and
- availability of a swap route on Aquarius (direct or multi-hop).

### How is the implied funding rate (APY) computed?
APY is derived from the net cashflow of the position’s supply and borrow legs (supply APR minus borrow APR), expressed on notional terms.

### What is the difference between ROE and APY?
- APY is computed on position notional.
- ROE is computed on your initial margin (equity).

### Is there a liquidation penalty?
Liquidation penalties are determined by the underlying money market. Untangled Loop does not run liquidations or collect liquidation fees.

### Why can PnL be negative right after opening?
A swap occurs on the full notional size (not just margin). With leverage, small execution differences (spread, fees, slippage) are amplified on equity.


# Risks

# Risks

## Trading on leverage
Trading on leverage carries significant risk. You can lose all your funds. Sudden price moves or rate changes can cause liquidation.

## Underlying liquidity
You are exposed to the liquidity of the spot route (Aquarius) and the depth/utilization of the underlying money market (Blend). Thin liquidity increases slippage and execution risk.

## Displayed APY/ROE
APY/ROE comes from underlying market conditions and can change quickly with utilization and demand. Always review the live preview before submitting.

## Smart contract risk
Smart contracts can be exploited. Trading on Untangled Loop exposes you to multiple layers of contract risk (Loop contracts + money market + AMM router).

## Liquidity and price impact

Untangled Loop positions are built on top of **Aquarius spot swaps** and **Blend money markets**.

- Spot execution uses Aquarius router (`swap_chained`), either direct pool or multi-hop route (`swap_chain`).
- Slippage is enforced via `min_swap_output` / `min_amount_out` set before the flash loan.

Before trading → adjust slippage tolerance and review the expected swap output and price impact shown in the trade preview.

## Liquidity and price impact

Untangled Loop positions are built on top of **Aquarius spot swaps** and **Blend money markets**.

- Spot execution uses Aquarius router (`swap_chained`), either direct pool or multi-hop route (`swap_chain`).
- Slippage is enforced via `min_swap_output` / `min_amount_out` set before the flash loan.

Before trading → adjust slippage tolerance and review the expected swap output and price impact shown in the trade preview.

---

## Funding rates (APY) and ROE

Conventions on perp exchanges use a “funding rate”. In Untangled Loop, the equivalent is derived from the **net cashflow** of the two legs:

- **Supply APR** (earned on collateral leg)
- **Borrow APR** (paid on debt leg)

The UI shows both:
- **APY**: net funding on notional terms
- **ROE**: return on equity (computed on margin)

APY / ROE can be positive or negative:
- If positive, the trader is receiving net yield to keep the position open.
- If negative, the trader is paying net cost to keep the position open.

APY is accrued as part of position economics and realized when closing or reducing the position.

---

## Pricing

Untangled Loop shows multiple price concepts:

- **Current / market price**: spot price implied by the swap path (Aquarius).
- **Mark price**: the effective price used for position health and liquidation logic on the underlying money market.

In the contracts, a `mark_price` is emitted in open/close events using the trade’s swap constraints:
- For open/close, `mark_price` is computed from flash amount and swap output expectations, scaled by `1e7`.

Before trading → always understand the difference between market execution price and the mark/oracle price used for risk and liquidation.

---

# Fees

> The UI preview surfaces fees explicitly.

## Service fees
Service fees are shown in the UI under **Fee Info**.

## Flash loan fees
Flash loan fee is surfaced in the UI. In the current flow, the `exec_op` callback receives `_fee` but it is not applied in the shown logic.

## Liquidation penalties
Liquidations (and liquidation penalties) are handled by the **underlying money market (Blend)**. Untangled Loop does not run liquidations and does not collect liquidation fees.

# Liquidations

Liquidations can occur due to:
- **Price movements**: price moves against the position, reducing health factor.
- **Rate changes**: borrow APR rises and/or supply APR falls, reducing net carry.

All liquidations are executed at the level of the **underlying money market**.

Before trading → monitor your **health factor** and **liquidation price** frequently. Liquidations on money markets can be harsh—avoid liquidation at all costs.

---

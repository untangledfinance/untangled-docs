## What is Untangled Loop?

Untangled Loop lets you open **leveraged long/short positions** on Stellar by automating looping strategies on top of:

- **Spot liquidity** (via Aquarius AMM, other spot exchanges to follow)
- **Money markets** (via Blend and OctoLend, later)

All positions are created by combining **swaps + borrow/lend** into a single atomic transaction using **flash loans**.

## Why is this design superior?

### You can trade on existing on-chain liquidity
Untangled Loop builds positions on top of **spot + money markets**. By sourcing swaps from Aquarius and borrowing/lending through Blend, Loop can facilitate larger trades while minimizing unnecessary fragmentation between venues.

### Funding is derived from money market rates
Funding (shown as **APY** / **ROE** in the UI) is determined by the **difference between supply APR and borrow APR** on Blend. This can be positive or negative depending on current utilization and rate curves.

### Composable by design on Stellar
A pair can be supported when there is:
- a **swap route** (Aquarius), and
- a **lending market** for the two assets (Blend).

### Automated looping

Looping is the DeFi-native way of creating leveraged exposure on-chain. Users borrow against collateral, swap the borrowed amount, and re-supply to increase exposure. Traditional manual loops become inefficient after many repetitions due to overcollateralization constraints (LTV / liquidation thresholds), Untangled Loop automates this using flash loans.

## Who’s this for?

### Loopers
Users who already do manual or automated “loops” (recursive lending and borrowing) can use Loop to open positions with clear metrics like **liquidation price, health factor, mark price, leverage, and net funding**.

### Traders
Directional traders can open **long/short exposure** without an order book. Positions are built from money market legs + spot swap execution, enabling both directional trades and rate-driven strategies.

## Use cases

Untangled Loop is the looping layer for DeFi on Stellar. All positions are built by automating a looping strategy, using spot and money markets.

Below are high-level examples of what you can achieve with a few clicks on Untangled Loop.

### Go long or short like a perp
Looping non-correlated pairs like **XLM/USDC** is analogous to trading perps, except the position is constructed from:
- a **spot swap** (Aquarius), and
- a **collateral + debt position** (Blend).

Perks:
- **Underlying liquidity**: Loop uses spot + money market liquidity.
- **Multiple margin options**: the contracts support margin in either side of the pair (base or quote), depending on the route and UI flow.
- **Atomic execution**: position open/close is one transaction.


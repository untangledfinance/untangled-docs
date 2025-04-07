# Ethena USDtb on Aave: Risk and Supply Analysis

## Formular

Illiquidity risk for USDtb on Aave is defined as the risk that borrowers cannot access sufficient liquidity at a competitive borrowing rate. To manage this risk, the amount of USDtb supplied into Aave must be dynamically controlled to ensure:

- The borrow APR remains less than or equal to a predefined threshold $r$ (the target lowest APR among stablecoin lending options).
- The total supplied USDtb does not exceed a maximum cap $k$, which limits exposure and preserves token liquidity outside the lending protocol.

We define the following variables and parameters:

- $B$: Total borrowed USDtb
- $S$: Total supplied USDtb (decision variable)
- $U = \frac{B}{S}$: Utilization rate
- $k$: Maximum amount of USDtb allowed to be supplied into Aave
- $r$: Target maximum borrowing APR

### Aave Interest Rate Parameters (in decimals):

- $u_o$: Optimal usage ratio (e.g., 0.92)
- $b$: Base variable borrow rate (e.g., 0.00)
- $s_1$: Variable rate slope 1 (e.g., 0.06)
- $s_2$: Variable rate slope 2 (e.g., 0.35)

The Aave borrow APR is a piecewise function based on utilization:

$$
\text{BorrowAPR}(U) =
\begin{cases}
b + \frac{U}{u_o} \cdot s_1 & \text{if } U \leq u_o \\
b + s_1 + \frac{U - u_o}{1 - u_o} \cdot s_2 & \text{if } U > u_o \\
\end{cases}
$$

Our goal is to ensure:

$$
\text{BorrowAPR}(U) \leq r
$$

Assuming $U \leq u_o$ (sufficient supply), we solve:

$$
b + \frac{B}{S \cdot u_o} \cdot s_1 \leq r
$$

$$
\Rightarrow \frac{B}{S} \leq \frac{(r - b) \cdot u_o}{s_1}
$$

$$
\Rightarrow S \geq \frac{B \cdot s_1}{(r - b) \cdot u_o}
$$

Denote this as $S^*$ — the minimum supply needed to keep APR at or below $r$. The actual supply is constrained by the cap $k$:

$$
\boxed{S = \min\left(k,\ \frac{B \cdot s_1}{(r - b) \cdot u_o}\right)} \quad \text{(if } \frac{B}{S} \leq u_o\text{)}
$$

If demand exceeds what can be sustained at APR $r$ with $S = k$, supply cannot increase further, defining the illiquidity risk bound.

## Risks of Supplying USDtb to Aave

When Ethena supplies USDtb to the Aave protocol, several risks emerge:

1. **Aave Contract Risk**:  
   The smart contracts underlying Aave could contain vulnerabilities or bugs, potentially leading to loss of funds. While audited, no contract is immune to exploits, especially as USDtb integration introduces new dynamics.

2. **Aave Oracle Risk**:  
   Aave relies on oracles (primarily Chainlink) for price feeds. If the oracle provides inaccurate data—due to manipulation, outages, or Chainlink-specific issues—liquidations or incorrect interest rate calculations could occur, affecting USDtb stability and Ethena’s position.

3. **Illiquidity Risk**:  
   Ethena can only withdraw or convert aUSDtb to USDtb within the range of available liquidity on Aave. During mass withdrawal events, limited liquidity could trap funds. Converting aUSDtb to USDtb under high demand pushes utilization ($U$) above $u_o$, causing borrow APR to spike (via the $s_2$ slope), prompting borrowers to repay debts urgently and exacerbating the liquidity crunch.

## Ethena’s Strategy and Market Dynamics

Assuming a risk-free yield of 0% for holding USDtb, Ethena must lend USDtb on Aave to generate yield. Key considerations include:

- **Market Demand and Illiquidity**:  
  Ethena must assess USDtb borrowing demand. Under mass withdrawals, available liquidity limits withdrawals. Rapid aUSDtb-to-USDtb conversion increases $U$ beyond $u_o$, sharply raising borrow APR and pressuring users to repay debts, amplifying illiquidity risk.

- **Competitive Borrowing Rates**:  
  By supplying USDtb, Ethena aims to offer the lowest borrow APR among stablecoins. A heuristic approach assumes USDtb’s borrow rate eventually equilibrates to the lowest competitor rate, allowing us to estimate initial supply using the formula above.

### Incentives for Borrowing USDtb

1. **Low Initial APR**:  
   As a new stablecoin on Aave, USDtb’s borrow APR starts lower than competitors, attracting borrowers seeking cost-effective stablecoin loans.

2. **Looping Profitability Analysis**:  
   Loopers compare sUSDe APY (yield from staking USDtb) to USDtb borrow costs. A positive spread (sUSDe APY - borrow APR) drives profitability. With Aave’s 90% loan-to-value (LTV) ratio, theoretical leverage reaches ~10x, though 7–9x is practical due to liquidation risks and oracle price fluctuations.
   - **Example**: If sUSDe APY = 5% and USDtb borrow APR = 4%, the spread is +1%. At 9x leverage, this yields ~9% APY on initial capital, minus transaction fees (e.g., gas costs). Oracle price volatility (e.g., secondary market sUSDe fluctuations) limits max leverage.
   - Loopers arbitrage this spread toward zero: high sUSDe APY draws borrowing, increasing utilization and borrow costs, while large sUSDe inflows compress yields via Ethena’s delta-neutral strategy.

### Dynamic Equilibrium

- When sUSDe APY greatly exceeds borrow APR, looping surges, raising utilization and borrow costs (e.g., Q4 2024 saw Aave stablecoin rates hit ~40% APY).
- Excessive capital in sUSDe compresses funding rates, reducing APY (e.g., Q3 2024 yield drop led to a $1B supply reduction).
- Equilibrium occurs where sUSDe APY ≈ borrow APR, with loopers enforcing a narrow spread. Supplying more USDtb lowers $U$, keeping borrow rates low and extending profitable looping windows, while a tight cap spikes rates, curbing leverage.

## Example: Required Supply for 4% Target APR

Suppose borrowing demand for USDtb is $100$ million USD, targeting a borrow APR ≤ 4%. Aave parameters are:

- Optimal Usage Ratio: $u_o = 0.92$
- Base Variable Borrow Rate: $b = 0.00$
- Variable Rate Slope 1: $s_1 = 0.06$
- Variable Rate Slope 2: $s_2 = 0.35$
- Target Borrow APR: $r = 0.04$
- Borrow Demand: $B = 100,000,000$

Using the formula:

$$
S = \frac{B \cdot s_1}{(r - b) \cdot u_o}
$$

$$
S = \frac{100,000,000 \cdot 0.06}{(0.04 - 0) \cdot 0.92} = \frac{6,000,000}{0.0368} = 163,043,478.26
$$

Required supply to maintain APR below 4%:

$$
\boxed{163.04\,\text{M USDtb}}
$$

This supply reduces utilization, keeping rates competitive, but excess supply may leave capital idle if demand lags.

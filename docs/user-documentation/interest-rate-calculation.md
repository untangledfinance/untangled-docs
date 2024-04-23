# Interest rate calculation

In the Untangled Protocol, interest is compounded and calculated every second as per the norm. Transactions occur continuously, day or night, necessitating an interest rate mechanism capable of accurately determining interest at any given moment.

## Background

This section provides a broad overview of interest compounding and distinguishes between APYs and APRs. If you're already acquainted with these ideas, feel free to bypass this section and delve into how they're implemented on-chain below.

### Compound interest

Compound interest is a financial concept where interest is calculated not only on the initial principal amount but also on the accumulated interest from previous periods. In other words, it's interest on interest. The benefit of compound interest lies in its ability to accelerate the growth of an investment or savings account over time. As interest is continually reinvested, the base amount increases, leading to exponential growth. Over long periods, compound interest can significantly boost the value of an investment, allowing it to grow faster than simple interest, which only applies to the initial principal. This compounding effect is often referred to as the "miracle of compound interest" because even small contributions can accumulate into substantial sums over time, making it a powerful tool for wealth accumulation and financial planning.

Imagine you invest 1000$ and earn 6% APR then you will earn 1000 * 6% = 60$ at the end of year one.

Let's say you have $1000 with a 6% interest rate, compounded monthly. In the first month, you'd apply the monthly interest rate (6.00%/12=0.50%) to your balance, resulting in $5 interest, leaving you with $1005. The next month, you repeat the process, factoring in the previous interest earned, resulting in slightly more interest: $1005 * 0.5% = $5.025. Continuing this pattern for 12 months yields $1061.678 at the year's end. Despite the same 6.00% interest rate, compounding monthly yields slightly more than annual compounding, showcasing the "power of compounding".

### Distinguish between APR and APY

To truly grasp Untangled Protocol interest rates and yields, it's crucial to understand the distinction between an Annual Percentage Rate (APR) and Annual Percentage Yield (APY). The key difference lies in how APY accounts for compounded interest, unlike APR. Consequently, while APR and APY are equal for annual compounding, the latter surpasses the former with higher compounding frequencies such as monthly or daily.

Let's take the example we discussed earlier. While the APR remains at 6.00%, the APY for monthly compounding reaches 6.1678%, and for secondly compounding, it's 6.1837%. The more frequent the compounding, the higher the equivalent APY.

In the realm of the Untangled Protocol, rates are typically presented as APRs. For instance, if you're examining an asset's financing fee on-chain, you'll likely encounter an APR figure. Given that this APR is applied every second, the most accurate representation of the resulting yield, considering accrued interest, aligns with an APY compounded secondly. As a result, in the Untangled App, you'll often input rates as APRs, while displayed interest rates and yields typically appear as APYs, making it easier to gauge returns over time.


## Debt calculation

Interest on a debt is computed on a flat percentage and is not compounded. Upon receiving a repayment, the Untangled pool automatically calculates the accrued interest up to that point and combines it with the remaining portion of the original debt to determine the total repayment due from the Originator. With the total debt owed up to that point established, the smart contract recalculates the principal balance of the debt following the Originator's repayment by deducting the repayment amount from the total debt.

We have the formular for debt calculation:

*totalDebt = currentPrinciple \* (1  + interestRate \* (currentTimestamp - lastRepaymentTimestamp) / secondsPerYear)*

*updatedPrinciple = totalDebt - repaymentAmount*

To further understand the calculation, please have a look at the below example:

On Jan 1st, the Originator had 600k$ drawdown with 17% interest per year.

On Jan 31st, the total repay is expected to be 600k$ * (1+ 17% * 31/365) = 608,663$

Feb 7th, the total repay is 600k$ * (1+ 17% * 38/365) = 610,619$

Suppose Originator repay 100k$ for January, so they are expected to have the new principle to be 508,663$.

But since the repayment only made it to the smart contract until Feb 7th, that make the new principle turn out to be 510,619$. Hence the next repayment will be calculated base on this new principle.


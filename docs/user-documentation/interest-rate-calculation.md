# Interest rate calculation

Untangled Protocol leverages an advanced methodology for calculating interest, employing real-time compounding every second to ensure precise and equitable computations in financial transactions that are executed continuously, 24/7.

## Introduction to Interest Calculation

This section provides a foundational understanding of interest compounding and the distinctions between Annual Percentage Rate (APR) and Annual Percentage Yield (APY). Readers well-versed in these concepts can proceed directly to the detailed on-chain implementation section.

### Detailed Example of Compounding Interest

To align with the instantaneous transaction capabilities of blockchain technology, Untangled Protocol compounds interest every second. Here's how it works in a practical example:

Suppose an investment of $100 with an APR of 17.00%. Under simple annual compounding, the interest calculation is: $100 × 17.00% = $17.00 . This results in a total of $117.00 at the end of one year.

For monthly compounding, the interest rate per month is 17.00% / 12 = 1.4167%. This rate compounded monthly over a year yields: $100 × (1 + 1.4167%)^12 = $118.39

Compounding every second, the formula adjusts the interest rate to a per-second increment: $100 × (1 + 17%/31536000)^31536000 ≈ $118.53 

Here, 31536000 represents the total number of seconds in a year, calculated as: 60 * 60 * 24 * 365 = 31536000 

### Distinguish between APR and APY

To truly grasp Untangled Protocol interest rates and yields, it's crucial to understand the distinction between an Annual Percentage Rate (APR) and Annual Percentage Yield (APY). The key difference lies in how APY accounts for compounded interest, unlike APR. Consequently, while APR and APY are equal for annual compounding, the latter surpasses the former with higher compounding frequencies such as monthly or daily.

Let's take the example we discussed earlier. While the APR remains at 6.00%, the APY for monthly compounding reaches 6.1678%, and for secondly compounding, it's 6.1837%. The more frequent the compounding, the higher the equivalent APY.

In the realm of the Untangled Protocol, rates are typically presented as APRs. For instance, if you're examining an asset's financing fee on-chain, you'll likely encounter an APR figure. Given that this APR is applied every second, the most accurate representation of the resulting yield, considering accrued interest, aligns with an APY compounded secondly. As a result, in the Untangled App, you'll often input rates as APRs, while displayed interest rates and yields typically appear as APYs, making it easier to gauge returns over time.


## Debt calculation

Interest on a debt is compounded on a secondly basis. Upon receiving a repayment, the Untangled pool automatically calculates the accrued interest up to that point and combines it with the remaining portion of the original debt to determine the total repayment due from the Originator. With the total debt owed up to that point established, the smart contract recalculates the principal balance of the debt following the Originator's repayment by deducting the repayment amount from the total debt.

We have the formular for debt calculation:

*totalDebt = currentPrincipal × (1  + interestRate / secondsPerYear) ^ (currentTimestamp - lastRepaymentTimestamp)*

*updatedPrincipal = totalDebt - repaymentAmount*

To further understand the calculation, please have a look at the below example:

On Jan 1st, the Originator had $600k drawdown with 17% interest per year.

On Jan 31st, the total repay is expected to be $600k × (1+ 17%/31536000) ^ (31 × 24 × 60 × 60) = $608,725

Feb 7th, the total repay is $600k × (1+ 17%/31536000)^ (38 × 24 × 60 × 60) = $610,713

Suppose Originator repay $100k for January, so they are expected to have the new principal to be $608,725.

But since the repayment only made it to the smart contract until Feb 7th, that make the new principal turn out to be $610,713. Hence the next repayment will be calculated base on this new principal.


---
sidebar_position: 6
---

# Introduction to epoch
The investor withdrawal mechanics are designed to balance pool stability with investor’s need for instant liquidity. Withdrawal requests are “batched” against a fixed portion of the pool liquidity for equitable distribution, which lenders claim at any point in the following periods. Withdrawal requests not being fulfilled in an epoch are carried over to the next epoch. Withdrawal requests can also be canceled at any time for a cancellation fee (if any).


# How it works
Withdrawal requests are sent to the pool during the epoch duration pool tokens are locked/approved 

At epoch end, withdrawal requests will be fulfilled as follows:
- From the tokenholder's balance within the Income Reserve. The protocol calculates income reserve but the split of Income Reserve into balances of SOT vs. JOT holders is handled by the back end.  
- Any remaining amount: fulfilled by Capital Reserve where requests are fulfilled on a pro-rata basis according to the existing implementation. 
- Any unmet requests will be transferred to the next epoch.
- At the next epoch’s end, the process d i) -> iii) will continue. Token holders do not need to call to request withdrawals again.

## Cashflow waterfall
- monthly interest repayment from originators should be used for investors to withdraw, relative to their token holdings
- Additional drawdown request amounts need to be met by new investment, principal repayment or loan buy back by originator

# Reserve
Reserve is the currency amount of stablecoins in a Pool which is used to 
- Meet withdrawal requests of SOT holders 
- Advance to originator based on the value of collaterals locked (called loan financings - LATs)

## 2 types of reserve
The Reserve is consisted of Income Reserve and Capital Reserve

### Income Reserve 
assuming that the originator pays back interest from their loans, the smart contract will calculate the amount that should go to the Income Reserve vs Capital Reserve

The protocol will further calculate income belong to SOT vs. JOT holders

- This epoch’s amount belonging to SOT holders = beginning senior debt*senior interest rate during the compounding period (need to take into account effect of compounding)

- This epoch’s amount belonging to JOT holders = Total income amount - SOT holder’s income amount

The back end will further split Income Reserve into individual balances for each SOT and JOT holders 

- Token holder income balance = opening balance - income amount withdrawn + this epoch’s income amount for each holder

- This epoch’s income amount for each holder = This epoch’s income amount/Token supply (i.e., SOT Supply and JOT Supply
Later, fees/spread to Untangled, other service providers, pool’s operational expenses can be taken out of Income Reserve before JOT holders.

# Worked example
Pool has 4 token holders with the following share

A: 100,000 B: 200,000 C: 300,000 D: 400,000 -> token supply = 1,000,000  

Reserve = 0

NAV =$ 1,000,000 (token price = $1)

At end of month 1: Originator repay $30,000 of which  interest repayment is $10,000 and principal repayment is $20,000

Epoch period = 1 month

During the epoch: B and C request to withdraw $10,000 and $20,000 respectively

Epoch end

Calculate Income Reserve allocation

A: $1,000 B: $2,000 C: $3,000 D: $4,000 -> total allocation = $10,000. 

B and C withdraw requests are partially filled with their Income Reserve balance 

Calculate the remaining distribution:

Remaining requested amount

B: request $10,000 and got $2,000 through income reserve balance -> the remaining amount = $8,000

C: request $20,000 and got $3,000 through income reserve balance -> the remaining amount = $17,000

Total remaining amount = $8,000 + $17,000 = $25,000

Calculate and execute withdrawal amount from Capital Reserve:

Amount going to Capital Reserve = Principal amount paid by originator = $20,000. Remaining amount requested to withdraw = $25,000 

This means only 80% of the remaining requests will be met: *B = $8,000 x 80% = $6,400; C = $17,000x80% = $13,600*   

Calculate withdrawal request to move to next epoch
A: $0
B: $10,000 - $2,000 - $6,400 = $1,600
C: $20,000 - $3,000 - $13,600 = = $3,400
C: $0  

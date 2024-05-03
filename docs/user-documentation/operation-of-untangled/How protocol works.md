# Pool admin
Pool admin is a role that is able to create new pools and set parameters such as first-loss buffer (min first loss), borrow cap (debt ceiling), risk scorecard. Pool admin is appointed by governance.

# Borrowing side 
## Issuer 
acquires collaterals from approved originators. Originators upload collaterals and ‘drawdown' based on a risk scorecard. Issuer launches a token sale and approves originators who can sell/pledge collaterals to the pool. Issuer also operates ‘pool wallet”, an externally-owned account or a smart contract wallet (such as Safe) that they link to the pool to manage pool reserve (avoiding commingling of funds with their own or with other pools)

## Originators 
are those authorized to sell/pledge collaterals to the pool. They may also be responsible for servicing the collaterals (collect and repay) and may retain risk through subscribing to a junior tranche (represented by JOT).

# Lending side 
These are credit investors who are looking for yields (fixed or variable). Only investors passing KYC/accreditation can invest and redeem (can mint a unique identity token - UID). 

Proceeds from the token sale are invested in financings (represented by a NFT called LAT) to originators

Return and repayment are reinvested or being used for redemption. Investors are able to redeem at any time, subject to available liquidity in the pool reserve and the refinancing and liquidation mechanisms discussed below. 

# Pool 
A set of smart contract instances that facilitates interaction between the borrowing side and lending side. 

Borrow pools hold collaterals for financings (Loan Asset Tokens or LATs) and automatically enforce rules such as minimum first loss, borrow limit (debt ceiling). The smart contracts also issue SOT/JOT for new investment by credit investors and calculate net asset value (NAV) and token prices.

Borrow pool can have up to two pool tokens:
- JOT or Junior Obligation Token represents the junior tranche (or unitranche if the pool issues only one token) in a pool. JOT token holders earn a variable return based on residual cash flow in a pool. A pool needs to maintain a minimum JOT amount as a minimum first loss (or first loss buffer).
- SOT or Senior Obligation Token represents the senior tranche in a pool. SOT token holders earn a fixed interest rate through the increase in SOT token prices (interest accruals)
- There is no duration for pool tokens, i.e., perpetual - as long as investors keep money in the pool they will earn a return from the pool’s financings. Investment periods could however be enforced through off-chain agreements.

# Key terms

## Originator 
typically a fintech who specialize in certain types of lending such as SME loans or trade finance. 

## Collaterals 
RWA collaterals tokenized as NFTs.

## Asset Pool 
a smart contract instance that lends against collaterals with its reserve in stable coins. Asset Pool borrows (therefore also called Borrow Pool) from Liquidity Pool (automatically) and credit investors (manually) in order to lend to Originator. Asset pool is operated by an Issuer with designated Originator(s).

## Validator 
a trusted entity that provides validation services re collaterals: e.g. performing due diligence on collaterals being locked into an Asset Pool such as loans, invoices or carbon credits.

## Pool Tranches
- Senior tranche is represented by SOT, an ERC-20 token with a currency value of 1 but is continuously accruing interest. 
- Junior tranche is represented by JOT, an ERC-20 token acting as the first loss piece in a pool. 

## Minimum First Loss 
a Asset Pool’s parameter that reflects minimum currency amount of JOT over Pool Value

## Reserve 

the value of stablecoins in an Asset Pool

## Pool Value 
equals Reserve plus Net Asset Value

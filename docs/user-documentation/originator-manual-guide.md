---
sidebar_position: 7
---

# Originator manual guides
Upload assets
Step 1: Prepare asset list in csv
Data file requirements

Item
Description
File type
csv
A comma-separated values file (such as one created in Excel). This file contains the asset data. 
Header row
The first row of the table is recognized as header.
Don’t include your data in the first row.
We have no requirement with column names, the data is NOT mapped by their name.
Required columns
Please ensure your data has the following required columns
Loan Identifier: Loan ID must be unique across all pools
Original loan balance: The original loan amount
Current balance: The current loan amount
Loan origination date: Loan start date
Final maturity date: Loan maturity date. Must be greater than loan start date
Loan denomination currency: Currency of loan amount (USDC). 
Column limit
For practicality, limit the number of columns to around 50.
Row limit
No limit on the number of rows. However, you should not add too many columns that csv file size goes more than 10MB.


Example data

Step 2: Upload the data
From Issue, click a pool you want to upload assets to borrow.
On pool settings, select Asset tab, then click Upload to upload assets into a pool
Select asset option as Asset pledge.
You can see whether your assets need a validator to approve.

Step 3: Map data field
Ensure all required fields are mapped to continue.

Step 4: Review and Filter
Here you can filter your assets to exclude ineligible assets.


Step 5: Confirm 
Select the eligible assets to upload.


Step 6: Sign the Asset Transfer Agreement

Step 7: Check the uploaded assets
Navigate Portfolio > Asset to view your assets by batch or by items
If the pool requires your assets to be validated, the asset list you have just uploaded will be grouped as a batch. 


Drawdown
Prerequisite: 
You have uploaded your assets to the pool
In the lending pool requires asset validator, your assets have been approved by the validator
The pool reserve is enough to lend you for your assets
Pool Issuer already set the spent amount and approved spent amount >= the amount you want to borrow
Step 1: Navigate Issue menu, select a pool and click Asset tab, click Drawdown
The drawdown amount is the lending amount you can borrow.
Drawdown amount = Asset collateral amount x Advanced rate
Advanced rate of assets is set in the Pool Risk Scorecard.

Step 2: Drawdown
When confirming a drawdown, you are requested to mint an LAT (Loan Asset Token) for each pledge, which is an ERC-721 non-fungible token holding your loan information.

Please DON’T close your browser until all the transactions finish and you are automatically redirected to the pool settings.
Ensure your wallet has enough CELO to pay the gas fee.

Step 3: Borrow successfully
The LATs represent your loans can be found in pool’s asset list.
The borrowing amount is transferred your account wallet.
//image

Repay
Prerequisite: Your account wallet has enough tokens to repay
Step 1: Navigate Issue menu, select a pool and click Asset tab, click Repay

Step 2: Choose the loan assets to repay
//image

Step 3: Enter the amount you want to repay for each asset
Full repayment amount includes the loan origination amount (drawdown amount) and interest.
Your repayment will be transferred from your account wallet into pool reserve.
You can make full repayment or partial repayment.
If your repayment amount < Full repayment amount of the loan asset, it is considered as Partial repayment:
Executed repayment amount = repayment amount entered
LAT is updated with the remaining amount to repay
If your repayment amount >= Full repayment amount of the loan asset, it is considered as Full repayment:
Executed repayment amount is the full repayment amount
LAT is burnt and loan asset status is updated into Repaid

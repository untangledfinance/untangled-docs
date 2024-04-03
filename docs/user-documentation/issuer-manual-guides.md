---
sidebar_position: 6
---

# Issuer manual guides

## Register for a pool
In order to open a lending pool on Untangled Protocol, you as Issuer need to contact us to provide your pool information.
We will create your pool and set up the governance parameters for it including:
- Minimum first loss //link to the respective terms 
- Debt ceiling
- Risk scorecard
- Require Validator (if yes, set the pool’s validator)

## Initialize the pool
Step 1: Go to menu Issue to see the pools of which you are the Issuer.
A newly created pool just shows its name and has the button “Initialize pool”. Click it to start setting your pool


Step 2: Pool overview

Step 3: Set up pool asset
You can choose one or more Originators for your pool
Check the information carefully, as you will not be able to change pool originators once the pool is initialized.


Step 4: Submit
You will be asked to confirm several transactions to update the pool contract on blockchain.
Please DON’T close your browser until all the transactions finish and you are automatically redirected to your pool.
Ensure your wallet has enough CELO to pay the gas fee.

Now move on to do other pool settings.

## Pool settings
Once your pool is initialized, you can click a pool from Issue menu to go to the pool settings

### Link pool wallet
The pool wallet will serve as the treasury of the lending pool that holds the pool reserves. 
Prepare an empty wallet and make sure that you have access the that wallet, in order to approve the spent amount later.
Step 1: Click to tab Settings, then Link pool wallet. 
Step 2: Enter the wallet address you want to link to the pool.

Step 3: Submit.
A transaction is required to update the pool wallet on blockchain.
Please confirm the transaction with your account wallet to complete.
### Manage legal documents
#### Create document templates 

#### Generate pool documents from document templates 
Step 1: Click to tab Settings, then click Doc template to see the necessary legal document templates Untangled have prepared 


Step 2: Click icon + on a template to add it to your pool
Some documents allow you to fill your pool info into the document template.


Step 3: Check the generated pool documents and sign 
The generated documents can be found in the tab Generated doc
Click View details to view the document. You can remove the document or edit it if needed.
Note: All the documents of type Legal would require you to sign them before you can publish and use it.


### Review pool info
Click Review pool info to view and update the pool information including:
- Pool name
- Pool description in words
- Summary paragraph

### Create pool notification
This allows you to create content on the public pool page of Investor app
//image

### Close pool from view
Once the pool has issued notes, it will be listed on Investor app.
You can close the pool from view to unlist it from Investor app.

### View risk scorecard
Issuer can view the risk scorecard set for the pool.
The risk scorecard will affect how the pool asset value is calculated and how much the borrowers borrow/repay for each asset they sell/pledge into the pool
View NAV calculation //link
View Borrow from asset pledge/sale //link

### Review pool parameters
Pool parameters are set by the Pool Admin and are view-only to Issuer.
- Minimum first loss: the minimum percent of JOT investment amount over the total investment amount. This is to ensure the SOT investors priority to withdraw over JOT investors.
- Debt ceiling: the maximum amount of investment of the pool. Once the investment amount reaches the debt ceiling, Investors cannot add liquidity to the pool anymore, regardless of investment capacity set by the Issuer.

:::note
The Pool Admin can update these parameters any time to govern your pool operation.
:::


Issue note
Step 1: On pool setting, select tab Notes and click Issue Note
Step 2: Structure the note



#
Item
Description
Screen 1
Structure the note
1
Ticker
Pool ticket name
2
General document
Select the signed general document (Investment Summary Note Issuance)
3
Trustee
Select a company and company member as Trustee
4
Servicer
Select a company and company member as Servicer
5
First loss cushion 
(View-only) The min first loss of the pool, as set by Pool Admin


Debt ceiling 
(View-only) The debt ceiling of the pool, as set by Pool Admin


6
Currency
(View-only) The pool currency, as set by Pool Admin
7
Investment term (days)
Investment term


Senior Note
8
Sale type
Auction or Normal sale.
See BR2 for auction rules
9
Target amount
The target amount of SOT
10
Legal document
Select a signed legal document (Senior Note Subscription)
The document will be showed to SOT investor


Junior Note
11
Sale type
Normal only
12
Target amount
The target amount of SOT
13
Initial JOT
Initial JOT amount required before SOT sale open
14
Legal document
Select a signed legal document (Junior Note Subscription)
The document will be showed to JOT investor


Step 3: Structure the sale
Depending on the sale type of SOT you select in the previous step, you will need to set the respective information.
SOT sale type as Normal means the APR of SOT is fixed regardless of sale time
SOT sale type as Auction means the APR of SOT can be in a range from started value to reserved value. APR will increase from SOT sale starts until whether SOT investment capacity is reached or the SOT sale ends. The last value of APR will be set for the pool.



#
Item
Description
Screen 2
Structure the sale


Junior Note
15
Start time
JOT sale start time
16
Minimum bid
Minimum bid amount


Senior Note
17
Start time
SOT sale start time
18
End time
SOT sale end time
19
Start APY (%)
The started APY for auction
If SOT sale type = Normal, SOT APY is fixed at start APY
20
Reserved APY (%)
(Auction only) The reserved APY 
21
Time interval
(Auction only) Time interval for APY change 
22
Price change at each interval (%)
(Auction only) The APY rate change each interval
23
Minimum bid
Minimum bid amount



Step 4: Launch the sale
You can review your note sale and click Launch the sale to list the note token for sale.
Successfully issued notes can be found on Investor app or Issuer app > Pool.

You will be asked to confirm several transactions to update the pool contract on blockchain.
Please DON’T close your browser until all the transactions finish and you are automatically redirected to your pool.
Ensure your wallet has enough CELO to pay the gas fee.


Update note
You are able to update some values of your note sale.
From pool settings, select Note tab and click Update note.
 
#
Item
Description


Senior Note
1
Target amount
The target amount of SOT. 
New target amount must be greater than the current target amount
2
Legal document
Select a signed legal document (Senior Note Subscription)
The document will be showed to SOT investor
3
Minimum bid
Minimum bid amount


Junior Note
1
Target amount
The target amount of JOT
New target amount must be greater than the current target amount
2
Legal document
Select a signed legal document (Junior Note Subscription)
The document will be showed to JOT investor
3
Minimum bid
Minimum bid amount



Approve spent amount 
You must set the approved spent amount from the pool reserve, so that the pool contract is authorized to pay to Investors withdrawal and Originators borrowing.
On pool setting, select Note tab, click Manage reserve

The maximum amount you can approve is the current pool reserve balance.
You must connect the pool wallet and confirm it with the pool wallet.
See Link pool wallet.

Pool asset settings
Manage originator
Issuer must sign and set the Asset Transfer Agreement document before the Originators can start uploading assets and borrowing from the pool.
On pool settings, select Assets tab, click Manage Originator.

The Originators are the other party to sign this document when they upload assets to the pool.
See Upload assets.

Pool-2-pool investment (coming soon)
Bid
As Issuer of a pool, you can invest your pool reserve into another pool.
Step 1: Navigate Pool menu on Issuer app to view all the pools available for investment

Step 2: Invest on a pool
Select a pool to invest
Select the note token (JOT/SOT) to invest
Choose one of your pool’s wallet to invest

Step 3: Successful pool-2-pool investment
Withdraw
TBD

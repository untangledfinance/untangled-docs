# Pricing of SOT

SeniorAsset: The seniorAsset is the amount which belongs to the senior investor (SOT) in a pool.

$$\text{seniorAsset} = min(\text{expectedSeniorAsset},\text{poolValue})$$

Expected SeniorAsset=seniorDebt + seniorBalance

SeniorDebt: SeniorDebt is the amount which accrues interest for the senior tranche.
seniorDebt = beginningSeniorDebt(1+seniorInterestRate/n)^n (n is compounding period in a year)

SeniorBalance: SeniorBalance is the amount of the seniorTranche which is not used for interest accumulation.
seniorBalance = reserve*seniorAssetRatio

Pool Value: poolValue = NAV + Reserve = SOT Value + JOT Value

SOT price = seniorAsset/SOT supply 

# Pricing of SOT

Junior Asset: juniorAsset = poolValue - seniorAsset

$$\text{JOT price} = frac(\text{juniorAsset}\text{JOT supply}

If loans are defaulting, the juniorAsset would cover the losses. If the entire juniorAsset is lost, the poolValue could be lower than the expectedSeniorAsset. (edited) 

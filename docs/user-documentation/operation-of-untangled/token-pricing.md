# Pricing of SOT

Senior Asset: seniorAsset is the amount which belongs to the senior tranche investors in a pool.

$$\text{seniorAsset} = min(\text{expectedSeniorAsset},\text{poolValue})$$

$$expectedSeniorAsset = seniorDebt + seniorBalance + seniorSupply - seniorRedeem$$

Senior Debt: seniorDebt is the amount which accrues interest for the senior tranche.

$$ seniorDebt = \text{beginning senior debt} * (1 + \frac{\text{SOT interest rate}}{\text{n}})^n$$

SeniorBalance: seniorBalance is the amount of the senior tranche which is not used for earning interest.

$$seniorBalance = seniorAsset - seniorDebt $$

$$ seniorAssetRatio = \frac{seniorAsset}{reserve} $$

Pool Value: $$poolValue = NAV + Reserve = \text{SOT Value} + \text{JOT Value}$$

$$\text{SOT price} = \frac{\text{seniorAsset}}{\text{SOT supply}}$$

# Pricing of JOT

Junior Asset: $$juniorAsset = poolValue - seniorAsset$$

$$\text{JOT price} = \frac{\text{juniorAsset}}{\text{JOT supply}}$$

If loans are defaulting, the juniorAsset would cover the losses. If the entire juniorAsset is lost, the poolValue could be lower than the expectedSeniorAsset. 

If a pool only has only one tranche (unitranche) then juniorAsset = poolValue

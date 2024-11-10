---
sidebar_position: 1
---

# Vision 
Non-custodial, cross-chain, automated asset management solution - a data-driven, automated vault to attract liquidity from and invest in any opportunities on any EVM network to fit any risk/return appetite

# Use cases
- Treasury management for DAOs: non-custodial investment management strategies that balances DAOs’ need for funding ongoing operations and increasing returns
- New financial products: Combining underlying assets to offer investors a target risk/return e.g. RWA assets only or a mix of RWAs and crypto native
- Wrapper around existing products so to increase transparency and composability with DeFi to create secondary markets

# Objectives
- Leverage battle tested technologies as much as possible
- Make limited modifications to cater for RWA investment eg permission and withdrawal process
- Modular approach enabling many use cases
- Credio and AI agents ready - integrating risk oracle (Credio) and AI agents
- Multichain - able to take deposit and make investment across all EVM chains 

# Summary: Untangled Vault = ERC 4626 + Safe
Combine tokenized value with Safe wallet - therefore leverage the entire ecosystem of safe including permission and role extensions, delay modules and cross chain functionality (same wallet address and permission x chain)

## Some Modifications
- Permissioned: option to have the depositors in the vault going through KYC first
- Asynchronous withdrawal: close epoch to source liquidity to fulfil withdrawal requests. Once requests are filled epoch will be reopened. Users need to claim withdrawals
- Cross-chain communication with Axelar
  - deposit: a hook contract allowing depositors to deposit from their chain of choice to the safe wallet (see below) deployed on that chain
  - investment: a ‘remote’ safe wallet can be added to the vault by the vault owner 

---
sidebar_position: 8
---

# The Graph

Untangled maintains a subgraph on The Graph that indexes useful state about the Untangled Protocol. This subgraph is used by the [Untangled app](https://app.untangled.finance/#/celo).

<details>
<summary>The GraphQL schema of the subgraph</summary>

```
type NoteTokenPurchased @entity(immutable: true) {
  id: Bytes!
  investor: Bytes! # address
  tgeAddress: Bytes! # address
  pool: PoolDetail! # address
  amount: BigInt! # uint256
  tokenAmount: BigInt! # uint256
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}

type PoolDetail @entity {
  id: ID!
  jotAddress: String
  tgeJOTAddress: String
  sotAddress: String
  tgeSOTAddress: String
  tokensPurchased: [NoteTokenPurchased!] @derivedFrom(field: "pool")
  totalSOTAmount: BigInt!
  totalJOTAmount: BigInt!
  # tokensRedeemed: [TokensRedeemed!]
  createdTimestamp: BigInt
  createdBlockNumber: BigInt
  createdTransactionHash: String
}

type RedeemOrder @entity {
  id: ID!
  pool: PoolDetail!
  noteTokenAddress: Bytes!
  user: Bytes!
  noteTokenRedeemAmount: BigInt!
  noteTokenPrice: BigInt
  createdTimestamp: BigInt
  createdBlockNumber: BigInt
  createdTransactionHash: String
}

enum TransactionType {
  DRAWDOWN
  REPAY
  SOT_PURCHASE
  JOT_PURCHASE
  EPOCH_WITHDRAW
}
type PoolActivity @entity(immutable: true) {
  id: Bytes!
  pool: PoolDetail!
  from: String!
  amount: BigInt
  transactionType: TransactionType!
  createdTimestamp: BigInt!
  createdBlockNumber: BigInt!
  createdTransactionHash: String!
}

type UserPoolInvestment @entity {
  id: ID!
  investor: UserInvestment!
  pool: PoolDetail!
  totalSOTAmount: BigInt!
  totalJOTAmount: BigInt!
}

type UserInvestment @entity {
  id: ID!
  investments: [UserPoolInvestment!] @derivedFrom(field: "investor")
}

```
</details>

---
id: welcome-to-untangled
title: Welcome to Untangled
sidebar_label: Welcome
description: Start here for an overview and quick links to key Untangled docs.
---

import Link from '@docusaurus/Link';
import styles from './cards.module.css';

# Welcome to Untangled

Kick off with the essentials, then dive into product docs, user guides, and technical architecture.

## Getting Started

<div className={styles.cardGrid}>

  <Link className={styles.card} to="/docs/user-documentation/overview">
    <h3>What is Untangled?</h3>
    <p>High-level overview of the platform, components, and how it all fits together.</p>
  </Link>

  <Link className={styles.card} to="/docs/user-documentation/quickstart">
    <h3>Quick Start</h3>
    <p>Create a wallet, connect, deposit, and withdraw—end to end in minutes.</p>
  </Link>

  <Link className={styles.card} to="/docs/user-documentation/wallets">
    <h3>Wallet Setup</h3>
    <p>Freighter, MetaMask, and multi-sig (Safe) basics.</p>
  </Link>

</div>

## Products

<div className={styles.cardGrid}>

  <Link className={styles.card} to="/docs/category/usdyc">
    <h3>USDyc</h3>
    <p>Ultra-Short Duration yield coin—mechanics, risks, and strategies.</p>
  </Link>

  <Link className={styles.card} to="/docs/category/usdn">
    <h3>USDn</h3>
    <p>Delta-neutral yield token (overview, parameters, FAQs).</p>
  </Link>

  <Link className={styles.card} to="/docs/user-documentation/Onchain-Private-Credit">
    <h3>Onchain Private Credit</h3>
    <p>How private credit portfolios are structured and risk-managed on-chain.</p>
  </Link>

</div>

## User Guides

<div className={styles.cardGrid}>

  <Link className={styles.card} to="/docs/user-documentation/Untangled-Pools/invest-and-withdraw">
    <h3>Invest & Withdraw</h3>
    <p>Step-by-step flows, fees, and settlement timelines.</p>
  </Link>

  <Link className={styles.card} to="/docs/user-documentation/kyc-aml">
    <h3>KYC / AML</h3>
    <p>Verification process, supported regions, and troubleshooting.</p>
  </Link>

  <Link className={styles.card} to="/docs/user-documentation/wallet-security">
    <h3>Security Basics</h3>
    <p>Best practices for keys, approvals, and multisig operations.</p>
  </Link>

</div>

## Technical Docs

<div className={styles.cardGrid}>

  <Link className={styles.card} to="/docs/credio/overview">
    <h3>Credio Risk Oracle</h3>
    <p>Architecture, data pipeline, model provenance (ZK), and on-chain feeds.</p>
  </Link>

  <Link className={styles.card} to="/docs/credio/Onchain-Private-Credit">
    <h3>Credit Vaults</h3>
    <p>Vault design (ERC-4626), epochs, rebalancing, and Safe integrations.</p>
  </Link>

  <Link className={styles.card} to="/docs/developer/integrations">
    <h3>Integrations</h3>
    <p>SDK/API, supported chains (EVM & Stellar), and reference examples.</p>
  </Link>

</div>

## Operations & Risk

<div className={styles.cardGrid}>

  <Link className={styles.card} to="/docs/risk/overview">
    <h3>Risk Framework</h3>
    <p>Market, credit, liquidity, and protocol risk methodologies.</p>
  </Link>

  <Link className={styles.card} to="/docs/risk/monitoring">
    <h3>Monitoring & Alerts</h3>
    <p>What we track (funding, leverage, PoR), thresholds, and responses.</p>
  </Link>

  <Link className={styles.card} to="/docs/operations/fees-and-costs">
    <h3>Fees & Costs</h3>
    <p>Vault fees, network fees, and cost optimization.</p>
  </Link>

</div>

## Help & Support

<div className={styles.cardGrid}>

  <Link className={styles.card} to="/docs/user-documentation/faq">
    <h3>FAQ</h3>
    <p>Common questions on deposits, withdrawals, risks, and integrations.</p>
  </Link>

  <Link className={styles.card} to="/docs/user-documentation/troubleshooting">
    <h3>Troubleshooting</h3>
    <p>Wallet connections, KYC hiccups, and transaction failures.</p>
  </Link>

  <Link className={styles.card} to="/docs/user-documentation/contact-support">
    <h3>Contact Support</h3>
    <p>How to reach us and what info to include for fast resolution.</p>
  </Link>

</div>

> 🔎 **Note:** If any paths differ in your repo, just adjust each card’s `to` prop to the correct route. The styling will remain intact.

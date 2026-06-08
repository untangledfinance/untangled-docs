---
id: create-account
title: Create an Account
sidebar_label: Create an Account
sidebar_position: 1
description: How to create a Prime Account using a passkey or an EVM wallet.
---

# Create an Account

OctoGear offers two ways to connect: a **passkey** (biometric, no seed phrase) or an **EVM wallet** (MetaMask, Coinbase, WalletConnect, Rainbow). You can have both active simultaneously.

## Option 1: Passkey (recommended for new users)

A passkey uses your device's biometrics — Touch ID, Face ID, or Windows Hello — to create a NEAR identity. This identity controls your Polygon address via NEAR Chain Signatures MPC. There is no seed phrase and no private key file to manage.

### Steps

1. Go to [octogear.finance](https://octogear.finance) and click **Connect**
2. Select **Passkey** from the sign-in options
3. Your browser prompts you to register (new user) or sign in (returning user) with your device biometric
4. Your Prime Account is created — you now have a NEAR identity and a derived Polygon address

### Fund your passkey account (first time only)

Before you can transact on Polygon, your account needs three things:

| What | Why | How to get it |
|---|---|---|
| NEAR (for MPC gas) | Every Polygon transaction via your passkey costs a small NEAR fee | Click **Activate** on the orange banner on the Home page — the sponsor service tops up 0.10 NEAR automatically (once per 24 hours) |
| POL (for Polygon gas) | Polygon transactions require POL | Send POL to your derived Polygon address shown in the connect dropdown. Get POL from an exchange or bridge from Ethereum. |
| USDC.e (for trading and borrowing) | The app uses bridged USDC on Polygon | Bridge from Ethereum via the Polygon bridge, or withdraw USDC.e directly from an exchange to your Polygon address |

The sponsor activation may take a moment. The page shows `Activating…` then `Funded`. If it shows `Cooldown`, the 24-hour window has not reset — wait or send NEAR directly.

### Set up a backup passkey

If you lose your device and have no backup passkey, your funds are inaccessible permanently. Before depositing significant amounts, register a second passkey on a different device from the connect dropdown.

## Option 2: EVM wallet

If you already have a wallet with POL and USDC.e on Polygon:

1. Click **Connect** and select your wallet (MetaMask, Coinbase, Rainbow, or WalletConnect)
2. Approve the connection request
3. If your wallet is on a chain other than Polygon mainnet (chainId 137), the app will ask you to switch

EVM wallets need at minimum:
- **0.05 POL** for gas
- **5 USDC.e** to open a credit account

## Adding a second identity

You can have both a passkey and an EVM wallet active at the same time. Click **Add identity** in the connect dropdown. The **active identity** shown at the top of the dropdown is what actions on the page use — tap any identity to switch.

## What's next

Once connected and funded, go to **Home** to see your portfolio dashboard. From there navigate to **Earn**, **Borrow**, or **Trade**.

# Linera Smart Contracts

This directory contains the Rust smart contracts for the ARENA-X application on the Linera blockchain.

## 📋 Contract Overview

ARENA-X uses Linera's microchain architecture to enable high-performance, verifiable AI trading duels.

### Smart Contracts Included

1. **DuelContract** - Core duel management
2. **BettingContract** - Bet placement and resolution
3. **AgentRegistry** - AI agent verification and tracking

## 🏗️ Architecture

The ARENA-X protocol is composed of three main interacting micro-applications:

### 1. DuelContract
- **Responsibility**: Manages the lifecycle of trading duels (Creation -> Active -> Resolved).
- **State**: Stores duel parameters, participant IDs, and start/end times.
- **Interactions**: Emits cross-application messages to the BettingContract when a duel is created or resolved.

### 2. BettingContract
- **Responsibility**: Handles user bets on specific duel outcomes.
- **State**: Maintains a ledger of bets per duel and user balances.
- **Logic**: Calculates payouts based on the duel outcome received from the DuelContract.

### 3. AgentRegistry
- **Responsibility**: A registry of verified AI agents.
- **Features**: Implements ERC-7007 style verification for agent strategies.

## 🛠️ Protocol Features Used

- **Cross-Application Calls**: The DuelContract calls the BettingContract to open betting pools.
- **Session Management**: Uses Linera's session features to manage user interactions securely.
- **Fast Finality**: Leverages Linera's fast blocks for sub-second bet confirmation.
- **View Types**: Uses `RegisterView` and `MapView` for efficient state access.
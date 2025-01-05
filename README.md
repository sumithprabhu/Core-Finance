# Core Finance

Core Finance is a decentralized liquidity protocol designed to simplify cross-chain transactions and provide efficient asset management across various blockchains. With its robust architecture and seamless integration capabilities, Core Finance aims to become a cornerstone of decentralized finance.

---

## 🚀 Features

### 1. Cross-Chain Liquidity
- Seamless asset movement between multiple chains: **Ethereum**, **Arbitrum**, **BNB Chain**, and **EDU Chain**.
- Efficient bridging of stablecoins and native tokens with low fees and high speed.

### 2. Incentivized Liquidity Pools
- **Stablecoin Pools**: Supports USDC, USDT, and DAI.
- **EDU Pools**: For native EDU tokens.
- Liquidity providers earn **cUSD** and **cEDU** as proof of liquidity tokens, enabling rewards and staking.

### 3. Core Tokenomics
- **cUSD and cEDU**: Bridge tokens to maintain cross-chain relationships.
- **LPUSD and LPEDU**: Represent liquidity pool shares for staking and rewards.
- **CORE Token**: Governance and reward token for incentivizing participation in the ecosystem.

### 4. Security and Efficiency
- Relayer-based architecture ensures the integrity of cross-chain transactions.
- Robust smart contracts for liquidity management, event listening, and token bridging.

---

## 🛠️ How It Works

### 1. Liquidity Provision
- Users provide liquidity to stablecoin or EDU pools.
- Receive LP tokens representing their share in the pool.

### 2. Bridging Process
- Users initiate a cross-chain transaction through the dApp.
- Core Finance listens to on-chain events using its relayer service.
- Upon event verification, Core Finance executes the transaction on the destination chain.

### 3. Rewards and Staking
- LP tokens can be staked to earn CORE tokens as rewards.
- CORE tokens can be used for governance decisions.

---

## 🌍 Why Core Finance?

### 1. Unified Cross-Chain Access
- Simplifies the complexities of interacting with multiple blockchains.
- Ensures smooth asset movement with minimal user intervention.

### 2. Future-Proof Tokenomics
- Designed to scale with DeFi adoption by supporting governance and incentivizing participation.

### 3. Security-First Approach
- Employs well-audited contracts and a robust relayer system to ensure transactional integrity.

---

## 📈 Future Goals

1. **Support for Non-EVM Chains**  
   - Ongoing development of relayer nodes for **Solana** and other non-EVM-compatible chains.

2. **Enhanced Incentivization**  
   - Additional rewards and incentives for liquidity providers.

3. **Governance Expansion**  
   - Empower CORE token holders to participate in governance decisions, such as fee adjustments and protocol updates.

---

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity (ERC20, custom liquidity management).
- **Server Backend**: Node.js, Express.js.
- **Frontend**: React.js with RainbowKit and wagmi hooks.
- **Blockchain Support**: Ethereum, Arbitrum, BNB Chain, EDU Chain.

---

## 🔑 Key Components

### 1. Relayer Service
- Listens to blockchain events and ensures cross-chain transaction execution.
- Securely interacts with smart contracts to verify and execute token swaps.

### 2. Liquidity Pools
- **Stablecoin Pool**: Supports USDC, USDT, and DAI.
- **EDU Pool**: Supports EDU tokens and incentivizes LP participation.

### 3. Governance
- CORE tokens to be used for community-driven governance.

---



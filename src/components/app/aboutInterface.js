import Image from "next/image";
import Spotlight from "../spotlight";
export default function About() {
    return (
      <div className="text-white p-8 space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold mb-4">About Core Finance</h1>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto">
            Core Finance is a cutting-edge DeFi platform empowering users to perform seamless cross-chain transactions, manage liquidity, and stake tokens. With support for multiple blockchains and tokens, Core Finance delivers an integrated and efficient DeFi ecosystem tailored to meet the demands of modern finance.
          </p>
        </div>
  
        {/* Workflow Section */}
        <div>
          <h2 className="text-4xl font-semibold mb-6 text-center">How It Works</h2>
          <div className="space-y-8">
            {/* Workflow Steps */}
            <div className="flex items-center gap-6">
              <img
                src="/images/ethereum.svg"
                alt="Step 1"
                className="w-14 h-14"
              />
              <p>
                <span className="font-medium text-lg">Step 1:</span> Deposit supported tokens like USDC, USDT, DAI, or EDU into our secure liquidity pools. These pools ensure stability and rewards for participants.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img
                src="/images/arbitrum.svg"
                alt="Step 2"
                className="w-14 h-14"
              />
              <p>
                <span className="font-medium text-lg">Step 2:</span> Bridge tokens seamlessly across Ethereum, Arbitrum, BNB, and EDU Chain. Our routing mechanisms ensure minimal fees and efficient transactions.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img
                src="/images/bnb.svg"
                alt="Step 3"
                className="w-14 h-14"
              />
              <p>
                <span className="font-medium text-lg">Step 3:</span> Earn rewards by staking LP tokens in incentivized pools. Unlock additional opportunities to grow your holdings.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img
                src="/images/edu.svg"
                alt="Step 4"
                className="w-14 h-14"
              />
              <p>
                <span className="font-medium text-lg">Step 4:</span> Swap tokens, manage liquidity, or withdraw assets directly through our intuitive interface for complete control and transparency.
              </p>
            </div>
          </div>
        </div>
  
        {/* Supported Tokens Section */}
        <div>
          <h2 className="text-4xl font-semibold mb-8 text-center">Supported Tokens</h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8">
            Core Finance supports the following stablecoins and native tokens, enabling seamless interactions across the DeFi ecosystem.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["USDC", "USDT", "DAI", "EDU"].map((token, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <img
                  src={`/images/${token.toLowerCase()}.svg`}
                  alt={token}
                  className="w-16 h-16"
                />
                <span className="text-xl font-medium">{token}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Features Section */}
        <div>
          <h2 className="text-4xl font-semibold mb-8 text-center">Core Features</h2>
          <ul className="space-y-6 text-gray-400 max-w-4xl mx-auto">
            <li>
              <span className="font-medium text-white text-lg">
                Cross-Chain Bridge:
              </span>{" "}
              Transfer assets seamlessly across Ethereum, Arbitrum, BNB, and EDU Chain, with low fees and robust security measures.
            </li>
            <li>
              <span className="font-medium text-white text-lg">
                Incentivized Liquidity Pools:
              </span>{" "}
              Provide liquidity in pools designed for stablecoins and EDU tokens, earning attractive APY rewards.
            </li>
            <li>
              <span className="font-medium text-white text-lg">
                Token Swapping:
              </span>{" "}
              Swap between supported tokens with low fees and minimal slippage.
            </li>
            <li>
              <span className="font-medium text-white text-lg">Staking:</span>{" "}
              Stake LP tokens to maximize rewards and participate in yield farming opportunities.
            </li>
          </ul>
        </div>
  
        {/* Visual Flow Section */}
        <div>
          <h2 className="text-4xl font-semibold mb-6 text-center">Workflow</h2>
          <div className="flex justify-center">
            <img
              src="/images/arbitrum.svg"
              alt="Workflow Diagram"
              className="w-48 h-48 opacity-50"
            />
          </div>
          <p className="text-gray-400 text-center mt-4">
            Our process ensures seamless asset management and liquidity provisioning across chains.
          </p>
        </div>
  
        {/* Summary Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-semibold mb-4">Why Core Finance?</h2>
          <p className="text-gray-400 text-lg">
            Core Finance simplifies DeFi with secure cross-chain operations, high rewards, and intuitive tools. Whether youre a trader or liquidity provider, we deliver a unified platform for your financial goals.
          </p>
        </div>

        <div className="text-white p-8 space-y-16">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-semibold mb-6">How It Works</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Explore the seamless process of providing liquidity, executing cross-chain swaps, and staking tokens to earn rewards. Core Finance simplifies DeFi for everyone.
        </p>
      </div>

      {/* Workflow Spotlight */}
      <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
        {/* Card 1 - Provide Liquidity */}
        <div className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100">
          <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
            <Image
              className="inline-flex"
              src={"/images/ethereum.svg"}
              width={100}
              height={100}
              alt="Provide Liquidity"
            />
            <div className="p-6">
              <div className="mb-3">
                <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-sm font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Provide Liquidity
                  </span>
                </span>
              </div>
              <p className="text-indigo-200/65">
                Add liquidity seamlessly to stablecoin and EDU pools. Earn rewards while enabling cross-chain swaps for other users.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Cross-Chain Swaps */}
        <div className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100">
          <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
            <Image
              className="inline-flex"
              src={"/images/arbitrum.svg"}
              width={100}
              height={100}
              alt="Cross-Chain Swaps"
            />
            <div className="p-6">
              <div className="mb-3">
                <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-sm font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Cross-Chain Swaps
                  </span>
                </span>
              </div>
              <p className="text-indigo-200/65">
                Instantly swap tokens across blockchains like Ethereum, Arbitrum, and EDU Chain while ensuring minimal fees and fast execution.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 - Stake & Earn */}
        <div className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100">
          <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
            <Image
              className="inline-flex"
              src={"/images/edu.svg"}
              width={100}
              height={100}
              alt="Stake & Earn"
            />
            <div className="p-6">
              <div className="mb-3">
                <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-sm font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Stake & Earn
                  </span>
                </span>
              </div>
              <p className="text-indigo-200/65">
                Stake LP tokens to earn rewards and maximize returns. Grow your investments while supporting the protocols liquidity ecosystem.
              </p>
            </div>
          </div>
        </div>
      </Spotlight>
    </div>
      </div>
    );
  }
  
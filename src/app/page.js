"use client";
import Header from "../components/Header"; // Assuming you have the Header component
import Footer from "../components/Footer"; // Assuming you have the Footer component

import animationData from "../../public/animation-home.json";
import Lottie from "react-lottie-player";
import animationDataLive from "../../public/animation-live.json";
import { useState } from "react";
import Workflows from "@/components/workflow";

export default function HeroSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? -1 : index); // Toggle logic
  };

  const faqs = [
    {
      question: "What is Core Finance?",
      answer:
        "Core Finance is a cross-chain liquidity protocol that enables seamless token swaps and liquidity provision across multiple blockchains. It supports stablecoin and EDU pools to facilitate efficient cross-chain asset movement.",
    },
    {
      question: "How does Core Finance enable cross-chain swaps?",
      answer:
        "Core Finance uses a combination of smart contracts and a relayer system. When you initiate a swap, tokens are deposited into the source chain pool, and corresponding tokens are minted or transferred on the destination chain.",
    },
    {
      question: "What are cUSD and cEDU tokens?",
      answer:
        "cUSD and cEDU are protocol-backed tokens used internally for liquidity normalization and to facilitate smooth swaps between stablecoins and EDU tokens across chains. They are not tradable outside the protocol.",
    },
    {
      question: "How can I add liquidity to Core Finance pools?",
      answer:
        "Users can provide liquidity to the stablecoin pool (USDC, USDT, DAI) or the EDU pool by depositing any supported token. In return, liquidity providers receive LP tokens (LPUSD or LPEDU) as proof of their share.",
    },
    {
      question: "How do I earn rewards as a liquidity provider?",
      answer:
        "Liquidity providers earn rewards by staking their LP tokens (LPUSD or LPEDU) on the EDU Chain. Rewards are distributed in the CORE token, incentivizing active participation in the protocol.",
    },
    {
      question: "What are the benefits of Core Finance for users?",
      answer:
        "Core Finance enables users to seamlessly swap assets across blockchains with minimal fees, participate in decentralized liquidity pools, and earn rewards by providing liquidity.",
    },
    {
      question: "Is Core Finance decentralized?",
      answer:
        "Yes, Core Finance is decentralized. All liquidity pools and swap mechanisms operate through smart contracts deployed on multiple EVM-compatible blockchains, ensuring trustless and transparent operations.",
    },
    {
      question: "On which blockchains is Core Finance available?",
      answer:
        "Core Finance is available on Ethereum, Arbitrum, Binance Smart Chain, Solana, and EDU Chain. Liquidity pools and swap functionalities work across all supported blockchains.",
    },
  ];

  return (
    <div className=" text-white min-h-screen">
      {/* Include the Header */}
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between">
        {/* Upper Section (Text and Animation) */}

        <div
          className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 md:px-12"
          style={{ marginTop: "14rem" }}
        >
          {/* Text Section */}
          <div className="md:w-1/2">
            <div
              className="bg-[#2a2a2a] text-white py-1 px-3 mb-4 rounded-xl flex items-center border border-[#C0C0C0] shadow-lg"
              style={{ maxWidth: "80%" }}
            >
              <Lottie
                loop
                animationData={animationDataLive}
                play
                speed={0.5}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: "-2rem",
                  marginBottom: "-5rem",
                  marginLeft: "-3rem",
                  marginRight: "-2rem",
                }}
              />
              <span className="text-md">
                Core Finance is Now Live on EDU Chain Testnet
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 mt-[2rem]">
              The Future of Cross Chain Liquidity
            </h1>
            <p className="text-xl text-[#FEFFDB] mb-6">
              Core Finance revolutionizes cross-chain liquidity by enabling
              seamless swaps and efficient liquidity provision. Unlock unified
              pools, streamlined rewards, and borderless token transfers across
              multiple blockchains.
            </p>
            {/* <Link href="/docs">
              <button className="bg-[#de7800] text-white font-bold py-3 px-8 rounded-lg mt-[1rem] transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">
                Launch Dapp
              </button>
            </Link> */}
          </div>

          {/* Graphic Section */}
          <div className="md:w-1/2 relative mt-10 md:mt-0 ml-[2rem] opacity-60">
            {/* Placeholder for image */}
            <Lottie
              loop
              animationData={animationData}
              play
              speed={0.7}
              style={{
                width: 550,
                height: 550,
                margin: "0 auto",
                position: "absolute",
                bottom: "-18rem",
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="bg-black text-white py-8 border border-indigo-600 shadow-lg mx-auto  rounded-3xl"
          style={{ minWidth: "70%", marginBottom: "2rem" }}
        >
          <div className="flex flex-col md:flex-row justify-around items-center max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">100+</h3>
              <p className="text-[#FEFFDB]">Cross-Chain Swaps Processed</p>
            </div>
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">10+</h3>
              <p className="text-[#FEFFDB]">Liquidity Providers</p>
            </div>
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">5+</h3>
              <p className="text-[#FEFFDB]">Blockchains Integrated</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold">$1000+</h3>
              <p className="text-[#FEFFDB]">Total Value Locked (TVL)</p>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="border-t border-gray-800 pt-6 "></div> */}

      <Workflows />

      <div className="border-t border-gray-800 pt-6 "></div>

      <section className="max-w-7xl mx-auto py-16 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <a
              href="https://t.me/blitzprotocol"
              className="inline-block bg-gradient-to-t from-indigo-600 to-indigo-500 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              Join us on Telegram →
            </a>
          </div>
          <div className="md:w-2/3 space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-600">
                <div
                  className="flex justify-between items-center cursor-pointer py-4"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-3xl">{faq.question}</h3>
                  <span>{openIndex === index ? "−" : "+"}</span>
                </div>
                {openIndex === index && (
                  <div className="text-gray-400 pb-4 transition-opacity duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-800 pt-6 "></div>

      <section className="relative flex flex-col items-center justify-center h-[54rem]">
        {/* Background image with opacity */}
        <div
          className="absolute inset-0 bg-bottom bg-no-repeat opacity-40 z-0"
          style={{
            backgroundImage: `url('/home-bottom-background.svg')`, // Assuming the SVG is in the public folder
          }}
        ></div>

        {/* Logo behind text */}
        <div className="absolute inset-0 flex justify-center items-center mt-[-19rem] z-10">
          <img
            src="/logo.png" // Path to your logo image in the public folder
            alt="Blitz Protocol Logo"
            className="opacity-30 h-[auto] w-[20%]" // Setting logo size here
          />
        </div>

        {/* Text and button */}
        <div className="relative z-20 text-center text-white mt-[-17rem]">
          <h2 className="text-4xl font-bold mb-4">
            Simplify Cross-Chain Liquidity and Swaps.
          </h2>
          <p className="text-lg mb-6">
            Core Finance bridges the gap across blockchains, offering seamless
            token swaps and liquidity management.
          </p>
          <button className="bg-gradient-to-t from-indigo-600 to-indigo-500 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110">
            Explore dApp
          </button>
        </div>
      </section>

      {/* Include the Footer */}
      <Footer />
    </div>
  );
}

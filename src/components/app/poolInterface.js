import React, { useState } from "react";
import OpenedPool from "./openedPool";

export default function IncentivizedPools() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState(""); // For Pool Name

  const pools = [
    {
      id: 1,
      blockchain: "Ethereum",
      type: "Stablecoin Pool",
      logo: "/images/ethereum.svg",
      token: "nUSDLP",
      value: "$249,574",
      unit: "USD",
      apy: "8%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"],
      tokenName: ["USDC", "DAI", "USDT"] // Added token array
      // Added token array
    },
    {
      id: 2,
      blockchain: "Ethereum",
      type: "EDU Pool",
      logo: "/images/ethereum.svg",
      token: "nETH-LP",
      value: "$2,383,254.7",
      unit: "ETH",
      apy: "3%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"],
      tokenName: ["USDC", "DAI", "USDT"] // Added token array
      // Added token array
    },
    {
      id: 3,
      blockchain: "EDU Chain",
      type: "Stablecoin Pool",
      logo: "/images/edu.svg",
      token: "nUSDLP",
      value: "$524,050",
      unit: "USD",
      apy: "8%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"], 
      tokenName: ["USDC", "DAI", "USDT"] // Added token array
      // Added token array
    },
    {
      id: 4,
      blockchain: "EDU Chain",
      type: "EDU Pool",
      logo: "/images/edu.svg",
      token: "nETH-LP",
      value: "$2,033,180.7",
      unit: "ETH",
      apy: "1%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"], 
      tokenName: ["USDC", "DAI", "USDT"] // Added token array
      // Added token array
    },
    {
      id: 5,
      blockchain: "Arbitrum",
      type: "Stablecoin Pool",
      logo: "/images/arbitrum.svg",
      token: "nUSDLP",
      value: "$1,500,000",
      unit: "USD",
      apy: "5%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"], 
      tokenName: ["USDC", "DAI", "USDT"] // Added token array
      // Added token array
    },
    {
      id: 6,
      blockchain: "Arbitrum",
      type: "EDU Pool",
      logo: "/images/arbitrum.svg",
      token: "nETH-LP",
      value: "$3,000,000",
      unit: "ETH",
      apy: "2%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"], // Added token array
      tokenName: ["USDC", "DAI", "USDT"] // Added token array

    },
    {
      id: 7,
      blockchain: "BNB",
      type: "Stablecoin Pool",
      logo: "/images/bnb.svg",
      token: "nUSDLP",
      value: "$600,000",
      unit: "USD",
      apy: "6%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"], // Added token array
      tokenName: ["USDC", "DAI", "USDT"] // Added token array

    },
    {
      id: 8,
      blockchain: "BNB",
      type: "EDU Pool",
      logo: "/images/bnb.svg",
      token: "nETH-LP",
      value: "$1,200,000",
      unit: "ETH",
      apy: "4%",
      tokens: ["/images/usdc.svg", "/images/usdt.svg", "/images/dai.svg"],
      tokenName: ["USDC", "DAI", "USDT"] // Added token array
    },
  ];

  const handleCardClick = (pool) => {
    setSelectedPool(pool);
    setIsModalOpen(true); // Open Modal
  };

  return (
    <div className="p-6  text-white">
      <h1 className="text-3xl font-bold mb-2">Incentivized Pools</h1>
      <p className="text-gray-400 mb-6">
        Contributors are rewarded for balancing asset pools.
      </p>

      {/* Pool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {pools.map((pool) => (
          <div
            key={pool.id}
            onClick={() => handleCardClick(pool)}
            className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img src={pool.logo} alt={pool.blockchain} className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {pool.blockchain}
                  <span className="text-gray-400 text-sm">{pool.token}</span>
                </h3>
                <div className="flex ">
                  <p className="text-gray-400 text-sm">{pool.type}</p>
                  {pool.tokens.length > 0 && (
                    <div className="flex items-center ml-4 gap-2">
                      {pool.tokens.map((tokenIcon, index) => (
                        <img
                          key={index}
                          src={tokenIcon}
                          alt={`Token ${index}`}
                          className="w-5 h-5 rounded-full -ml-2"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-indigo-400 font-bold text-2xl">
                {pool.value} 
              </div>
              <div className="flex justify-end items-center">
                <div className="text-indigo-400 font-bold text-md mr-2">
                  {pool.apy} APY
                </div>
                <div className="text-gray-400 hover:text-white cursor-pointer mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <OpenedPool
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pool={selectedPool}
      />
    </div>
  );
}

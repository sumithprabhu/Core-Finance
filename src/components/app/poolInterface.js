import React, { useState } from "react";
import OpenedPool from "./openedPool";

export default function IncentivizedPools() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState(""); // For Pool Name

  const pools = [
    {
      id: 1,
      blockchain: "Blast",
      type: "Stablecoin Pool",
      logo: "/images/blast.svg",
      token: "nUSDLP",
      value: "$249,574",
      unit: "USD",
      apy: "8%",
    },
    {
      id: 2,
      blockchain: "Blast",
      type: "EDU Pool",
      logo: "/images/blast.svg",
      token: "nETH-LP",
      value: "$2,383,254.7",
      unit: "ETH",
      apy: "3%",
    },
    {
      id: 3,
      blockchain: "Optimism",
      type: "Stablecoin Pool",
      logo: "/images/optimism.svg",
      token: "nUSDLP",
      value: "$524,050",
      unit: "USD",
      apy: "8%",
    },
    {
      id: 4,
      blockchain: "Optimism",
      type: "EDU Pool",
      logo: "/images/optimism.svg",
      token: "nETH-LP",
      value: "$2,033,180.7",
      unit: "ETH",
      apy: "1%",
    },
    {
      id: 5,
      blockchain: "Ethereum",
      type: "Stablecoin Pool",
      logo: "/images/ethereum.svg",
      token: "nUSDLP",
      value: "$1,500,000",
      unit: "USD",
      apy: "5%",
    },
    {
      id: 6,
      blockchain: "Ethereum",
      type: "EDU Pool",
      logo: "/images/ethereum.svg",
      token: "nETH-LP",
      value: "$3,000,000",
      unit: "ETH",
      apy: "2%",
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
    },
  ];

  const handleCardClick = (poolName) => {
    setSelectedPool(poolName);
    setIsModalOpen(true); // Open Modal
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-2">Incentivized Pools</h1>
      <p className="text-gray-400 mb-6">
        Contributors are rewarded for balancing asset pools.
      </p>

      {/* Pool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {pools.map((pool) => (
          <div
            key={pool.id}
            onClick={() => handleCardClick(pool.token)}
            className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img src={pool.logo} alt={pool.blockchain} className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {pool.blockchain}
                  <span className="text-gray-400 text-sm">{pool.token}</span>
                </h3>
                <p className="text-gray-400 text-sm">{pool.type}</p>
              </div>
            </div>
            <div className="text-indigo-400 font-bold text-xl">{pool.apy} APY</div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <OpenedPool
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        poolName={selectedPool}
      />
    </div>
  );
}

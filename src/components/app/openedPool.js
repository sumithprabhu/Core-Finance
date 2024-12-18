import React, { useState } from "react";

export default function OpenedPool({ isOpen, onClose, poolName }) {
  const [activeTab, setActiveTab] = useState("add"); // 'add' or 'remove'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-[80%] bg-gray-900 rounded-lg shadow-lg text-white">
        {/* Cancel Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">{poolName}</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("add")}
            className={`w-1/2 p-4 text-center ${
              activeTab === "add" ? "text-indigo-400 border-b-2 border-indigo-500" : "text-gray-400"
            }`}
          >
            Add Liquidity
          </button>
          <button
            onClick={() => setActiveTab("remove")}
            className={`w-1/2 p-4 text-center ${
              activeTab === "remove" ? "text-indigo-400 border-b-2 border-indigo-500" : "text-gray-400"
            }`}
          >
            Remove Liquidity
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="col-span-2">
            {activeTab === "add" ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">nUSD</label>
                  <input
                    type="number"
                    className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 placeholder-gray-500"
                    placeholder="0.0000"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-400 mb-2">USDB</label>
                  <input
                    type="number"
                    className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 placeholder-gray-500"
                    placeholder="0.0000"
                  />
                </div>
                <button className="w-full bg-indigo-600 p-3 rounded-md text-white hover:bg-indigo-500">
                  Deposit
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-gray-400 mb-4">Withdraw Percentage %</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full mb-4"
                />
                <div className="flex items-center gap-4 mb-6">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="withdraw" className="form-radio" checked />
                    <span>Combo</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="withdraw" className="form-radio" />
                    <span>Synapse nUSD</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="withdraw" className="form-radio" />
                    <span>Blast Rebasing USD</span>
                  </label>
                </div>
                <button className="w-full bg-indigo-600 p-3 rounded-md text-white hover:bg-indigo-500">
                  Withdraw
                </button>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="p-4 bg-gray-800 rounded-md">
            <h3 className="text-lg font-bold mb-4">Currency Reserves</h3>
            <div className="flex justify-between mb-2">
              <span>nUSD</span>
              <span>86.47k (35%)</span>
            </div>
            <div className="flex justify-between mb-6">
              <span>USDB</span>
              <span>163.10k (65%)</span>
            </div>
            <h3 className="text-lg font-bold mb-4">Pool Info</h3>
            <div className="flex justify-between mb-2">
              <span>Trading Fee</span>
              <span>0.04%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Virtual Price</span>
              <span>1.00090 USD</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Liquidity</span>
              <span>$249,574</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

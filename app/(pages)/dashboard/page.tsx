"use client";
import { useState } from "react";
import Spotlight from "@/components/spotlight";

const tabs = [
  { name: "Vaults", icon: "🔒" },
  { name: "Deposit", icon: "💰" },
  { name: "Withdraw", icon: "📤" },
  { name: "Mint", icon: "🏦" },
  { name: "Repay", icon: "🔄" },
  { name: "Redeem", icon: "🎁" },
];

const vaultsDemo = [
  {
    name: "Vault 1",
    created: "2023-12-01",
    collateral: "$100",
    debt: "$50",
    ratio: "200%",
    status: "Active",
    risk: "Healthy",
  },
  {
    name: "Vault 2",
    created: "2023-11-28",
    collateral: "$50",
    debt: "$30",
    ratio: "150%",
    status: "Active",
    risk: "Moderate",
  },
  {
    name: "Vault 3",
    created: "2023-11-20",
    collateral: "$30",
    debt: "$25",
    ratio: "120%",
    status: "At Risk",
    risk: "High",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Vaults"); // Default Tab

  return (
    <section className="flex min-h-[820px] mt-5">
      {/* Sidebar */}
      <aside className="w-[200px] text-white py-6">
        <h2 className="text-2xl font-bold ml-3 mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-6 py-3 text-left font-medium rounded-r-lg ${
                activeTab === tab.name
                  ? "bg-gradient-to-t from-indigo-600 to-indigo-500"
                  : "hover:bg-indigo-700 transition"
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold  mb-6">{activeTab}</h1>

        {/* Vaults Tab */}
        {activeTab === "Vaults" && (
          <>
            <p className=" mb-6">
              This page shows all your vaults with details like collateral,
              debt, ratio, and risk status. You can manage them here.
            </p>

            <div className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-4">
              {vaultsDemo.map((vault, index) => (
                <div
                  key={index}
                  className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-4"
                >
                  {/* Top Row: Vault Name and Risk */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-indigo-200">
                      {vault.name}
                    </h3>
                    <div
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        vault.risk === "Healthy"
                          ? "bg-green-100 text-green-600 border border-green-600"
                          : vault.risk === "Moderate"
                          ? "bg-yellow-100 text-yellow-600 border border-yellow-600"
                          : "bg-red-100 text-red-600 border border-red-600"
                      }`}
                    >
                      {vault.risk === "Healthy"
                        ? "Good"
                        : vault.risk === "Moderate"
                        ? "Moderate"
                        : "High Risk"}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-300">
                        Collateral:
                      </span>
                      <span>{vault.collateral}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-300">Debt:</span>
                      <span>{vault.debt}</span>
                    </div>
                  </div>

                  {/* Bottom Row: Ratio and Status */}
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-300">
                        Ratio:{" "}
                        <span className="text-indigo-200">{vault.ratio}</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-300">
                        Status:{" "}
                        <span
                          className={`${
                            vault.status === "Active"
                              ? "text-green-400"
                              : vault.status === "At Risk"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {vault.status}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-4 h-[1px] w-full bg-gray-600"></div>

                  {/* Button */}
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => console.log("Navigate to Deposit Tab")}
                  >
                    Deposit
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Deposit Tab */}
        {activeTab === "Deposit" && (
          <>
          <p className="text-gray-700 mb-6">
            Use this page to deposit collateral into your vaults. Select a vault and
            enter the amount to deposit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vaultsDemo.map((vault, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
              >
                {/* Vault Name and Risk */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-indigo-200">
                    {vault.name}
                  </h3>
                  <div
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      vault.risk === "Healthy"
                        ? "bg-green-100 text-green-600 border border-green-600"
                        : vault.risk === "Moderate"
                        ? "bg-yellow-100 text-yellow-600 border border-yellow-600"
                        : "bg-red-100 text-red-600 border border-red-600"
                    }`}
                  >
                    {vault.risk === "Healthy"
                      ? "Good"
                      : vault.risk === "Moderate"
                      ? "Moderate"
                      : "High Risk"}
                  </div>
                </div>
        
                {/* Current Collateral */}
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-300">Collateral:</span>
                  <span className="text-gray-400">{vault.collateral}</span>
                </div>
        
                {/* Current Ratio */}
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-gray-300">Ratio:</span>
                  <span className="text-indigo-200">{vault.ratio}</span>
                </div>
        
                {/* Divider */}
                <div className="my-4 h-[1px] w-full bg-gray-600"></div>
        
                {/* Deposit Input and Button */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enter deposit amount"
                    className="flex-1 px-3 py-2 text-sm border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Deposit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
        
        )}

        {/* Withdraw Tab */}
        {activeTab === "Withdraw" && (
          <>
            <p className="text-gray-700 mb-6">
              Withdraw collateral from your vaults. Ensure your collateral ratio
              remains above the minimum requirement after withdrawal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaultsDemo.map((vault, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">
                    {vault.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Current Collateral:{" "}
                    <span className="font-medium">{vault.collateral}</span>
                  </p>
                  <input
                    type="number"
                    placeholder="Enter withdrawal amount"
                    className="w-full px-3 py-2 text-sm border rounded-lg mb-4"
                  />
                  <button className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">
                    Withdraw
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Mint Tab */}
        {activeTab === "Mint" && (
          <>
            <p className="text-gray-700 mb-6">
              Mint stablecoins (e.g., CORE) using your collateral. Enter the
              amount of stablecoins you want to mint.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaultsDemo.map((vault, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">
                    {vault.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Debt: <span className="font-medium">{vault.debt}</span>
                  </p>
                  <input
                    type="number"
                    placeholder="Enter mint amount"
                    className="w-full px-3 py-2 text-sm border rounded-lg mb-4"
                  />
                  <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
                    Mint
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Repay Tab */}
        {activeTab === "Repay" && (
          <>
            <p className="text-gray-700 mb-6">
              Repay your stablecoin debt to reclaim your collateral and improve
              your vault's health.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaultsDemo.map((vault, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">
                    {vault.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Current Debt:{" "}
                    <span className="font-medium">{vault.debt}</span>
                  </p>
                  <input
                    type="number"
                    placeholder="Enter repayment amount"
                    className="w-full px-3 py-2 text-sm border rounded-lg mb-4"
                  />
                  <button className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700">
                    Repay
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Redeem Tab */}
        {activeTab === "Redeem" && (
          <>
            <p className="text-gray-700 mb-6">
              Redeem your collateral from liquidated or fully repaid vaults.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaultsDemo.map((vault, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">
                    {vault.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Collateral Available:{" "}
                    <span className="font-medium">{vault.collateral}</span>
                  </p>
                  <button className="w-full bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700">
                    Redeem
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </section>
  );
}

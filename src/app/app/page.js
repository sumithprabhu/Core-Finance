"use client";
import react, { useState } from "react";
import Header from "@/components/Header";
import Bridge from "@/components/app/bridgeInterface";
import Swap from "@/components/app/swapInterface";
import Pool from "@/components/app/poolInterface";

const tabs = [
  { name: "Bridge", icon: "🌉" },
  { name: "Swap", icon: "🔄" },
  { name: "Pools", icon: "💧" },
  { name: "Stake", icon: "📈" },
  { name: "About", icon: "ℹ️" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Bridge"); // Default Tab

  return (
    <div>
      <Header />

      <section className="flex min-h-[820px] mt-[8rem]">
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
          {/* <h1 className="text-3xl font-bold mb-6">{activeTab}</h1> */}

          {/* Bridge Tab */}
          {activeTab === "Bridge" && (
            <>
            <Bridge />
            </>
          )}

          {/* Swap Tab */}
          {activeTab === "Swap" && (
            <>
              <Swap />
            </>
          )}

          {/* Pools Tab */}
          {activeTab === "Pools" && (
            <>
              <Pool />
            </>
          )}

          {/* Stake Tab */}
          {activeTab === "Stake" && (
            <>
              <p className="mb-6">
                Stake your LP tokens to earn rewards.
              </p>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-300">Stake functionality coming soon.</p>
              </div>
            </>
          )}

          {/* About Tab */}
          {activeTab === "About" && (
            <>
              <p className="mb-6">
                Learn more about Core Finance and how it powers seamless cross-chain swaps and liquidity management.
              </p>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-300">About information coming soon.</p>
              </div>
            </>
          )}
        </main>
      </section>
    </div>
  );
}

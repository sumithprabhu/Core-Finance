"use client";
import react, { useState } from "react";
import Header from "@/components/Header";
import Bridge from "@/components/app/bridgeInterface";
import Swap from "@/components/app/swapInterface";
import Pool from "@/components/app/poolInterface";
import About from "@/components/app/aboutInterface";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
      <section className="flex min-h-[61rem] mt-8">
        {/* Sidebar */}
        <aside className="w-[250px] text-white py-2 border-2 border-indigo-600 bg-gray-800 rounded-2xl ml-4 pr-2 flex flex-col justify-between">
          {/* Logo and Name */}
          <div>
            <div className="flex items-center ml-3 my-2">
              <img
                src="/logo.png" // Replace with your actual logo path
                alt="Logo"
                className="w-8 h-8 mr-3"
              />
              <h2 className="text-2xl font-bold">Core Finance</h2>
            </div>
            <hr className="border-t border-white/50 my-4 mx-2" />{" "}
            {/* Semi-transparent line */}
            {/* Navigation */}
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
          </div>

          {/* Connect Button */}
          <div>
            <hr className="border-t border-white/50 my-4 mx-2" />{" "}
            <div className="px-3 pb-4 w-100 flex items-center justify-center">
              <ConnectButton
                chainStatus="none"
                label="Connect wallet"
                accountStatus="address"
                showBalance={false}
              />
              {/* <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition">
      Connect Wallet
    </button> */}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 p-8 overflow-y-auto ">
          {/* Background Logo */}
          <div
            className="absolute inset-0 opacity-10 flex justify-center items-center pointer-events-none"
            style={{
              backgroundImage: "url('/logo.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(4px)", // Adds a blur effect
              WebkitBackdropFilter: "blur(4px)", // Glass effect for Safari
              backdropFilter: "blur(4px)",
              transform: "scale(1.3)",
            }}
          ></div>
<div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-[600px] h-[500px] rounded-lg shadow-lg text-white flex flex-col items-center justify-center relative">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Website Down for Maintenance</h2>
        <p className="text-center text-gray-300 px-6 mb-6">
          Note: Due to low liquidity, the website is temporarily unavailable. Please check back later.
        </p>
        
      </div>
    </div>
          {/* Content */}
          <div className="relative z-10">
            {activeTab === "Bridge" && <Bridge />}
            {activeTab === "Swap" && <Swap />}
            {activeTab === "Pools" && <Pool />}
            {activeTab === "Stake" && (
              <div>
                <p className="mb-6">Stake your LP tokens to earn rewards.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-300">
                    Stake functionality coming soon.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "About" && (
              <div>
                <About />
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

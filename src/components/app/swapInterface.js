"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Swap() {
  const [fromNetwork, setFromNetwork] = useState("Ethereum");
  const [toNetwork, setToNetwork] = useState("");
  const [swapAmount, setSwapAmount] = useState("");
  const [fromToken, setFromToken] = useState("USDC");
  const [fromChain, setFromChain] = useState("Ethereum");
  const [toChain, setToChain] = useState("Ethereum");
  const [toToken, setToToken] = useState("USDC");

  const [fromTokenisOpen, setFromTokenIsOpen] = useState(false);
  const [fromChainisOpen, setFromChainIsOpen] = useState(false);
  const [toTokenisOpen, setToTokenIsOpen] = useState(false);
  const [toChainisOpen, setToChainIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Toggle state

  const tokens = [
    { name: "USDC", logo: "/usdc.svg" },
    { name: "USDT", logo: "/usdt.svg" },
    { name: "DAI", logo: "/dai.svg" },
    { name: "EDU", logo: "/edu.svg" },
  ];

  const networks = [
    { name: "Arbitrum", logo: "/arbitrum.svg" },
    { name: "Ethereum", logo: "/ethereum.svg" },
    { name: "BNB", logo: "/bnb.svg" },
    { name: "EDU Chain", logo: "/edu.svg" },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8 ">
      <h2 className="text-2xl font-semibold mb-4">Bridge</h2>
      <p className="text-sm mb-6">Send your assets across chains.</p>
      <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-gray-200">
        <div className="bg-gray-800 rounded-md ">
          <div className="flex items-center justify-between bg-gray-800 p-4 pr-10 rounded-md mb-2">
            <div className="relative w-1/3">
              <button
                onClick={() => setFromChainIsOpen(!fromChainisOpen)}
                className="flex items-center justify-evenly w-auto bg-gray-800 text-white rounded-md p-3 border border-gray-700 hover:border-indigo-600"
              >
                <img
                  src={`/images/${fromChain.split(" ")[0].toLowerCase()}.svg`}
                  alt={fromChain}
                  className="w-7 h-7"
                />
                <div className="pl-4 pr-2">
                  <h5 className="text-left opacity-70 text-xs">From</h5>
                  <span>{fromChain}</span>
                </div>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    fromChainisOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {fromChainisOpen && (
                <ul className="absolute w-auto max-w-xs mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                  {networks.map((t, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setFromChain(t.name);
                        setFromChainIsOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                        fromChain === t.name
                          ? "bg-indigo-900 text-white" // Selected
                          : "hover:bg-indigo-600 text-gray-200" // Hover
                      }`}
                    >
                      <img
                        src={`/images/${t.logo}`}
                        alt={t.name}
                        className="w-5 h-5"
                      />
                      <span>{t.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: "#00c78b" }}
                  />
                  <span className="text-green-400">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-gray-400 animate-pulse"
                  />
                  <span className="text-gray-400">Not Connected</span>
                </div>
              )}
            </div>
          </div>

          {/* Token Toggle and Amount Input */}
          <div className="flex items-center mb-2 gap-2 px-4 pb-4 ">
            <div className="relative w-1/3">
              {/* Selected Token (Button-like appearance) */}
              <button
                onClick={() => setFromTokenIsOpen(!fromTokenisOpen)}
                className="flex items-center justify-evenly w-full bg-gray-800 text-white rounded-md p-3 border border-gray-700 hover:border-indigo-600"
              >
                <img
                  src={`/images/${fromToken.toLowerCase()}.svg`}
                  alt={fromToken}
                  className="w-5 h-5"
                />
                <span className="px-2">{fromToken}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    fromTokenisOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {fromTokenisOpen && (
                <ul className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                  {tokens.map((t, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setFromToken(t.name);
                        setFromTokenIsOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                        fromToken === t.name
                          ? "bg-indigo-900 text-white" // Selected
                          : "hover:bg-indigo-600 text-gray-200" // Hover
                      }`}
                    >
                      <img
                        src={`/images/${t.logo}`}
                        alt={t.name}
                        className="w-5 h-5"
                      />
                      <span>{t.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between w-full rounded-md border border-gray-700 ">
              <input
                type="string"
                className="w-3/5 p-3 pl-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none text-lg"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                placeholder="0"
              />
              <span className="pr-6 text-gray-400 text-sm ">
                Available: 0.0
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center ">
          <button className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-700 text-white border border-gray-600 hover:bg-gray-600 transition shadow-md">
            <FontAwesomeIcon icon={faArrowRightArrowLeft} rotation={90} />
          </button>
        </div>

        {/* To Network */}
        <div className="bg-gray-800 rounded-md mt-2">
          

          {/* Token Toggle and Amount Input */}
          <div className="flex items-center mb-2 gap-2 px-4 pb-4 ">
            <div className="relative w-1/3">
              {/* Selected Token (Button-like appearance) */}
              <button
                onClick={() => setToTokenIsOpen(!toTokenisOpen)}
                className="flex items-center justify-evenly w-full bg-gray-800 text-white rounded-md p-3 border border-gray-700 hover:border-indigo-600"
              >
                <img
                  src={`/images/${toToken.toLowerCase()}.svg`}
                  alt={toToken}
                  className="w-5 h-5"
                />
                <span className="px-2">{toToken}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    toTokenisOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {toTokenisOpen && (
                <ul className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                  {tokens.map((t, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setToToken(t.name);
                        setToTokenIsOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                        toToken === t.name
                          ? "bg-indigo-900 text-white" // Selected
                          : "hover:bg-indigo-600 text-gray-200" // Hover
                      }`}
                    >
                      <img
                        src={`/images/${t.logo}`}
                        alt={t.name}
                        className="w-5 h-5"
                      />
                      <span>{t.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between w-full rounded-md border border-gray-700 ">
              <input
                type="string"
                className="w-3/5 p-3 pl-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none text-lg"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-2">
          {/* Powered By Section */}
          <div className="flex justify-end mb-2 text-gray-400 text-md">
            <span>Powered by Core</span>
          </div>

          {/* Router and Slippage */}
          <div className="border border-gray-700 rounded-md bg-gray-800 p-4 text-gray-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Router</span>
              <span className="text-gray-400">-</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Slippage</span>
              <span className="text-gray-400">-</span>
            </div>
          </div>

          {/* Full-width Button */}
          <div className="mt-4">
            <button className="w-full bg-gray-700 text-gray-200 py-3 rounded-md hover:bg-gray-600 transition">
              Bridge {fromToken}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

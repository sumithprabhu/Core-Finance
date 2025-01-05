import React, { useState } from "react";
import { useAccount, useSigner, useWalletClient, useWaitForTransactionReceipt,
  useWriteContract,} from "wagmi";
import  {approveToken}  from "../../utils/approveToken";
import contract_ABI from "@/constants/contract_abi";

export default function OpenedPool({ isOpen, onClose, pool }) {
  const { address, isConnected } = useAccount();
  const { data: walletClient, isError, isLoading } = useWalletClient()

  const [activeTab, setActiveTab] = useState("add");
  const [selectedToken, setSelectedToken] = useState("");
  const [amount, setAmount] = useState(""); // Store the entered amount
  const [buttonText, setButtonText] = useState("Approve Tokens"); // Manage button text
  const [isApproving, setIsApproving] = useState(false); // Disable button during approval
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Store the selected token
  // 'add' or 'remove'

  if (!isOpen) return null;
  const isAddLiquidityDisabled =
    !selectedToken || !amount || parseFloat(amount) <= 0;

  const handleApprove = async () => {
    if (!selectedToken || !amount) {
      alert("Please select a token, chain, and enter an amount.");
      return;
    }

    try {
      setIsApproving(true); // Disable button while processing

      console.log(`Approving ${amount} of ${selectedToken} on ${pool.blockchain}...`);
      await approveToken(
        pool.blockchain,
        selectedToken,
        amount,
        walletClient
      );

      // await writeContractAsync({
      //   address: "0x5bcFeF9b7aff2E9Ae9881Af796bEFF11f6C16feC",
      //   abi: contract_ABI,
      //   chainId: 11155111,
      //   functionName: "addLiquidity",
      //   args: ["stable","0x229FDBa261932519646362c0F721Bc04C85558e1",500000000000000000],
      // });

    } catch (error) {
      console.error("Approval failed:", error);
      alert("Failed to approve tokens. Check the console for more details.");
    } finally {
      setIsApproving(false); // Re-enable button
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 ">
      <div className="relative w-[70%] bg-gray-900 rounded-lg shadow-lg text-white border-2 border-indigo-600/40">
        {/* Cancel Button */}
        <button
          className="absolute top-4 right-6 text-gray-400 hover:text-red-400 text-2xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">{pool.type}</h2>
        </div>

        {/* Tabs */}

        {/* Tab Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="col-span-2">
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab("add")}
                className={`w-1/2 p-4 text-center ${
                  activeTab === "add"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-400"
                }`}
              >
                Add Liquidity
              </button>
              <button
                onClick={() => setActiveTab("remove")}
                className={`w-1/2 p-4 text-center ${
                  activeTab === "remove"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-400"
                }`}
              >
                Remove Liquidity
              </button>
            </div>
            {activeTab === "add" ? (
              pool.type === "Stablecoin Pool" ? (
                <div>
                  {/* Stablecoin Pool - Add Liquidity */}
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">
                      Select Token
                    </label>
                    <div className="flex gap-4">
                      {["USDC", "USDT", "DAI"].map((token) => (
                        <label key={token} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="stableToken"
                            value={token}
                            onChange={(e) => setSelectedToken(e.target.value)} // Update selected token
                            className="form-radio"
                          />
                          <span>{token}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">
                      Selected Token
                    </label>
                    <div className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700">
                      {/* Dynamic token name display */}
                      <span>{selectedToken || "No token selected"}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">
                      Enter Amount
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 placeholder-gray-500"
                      placeholder="0.0000"
                      onChange={(e) => setAmount(e.target.value)} // Update entered amount
                      value={amount}
                    />
                  </div>
                  <button
                    onClick={handleApprove}
                    className={`w-full bg-indigo-600 p-3 rounded-md text-white hover:bg-indigo-500 ${
                      isAddLiquidityDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={isAddLiquidityDisabled}
                  >
                    {buttonText}
                  </button>
                </div>
              ) : (
                <div>
                  {/* EDU Pool - Add Liquidity */}
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Token</label>
                    <div className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700">
                      EDU
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">
                      Enter Amount
                    </label>
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
              )
            ) : (
              <div>
                {pool.type === "Stablecoin Pool" ? (
                  <div>
                    {/* Stablecoin Pool - Remove Liquidity */}
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">
                        Select Token
                      </label>
                      <div className="flex gap-4">
                        {["USDC", "USDT", "DAI"].map((token) => (
                          <label
                            key={token}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="stableToken"
                              value={token}
                              onChange={(e) => setSelectedToken(e.target.value)} // Update selected token
                              className="form-radio"
                            />
                            <span>{token}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">
                        Selected Token
                      </label>
                      <div className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700">
                        {/* Dynamic token name display */}
                        <span>{selectedToken || "No token selected"}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">
                        Enter LP Token (LPUSD)
                      </label>
                      <input
                        type="number"
                        className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 placeholder-gray-500"
                        placeholder="0.0000"
                      />
                    </div>
                    <button className="w-full bg-indigo-600 p-3 rounded-md text-white hover:bg-indigo-500">
                      Withdraw
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* EDU Pool - Remove Liquidity */}
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Token</label>
                      <div className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700">
                        EDU
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">
                        Enter LP Token (LPEDU)
                      </label>
                      <input
                        type="number"
                        className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 placeholder-gray-500"
                        placeholder="0.0000"
                      />
                    </div>
                    <button className="w-full bg-indigo-600 p-3 rounded-md text-white hover:bg-indigo-500">
                      Withdraw
                    </button>
                  </div>
                )}
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

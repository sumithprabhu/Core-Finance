const { ethers } = require("ethers");

async function sendTokens(toAddress) {
  try {
    // Replace these values with your specific details
    const rpcUrl = ""; // Replace with your EDU Chain RPC URL
    const privateKey = ""; // Replace with your private key
    const tokenAddress = ""; // Replace with your token's contract address
    const amountToSend = 10; // Amount to send (10 tokens)
    const decimals = 18; // Token decimals (usually 18 for most ERC20 tokens)

    // Initialize provider and wallet
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // ABI for ERC20 token
    const abi = require("../constants/tokenContracts/usdc.json");

    // Initialize contract instance
    const tokenContract = new ethers.Contract(tokenAddress, abi, wallet);

    // Calculate the token amount with decimals
    const amount = ethers.parseUnits(amountToSend.toString(), decimals);

    // Send tokens
    const tx = await tokenContract.transfer(toAddress, amount);
    
  } catch (error) {
    console.error("Error sending tokens:", error);
    throw error;
  }
}

export default sendTokens;

const { ethers } = require("ethers");

async function sendTokens(toAddress) {
  try {
    // Replace these values with your specific details
    const rpcUrl = "https://lb.drpc.org/ogrpc?network=open-campus-codex-sepolia&dkey=AsRPYHBhI0LArWsiXiq7fxgePV-Bxr8R77CqIlZWwHzR"; // Replace with your EDU Chain RPC URL
    const privateKey = "c4f540586783ef31c04cc4de555f36a99ae1c42017e8f109f79ca250b5b7fd92"; // Replace with your private key
    const tokenAddress = "0x2e95237054Bf78856f48D618d9A3A0C4380B5619"; // Replace with your token's contract address
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

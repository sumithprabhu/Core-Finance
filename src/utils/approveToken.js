import { ethers } from 'ethers';
import chainConfigs from '../constants/chaniConfigs';


export async function approveToken(chain, token, amount, signer) {
  try {
    // Fetch chain-specific configurations
    const chainConfig = chainConfigs[chain];
    if (!chainConfig) {
      throw new Error(`Unsupported chain: ${chain}`);
    }

    const tokenAddress = chainConfig.contractAddresses[token];
    const tokenAbi = chainConfig.abi[token];

    if (!tokenAddress || !tokenAbi) {
      throw new Error(`Unsupported token: ${token} on chain: ${chain}`);
    }

    // Initialize the token contract
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    // Estimate gas for the transaction
    // const gasLimit = await tokenContract.estimateGas.approve(spender, ethers.utils.parseUnits(amount, 18));

    const spender="0xaDA753087203E26D5fB0Df543dabCa35DCc63ffE"
    // Send the approve transaction
    const parsedAmount = ethers.parseUnits(String(amount), 18);
    console.log(`Approving ${amount} ${token} tokens for ${spender}...`, parsedAmount);
    const tx = await tokenContract.approve(spender, parsedAmount );

    console.log(`Approval transaction sent: ${tx}`);

    
  } catch (error) {
    console.error('Error approving token:', error);
    throw error;
  }
}

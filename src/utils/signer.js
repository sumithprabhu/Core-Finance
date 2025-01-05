import { ethers } from "ethers";
import { useSignTypedData } from "wagmi";


async function signMessageWithWallet(signer) {
    const { data: signature, signTypedDataAsync } = useSignTypedData();

  try {
    // Static domain and types for EIP-712
    const domain = {
      name: "Core Finance",
      version: "1",
      chainId: 11155111, // Sepolia Testnet Chain ID
      verifyingContract: "0x2e95237054Bf78856f48D618d9A3A0C4380B5619", // Replace with your contract address
    };

    const types = {
      TokenApproval: [
        { name: "token", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "recipient", type: "address" },
      ],
    };

    const messagePayload = {
      token: "0x2e95237054Bf78856f48D618d9A3A0C4380B5619", // Static token contract address
      amount: ethers.parseUnits(String(10), 18), // 10 tokens with 18 decimals
      recipient: "0x2e95237054Bf78856f48D618d9A3A0C4380B5619", // Static recipient address
    };

    // Sign the structured data
    const signature = await signTypedDataAsync({
        domain,
        types,
        value: messagePayload,
      });
   
  } catch (error) {
    console.error("Error signing message:", error);
    throw error;
  }
}

export default signMessageWithWallet;

const chainConfigs = {
    Ethereum: {
      rpcUrl: "https://sepolia.infura.io/v3/45c0d7f12e354c2d8ae47d38de2c2a74",
      contractAddresses: {
        USDC: "0x229FDBa261932519646362c0F721Bc04C85558e1",
        USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      },
      abi: {
        USDC: require("./tokenContracts/usdc.json"),
      
      },
    },
    // arbitrum: {
    //   rpcUrl: "https://arb1.arbitrum.io/rpc",
    //   contractAddresses: {
    //     USDC: "0xFF970A61A04b1ca14834A43f5de4533ebdB5D106",
    //     USDT: "0x3E27d689a6A3A70d23b3a819c7Eee07A3dF89c2D",
    //     DAI: "0xDA10009cBd5D07Dd0CeCc66161FC93D7c9000da1",
    //   },
    //   abi: {
    //     USDC: require("./abi/arbitrum/USDC.json"),
    //     USDT: require("./abi/arbitrum/USDT.json"),
    //     DAI: require("./abi/arbitrum/DAI.json"),
    //   },
    // },
    // eduChain: {
    //   rpcUrl: "https://rpc.eduChain.network",
    //   contractAddresses: {
    //     USDC: "0x12345EduUSDCAddress",
    //     USDT: "0x12345EduUSDTAddress",
    //     DAI: "0x12345EduDAIAddress",
    //   },
    //   abi: {
    //     USDC: require("./abi/eduChain/USDC.json"),
    //     USDT: require("./abi/eduChain/USDT.json"),
    //     DAI: require("./abi/eduChain/DAI.json"),
    //   },
    // },
  };
  
  module.exports = chainConfigs;
  
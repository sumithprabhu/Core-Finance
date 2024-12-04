"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider, http, createConfig } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";
import { defineChain } from "viem";
const openCampusChain = defineChain({
  id: 656476,
  network: "Open Campus Codex",
  name: "Open Campus Codext",
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
  },
  blockExplorers: {
    default: {
      name: "Block Scout",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
  contracts: {},
  testnet: true,
});

const OpenCampus = {
  id: 656476,
  name: "Open Campus",
  iconUrl:
    "https://www.opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Open Campus", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital/"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
};

const config = createConfig({
  chains: [OpenCampus],
  transports: {
    [OpenCampus.id]: http("https://rpc.open-campus-codex.gelato.digital/"),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId="cm45y667a01nnzr3t35uic1wq"
          config={{
            // Customize Privy's appearance in your app
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://your-logo-url",
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain: openCampusChain,
            supportedChains: [openCampusChain],
          }}
        >
          {children}
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

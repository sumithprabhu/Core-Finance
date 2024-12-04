"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";
import { useRouter,usePathname } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Logo from "./logo";
import { Button } from "@headlessui/react";

export default function Header() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { ready, authenticated, login, logout } = usePrivy();
  const [isDashboard, setIsDashboard] = useState(false);
  const pathname = usePathname();
  const isRootPage = pathname === "/";

  // Check the current route to determine the button logic
  // useEffect(() => {
  //   setIsDashboard(router.pathname === "/dashboard");
  // }, [router.pathname]);

  const handleConnectWallet = async () => {
    if (!isConnected) {
      login() // Connect using the first connector (e.g., MetaMask)
    }
  };

  const handleLogout = () => {
    logout(); // Logout from Privy
    disconnect(); // Disconnect the wallet
  };

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
            <p className="ml-4 text-2xl font-bold">Core Finance</p>
          </div>

          {/* Desktop links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            {isRootPage ? (
              <li>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 py-[5px] text-white hover:bg-indigo-700"
                >
                  Launch Dapp
                </Button>
              </li>
            ) : !isConnected ? (
              <li>
                <Button
                  onClick={handleConnectWallet}
                  className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 py-[5px] text-white hover:bg-indigo-700"
                >
                  Connect Wallet
                </Button>
              </li>
            ) : (
              <li className="flex items-center gap-3">
                <span className="text-sm text-white bg-gray-800 px-3 py-1 rounded-lg">
                  {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </span>
                <Button
                  onClick={handleLogout}
                  className="btn-sm bg-red-600 py-[5px] text-white hover:bg-red-700"
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

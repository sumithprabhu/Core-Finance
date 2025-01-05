import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const isRootPage = pathname === "/";
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [isOnIt, setIsOnIt] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition) {
        setIsScrollingUp(false); // Hide navbar when scrolling down
      } else {
        setIsScrollingUp(true); // Show navbar when scrolling up
      }
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setIsDropdownHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDropdownHovered) {
      setIsDropdownOpen(false);
    } else if (!isOnIt) {
      setTimeout(() => {
        // Code to execute after 1 second (1000 milliseconds)
        setIsDropdownOpen(false); // Example: setting a state or variable
      }, 500);
    }
  };

  const handleDropdownEnter = () => {
    setIsDropdownHovered(true);
    setIsOnIt(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownHovered(false);
    setIsDropdownOpen(false);
    setIsOnIt(false);
  };

  return (
    <header
      className={`${
        isScrollingUp || lastScrollPosition === 0 ? "opacity-100" : "opacity-0"
      } fixed top-7 left-0 right-0 mx-auto px-8 py-3 bg-gray-900/90 bg-opacity-60 rounded-full z-50 transition-opacity duration-500 ease-in-out border-2 border-silver-900`}
      style={{ maxWidth: "90%", margin: "0 auto" }} // Center the header
    >
      <div className="flex justify-between items-center w-full">
        <Link href="/" legacyBehavior>
          <a className="flex items-center cursor-pointer">
            <Image
              src="/logo.png" // Path to your logo file in the public directory
              alt="Blitz Protocol Logo"
              width={50}
              height={50}
              className="mr-4"
            />
            <span className="text-white text-3xl font-bold">
              Core Finance
            </span>
          </a>
        </Link>

        <div className="relative flex items-center space-x-12">
          {" "}
          {/* Added spacing */}
          {/* Products Dropdown */}
         
          {/* Launch Playground or Connect Wallet */}
          {isRootPage ? (
            <a
              href="/app"
              className="text-lg inline-block text-white font-semibold px-6 py-2 rounded-lg bg-gradient-to-t from-indigo-600 to-indigo-500 py-[5px] text-white hover:bg-indigo-700 transition-all duration-300"
              style={{ maxWidth: "250px" }}
            >
              Launch Dapp
            </a>
          ) : (
            <ConnectButton
              chainStatus="none"
              label="Connect wallet"
              accountStatus="address"
              showBalance={false}
              className="px-6 py-2 rounded-lg border-2 border-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-300"
            />
          )}
        </div>
      </div>
    </header>
  );
}

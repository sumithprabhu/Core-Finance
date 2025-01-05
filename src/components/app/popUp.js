import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../../../public/loader.json"; // Replace with your loader animation file
import successAnimation from "../../../public/success.json"; // Replace with your success animation file

const facts = [
  "Did you know? Honey never spoils!",
  "The Eiffel Tower can be 15 cm taller during summer.",
  "Octopuses have three hearts.",
  "Bananas are berries, but strawberries arent!",
  "A day on Venus is longer than a year on Venus.",
  "Humans share 60% of their DNA with bananas."
];

const BridgePopup = ({ isOpen, onClose }) => {
  const [isBridging, setIsBridging] = useState(true);
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Select a random fact when the popup is opened
      const randomIndex = Math.floor(Math.random() * facts.length);
      setRandomFact(facts[randomIndex]);

      // Simulate bridging success after 13-15 seconds
      const timer = setTimeout(() => setIsBridging(false), 13000 + Math.random() * 2000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const lottieOptions = {
    loop: isBridging,
    autoplay: true,
    animationData: isBridging ? loaderAnimation : successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-[600px] h-[400px] rounded-lg shadow-lg text-white flex flex-col items-center justify-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{isBridging ? "Bridging Token" : "Success!"}</h2>
        <Lottie options={lottieOptions} height={200} width={200} />
        {isBridging ? (<div>
          <p className="mt-4 text-gray-300 text-center">Do You Know?</p>
          <p className="mt-4 text-gray-300 text-center">{randomFact}</p>
</div>
        ) : (
          <p className="mt-4 text-green-400 text-center">Your tokens have been successfully bridged!</p>
        )}
      </div>
    </div>
  );
};

export default BridgePopup;

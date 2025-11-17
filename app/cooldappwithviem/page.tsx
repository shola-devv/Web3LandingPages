"use client";

import { useState } from "react";
import {
  createWalletClient,
  custom,
  getContract,
} from "viem";
import { sepolia } from "viem/chains";

export default function MoodDapp() {
  const [mood, setMood] = useState("");
  const [currentMood, setCurrentMood] = useState("");
  const [address, setAddress] = useState<string | null>(null);

  // Replace with your contract values
  const MoodContractAddress = "0x..."; // your contract address
  const MoodContractABI = [
    // your ABI JSON here
  ];

  let walletClient: any;
  let MoodContractInstance: any;

  async function initContract() {
    if (!walletClient) {
      walletClient = createWalletClient({
        chain: sepolia,
        transport: custom((window as any).ethereum),
      });

      const accounts = await walletClient.requestAddresses();
      setAddress(accounts[0]);

      MoodContractInstance = getContract({
        address: MoodContractAddress as `0x${string}`,
        abi: MoodContractABI,
        client: walletClient,
      });
    }
    return MoodContractInstance;
  }

  async function handleGetMood() {
    try {
      const contract = await initContract();
      const moodValue = await contract.read.getMood();
      setCurrentMood(moodValue);
    } catch (err) {
      console.error("Error getting mood:", err);
    }
  }

  async function handleSetMood() {
    try {
      const contract = await initContract();
      await contract.write.setMood([mood], {
        account: address!,
      });
      alert("Mood set successfully!");
    } catch (err) {
      console.error("Error setting mood:", err);
    }
  }

  return (
return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <nav className="flex justify-between items-center mb-20">
            <div className="text-white text-2xl font-bold">MoodChain</div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              Connect Wallet
            </button>
          </nav>

          {/* Hero Content */}
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Your Mood, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-300">
                On The Blockchain
              </span>
            </h1>
            <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto">
              The world's first decentralized mood tracker. Set your mood, store it forever on the blockchain, and retrieve it anytime. Because your feelings deserve immutability.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mb-16">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-lg">
                Launch App
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all text-lg">
                Learn More
              </button>
            </div>

            {/* App Preview Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
              <h2 className="text-gray-800 text-2xl font-bold mb-6">This is my dApp!</h2>
              <p className="text-gray-600 mb-6">Here we can set or get the mood:</p>
              
              <div className="text-left">
                <label className="block text-gray-700 font-semibold mb-2">
                  Input Mood:
                </label>
                <input
                  type="text"
                  placeholder="Enter your mood..."
                  className="border px-3 py-2 rounded w-full mb-4"
                />
                
                <div className="flex gap-3 mb-4">
                  <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Get Mood
                  </button>
                  <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                    Set Mood
                  </button>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded p-4 text-center">
                  <span className="text-purple-700 font-semibold">Your Mood: Happy ✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why MoodChain?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Immutable</h3>
              <p className="text-gray-600">Your mood is stored forever on the blockchain. No one can delete or modify it.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Instant</h3>
              <p className="text-gray-600">Set and retrieve your mood with just a click. Lightning-fast blockchain transactions.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Decentralized</h3>
              <p className="text-gray-600">No central authority. Your mood, your control. Built on Ethereum smart contracts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Connect Your Wallet</h3>
                <p className="text-gray-600">Connect your MetaMask or any Web3 wallet to get started.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Set Your Mood</h3>
                <p className="text-gray-600">Type in how you're feeling and click "Set Mood" to store it on the blockchain.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Retrieve Anytime</h3>
                <p className="text-gray-600">Click "Get Mood" to fetch your mood from the smart contract anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Put Your Mood On-Chain?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of decentralized emotion tracking. Your feelings, secured by blockchain technology.
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl">
            Launch dApp Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 MoodChain. Built with ❤️ on Ethereum.</p>
        </div>
      </footer>
    </>
  );
}

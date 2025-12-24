'use client'
import { useState } from 'react';
import { createWalletClient, custom, getContract } from 'viem';
import { sepolia } from 'viem/chains';

export default function MoodDapp() {
  const [mood, setMood] = useState("");
  const [currentMood, setCurrentMood] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const [showApp, setShowApp] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [status, setStatus] = useState("");

  // Replace with your contract values
  const MoodContractAddress = "0x8c307C75F2C58E32f704484eBBE41CA5f9b0c925"; // your contract address
  const MoodContractABI = [
    {
      "inputs": [],
      "name": "getMood",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "string", "name": "_mood", "type": "string" }],
      "name": "setMood",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  let walletClient: ReturnType<typeof createWalletClient> | undefined;
  let MoodContractInstance: ReturnType<typeof getContract> | undefined;

  async function connectWallet() {
    setIsConnecting(true);
    setStatus("");
    
    try {
      const ethereum = (window as unknown as { ethereum?: any }).ethereum;
      if (!ethereum) {
        setStatus("Please install MetaMask to continue!");
        setIsConnecting(false);
        return;
      }

      walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(ethereum),
      });

      const accounts = await walletClient.requestAddresses();
      setAddress(accounts[0]);
      setStatus("Wallet connected successfully! 🎉");
      
      MoodContractInstance = getContract({
        address: MoodContractAddress as `0x${string}`,
        abi: MoodContractABI,
        client: walletClient,
      });
    } catch (err) {
      setStatus("Failed to connect wallet. Please try again.");
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  }

  async function initContract() {
    if (!walletClient) {
      await connectWallet();
    }
    if (!MoodContractInstance) {
      const ethereum = (window as unknown as { ethereum?: any }).ethereum;
      walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(ethereum),
      });

      MoodContractInstance = getContract({
        address: MoodContractAddress as `0x${string}`,
        abi: MoodContractABI,
        client: walletClient,
      });
    }
    return MoodContractInstance;
  }

  async function handleGetMood() {
    if (!address) {
      setStatus("Please connect your wallet first!");
      return;
    }
    
    setIsGetting(true);
    setStatus("Fetching your mood...");
    
    try {
      const contract = await initContract();
      const moodValue = await contract.read.getMood();
      setCurrentMood(moodValue);
      setStatus("Mood retrieved successfully! 🎉");
    } catch (err) {
      setStatus("Error getting mood. Please try again.");
      console.error("Error getting mood:", err);
    } finally {
      setIsGetting(false);
    }
  }

  async function handleSetMood() {
    if (!address) {
      setStatus("Please connect your wallet first!");
      return;
    }
    
    if (!mood) {
      setStatus("Please enter a mood!");
      return;
    }
    
    setIsSetting(true);
    setStatus("Setting your mood on the blockchain...");
    
    try {
      const contract = await initContract();
      await contract.write.setMood([mood], {
        account: address as `0x${string}`,
      });
      setStatus("Mood set successfully! 🎉");
      setMood("");
    } catch (err) {
      setStatus("Error setting mood. Please try again.");
      console.error("Error setting mood:", err);
    } finally {
      setIsSetting(false);
    }
  }

  function launchApp() {
    setShowApp(true);
    setTimeout(() => {
      document.getElementById('app-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        {/* Floating orbs background */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Header */}
          <nav className="flex justify-between items-center mb-20 backdrop-blur-sm bg-white bg-opacity-10 rounded-2xl px-6 py-4">
            <div className="text-white text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">😊</span>
              MoodChain
            </div>
            {address ? (
              <div className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-mono text-sm backdrop-blur-sm">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Text */}
            <div className="text-center lg:text-left text-white">
              <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ✨ Powered by Ethereum
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Mood, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-300">
                  On The Blockchain
                </span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                The world's first decentralized mood tracker. Set your mood, store it forever on the blockchain, and retrieve it anytime. Because your feelings deserve immutability.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center lg:justify-start mb-8">
                <button 
                  onClick={launchApp}
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  Launch App
                </button>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all text-lg"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="backdrop-blur-sm bg-white bg-opacity-10 rounded-xl p-4">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-blue-100">Decentralized</div>
                </div>
                <div className="backdrop-blur-sm bg-white bg-opacity-10 rounded-xl p-4">
                  <div className="text-2xl font-bold">∞</div>
                  <div className="text-sm text-blue-100">Permanent</div>
                </div>
                <div className="backdrop-blur-sm bg-white bg-opacity-10 rounded-xl p-4">
                  <div className="text-2xl font-bold">🔒</div>
                  <div className="text-sm text-blue-100">Secure</div>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <svg 
                  viewBox="0 0 500 500" 
                  className="relative w-full h-auto drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Phone Frame */}
                  <rect x="100" y="50" width="300" height="400" rx="30" fill="#1e293b" stroke="#475569" strokeWidth="4"/>
                  <rect x="110" y="70" width="280" height="360" rx="20" fill="#0f172a"/>
                  
                  {/* Screen Content */}
                  <rect x="130" y="90" width="240" height="60" rx="10" fill="#8b5cf6"/>
                  <text x="250" y="130" fontSize="24" fill="white" textAnchor="middle" fontWeight="bold">MoodChain</text>
                  
                  {/* Mood Display */}
                  <circle cx="250" cy="230" r="60" fill="#fbbf24" opacity="0.3"/>
                  <text x="250" y="245" fontSize="60" textAnchor="middle">😊</text>
                  
                  {/* Buttons */}
                  <rect x="140" y="310" width="100" height="40" rx="8" fill="#3b82f6"/>
                  <text x="190" y="337" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">Get</text>
                  
                  <rect x="260" y="310" width="100" height="40" rx="8" fill="#10b981"/>
                  <text x="310" y="337" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">Set</text>
                  
                  {/* Floating emojis */}
                  <text x="60" y="150" fontSize="40" className="animate-bounce">✨</text>
                  <text x="420" y="200" fontSize="35" className="animate-bounce" style={{animationDelay: '0.5s'}}>💜</text>
                  <text x="80" y="350" fontSize="38" className="animate-bounce" style={{animationDelay: '1s'}}>🎉</text>
                  <text x="400" y="380" fontSize="42" className="animate-bounce" style={{animationDelay: '1.5s'}}>🚀</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Section - Only shows when Launch App is clicked */}
      {showApp && (
        <div id="app-section" className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                MoodChain App
              </h2>
              <p className="text-center text-gray-600 mb-12">
                {address ? "Connected! Now you can set or get your mood." : "Connect your wallet to get started"}
              </p>

              {/* App Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-800">This is my dApp!</h3>
                  {address && (
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Connected
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">Here we can set or get the mood:</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Input Mood:
                    </label>
                    <input
                      type="text"
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      placeholder="Enter your mood... (e.g., Happy, Excited, Calm)"
                      className="border-2 border-gray-200 px-4 py-3 rounded-xl w-full focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={handleGetMood}
                      disabled={isGetting || !address}
                      className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105"
                    >
                      {isGetting ? 'Getting...' : 'Get Mood'}
                    </button>
                    <button 
                      onClick={handleSetMood}
                      disabled={isSetting || !address}
                      className="flex-1 bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105"
                    >
                      {isSetting ? 'Setting...' : 'Set Mood'}
                    </button>
                  </div>
                  
                  {status && (
                    <div className={`p-4 rounded-xl text-center font-semibold ${
                      status.includes('Success') || status.includes('connected') || status.includes('retrieved')
                        ? 'bg-green-100 text-green-800' 
                        : status.includes('Error') || status.includes('Failed')
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {status}
                    </div>
                  )}
                  
                  {currentMood && (
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl p-6 text-center">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Current Mood on Blockchain</div>
                      <div className="text-3xl font-bold text-purple-700 flex items-center justify-center gap-2">
                        {currentMood} ✨
                      </div>
                    </div>
                  )}

                  {!address && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
                      <p className="text-yellow-800 font-semibold">
                        👆 Please connect your wallet in the header to use the app
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Why MoodChain?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of emotion tracking with blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Immutable</h3>
              <p className="text-gray-600">Your mood is stored forever on the blockchain. No one can delete or modify it.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Instant</h3>
              <p className="text-gray-600">Set and retrieve your mood with just a click. Lightning-fast blockchain transactions.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-cyan-50 to-purple-50">
              <div className="text-6xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Decentralized</h3>
              <p className="text-gray-600">No central authority. Your mood, your control. Built on Ethereum smart contracts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0 text-xl">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Connect Your Wallet</h3>
                <p className="text-gray-600">Connect your MetaMask or any Web3 wallet to get started with MoodChain.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0 text-xl">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Set Your Mood</h3>
                <p className="text-gray-600">Type in how you're feeling and click "Set Mood" to store it permanently on the blockchain.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0 text-xl">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Retrieve Anytime</h3>
                <p className="text-gray-600">Click "Get Mood" to fetch your mood from the smart contract anytime, anywhere in the world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Put Your Mood On-Chain?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of decentralized emotion tracking. Your feelings, secured by blockchain technology.
          </p>
          <button 
            onClick={launchApp}
            className="bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            Launch dApp Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">😊</span>
                MoodChain
              </h3>
              <p className="text-gray-400">
                Decentralized mood tracking on the Ethereum blockchain.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={launchApp} className="hover:text-purple-400 transition-colors">Launch App</button></li>
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">Features</button></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Network</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sepolia Testnet</li>
                <li>Smart Contract</li>
                <li>EVM Compatible</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 MoodChain. Built with ❤️ on Ethereum.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
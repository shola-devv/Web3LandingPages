'use client'
import { useState } from 'react';
import { createWalletClient, custom, parseEther } from 'viem';
import { sepolia } from 'viem/chains';
import Image from 'next/image' 

export default function EmmanuelCoinLanding() {
  const [walletAddress, setWalletAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    setStatus('');
    
    try {
      const ethereum = window.ethereum;
      if (!ethereum) {
        setStatus('Please install MetaMask to continue!');
        setIsConnecting(false);
        return;
      }

      const accounts = await ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setWalletAddress(accounts[0]);
      setStatus('Wallet connected successfully! 🎉');
    } catch (error) {
      setStatus('Failed to connect wallet. Please try again.');
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  const buyCoin = async () => {
    if (!walletAddress) {
      setStatus('Please connect your wallet first!');
      return;
    }
    
    if (!recipientAddress || !amount) {
      setStatus('Please enter a recipient address and amount!');
      return;
    }

    setIsBuying(true);
    setStatus('Processing transaction...');

    try {
      const ethereum = window.ethereum;
      if (!ethereum) {
        setStatus('Please install MetaMask to continue!');
        setIsBuying(false);
        return;
      }

      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(ethereum)
      });

      const hash = await walletClient.sendTransaction({
        account: walletAddress as `0x${string}`,
        to: recipientAddress as `0x${string}`,
        value: parseEther(amount)
      });

      setStatus(`Success! Transaction hash: ${hash.slice(0, 10)}...${hash.slice(-8)} 🎉`);
      setAmount('');
    } catch (error) {
      setStatus('Transaction failed. Please try again.');
      console.error(error);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <>
      {/* Header */}
      <nav className="bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold flex items-center gap-2">
             <Image
        src="/face1.png"
        alt="Company Logo"
        width={120}
        height={40}
        priority
      />
              Emmanuel Coin
            </div>
            <div className="flex items-center gap-4">
              {walletAddress ? (
                <div className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-mono text-sm">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-12">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-white">
                  Emmanuel Coin
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-orange-100">
                The revolutionary cryptocurrency launched on Sepolia Testnet. Get your Emmanuel Coins today and join the future of decentralized currency!
              </p>
              
              <div className="bg-yellow-400 text-orange-900 px-6 py-3 rounded-lg inline-block font-semibold mb-8">
                🚀 Live on Sepolia Testnet
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <svg 
                  viewBox="0 0 400 400" 
                  className="relative w-full h-auto drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Coin Circle */}
                  <circle cx="200" cy="200" r="180" fill="#FFD700" stroke="#FFA500" strokeWidth="8"/>
                  <circle cx="200" cy="200" r="160" fill="#FFC700" stroke="#FF8C00" strokeWidth="4"/>
                  
                  {/* Shine effect */}
                  <ellipse cx="150" cy="150" rx="60" ry="80" fill="white" opacity="0.3"/>
                  
                  {/* Letter E */}
                  <text 
                    x="200" 
                    y="230" 
                    fontSize="160" 
                    fontWeight="bold" 
                    fill="#FF8C00" 
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                  >
                    E
                  </text>
                  
                  {/* Decorative stars */}
                  <text x="80" y="100" fontSize="30" fill="white">✨</text>
                  <text x="300" y="120" fontSize="25" fill="white">✨</text>
                  <text x="90" y="320" fontSize="28" fill="white">✨</text>
                  <text x="310" y="290" fontSize="32" fill="white">✨</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Buy Coin Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto">
            <h2 className="text-gray-800 text-3xl font-bold mb-6 text-center">
              Buy Emmanuel Coin
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Wallet Address:
                </label>
                <input
                  type="text"
                  value={walletAddress || 'Not connected'}
                  readOnly
                  className="border px-3 py-2 rounded w-full bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Recipient Address:
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Amount (ETH):
                </label>
                <input
                  type="text"
                  placeholder="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
            </div>

            <button 
              onClick={buyCoin}
              disabled={isBuying || !walletAddress}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBuying ? 'Processing...' : '💰 Buy Emmanuel Coin Now'}
            </button>

            {status && (
              <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
                status.includes('Success') || status.includes('connected') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {status}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How to Find Your Coins */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Can't See Your Emmanuel Coins?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Follow these simple steps to add Emmanuel Coin to your MetaMask wallet
          </p>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
              <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Open MetaMask</h3>
                <p className="text-gray-600">Click on the MetaMask extension in your browser and make sure you're on the Sepolia Test Network.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
              <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Navigate to Tokens</h3>
                <p className="text-gray-600">In MetaMask, scroll down to the "Tokens" section and click on "Import tokens" at the bottom.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
              <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Enter Token Contract Address</h3>
                <p className="text-gray-600 mb-3">Click on "Custom token" and paste the Emmanuel Coin contract address:</p>
                <div className="bg-white border-2 border-orange-300 p-3 rounded font-mono text-sm break-all">
                  0xYourContractAddressHere
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
              <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Add the Token</h3>
                <p className="text-gray-600">MetaMask will automatically fill in the token symbol and decimals. Click "Add Custom Token" and then "Import Tokens".</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
              <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">5</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">View Your Coins! 🎉</h3>
                <p className="text-gray-600">Your Emmanuel Coins should now appear in your wallet! If you still don't see them, make sure you're on the Sepolia network.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Emmanuel Coin?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Fast Transactions</h3>
              <p className="text-gray-600">Lightning-fast transfers on the Sepolia network with minimal gas fees.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Secure & Tested</h3>
              <p className="text-gray-600">Built on Ethereum's robust blockchain technology and thoroughly tested.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Community Driven</h3>
              <p className="text-gray-600">Join a growing community of Emmanuel Coin holders and enthusiasts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Your Emmanuel Coins?
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Join the revolution today. Connect your wallet and start your Emmanuel Coin journey on Sepolia Testnet!
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-orange-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl"
          >
            Buy Emmanuel Coin Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <Image
        src="/face1.png"
        alt="Company Logo"
        width={120}
        height={40}
        priority
        className= "rounded-full"
      />
                Emmanuel Coin
              </h3>
              <p className="text-gray-400">
                The future of decentralized currency on Sepolia Testnet.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Buy Coins</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">How to Find Coins</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Network Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Network: Sepolia Testnet</li>
                <li>Chain ID: 11155111</li>
                <li>Token Standard: ERC-20</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Emmanuel Coin. Built with 💛 on Sepolia Testnet.</p>
            <p className="text-sm mt-2">⚠️ This is a testnet token. Use only Sepolia test ETH.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
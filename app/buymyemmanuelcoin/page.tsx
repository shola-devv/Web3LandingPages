'use client'
import { useState } from 'react';
import { createWalletClient, custom, parseEther } from 'viem';
import { sepolia } from 'viem/chains';


export default function EmmanuelCoinLanding() {
  const [walletAddress, setWalletAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        setStatus('Please install MetaMask to continue');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Switch to Sepolia network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chainId
        });
      } catch (switchError) {
        // Network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia',
              nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            }],
          });
        }
      }

      setWalletAddress(accounts[0]);
      setIsConnected(true);
      setStatus('Wallet connected successfully! 🎉');
    } catch (error) {
      setStatus('Failed to connect wallet: ' + error.message);
    }
  };

  const buyCoin = async () => {
    if (!recipientAddress || !amount) {
      setStatus('Please enter both address and amount');
      return;
    }

    try {
      setStatus('Processing transaction...');
      
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      });

      const hash = await walletClient.sendTransaction({
        account: walletAddress,
        to: recipientAddress,
        value: parseEther(amount),
      });

      setStatus(`Transaction sent! Hash: ${hash.slice(0, 10)}...`);
    } catch (error) {
      setStatus('Transaction failed: ' + error.message);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">💰</span>
            <span className="text-2xl font-bold">EMMANUEL COIN</span>
          </div>
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
            >
              Connect MetaMask
            </button>
          ) : (
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg font-mono text-sm">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-500">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white max-w-4xl mx-auto mb-16">
            <h1 className="text-7xl font-bold mb-6 leading-tight">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">
                EMMANUEL COIN
              </span>
            </h1>
            <p className="text-2xl mb-8 text-orange-50">
              The hottest new cryptocurrency on Sepolia Testnet! 🚀
            </p>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-12">
              Get your Emmanuel Coins today and join the revolution. Built on Ethereum's Sepolia testnet for testing and development purposes.
            </p>
          </div>

          {/* Buy Coin Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl mx-auto mb-12">
            <h2 className="text-gray-800 text-3xl font-bold mb-6 text-center">
              🪙 Buy Emmanuel Coin
            </h2>

            {status && (
              <div className={`mb-6 p-4 rounded-lg ${
                status.includes('success') || status.includes('sent') 
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : status.includes('Failed') || status.includes('failed')
                  ? 'bg-red-50 border border-red-200 text-red-700'
                  : 'bg-blue-50 border border-blue-200 text-blue-700'
              }`}>
                {status}
              </div>
            )}

            {!isConnected ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6 text-lg">
                  Connect your MetaMask wallet to start buying Emmanuel Coins
                </p>
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Your Crypto Address:
                  </label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="0x..."
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Amount (ETH):
                  </label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.01"
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>

                <button
                  onClick={buyCoin}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg"
                >
                  Buy Emmanuel Coin 💰
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-sm font-semibold">Total Supply</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="text-4xl font-bold mb-2">⚡</div>
              <div className="text-sm font-semibold">Fast Transactions</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="text-4xl font-bold mb-2">🔒</div>
              <div className="text-sm font-semibold">Secure Blockchain</div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Find Your Coins */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Can't See Your Coins? 🔍
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Don't worry! Your Emmanuel Coins are safe on the blockchain. Follow these steps to make them visible in your wallet.
          </p>

          <div className="max-w-4xl mx-auto">
            {/* MetaMask Guide */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">🦊</span> MetaMask Instructions
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Open MetaMask</h4>
                    <p className="text-gray-700">Open your MetaMask browser extension or mobile app and make sure you're on the <strong>Sepolia Test Network</strong>.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Go to Tokens Tab</h4>
                    <p className="text-gray-700">In MetaMask, click on the "Tokens" tab (not "NFTs"). Scroll down and click <strong>"Import tokens"</strong>.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Enter Token Contract Address</h4>
                    <p className="text-gray-700 mb-3">Paste your Emmanuel Coin contract address in the "Token contract address" field. The token symbol and decimals should auto-fill.</p>
                    <div className="bg-white p-3 rounded-lg border-2 border-orange-200">
                      <p className="text-xs text-gray-500 mb-1">Contract Address:</p>
                      <code className="text-sm font-mono text-orange-600 break-all">0x1234...abcd</code>
                      <p className="text-xs text-gray-500 mt-2">(Replace with your actual contract address)</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Add Token</h4>
                    <p className="text-gray-700">Click <strong>"Add custom token"</strong> and then <strong>"Import tokens"</strong>. Your Emmanuel Coins should now be visible!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Wallet Guide */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">🔷</span> Trust Wallet Instructions
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Open Trust Wallet</h4>
                    <p className="text-gray-700">Launch Trust Wallet and tap the filter/settings icon in the top right corner.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Add Custom Token</h4>
                    <p className="text-gray-700">Scroll down and tap <strong>"Add Custom Token"</strong>. Switch the network to <strong>Sepolia</strong>.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Enter Contract Details</h4>
                    <p className="text-gray-700">Paste your Emmanuel Coin contract address. Fill in Name, Symbol, and Decimals if needed.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Save and View</h4>
                    <p className="text-gray-700">Tap <strong>"Done"</strong>. Your Emmanuel Coins will appear in your wallet!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">💡</span> Pro Tips
              </h3>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong className="text-gray-800">Verify on Etherscan:</strong>
                    <p className="text-gray-700">Visit <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">sepolia.etherscan.io</a> and paste your wallet address to see all your token transactions.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong className="text-gray-800">Double Check Network:</strong>
                    <p className="text-gray-700">Emmanuel Coin is on Sepolia testnet. Make sure your wallet is connected to Sepolia, not Ethereum mainnet.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong className="text-gray-800">Save Contract Address:</strong>
                    <p className="text-gray-700">Keep your Emmanuel Coin contract address handy. You'll need it to import the token into any new wallets.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Why Emmanuel Coin */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Emmanuel Coin?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Future-Ready</h3>
              <p className="text-gray-600">Built on Ethereum's cutting-edge Sepolia testnet infrastructure.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600">Experience rapid transactions with low fees on the testnet.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Test & Learn</h3>
              <p className="text-gray-600">Perfect for testing dApps and learning blockchain development.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Get Emmanuel Coin? 💰
          </h2>
          <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
            Join the Emmanuel Coin revolution today. Connect your wallet and start buying!
          </p>
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-white text-orange-600 px-12 py-4 rounded-lg font-bold text-xl hover:bg-opacity-90 transition-all shadow-xl"
            >
              Connect MetaMask Now
            </button>
          ) : (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-orange-600 px-12 py-4 rounded-lg font-bold text-xl hover:bg-opacity-90 transition-all shadow-xl"
            >
              Buy Coins Now
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span> Emmanuel Coin
              </h4>
              <p className="text-gray-400">The future of testnet cryptocurrencies, built on Sepolia.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://sepolia.etherscan.io" className="hover:text-orange-400 transition-colors">Sepolia Explorer</a></li>
                <li><a href="https://metamask.io" className="hover:text-orange-400 transition-colors">Get MetaMask</a></li>
                <li><a href="https://ethereum.org" className="hover:text-orange-400 transition-colors">Learn About Ethereum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Network</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Network: Sepolia Testnet</li>
                <li>Chain ID: 11155111</li>
                <li>Currency: ETH</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Emmanuel Coin. Built with ❤️ on Ethereum Sepolia Testnet.</p>
            <p className="mt-2 text-sm">⚠️ For testing purposes only. Not real cryptocurrency.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
import Image from 'next/image'

export default function BuyTokens() {
  return (
    <section id="buy-tokens" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 gradient-text">How to Get Involved</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-gray-300">Stake Tokens to Feature Your Market - Tokens are used to stake on the platform's featured slots, increasing the visibility of markets.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-gray-300">Staking Rewards and Yield Generation - Tokens staked on markets generate rewards for liquidity providers (LPs).</span>
              </li>
            </ul>
            <button className="mt-8 gradient-bg text-white py-3 px-8 rounded-lg transition-colors duration-300 font-mono text-sm">
              Buy Tokens Now
            </button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Token Usage Illustration"
              width={400}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


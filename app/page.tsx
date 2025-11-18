'use client'
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-3 sm:gap-4">
          <p className="text-sm sm:text-base md:text-lg text-center px-2">
            PROJECTS DEPLOYED ON BLOCKCHAIN ARE STARED *, They might require testnet or mainnet transactions
          </p>
          <Link 
            href="/LangBlockchainAgent" 
            className="underline hover:text-blue-500 cursor-pointer text-center px-2 text-sm sm:text-base"
          >
            LANG BLOCKCHAIN AGENT
          </Link>
          <Link 
            href="/buymyemmanuelcoin" 
            className="underline hover:text-blue-500 cursor-pointer text-center px-2 text-sm sm:text-base"
          >
            Buy Emmanuel token*
          </Link>
          <Link 
            href="/cooldappwithviem" 
            className="underline hover:text-blue-500 cursor-pointer text-center px-2 text-sm sm:text-base"
          >
            MoodChain*
          </Link>
        </div>
      </div>
    </div>
  );
}
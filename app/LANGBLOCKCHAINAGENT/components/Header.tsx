'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold font-mono text-purple-400 flex items-center hover:glow-text">
              <Sparkles className="mr-2" />
              <p>LangAgent</p>
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-2 sm:space-x-4">
              <li><Link href="#features" className="text-gray-300 hover:text-purple-400 font-mono text-xs sm:text-sm hover:glow-text">Features</Link></li>
              <li><Link href="#roadmap" className="text-gray-300 hover:text-purple-400 font-mono text-xs sm:text-sm hover:glow-text">Roadmap</Link></li>
              <li><Link href="#buy-tokens" className="text-gray-300 hover:text-purple-400 font-mono text-xs sm:text-sm hover:glow-text">Buy Tokens</Link></li>
              <li><a href="/whitepaper.pdf" className="gradient-bg text-white py-1 px-2 sm:px-3 rounded-lg transition-all duration-300 font-mono text-xs sm:text-sm hover:glow-button">Whitepaper</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}


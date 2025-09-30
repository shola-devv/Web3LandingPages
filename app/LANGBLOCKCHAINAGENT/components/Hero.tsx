'use client'

import { Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
const CodeHologram = dynamic(() => import('./CodeHologram'), { ssr: false })

export default function Hero() {
  return (
    <section className="pt-16 md:pt-24 lg:pt-32 pb-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 animate-slide-in-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-mono gradient-text glow-text">Welcome to the Future of Prediction Markets</h1>
            <p className="text-lg sm:text-xl mb-8 font-mono text-gray-300">Create markets, stake tokens, and earn rewards with our AI-powered platform.</p>
            <a href="#features" className="gradient-bg text-white py-2 px-6 rounded-lg shadow-md focus:outline-none transition-all duration-300 font-mono text-sm hover:glow-button">
              <Sparkles className="inline-block mr-2" />
              Get Started
            </a>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-96">
            <CodeHologram />
          </div>
        </div>
      </div>
    </section>
  )
}


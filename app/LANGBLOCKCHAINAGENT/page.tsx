import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Roadmap from './components/Roadmap'
import BuyTokens from './components/BuyTokens'
import CoreInnovations from './components/CoreInnovations'
import AIMarketCreation from './components/AIMarketCreation'
import Partners from './components/Partners'
import SupportedNetworks from './components/SupportedNetworks'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono">
      <Header />
      <main>
        <Hero />
        <Features />
        <Roadmap />
        <BuyTokens />
        <CoreInnovations />
        <AIMarketCreation />
        <Partners />
        <SupportedNetworks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


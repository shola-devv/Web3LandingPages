import Image from 'next/image'

const networks = [
  { name: 'Ethereum', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Polygon', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Binance Smart Chain', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Avalanche', logo: '/placeholder.svg?height=50&width=50' },
]

export default function SupportedNetworks() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Supported Networks</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {networks.map((network, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={network.logo}
                alt={network.name}
                width={50}
                height={50}
                className="mb-2"
              />
              <span className="text-sm text-gray-300">{network.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


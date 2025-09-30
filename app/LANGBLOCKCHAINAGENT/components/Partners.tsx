import Image from 'next/image'

const partners = [
  { name: 'Partner 1', logo: '/placeholder.svg?height=100&width=100' },
  { name: 'Partner 2', logo: '/placeholder.svg?height=100&width=100' },
  { name: 'Partner 3', logo: '/placeholder.svg?height=100&width=100' },
  { name: 'Partner 4', logo: '/placeholder.svg?height=100&width=100' },
]

export default function Partners() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={100}
                className="rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


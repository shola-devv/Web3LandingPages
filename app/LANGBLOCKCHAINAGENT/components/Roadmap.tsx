const roadmapPhases = [
  {
    title: 'Phase 1: Basic App Launch',
    description: 'Basic version of the platform with a single market and staking functionality.',
  },
  {
    title: 'Phase 2: User-Generated Markets',
    description: 'Enable users to create their own markets with AI assistance.',
  },
  {
    title: 'Phase 3: Pro Version',
    description: 'Integration of LP rewards and staking for yield generation via Aave.',
  },
  {
    title: 'Phase 4: Pro Max',
    description: 'Additional yield generation and expansion of LP rewards.',
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Our Roadmap</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500"></div>
          {roadmapPhases.map((phase, index) => (
            <div key={index} className={`relative mb-8 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}`}>
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full"></div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-2 text-white">{phase.title}</h3>
                <p className="text-gray-300">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


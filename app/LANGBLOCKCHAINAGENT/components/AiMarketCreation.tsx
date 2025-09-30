import Image from 'next/image'

export default function AIMarketCreation() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 gradient-text">AI-Powered Market Creation & Resolution</h2>
            <p className="mb-4 text-gray-300">
              Our AI agent not only helps users create their markets by suggesting outcomes and verifying clarity, but it also resolves markets by scraping reliable sources and validating outcomes.
            </p>
            <p className="text-gray-300">
              Experience the power of AI in streamlining the entire process from market creation to resolution, ensuring accuracy and efficiency at every step.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="AI Market Creation Demo"
              width={500}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


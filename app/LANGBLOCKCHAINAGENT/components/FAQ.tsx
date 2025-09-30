'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'What is DIVAFlex?',
    answer: 'DIVAFlex is an AI-powered prediction market platform that allows users to create markets, stake tokens, and earn rewards.'
  },
  {
    question: 'How do I get started?',
    answer: 'To get started, you need to connect your wallet, acquire some DIVAFlex tokens, and then you can start creating or participating in prediction markets.'
  },
  {
    question: 'What are the benefits of staking?',
    answer: 'Staking tokens on DIVAFlex allows you to earn rewards, participate in governance, and increase the visibility of your created markets.'
  },
  {
    question: 'How does the AI oracle work?',
    answer: 'Our AI oracle uses advanced algorithms to scrape reliable sources and validate outcomes, ensuring fair and accurate market resolutions.'
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded-lg">
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-200">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-blue-400" /> : <ChevronDown className="text-blue-400" />}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


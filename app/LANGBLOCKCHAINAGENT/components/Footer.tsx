import Link from 'next/link'
import { Twitter, MessageCircle, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-purple-400 transition-colors duration-200">Home</Link></li>
              <li><Link href="#features" className="hover:text-purple-400 transition-colors duration-200">Features</Link></li>
              <li><Link href="#roadmap" className="hover:text-purple-400 transition-colors duration-200">Roadmap</Link></li>
              <li><a href="/whitepaper.pdf" className="hover:text-purple-400 transition-colors duration-200">Whitepaper</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-purple-400 transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Community</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-purple-400 transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors duration-200">
                <MessageCircle size={24} />
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors duration-200">
                <Github size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Newsletter</h3>
            <p className="mb-4">Stay updated with our latest news and features.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none mb-2 sm:mb-0 w-full sm:w-auto"
              />
              <button
                type="submit"
                className="gradient-bg text-white px-4 py-2 rounded-r-lg transition-all duration-300 hover:glow-button w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} DIVAFlex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


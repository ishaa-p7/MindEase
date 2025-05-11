import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#FF8E7E] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF8E7E] flex items-center justify-center">
                <span className="text-white font-bold text-xl">MW</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-white">MindWell</span>
            </div>
            <p className="mt-4 text-white">
              MindWell is dedicated to improving mental health through innovative digital tools and resources.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-white hover:text-[#FF8E7E]">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF8E7E]">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF8E7E]">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF8E7E]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#mood-tracker" className="text-white hover:text-[#FF8E7E]">
                  Mood Tracker
                </a>
              </li>
              <li>
                <a href="#chatbot" className="text-white hover:text-[#FF8E7E]">
                  AI Chatbot
                </a>
              </li>
              <li>
                <a href="#quiz" className="text-white hover:text-[#FF8E7E]">
                  Quiz
                </a>
              </li>
              <li>
                <a href="#support" className="text-white hover:text-[#FF8E7E]">
                  Help Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Fun</h3>
            <ul className="space-y-2">
              <li>
                <a href="#memes" className="text-white hover:text-[#FF8E7E]">
                  Meme Generator
                </a>
              </li>
              <li>
                <a href="#relax" className="text-white hover:text-[#FF8E7E]">
                  Relax
                </a>
              </li>
              <li>
                <a href="#groups" className="text-white hover:text-[#FF8E7E]">
                  Groups
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <address className="not-italic text-white">
              <p>123 Wellness Street</p>
              <p>Mindful City, MC 12345</p>
              <p className="mt-3">
                Email:{" "}
                <a href="mailto:info@mindwell.com" className="hover:text-[#FF8E7E]">
                  info@mindwell.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-[#FF8E7E]">
                  (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MindWell. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white hover:text-[#FF8E7E] text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-[#FF8E7E] text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-[#FF8E7E] text-sm">
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#FF8E7E] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center">
              
              <span className="ml-2 text-xl font-semibold text-white">MindEase</span>
            </div>
            <p className="mt-4 text-white">
              MindEase is dedicated to improving mental health through innovative digital tools and resources.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-white  hover:underline">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white  hover:underline">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white  hover:underline">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white  hover:underline">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mood-tracker" className="text-white  hover:underline">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-white  hover:underline">
                  AI Chatbot
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-white  hover:underline">
                  Quiz
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white  hover:underline">
                  Help Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Fun</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/meme-generator" className="text-white  hover:underline">
                  Meme Generator
                </Link>
              </li>
              <li>
                <Link to="/relax" className="text-white  hover:underline">
                  Relax
                </Link>
              </li>
              <li>
                <Link to="/groups" className="text-white  hover:underline">
                  Groups
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <address className="not-italic text-white">
              <p className="mt-3">
                Email:{" "}
                <a href="mailto:isha3603@gmail.com" className=" hover:underline">
                  isha3603@gmail.com
                  </a>

              </p>
              <p>
                Phone:{" "}
                <a href="tel:+1234567890" >
                  (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MindEase. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white  hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-white  hover:underline">
                Terms of Service
              </a>
              <Link to="/about" className="text-white  hover:underline">
                About Us
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

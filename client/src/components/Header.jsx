"use client"

import { useState,useEffect } from "react"
import { User, Menu, X } from "lucide-react"
import {Link} from 'react-router-dom';
import Logo from "./Logo"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
const [email, setEmail] = useState("");

  useEffect(() => {
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email) {
        setEmail(parsedUser.email);
      }
    }
  };

  loadUser(); // initial load

  window.addEventListener("user-login", loadUser);
  return () => window.removeEventListener("user-login", loadUser);
}, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to='/'>
        <Logo />
</Link>
        {/* Mobile menu button */}
        <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="text-gray-700 hover:text-[#FF8E7E] transition-colors">
            About Us
          </Link>
          <Link to="/mood-tracker" className="text-gray-700 hover:text-[#FF8E7E] transition-colors">
            Mood Tracker
          </Link>
          <Link to="/chatbot" className="text-gray-700 hover:text-[#FF8E7E] transition-colors">
            AI Chatbot
          </Link>
          <Link to="/quiz" className="text-gray-700 hover:text-[#FF8E7E] transition-colors">
            Quiz
          </Link>
          <Link to="/help" className="text-gray-700 hover:text-[#FF8E7E] transition-colors">
            Help Support
          </Link>

          {/* Fun dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-[#FF8E7E] transition-colors">Fun</button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link to="/meme-generator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFF5F1]">
                Meme Generator
              </Link>
              <Link to="/relax" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFF5F1]">
                Relax
              </Link>
              <Link to="/groups" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFF5F1]">
                Groups
              </Link>
            </div>
          </div>

{email ? (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FF8E7E] text-white flex items-center justify-center">
            {email.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm">{email}</span>
           <button
      onClick={() => {
        localStorage.removeItem("user");
        window.location.reload(); // reload to update UI or use navigate('/')
      }}
       className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-2 rounded-full transition-colors"
    >
      Logout
    </button>
        </div>
      ) : (
        <Link to="/sign-in">
             <button
                onClick={() => {}}
                className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-2 rounded-full transition-colors"
              >
              Sign In
              </button>
        </Link>
      )}

        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden z-50">
            <div className="flex flex-col p-4 space-y-3">
              <a href="#" className="text-gray-700 hover:text-[#FF8E7E] py-2">
                Home
              </a>
              <a href="#mood-tracker" className="text-gray-700 hover:text-[#FF8E7E] py-2">
                Mood Tracker
              </a>
              <a href="#chatbot" className="text-gray-700 hover:text-[#FF8E7E] py-2">
                AI Chatbot
              </a>
              <a href="#quiz" className="text-gray-700 hover:text-[#FF8E7E] py-2">
                Quiz
              </a>
              <a href="#support" className="text-gray-700 hover:text-[#FF8E7E] py-2">
                Help Support
              </a>

              <div className="py-2">
                <p className="text-gray-700 font-medium mb-2">Fun</p>
                <div className="pl-4 space-y-2">
                  <a href="#memes" className="block text-gray-700 hover:text-[#FF8E7E]">
                    Meme Generator
                  </a>
                  <a href="#relax" className="block text-gray-700 hover:text-[#FF8E7E]">
                    Relax
                  </a>
                  <a href="#groups" className="block text-gray-700 hover:text-[#FF8E7E]">
                    Groups
                  </a>
                </div>
              </div>

              <button
                onClick={() => {}}
                className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-2 rounded-full transition-colors"
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

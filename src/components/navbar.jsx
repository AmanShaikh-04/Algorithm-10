"use client";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="text-gray-100 body-font bg-black border-b border-gray-800">
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
        <a className="flex title-font font-medium items-center text-white cursor-pointer">
          <img src="../assets/algo_letter.jpg" alt="Algorithm X Logo" className="w-10 h-10 text-white p-2 rounded-full" />
          <span className="ml-3 text-white text-xl font-bold">Algorithm <span className="text-orange-500">X</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 text-gray-300 hover:text-orange-500 cursor-pointer transition-colors duration-300">Home</a>
          <a className="mr-5 text-gray-300 hover:text-orange-500 cursor-pointer transition-colors duration-300">About</a>
          <a className="mr-5 text-gray-300 hover:text-orange-500 cursor-pointer transition-colors duration-300">Timeline</a>
          <a className="mr-5 text-gray-300 hover:text-orange-500 cursor-pointer transition-colors duration-300">FAQ</a>
        </nav>

        <button className="hidden md:inline-flex items-center bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
          Register
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>

        {/* Hamburger Menu Button */}
        <button 
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-orange-500 hover:bg-gray-900 focus:outline-none transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 cursor-pointer transition-colors duration-300">
              Home
            </a>
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 cursor-pointer transition-colors duration-300">
              About
            </a>
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 cursor-pointer transition-colors duration-300">
              Timeline
            </a>
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800 cursor-pointer transition-colors duration-300">
              FAQ
            </a>
            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-orange-500 hover:bg-orange-600 text-white inline-flex items-center transition-colors duration-300">
              Register
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
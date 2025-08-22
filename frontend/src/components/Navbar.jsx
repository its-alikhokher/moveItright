import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <SafeIcon icon={FiIcons.FiTruck} className="text-white h-8 w-8" />
              <span className="text-white font-bold text-xl ml-2">MoveItRight</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/services" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Services</Link>
            <Link to="/estimate" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Get Estimate</Link>
            <Link to="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
            <Link to="/contact" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            <Link to="/login" className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium ml-2">Login</Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-blue-700 p-2 rounded-md"
            >
              <SafeIcon icon={isMenuOpen ? FiIcons.FiX : FiIcons.FiMenu} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600">
            <Link to="/" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/services" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link to="/estimate" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Get Estimate</Link>
            <Link to="/about" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
            <Link to="/contact" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/login" className="bg-white text-blue-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium mt-2">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
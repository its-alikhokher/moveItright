import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <SafeIcon icon={FiIcons.FiTruck} className="h-8 w-8" />
              <span className="text-xl font-bold ml-2">MoveItRight</span>
            </div>
            <p className="text-gray-300 mb-4">Professional moving services for homes and businesses. We make your move stress-free.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <SafeIcon icon={FiIcons.FiFacebook} className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <SafeIcon icon={FiIcons.FiTwitter} className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <SafeIcon icon={FiIcons.FiInstagram} className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
              <li><Link to="/estimate" className="text-gray-300 hover:text-white">Get Estimate</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/residential" className="text-gray-300 hover:text-white">Residential Moving</Link></li>
              <li><Link to="/services/commercial" className="text-gray-300 hover:text-white">Commercial Moving</Link></li>
              <li><Link to="/services/packing" className="text-gray-300 hover:text-white">Packing Services</Link></li>
              <li><Link to="/services/storage" className="text-gray-300 hover:text-white">Storage Solutions</Link></li>
              <li><Link to="/services/specialty" className="text-gray-300 hover:text-white">Specialty Items</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <SafeIcon icon={FiIcons.FiMapPin} className="h-5 w-5 mr-2 mt-1" />
                <span>123 Moving Avenue, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <SafeIcon icon={FiIcons.FiPhone} className="h-5 w-5 mr-2" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <SafeIcon icon={FiIcons.FiMail} className="h-5 w-5 mr-2" />
                <span>info@moveitright.com</span>
              </li>
              <li className="flex items-center">
                <SafeIcon icon={FiIcons.FiClock} className="h-5 w-5 mr-2" />
                <span>Mon-Fri: 8AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© {new Date().getFullYear()} MoveItRight. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white mr-4">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { motion } from 'framer-motion';
import EstimateForm from '../components/EstimateForm';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const EstimatePage = () => {
  const benefits = [
    {
      icon: FiIcons.FiClock,
      title: 'Quick Response',
      description: 'Get your detailed quote within 24 hours of submitting your request.'
    },
    {
      icon: FiIcons.FiDollarSign,
      title: 'No Obligation',
      description: 'Our estimates are completely free with no commitment required.'
    },
    {
      icon: FiIcons.FiShield,
      title: 'Accurate Pricing',
      description: 'Transparent pricing with no hidden fees or surprise charges.'
    },
    {
      icon: FiIcons.FiPhone,
      title: 'Personal Consultation',
      description: 'Speak directly with our moving specialists to discuss your needs.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl font-extrabold sm:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get Your Free Moving Estimate
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take the first step toward your stress-free move. Fill out the form below for a detailed, no-obligation quote.
          </motion.p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <EstimateForm />
            
            {/* Benefits Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Request an Estimate with Us?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <SafeIcon icon={benefit.icon} className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-semibold">How It Works</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Submit Your Request</h4>
                      <p className="text-gray-600 mt-1">Fill out the estimate form with your moving details.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Get Your Quote</h4>
                      <p className="text-gray-600 mt-1">Receive a detailed estimate within 24 hours.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Consultation Call</h4>
                      <p className="text-gray-600 mt-1">Discuss your needs with our moving specialist.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Book Your Move</h4>
                      <p className="text-gray-600 mt-1">Confirm your date and finalize the details.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                  <p className="text-gray-600 mb-4">Have questions about our services or the estimate process?</p>
                  <div className="flex items-center">
                    <SafeIcon icon={FiIcons.FiPhone} className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">(555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;
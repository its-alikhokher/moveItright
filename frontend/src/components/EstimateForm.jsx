import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const EstimateForm = () => {
  const [formData, setFormData] = useState({
    moveType: '',
    moveSize: '',
    fromAddress: '',
    toAddress: '',
    moveDate: '',
    name: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log(formData);
    setSubmitted(true);
  };
  
  const resetForm = () => {
    setFormData({
      moveType: '',
      moveSize: '',
      fromAddress: '',
      toAddress: '',
      moveDate: '',
      name: '',
      email: '',
      phone: '',
      additionalInfo: ''
    });
    setCurrentStep(1);
    setSubmitted(false);
  };
  
  if (submitted) {
    return (
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <SafeIcon icon={FiIcons.FiCheck} className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Estimate Request Received!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for submitting your moving estimate request. One of our moving specialists will review your information and contact you within 24 hours with a detailed quote.
        </p>
        <button
          onClick={resetForm}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Request Another Estimate
        </button>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Get Your Free Moving Estimate</h2>
      
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm">Moving Details</span>
          <span className="text-sm">Locations</span>
          <span className="text-sm">Contact Info</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Move Type</label>
              <select
                name="moveType"
                value={formData.moveType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Move Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="specialty">Specialty Items</option>
                <option value="long-distance">Long Distance</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Size of Move</label>
              <select
                name="moveSize"
                value={formData.moveSize}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Size</option>
                <option value="studio">Studio</option>
                <option value="1bedroom">1 Bedroom</option>
                <option value="2bedroom">2 Bedroom</option>
                <option value="3bedroom">3 Bedroom</option>
                <option value="4+bedroom">4+ Bedroom</option>
                <option value="office-small">Small Office</option>
                <option value="office-medium">Medium Office</option>
                <option value="office-large">Large Office</option>
              </select>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.moveType || !formData.moveSize}
                className={`px-6 py-2 rounded-md ${
                  !formData.moveType || !formData.moveSize
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors duration-300`}
              >
                Next
                <SafeIcon icon={FiIcons.FiArrowRight} className="ml-2 inline" />
              </button>
            </div>
          </motion.div>
        )}
        
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">From Address</label>
              <input
                type="text"
                name="fromAddress"
                value={formData.fromAddress}
                onChange={handleChange}
                placeholder="Street address, city, state, zip"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">To Address</label>
              <input
                type="text"
                name="toAddress"
                value={formData.toAddress}
                onChange={handleChange}
                placeholder="Street address, city, state, zip"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Moving Date</label>
              <input
                type="date"
                name="moveDate"
                value={formData.moveDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                <SafeIcon icon={FiIcons.FiArrowLeft} className="mr-2 inline" />
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.fromAddress || !formData.toAddress || !formData.moveDate}
                className={`px-6 py-2 rounded-md ${
                  !formData.fromAddress || !formData.toAddress || !formData.moveDate
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors duration-300`}
              >
                Next
                <SafeIcon icon={FiIcons.FiArrowRight} className="ml-2 inline" />
              </button>
            </div>
          </motion.div>
        )}
        
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Additional Information (Optional)</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any special items, service requests, or concerns?"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                <SafeIcon icon={FiIcons.FiArrowLeft} className="mr-2 inline" />
                Back
              </button>
              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.phone}
                className={`px-6 py-2 rounded-md ${
                  !formData.name || !formData.email || !formData.phone
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors duration-300`}
              >
                Submit Request
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default EstimateForm;
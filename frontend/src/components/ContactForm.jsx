import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log(formData);
    setSubmitted(true);
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setSubmitted(false);
  };
  
  if (submitted) {
    return (
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <SafeIcon icon={FiIcons.FiCheck} className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for contacting MoveItRight. We've received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={resetForm}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit}>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
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
          
          <div>
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
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Subject</option>
            <option value="quote">Get a Quote</option>
            <option value="services">Services Information</option>
            <option value="schedule">Schedule a Move</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          >
            <SafeIcon icon={FiIcons.FiSend} className="mr-2" />
            Send Message
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
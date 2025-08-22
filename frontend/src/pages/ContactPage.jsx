import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: FiIcons.FiMapPin,
      title: 'Address',
      details: [
        '123 Moving Avenue',
        'City, State 12345',
        'United States'
      ]
    },
    {
      icon: FiIcons.FiPhone,
      title: 'Phone',
      details: [
        '(555) 123-4567',
        '(555) 765-4321'
      ]
    },
    {
      icon: FiIcons.FiMail,
      title: 'Email',
      details: [
        'info@moveitright.com',
        'support@moveitright.com'
      ]
    },
    {
      icon: FiIcons.FiClock,
      title: 'Business Hours',
      details: [
        'Monday-Friday: 8AM-6PM',
        'Saturday: 9AM-4PM',
        'Sunday: Closed'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How far in advance should I book my move?',
      answer: 'We recommend booking at least 4-6 weeks in advance, especially during peak moving season (May-September). For last-minute moves, we will do our best to accommodate your schedule based on availability.'
    },
    {
      question: 'Do you provide packing materials?',
      answer: 'Yes, we offer a full range of packing supplies including boxes, tape, bubble wrap, and specialized containers for fragile items. You can purchase these directly from us or opt for our full-service packing option.'
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Absolutely. MoveItRight is fully licensed and insured. We carry comprehensive liability insurance and offer additional valuation coverage options for your belongings during the move.'
    },
    {
      question: 'What items will not be moved?',
      answer: 'For safety and legal reasons, we cannot transport hazardous materials (flammables, explosives, chemicals), perishable items, plants, and certain high-value items like cash or important documents. Please contact us for a complete list.'
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
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions or ready to plan your move? We are here to help. Reach out to our team through any of the methods below.
          </motion.p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-blue-600 text-white p-4">
                <h2 className="text-xl font-semibold">Get In Touch</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <SafeIcon icon={item.icon} className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <div className="mt-1 text-gray-600">
                          {item.details.map((detail, i) => (
                            <div key={i}>{detail}</div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-blue-600 text-white p-4">
                <h2 className="text-xl font-semibold">Follow Us</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Stay connected with us on social media for moving tips, company updates, and special offers.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors duration-300">
                    <SafeIcon icon={FiIcons.FiFacebook} className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors duration-300">
                    <SafeIcon icon={FiIcons.FiTwitter} className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors duration-300">
                    <SafeIcon icon={FiIcons.FiInstagram} className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors duration-300">
                    <SafeIcon icon={FiIcons.FiLinkedin} className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
            
            {/* FAQs */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full h-96 bg-gray-300 mt-12">
        {/* In a real application, you would embed a Google Map or other map service here */}
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <SafeIcon icon={FiIcons.FiMapPin} className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
            <p className="text-gray-600">123 Moving Avenue, City, State 12345</p>
            <p className="mt-4 text-sm text-gray-500">Map loading... (In a real application, an interactive map would be displayed here)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
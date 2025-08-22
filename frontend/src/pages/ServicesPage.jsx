import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      id: 'residential',
      title: 'Residential Moving',
      icon: FiIcons.FiHome,
      description: 'Our residential moving service takes the stress out of relocating your home. From studio apartments to large houses, we handle everything with care and precision.',
      features: [
        'Careful handling of all belongings',
        'Furniture disassembly and reassembly',
        'Packing and unpacking services available',
        'Floor and doorway protection',
        'Efficient loading and unloading',
        'Flexible scheduling options'
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'commercial',
      title: 'Commercial Moving',
      icon: FiIcons.FiBriefcase,
      description: 'Minimize downtime and keep your business running smoothly with our commercial moving services. We understand that time is money for businesses.',
      features: [
        'Weekend and after-hours moves available',
        'Office furniture disassembly and reassembly',
        'Computer and technology equipment handling',
        'Efficient space planning assistance',
        'Minimal disruption to operations',
        'Liability insurance coverage'
      ],
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'packing',
      title: 'Packing Services',
      icon: FiIcons.FiPackage,
      description: 'Let our experts handle the packing to save time and ensure your belongings are protected. We use quality materials and proven techniques.',
      features: [
        'Full and partial packing services',
        'Custom crating for valuable items',
        'Specialized packing for fragile items',
        'Organized labeling system',
        'Unpacking and debris removal',
        'Packing supplies available'
      ],
      image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'storage',
      title: 'Storage Solutions',
      icon: FiIcons.FiArchive,
      description: 'Our secure, climate-controlled storage facilities are perfect for short or long-term needs during your transition period.',
      features: [
        'Climate-controlled facilities',
        '24/7 security monitoring',
        'Short and long-term options',
        'Easy access to your belongings',
        'Inventory management system',
        'Competitive pricing'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'specialty',
      title: 'Specialty Items',
      icon: FiIcons.FiStar,
      description: 'Trust our specialized teams to handle your most valuable and delicate possessions with the utmost care and expertise.',
      features: [
        'Piano moving specialists',
        'Fine art and antiques handling',
        'Custom crating and packaging',
        'White glove service',
        'Extra padding and protection',
        'Special equipment for safe transport'
      ],
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'long-distance',
      title: 'Long Distance',
      icon: FiIcons.FiGlobe,
      description: 'Our long-distance moving service ensures your belongings arrive safely at your new home, no matter how far the journey.',
      features: [
        'Dedicated trucks for direct delivery',
        'GPS tracking of your shipment',
        'Guaranteed delivery dates',
        'Interstate moving expertise',
        'Regular communication throughout',
        'Comprehensive valuation coverage'
      ],
      image: 'https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
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
            Our Moving Services
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Comprehensive moving solutions tailored to meet your specific needs. From residential to commercial, local to long-distance, we've got you covered.
          </motion.p>
        </div>
      </div>
      
      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-20">
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={index % 2 === 0 ? "order-2 lg:order-1" : "order-2"}>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <SafeIcon icon={service.icon} className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <SafeIcon icon={FiIcons.FiCheck} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <Link
                      to="/estimate"
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
                    >
                      Get a Free Estimate
                      <SafeIcon icon={FiIcons.FiArrowRight} className="ml-2" />
                    </Link>
                  </div>
                </div>
                
                <div className={index % 2 === 0 ? "order-1 lg:order-2" : "order-1"}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="rounded-lg shadow-md w-full h-80 object-cover"
                  />
                </div>
              </motion.div>
              
              {index < services.length - 1 && (
                <div className="border-b border-gray-200 my-16"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Not sure which service is right for you?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our moving consultants can help you determine the best options for your specific situation. Contact us for a personalized consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 inline-flex items-center justify-center"
                  >
                    Contact Us
                    <SafeIcon icon={FiIcons.FiArrowRight} className="ml-2" />
                  </Link>
                  <Link
                    to="/estimate"
                    className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors duration-300 inline-flex items-center justify-center"
                  >
                    Get a Free Estimate
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Moving consultation"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
import React from 'react';
import Hero from '../components/Hero';
import ServicesList from '../components/ServicesList';
import TestimonialsList from '../components/TestimonialsList';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: FiIcons.FiClock,
      title: "Punctual Service",
      description: "We arrive on time, every time. Our team respects your schedule and works efficiently to complete your move as planned."
    },
    {
      icon: FiIcons.FiShield,
      title: "Fully Insured",
      description: "Your belongings are protected. We offer comprehensive insurance coverage for peace of mind during your move."
    },
    {
      icon: FiIcons.FiUsers,
      title: "Experienced Team",
      description: "Our professional movers are trained experts with years of experience handling all types of moves and items."
    },
    {
      icon: FiIcons.FiDollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees or surprises. We provide clear, detailed quotes upfront so you know exactly what to expect."
    }
  ];

  return (
    <>
      <Hero />
      
      <ServicesList />
      
      {/* Why Choose Us Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Why Choose MoveItRight
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're committed to providing exceptional moving services that exceed your expectations.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <SafeIcon icon={feature.icon} className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <TestimonialsList />
      
      {/* CTA Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-white sm:text-4xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready for a Stress-Free Move?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let us handle the heavy lifting while you focus on starting your new chapter.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/estimate"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium"
            >
              Get a Free Estimate
            </Link>
            <Link
              to="/contact"
              className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 rounded-md text-lg font-medium"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
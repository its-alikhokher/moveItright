import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <SafeIcon icon={icon} className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={link} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          Learn More
          <SafeIcon icon={SafeIcon.FiArrowRight} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { motion } from 'framer-motion';

const TestimonialCard = ({ name, location, text, rating }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <SafeIcon 
            key={i}
            icon={i < rating ? FiIcons.FiStar : FiIcons.FiStar} 
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-gray-600 mb-4 italic">"{text}"</p>
      <div className="flex items-center">
        <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
          <span className="text-blue-600 font-semibold">{name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
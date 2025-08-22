import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const team = [
    {
      name: 'John Smith',
      position: 'Founder & CEO',
      bio: 'With over 20 years in the moving industry, John founded MoveItRight with a vision to transform the moving experience for customers.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'Maria Rodriguez',
      position: 'Operations Manager',
      bio: 'Maria ensures that every move runs smoothly from start to finish. Her attention to detail and organizational skills keep our team operating at peak efficiency.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'David Chen',
      position: 'Lead Moving Specialist',
      bio: 'David leads our team of moving professionals and specializes in complex relocations. His expertise ensures that even the most challenging moves go flawlessly.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'Sarah Johnson',
      position: 'Customer Experience Director',
      bio: 'Sarah is dedicated to ensuring every customer has an exceptional experience with MoveItRight. She oversees our customer service team and quality assurance processes.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    }
  ];

  const values = [
    {
      icon: FiIcons.FiStar,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from the first phone call to the final box unpacked.'
    },
    {
      icon: FiIcons.FiShield,
      title: 'Reliability',
      description: 'When we make a commitment, we keep it. Our customers can depend on us to deliver as promised, every time.'
    },
    {
      icon: FiIcons.FiHeart,
      title: 'Care',
      description: 'We treat your belongings as if they were our own, with the utmost care and respect throughout the moving process.'
    },
    {
      icon: FiIcons.FiUsers,
      title: 'Customer Focus',
      description: 'Every decision we make is guided by what is best for our customers and how we can make their move easier.'
    },
    {
      icon: FiIcons.FiTrendingUp,
      title: 'Continuous Improvement',
      description: 'We are constantly looking for ways to enhance our services and provide even better moving experiences.'
    },
    {
      icon: FiIcons.FiGlobe,
      title: 'Community',
      description: 'We are proud to be part of the communities we serve and strive to make a positive impact beyond just moving.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">About MoveItRight</h1>
              <p className="text-xl text-blue-100 mb-6">
                We are more than just movers. We are a team dedicated to making your transition to a new home or office as smooth and stress-free as possible.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-md font-medium"
                >
                  Contact Us
                </Link>
                <Link
                  to="/services"
                  className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-2 rounded-md font-medium"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1520098183066-2d5403b05469?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Moving team" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  MoveItRight was founded in 2010 with a simple mission: to transform the moving industry by providing exceptional service that puts customers first.
                </p>
                <p>
                  After experiencing the stress and challenges of moving several times, our founder John Smith realized there had to be a better way. He assembled a team of experienced professionals who shared his vision for a moving company that truly cares.
                </p>
                <p>
                  Starting with just two trucks and a small crew, we have grown to become one of the most trusted moving companies in the region, with a fleet of modern vehicles and a team of highly trained moving specialists.
                </p>
                <p>
                  Throughout our growth, we have maintained our commitment to personalized service. We believe that every move is unique, and we take the time to understand each customer's specific needs to ensure a smooth, stress-free experience.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Our story" 
                className="rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and help us deliver the exceptional service our customers deserve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <SafeIcon icon={value.icon} className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Meet the Team Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind MoveItRight who are dedicated to making your move as smooth as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the MoveItRight Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let our team of moving professionals help make your next move the easiest one yet.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
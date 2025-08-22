import React from 'react';
import * as FiIcons from 'react-icons/fi';
import ServiceCard from './ServiceCard';

const ServicesList = () => {
  const services = [
    {
      icon: FiIcons.FiHome,
      title: "Residential Moving",
      description: "Comprehensive moving services for homes of all sizes, from apartments to large houses.",
      link: "/services/residential"
    },
    {
      icon: FiIcons.FiBriefcase,
      title: "Commercial Moving",
      description: "Office and business relocations with minimal disruption to your operations.",
      link: "/services/commercial"
    },
    {
      icon: FiIcons.FiPackage,
      title: "Packing Services",
      description: "Professional packing and unpacking services to protect your belongings.",
      link: "/services/packing"
    },
    {
      icon: FiIcons.FiArchive,
      title: "Storage Solutions",
      description: "Secure, climate-controlled storage options for short or long-term needs.",
      link: "/services/storage"
    },
    {
      icon: FiIcons.FiStar,
      title: "Specialty Items",
      description: "Safe transport of pianos, artwork, antiques, and other high-value items.",
      link: "/services/specialty"
    },
    {
      icon: FiIcons.FiGlobe,
      title: "Long Distance",
      description: "Reliable and efficient long-distance and interstate moving services.",
      link: "/services/long-distance"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of moving services tailored to meet your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
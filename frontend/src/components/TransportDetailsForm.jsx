import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {
  vehicleTypes,
  internalVehicles,
  approvedTransporters,
  vehicleFeatures
} from '../data/mockData';

const TransportDetailsForm = ({ request, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    registration: '',
    driver: '',
    features: [],
    transporterId: '',
    specialRequirements: ''
  });

  const [selectedTransporter, setSelectedTransporter] = useState(null);

  useEffect(() => {
    if (request.transportType === 'Internal') {
      // Pre-populate with internal vehicle data if available
      if (request.transportDetails?.vehicleId) {
        const vehicle = internalVehicles.find(v => v.id === request.transportDetails.vehicleId);
        if (vehicle) {
          setFormData({
            vehicleType: vehicle.type.toString(),
            registration: vehicle.registration,
            driver: vehicle.driver,
            features: [],
            transporterId: '',
            specialRequirements: ''
          });
        }
      }
    }
  }, [request]);

  const handleTransporterSelect = (transporterId) => {
    const transporter = approvedTransporters.find(t => t.id === parseInt(transporterId));
    setSelectedTransporter(transporter);
    setFormData(prev => ({
      ...prev,
      transporterId: transporterId
    }));
  };

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => {
      const features = [...prev.features];
      const index = features.indexOf(featureId);
      if (index > -1) {
        features.splice(index, 1);
      } else {
        features.push(featureId);
      }
      return { ...prev, features };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      isInternal: request.transportType === 'Internal'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {request.transportType === 'Internal' ? 'Internal Transport Details' : 'External Transport Details'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <SafeIcon icon={FiIcons.FiX} className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {request.transportType === 'External' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Transporter *
              </label>
              <select
                value={formData.transporterId}
                onChange={(e) => handleTransporterSelect(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose a transporter</option>
                {approvedTransporters.map(transporter => (
                  <option key={transporter.id} value={transporter.id}>
                    {transporter.name}
                  </option>
                ))}
              </select>

              {selectedTransporter && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-2">Transporter Details</h4>
                  <p className="text-sm text-blue-800">Contact: {selectedTransporter.contactPerson}</p>
                  <p className="text-sm text-blue-800">Phone: {selectedTransporter.phone}</p>
                  <p className="text-sm text-blue-800">Email: {selectedTransporter.email}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-blue-900">Specializations:</p>
                    <ul className="list-disc list-inside text-sm text-blue-800">
                      {selectedTransporter.specializations.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type/Capacity *
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData(prev => ({ ...prev, vehicleType: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} - {type.capacity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Registration *
              </label>
              <input
                type="text"
                value={formData.registration}
                onChange={(e) => setFormData(prev => ({ ...prev, registration: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter registration number"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Name *
            </label>
            <input
              type="text"
              value={formData.driver}
              onChange={(e) => setFormData(prev => ({ ...prev, driver: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter driver's name"
              required
            />
          </div>

          {request.transportType === 'External' && (
            <>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Features Required
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {vehicleFeatures.map(feature => (
                    <label key={feature.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature.id)}
                        onChange={() => handleFeatureToggle(feature.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        {feature.name}
                        <span className="block text-xs text-gray-500">{feature.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any special requirements or notes"
                />
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Transport Details
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TransportDetailsForm;
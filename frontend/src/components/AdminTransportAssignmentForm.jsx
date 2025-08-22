import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { internalVehicles, vehicleTypes } from '../data/mockData';
import { format } from 'date-fns';

const AdminTransportAssignmentForm = ({ request, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    assignmentOption: '', // 'assign' or 'unavailable'
    vehicleId: '',
    driverName: '',
    driverMobile: '',
    truckRegistration: '',
    transportDate: '',
    unavailabilityReason: '',
  });
  
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill transport date with requested date
  useEffect(() => {
    if (request?.requested_date) {
      setFormData(prev => ({
        ...prev,
        transportDate: request.requested_date
      }));
    }
  }, [request]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If changing vehicle, update related fields
    if (name === 'vehicleId' && value) {
      const vehicle = internalVehicles.find(v => v.id.toString() === value);
      if (vehicle) {
        setSelectedVehicle(vehicle);
        setFormData(prev => ({
          ...prev,
          driverName: vehicle.driver,
          truckRegistration: vehicle.registration
        }));
      }
    }
    
    // Reset fields when changing assignment option
    if (name === 'assignmentOption') {
      if (value === 'assign') {
        setFormData(prev => ({
          ...prev,
          unavailabilityReason: ''
        }));
      } else if (value === 'unavailable') {
        setFormData(prev => ({
          ...prev,
          vehicleId: '',
          driverName: '',
          driverMobile: '',
          truckRegistration: ''
        }));
        setSelectedVehicle(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create update data based on assignment option
      const updateData = {
        requestId: request.id,
        assignmentOption: formData.assignmentOption,
        status: formData.assignmentOption === 'assign' 
          ? 'Transport Arranged' 
          : 'External Transport Required',
        adminProcessedBy: 'Admin User', // In real app, get from auth context
        adminProcessedDate: new Date().toISOString()
      };

      // Add transport details if assigning internal transport
      if (formData.assignmentOption === 'assign') {
        updateData.transportDetails = {
          vehicleId: parseInt(formData.vehicleId),
          vehicleType: selectedVehicle?.type,
          registration: formData.truckRegistration,
          driver: formData.driverName,
          driverMobile: formData.driverMobile,
          transportDate: formData.transportDate,
          isInternal: true,
          isAssigned: true
        };
      } else {
        // Add reason for unavailability
        updateData.unavailabilityReason = formData.unavailabilityReason;
      }

      await onSubmit(updateData);
      onClose();
    } catch (error) {
      console.error('Error processing transport assignment:', error);
      setError('Failed to process transport assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get the vehicle type name based on the request
  const getRequestedVehicleTypeName = () => {
    if (!request?.transport_vehicle_type) return 'Not specified';
    const vehicleType = vehicleTypes.find(vt => vt.id === parseInt(request.transport_vehicle_type));
    return vehicleType ? `${vehicleType.name} (${vehicleType.capacity})` : 'Unknown';
  };

  // Get available vehicles that match or exceed the requested type
  const getAvailableVehicles = () => {
    if (!request?.transport_vehicle_type) return internalVehicles;
    
    const requestedType = parseInt(request.transport_vehicle_type);
    return internalVehicles.filter(v => {
      // Find the vehicle type to compare capacity
      const vehicleType = vehicleTypes.find(vt => vt.id === v.type);
      const requestedVehicleType = vehicleTypes.find(vt => vt.id === requestedType);
      
      if (!vehicleType || !requestedVehicleType) return false;
      
      // Extract numeric capacity for comparison (e.g., "1000kg" -> 1000)
      const getCapacityValue = (capacityStr) => {
        const match = capacityStr.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
      };
      
      const vehicleCapacity = getCapacityValue(vehicleType.capacity);
      const requestedCapacity = getCapacityValue(requestedVehicleType.capacity);
      
      // Return true if this vehicle's capacity is >= requested capacity
      return vehicleCapacity >= requestedCapacity;
    });
  };

  const availableVehicles = getAvailableVehicles();

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
              Admin Transport Assignment
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
          {/* Request Details */}
          <div className="bg-blue-50 p-6 rounded-md mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Request Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-600">Request ID</p>
                <p className="font-medium">{request?.requestId || request?.request_id}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Requested By</p>
                <p className="font-medium">{request?.requested_by || request?.requestedBy}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Asset</p>
                <p className="font-medium">{request?.assetName} ({request?.assetCode})</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Requested Date</p>
                <p className="font-medium">
                  {format(new Date(request?.requested_date || request?.requestedDate), 'dd MMM yyyy')}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-blue-600">Location Transfer</p>
                <p className="font-medium">
                  From: {request?.fromLocation} → To: {request?.toLocation}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-blue-600">Vehicle Type Required</p>
                <p className="font-medium">{getRequestedVehicleTypeName()}</p>
              </div>
              {request?.comments && (
                <div className="md:col-span-2">
                  <p className="text-sm text-blue-600">Special Comments</p>
                  <p className="font-medium">{request?.comments}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assignment Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Assignment Option *
            </label>
            <div className="space-y-4">
              <label className="flex items-start p-4 border rounded-md border-gray-300 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="assignmentOption"
                  value="assign"
                  checked={formData.assignmentOption === 'assign'}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <div>
                  <span className="font-medium">Assign Internal Transport</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Allocate an internal vehicle and driver for this relocation request
                  </p>
                </div>
              </label>

              <label className="flex items-start p-4 border rounded-md border-gray-300 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="assignmentOption"
                  value="unavailable"
                  checked={formData.assignmentOption === 'unavailable'}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <div>
                  <span className="font-medium">No Internal Transport Available</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Requestor will need to arrange external transport for this relocation
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Internal Transport Assignment Section */}
          {formData.assignmentOption === 'assign' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-green-50 p-6 rounded-md">
                <h3 className="text-lg font-medium text-green-900 mb-4">Internal Transport Details</h3>
                
                {/* Vehicle Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Vehicle *
                  </label>
                  <select
                    name="vehicleId"
                    value={formData.vehicleId}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={formData.assignmentOption === 'assign'}
                  >
                    <option value="">Select a vehicle</option>
                    {availableVehicles.map(vehicle => {
                      const vehicleType = vehicleTypes.find(vt => vt.id === vehicle.type);
                      return (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.registration} - {vehicleType?.name} ({vehicle.capacity})
                        </option>
                      );
                    })}
                  </select>
                  
                  {availableVehicles.length === 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      No suitable vehicles available. Consider selecting "No Internal Transport Available" option.
                    </p>
                  )}
                </div>
                
                {/* Vehicle Details */}
                {selectedVehicle && (
                  <div className="mb-4 p-3 bg-white rounded-md border border-green-200">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-600">Registration:</p>
                        <p className="font-medium">{selectedVehicle.registration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Capacity:</p>
                        <p className="font-medium">{selectedVehicle.capacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Default Driver:</p>
                        <p className="font-medium">{selectedVehicle.driver}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Driver Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Driver Name *
                    </label>
                    <input
                      type="text"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter driver's full name"
                      required={formData.assignmentOption === 'assign'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Driver Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="driverMobile"
                      value={formData.driverMobile}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter driver's mobile number"
                      required={formData.assignmentOption === 'assign'}
                    />
                  </div>
                </div>
                
                {/* Registration (if you want to allow overriding the default) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Truck Registration Number *
                  </label>
                  <input
                    type="text"
                    name="truckRegistration"
                    value={formData.truckRegistration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter truck registration (e.g. ABC 123 GP)"
                    required={formData.assignmentOption === 'assign'}
                  />
                </div>
                
                {/* Transport Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Date *
                  </label>
                  <input
                    type="date"
                    name="transportDate"
                    value={formData.transportDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={formData.assignmentOption === 'assign'}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Unavailability Reason */}
          {formData.assignmentOption === 'unavailable' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-red-50 p-6 rounded-md">
                <h3 className="text-lg font-medium text-red-900 mb-4">Reason for No Internal Transport</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation for Requestor *
                  </label>
                  <textarea
                    name="unavailabilityReason"
                    value={formData.unavailabilityReason}
                    onChange={handleInputChange}
                    rows="4"
                    maxLength="3000"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Explain why internal transport is not available and what the requestor should do next (max 3000 characters)"
                    required={formData.assignmentOption === 'unavailable'}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.unavailabilityReason.length}/3000 characters
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 p-4 border border-red-200 rounded-md my-4">
              <div className="flex">
                <SafeIcon icon={FiIcons.FiAlertCircle} className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                loading || 
                !formData.assignmentOption || 
                (formData.assignmentOption === 'assign' && (!formData.vehicleId || !formData.driverName || !formData.driverMobile || !formData.truckRegistration || !formData.transportDate)) ||
                (formData.assignmentOption === 'unavailable' && !formData.unavailabilityReason)
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {formData.assignmentOption === 'assign' ? 'Assign Transport' : 'Return to Requestor'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminTransportAssignmentForm;
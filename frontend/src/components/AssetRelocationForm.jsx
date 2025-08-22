import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { locationService, categoryService, oracleService, relocationService, transporterService } from '../services/assetService';
import { vehicleTypes } from '../data/mockData';

// Asset condition options
const assetConditions = [
  { id: 'excellent', label: 'Excellent' },
  { id: 'good', label: 'Good Working Condition' },
  { id: 'fair', label: 'Fair Condition' },
  { id: 'notworking', label: 'Not Working' },
  { id: 'irrepairable', label: 'Irrepairable' }
];

const AssetRelocationForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fromLocation: '',
    assetCategory: '',
    assetTagId: '',
    selectedAsset: '',
    assetCondition: '',
    toLocation: '',
    transportType: '',
    transportVehicleType: '', // New field for vehicle type (both internal and external)
    transporterId: '',
    truckRegistration: '',
    driverName: '',
    driverIdNumber: '',
    driverMobile: '',
    estimatedCost: '',
    requestedDate: '',
    comments: ''
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [assetDetails, setAssetDetails] = useState(null);
  
  // Data from backend
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Load locations and categories from Supabase/Oracle
  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingData(true);
      try {
        // Load locations from Oracle EBS via Supabase
        const { data: locationsData, error: locationsError } = await locationService.getAllLocations();
        if (locationsError) {
          console.error('Error loading locations:', locationsError);
        } else {
          setLocations(locationsData || []);
        }

        // Load asset categories
        const { data: categoriesData, error: categoriesError } = await categoryService.getAllCategories();
        if (categoriesError) {
          console.error('Error loading categories:', categoriesError);
        } else {
          setCategories(categoriesData || []);
        }
        
        // Load transporters
        const { data: transportersData, error: transportersError } = await transporterService.getAllTransporters();
        if (transportersError) {
          console.error('Error loading transporters:', transportersError);
        } else {
          setTransporters(transportersData || []);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear asset details if location or category changes
    if (name === 'fromLocation' || name === 'assetCategory') {
      setAssetDetails(null);
      setFormData(prev => ({ ...prev, assetTagId: '', selectedAsset: '', assetCondition: '' }));
    }
    
    // Reset transporter-related fields if transport type changes
    if (name === 'transportType' && value !== 'External') {
      setFormData(prev => ({
        ...prev,
        transporterId: '',
        truckRegistration: '',
        driverName: '',
        driverIdNumber: '',
        driverMobile: '',
        estimatedCost: ''
      }));
    }
  };

  const handleAssetTagChange = async (tagId) => {
    if (!tagId || tagId.length < 8) return; // Only trigger lookup if tag ID is long enough
    
    setLoading(true);
    setError('');
    setAssetDetails(null);

    try {
      // Oracle EBS lookup simulation
      const { data: asset, error: lookupError } = await oracleService.lookupAssetInOracle(
        tagId,
        formData.fromLocation
      );

      if (lookupError) {
        setError(lookupError);
        return;
      }

      if (!asset) {
        setError('Asset not found in Oracle EBS. Please verify the tag ID.');
        return;
      }

      // Validate category if selected
      if (formData.assetCategory) {
        const { valid, error: categoryError } = await oracleService.validateAssetCategory(
          asset,
          formData.assetCategory
        );
        if (!valid) {
          setError(categoryError);
          return;
        }
      }

      setAssetDetails(asset);
      setFormData(prev => ({
        ...prev,
        assetTagId: tagId,
        selectedAsset: asset.id.toString()
      }));
    } catch (err) {
      setError('Error connecting to Oracle EBS. Please try again.');
      console.error('Error fetching asset details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBarcodeScanned = (scannedData) => {
    setShowScanner(false);
    handleAssetTagChange(scannedData);
  };

  // Mock barcode scanner component
  const BarcodeScanner = ({ onScan }) => {
    const [mockBarcode, setMockBarcode] = useState('');

    const handleMockScan = () => {
      if (mockBarcode.trim()) {
        onScan(mockBarcode);
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Tag Scanner</h3>
        <p className="text-sm text-gray-600 mb-4">
          In a real application, this would activate your camera to scan a barcode.
          For this demo, please enter a mock barcode.
        </p>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={mockBarcode}
            onChange={(e) => setMockBarcode(e.target.value)}
            placeholder="Enter asset tag (e.g. FUR-001-0001)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowScanner(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleMockScan}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Scan
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create relocation request
      const requestData = {
        asset_id: parseInt(formData.selectedAsset),
        from_location_id: parseInt(formData.fromLocation),
        to_location_id: parseInt(formData.toLocation),
        transport_type: formData.transportType,
        transport_vehicle_type: formData.transportVehicleType,
        transporter_id: formData.transportType === 'External' ? parseInt(formData.transporterId) : null,
        truck_registration: formData.truckRegistration || null,
        driver_name: formData.driverName || null,
        driver_id_number: formData.driverIdNumber || null,
        driver_mobile: formData.driverMobile || null,
        estimated_cost: formData.estimatedCost ? parseFloat(formData.estimatedCost) : null,
        requested_date: formData.requestedDate,
        requested_by: 'Current User', // In real app, get from auth context
        requester_email: 'user@company.com', // In real app, get from auth context
        comments: formData.comments,
        asset_condition: formData.assetCondition,
        status: formData.transportType === 'Internal' ? 'Pending Admin Transport' : 'Pending Approval'
      };

      const { data: newRequest, error: createError } = await relocationService.createRequest(requestData);

      if (createError) {
        setError('Failed to submit request. Please try again.');
        return;
      }

      if (onSubmit) {
        onSubmit(newRequest);
      } else {
        alert('Asset relocation request submitted successfully!');
      }
      
      onClose();

      // Reset form
      setFormData({
        fromLocation: '',
        assetCategory: '',
        assetTagId: '',
        selectedAsset: '',
        assetCondition: '',
        toLocation: '',
        transportType: '',
        transportVehicleType: '',
        transporterId: '',
        truckRegistration: '',
        driverName: '',
        driverIdNumber: '',
        driverMobile: '',
        estimatedCost: '',
        requestedDate: '',
        comments: ''
      });
      setStep(1);
      setAssetDetails(null);
    } catch (error) {
      console.error('Error submitting request:', error);
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const selectedFromLocation = locations.find(loc => loc.id === parseInt(formData.fromLocation));
  const selectedToLocation = locations.find(loc => loc.id === parseInt(formData.toLocation));
  const selectedCategory = categories.find(cat => cat.id === parseInt(formData.assetCategory));
  const selectedTransporter = transporters.find(t => t.id === parseInt(formData.transporterId));
  const selectedVehicleType = vehicleTypes.find(vt => vt.id === parseInt(formData.transportVehicleType));

  if (!isOpen) return null;

  if (loadingData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Oracle EBS data...</p>
        </div>
      </div>
    );
  }

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
            <h2 className="text-2xl font-bold text-gray-800">Asset Relocation Request</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <SafeIcon icon={FiIcons.FiX} className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Asset Selection</span>
              <span>Destination</span>
              <span>Transport</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Asset Selection - Oracle EBS Integration */}
          {step === 1 && (
            <div className="space-y-6">
              {/* From Location Selection - Oracle EBS Locations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Location *
                  <span className="text-xs text-gray-500">(Oracle EBS Locations)</span>
                </label>
                <select
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select current location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name} ({location.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Asset Category Selection - Optional */}
              {formData.fromLocation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Category
                    <span className="text-gray-500">(Optional - helps filter assets)</span>
                  </label>
                  <select
                    name="assetCategory"
                    value={formData.assetCategory}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    If not selected, all asset tags from the chosen location will be available for lookup
                  </p>
                </div>
              )}

              {/* Asset Tag ID Input - Oracle EBS Lookup */}
              {formData.fromLocation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Tag ID *
                    <span className="text-xs text-gray-500">(Oracle EBS Asset Lookup)</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="assetTagId"
                      value={formData.assetTagId}
                      onChange={(e) => {
                        handleInputChange(e);
                        handleAssetTagChange(e.target.value);
                      }}
                      className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter asset tag ID (e.g. FUR-001-0001)"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowScanner(true)}
                      className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700"
                      title="Scan Barcode"
                    >
                      <SafeIcon icon={FiIcons.FiCamera} className="h-5 w-5" />
                    </button>
                  </div>
                  {loading && (
                    <div className="mt-2 flex items-center text-sm text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Looking up asset in Oracle EBS...
                    </div>
                  )}
                  {error && (
                    <div className="mt-2 text-sm text-red-600">
                      {error}
                    </div>
                  )}
                </div>
              )}

              {/* Asset Details Display - Oracle EBS Data */}
              {assetDetails && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-medium text-blue-900 mb-2">Asset Details from Oracle EBS</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-600">Asset Name</p>
                      <p className="font-medium">{assetDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Asset Code</p>
                      <p className="font-medium">{assetDetails.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Category</p>
                      <p className="font-medium">{assetDetails.category?.name || assetDetails.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Current Location</p>
                      <p className="font-medium">{selectedFromLocation?.name}</p>
                    </div>
                    {assetDetails.custodian_name && (
                      <div>
                        <p className="text-sm text-blue-600">Current Custodian</p>
                        <p className="font-medium">{assetDetails.custodian_name}</p>
                      </div>
                    )}
                    {assetDetails.oracle_asset_id && (
                      <div>
                        <p className="text-sm text-blue-600">Oracle Asset ID</p>
                        <p className="font-medium font-mono">{assetDetails.oracle_asset_id}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Asset Condition Selection */}
              {assetDetails && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Asset Condition *
                  </label>
                  <select
                    name="assetCondition"
                    value={formData.assetCondition}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select current condition</option>
                    {assetConditions.map((condition) => (
                      <option key={condition.id} value={condition.id}>
                        {condition.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!assetDetails || !formData.assetCondition}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Destination */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-900 mb-2">Selected Asset (Oracle EBS)</h3>
                <p className="text-blue-800">
                  {assetDetails?.name} ({assetDetails?.code})
                </p>
                <p className="text-sm text-blue-600">
                  From: {selectedFromLocation?.name}
                </p>
                <p className="text-sm text-blue-600">
                  Category: {selectedCategory?.name || assetDetails?.category?.name || assetDetails?.category}
                </p>
                <p className="text-sm text-blue-600">
                  Condition: {assetConditions.find(c => c.id === formData.assetCondition)?.label}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Location *
                  <span className="text-xs text-gray-500">(Oracle EBS Locations)</span>
                </label>
                <select
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select destination</option>
                  {locations
                    .filter(loc => loc.id !== parseInt(formData.fromLocation))
                    .map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name} ({location.code})
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.toLocation}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Transport Details - Enhanced */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Transport Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Type *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="transportType"
                      value="Internal"
                      checked={formData.transportType === 'Internal'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>Internal transport arranged by ADMIN department</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="transportType"
                      value="External"
                      checked={formData.transportType === 'External'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>External transporter (already identified)</span>
                  </label>
                </div>
              </div>

              {/* Transport Vehicle Type - For both Internal and External */}
              {formData.transportType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Vehicle Type Required *
                  </label>
                  <select
                    name="transportVehicleType"
                    value={formData.transportVehicleType}
                    onChange={handleInputChange}
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
                  {selectedVehicleType && (
                    <div className="mt-2 bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-700">Features: {selectedVehicleType.features.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}

              {/* External Transporter Details - Only shown if External is selected */}
              {formData.transportType === 'External' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-50 p-6 rounded-md"
                >
                  <h3 className="text-lg font-medium text-blue-900 mb-4">External Transporter Details</h3>
                  
                  {/* Transporter Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transporter Name *
                    </label>
                    <select
                      name="transporterId"
                      value={formData.transporterId}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={formData.transportType === 'External'}
                    >
                      <option value="">Select transporter</option>
                      {transporters.map((transporter) => (
                        <option key={transporter.id} value={transporter.id}>
                          {transporter.name}
                        </option>
                      ))}
                    </select>
                    
                    {/* Show transporter details if selected */}
                    {selectedTransporter && (
                      <div className="mt-2 bg-white p-3 rounded-md border border-blue-200 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-gray-600">Contact Person:</p>
                            <p className="font-medium">{selectedTransporter.contact_person}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Contact Number:</p>
                            <p className="font-medium">{selectedTransporter.contact_number}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Truck Registration */}
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
                      required={formData.transportType === 'External'}
                    />
                  </div>
                  
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
                        required={formData.transportType === 'External'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver ID Number *
                      </label>
                      <input
                        type="text"
                        name="driverIdNumber"
                        value={formData.driverIdNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter driver's ID number"
                        required={formData.transportType === 'External'}
                      />
                    </div>
                  </div>
                  
                  {/* Driver Mobile */}
                  <div className="mb-4">
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
                      required={formData.transportType === 'External'}
                    />
                  </div>
                  
                  {/* Estimated Cost */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Cost (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">R</span>
                      </div>
                      <input
                        type="number"
                        name="estimatedCost"
                        value={formData.estimatedCost}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Requested Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Date *
                </label>
                <input
                  type="date"
                  name="requestedDate"
                  value={formData.requestedDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Special Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Transport Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows="4"
                  maxLength="3000"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any special instructions or transport requirements (max 3000 characters)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.comments.length}/3000 characters
                </p>
              </div>

              {/* Button Section */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Previous
                </button>
                
                {/* Different button based on transport type */}
                {formData.transportType === 'Internal' ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      !formData.transportType || 
                      !formData.transportVehicleType ||
                      !formData.requestedDate
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center">
                      <SafeIcon icon={FiIcons.FiUsers} className="mr-2" />
                      Submit to Admin for Transport
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      !formData.transportType || 
                      !formData.transportVehicleType ||
                      !formData.requestedDate || 
                      (formData.transportType === 'External' && 
                       (!formData.transporterId || !formData.truckRegistration || 
                        !formData.driverName || !formData.driverIdNumber || !formData.driverMobile))
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Review
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-md">
                <h3 className="font-semibold text-gray-900 mb-4">Review Your Request</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Asset (Oracle EBS)</p>
                    <p className="font-medium">{assetDetails?.name} ({assetDetails?.code})</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Asset Tag: {formData.assetTagId}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Category: {selectedCategory?.name || assetDetails?.category?.name || assetDetails?.category}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Condition: {assetConditions.find(c => c.id === formData.assetCondition)?.label}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">From Location</p>
                    <p className="font-medium">{selectedFromLocation?.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">To Location</p>
                    <p className="font-medium">{selectedToLocation?.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Transport Type</p>
                    <p className="font-medium">{formData.transportType}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Type Required</p>
                    <p className="font-medium">{selectedVehicleType?.name} ({selectedVehicleType?.capacity})</p>
                  </div>

                  {formData.transportType === 'Internal' && (
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="font-medium text-blue-900">
                        This request will be sent to the Admin Department to arrange internal transport.
                      </p>
                      <p className="text-sm text-blue-700 mt-2">
                        The Admin Department will either assign an internal vehicle or request you to arrange 
                        external transport if no internal vehicles are available.
                      </p>
                    </div>
                  )}

                  {formData.transportType === 'External' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Transporter</p>
                        <p className="font-medium">{selectedTransporter?.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Truck Registration</p>
                        <p className="font-medium">{formData.truckRegistration}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Driver Details</p>
                        <p className="font-medium">{formData.driverName} (ID: {formData.driverIdNumber})</p>
                        <p className="text-sm text-gray-600">Mobile: {formData.driverMobile}</p>
                      </div>
                      
                      {formData.estimatedCost && (
                        <div>
                          <p className="text-sm text-gray-600">Estimated Cost</p>
                          <p className="font-medium">R {parseFloat(formData.estimatedCost).toFixed(2)}</p>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <p className="text-sm text-gray-600">Requested Date</p>
                    <p className="font-medium">{formData.requestedDate}</p>
                  </div>

                  {formData.comments && (
                    <div>
                      <p className="text-sm text-gray-600">Special Transport Comments</p>
                      <p className="font-medium">{formData.comments}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 flex items-center"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  )}
                  {formData.transportType === 'Internal' ? 'Submit to Admin' : 'Submit Request'}
                </button>
              </div>
            </div>
          )}

          {/* Barcode Scanner Modal */}
          {showScanner && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg max-w-md w-full">
                <BarcodeScanner onScan={handleBarcodeScanned} />
              </div>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AssetRelocationForm;
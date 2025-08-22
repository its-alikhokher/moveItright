import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';
import QRCode from 'react-qr-code';

const AssetConditionOptions = [
  { id: 'excellent', label: 'Excellent - No visible damage or wear' },
  { id: 'good', label: 'Good - Minor wear, fully functional' },
  { id: 'fair', label: 'Fair - Visible wear, functioning' },
  { id: 'poor', label: 'Poor - Significant wear/damage' },
  { id: 'damaged', label: 'Damaged - Requires repair' }
];

const AssetCollectionDocument = ({ request, onSubmit, onClose }) => {
  const [collectionDetails, setCollectionDetails] = useState({
    collectionDate: format(new Date(), 'yyyy-MM-dd'),
    collectionTime: format(new Date(), 'HH:mm'),
    assetCondition: '',
    assetTagNumber: '',
    driverOTP: '',
    custodianOTP: '',
    collectionNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollectionDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!collectionDetails.collectionDate) newErrors.collectionDate = 'Collection date is required';
    if (!collectionDetails.collectionTime) newErrors.collectionTime = 'Collection time is required';
    if (!collectionDetails.assetCondition) newErrors.assetCondition = 'Asset condition is required';
    if (!collectionDetails.assetTagNumber) newErrors.assetTagNumber = 'Asset tag number is required';
    if (!collectionDetails.driverOTP) newErrors.driverOTP = 'Driver OTP is required';
    if (!collectionDetails.custodianOTP) newErrors.custodianOTP = 'Custodian OTP is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...collectionDetails,
        requestId: request.id,
        assetId: request.assetId,
        timestamp: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error submitting collection document:', error);
      setErrors(prev => ({ ...prev, submit: 'Failed to submit collection document' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScanComplete = (scannedData) => {
    setCollectionDetails(prev => ({
      ...prev,
      assetTagNumber: scannedData
    }));
    setShowScanner(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Asset Collection Document (ACD)
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
          {/* Request Details Section */}
          <div className="bg-blue-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Request Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-600">Request ID</p>
                <p className="font-medium">{request.requestId}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Asset</p>
                <p className="font-medium">{request.assetName}</p>
                <p className="text-sm text-gray-500">{request.assetCode}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">From Location</p>
                <p className="font-medium">{request.fromLocation}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">To Location</p>
                <p className="font-medium">{request.toLocation}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Approved By</p>
                <p className="font-medium">{request.approvalStatus.approvedBy}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Approval Date</p>
                <p className="font-medium">
                  {format(new Date(request.approvalStatus.approvedDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Asset Tag Section */}
          <div className="bg-green-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Asset Identification</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 mr-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Tag Number *
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="assetTagNumber"
                    value={collectionDetails.assetTagNumber}
                    onChange={handleInputChange}
                    className={`flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.assetTagNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter asset tag number"
                  />
                  <button
                    type="button"
                    onClick={() => setShowScanner(true)}
                    className="ml-2 p-3 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                  >
                    <SafeIcon icon={FiIcons.FiCamera} className="h-5 w-5" />
                  </button>
                </div>
                {errors.assetTagNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.assetTagNumber}</p>
                )}
              </div>
              <div className="flex-shrink-0">
                <QRCode
                  value={`${request.assetCode}-${request.assetId}`}
                  size={100}
                  className="border-4 border-white"
                />
              </div>
            </div>
          </div>

          {/* Collection Details Section */}
          <div className="bg-purple-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">Collection Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Date *
                </label>
                <input
                  type="date"
                  name="collectionDate"
                  value={collectionDetails.collectionDate}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.collectionDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.collectionDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.collectionDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Time *
                </label>
                <input
                  type="time"
                  name="collectionTime"
                  value={collectionDetails.collectionTime}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.collectionTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.collectionTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.collectionTime}</p>
                )}
              </div>
            </div>
          </div>

          {/* Asset Condition Section */}
          <div className="bg-yellow-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-yellow-900 mb-4">Asset Condition</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Condition at Collection *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AssetConditionOptions.map(option => (
                  <label key={option.id} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="assetCondition"
                      value={option.id}
                      checked={collectionDetails.assetCondition === option.id}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.assetCondition && (
                <p className="mt-1 text-sm text-red-600">{errors.assetCondition}</p>
              )}
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="collectionNotes"
                  value={collectionDetails.collectionNotes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe any specific condition details or notes..."
                />
              </div>
            </div>
          </div>

          {/* OTP Verification Section */}
          <div className="bg-red-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-red-900 mb-4">OTP Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver OTP *
                </label>
                <input
                  type="text"
                  name="driverOTP"
                  value={collectionDetails.driverOTP}
                  onChange={handleInputChange}
                  maxLength="6"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.driverOTP ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter driver's OTP"
                />
                {errors.driverOTP && (
                  <p className="mt-1 text-sm text-red-600">{errors.driverOTP}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custodian OTP *
                </label>
                <input
                  type="text"
                  name="custodianOTP"
                  value={collectionDetails.custodianOTP}
                  onChange={handleInputChange}
                  maxLength="6"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.custodianOTP ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter custodian's OTP"
                />
                {errors.custodianOTP && (
                  <p className="mt-1 text-sm text-red-600">{errors.custodianOTP}</p>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <SafeIcon icon={FiIcons.FiSave} className="h-4 w-4 mr-2" />
              )}
              Generate ACD
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AssetCollectionDocument;
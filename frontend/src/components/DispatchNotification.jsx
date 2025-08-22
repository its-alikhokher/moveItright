import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const DispatchNotification = ({ request, onClose }) => {
  const {
    assetName,
    assetCode,
    fromLocation,
    toLocation,
    transportDetails,
    requestedDate,
    comments
  } = request;

  const getTransportInfo = () => {
    if (transportDetails.isInternal) {
      return {
        title: 'Internal Transport',
        org: 'ADMIN Department',
        contact: 'admin@company.com'
      };
    }
    const transporter = transportDetails.transporterName;
    return {
      title: 'External Transport',
      org: transporter,
      contact: transportDetails.transporterContact
    };
  };

  const transportInfo = getTransportInfo();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Dispatch Notification</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <SafeIcon icon={FiIcons.FiX} className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <SafeIcon icon={FiIcons.FiPackage} className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Asset Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Asset Name</p>
                <p className="font-medium">{assetName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Asset Code</p>
                <p className="font-medium">{assetCode}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <SafeIcon icon={FiIcons.FiNavigation} className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Location Details</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">From Location</p>
                <p className="font-medium">{fromLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">To Location</p>
                <p className="font-medium">{toLocation}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <SafeIcon icon={FiIcons.FiTruck} className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Transport Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Transport Type</p>
                <p className="font-medium">{transportInfo.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Provider</p>
                <p className="font-medium">{transportInfo.org}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vehicle Registration</p>
                <p className="font-medium">{transportDetails.registration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Driver Name</p>
                <p className="font-medium">{transportDetails.driver}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <SafeIcon icon={FiIcons.FiClock} className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Schedule</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Requested Date</p>
                <p className="font-medium">{format(new Date(requestedDate), 'MMMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{transportInfo.contact}</p>
              </div>
            </div>
          </div>

          {comments && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <SafeIcon icon={FiIcons.FiMessageSquare} className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3">Special Instructions</h3>
              </div>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{comments}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DispatchNotification;
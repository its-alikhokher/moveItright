import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const NotificationModal = ({ notification, onClose }) => {
  const getIconAndColor = (type) => {
    switch (type) {
      case 'approved':
        return { icon: FiIcons.FiCheck, color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'denied':
        return { icon: FiIcons.FiX, color: 'text-red-600', bgColor: 'bg-red-100' };
      default:
        return { icon: FiIcons.FiInfo, color: 'text-blue-600', bgColor: 'bg-blue-100' };
    }
  };

  const { icon, color, bgColor } = getIconAndColor(notification.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-full ${bgColor} mr-4`}>
              <SafeIcon icon={icon} className={`h-6 w-6 ${color}`} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{notification.title}</h2>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-2">{notification.message}</p>
            
            {notification.details && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Request Details:</h4>
                <p className="text-sm text-gray-600">Request ID: {notification.details.requestId}</p>
                <p className="text-sm text-gray-600">Asset: {notification.details.assetName}</p>
                {notification.details.reason && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900">Reason:</p>
                    <p className="text-sm text-gray-600">{notification.details.reason}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500 mb-4">
            {format(new Date(notification.timestamp), 'MMMM dd, yyyy at h:mm a')}
          </div>

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

export default NotificationModal;
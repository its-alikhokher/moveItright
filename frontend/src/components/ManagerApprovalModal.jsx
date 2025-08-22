import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';
import { locations, fixedAssets } from '../data/mockData';

const ManagerApprovalModal = ({ request, onApprove, onDeny, onClose }) => {
  const [action, setAction] = useState(''); // 'approve' or 'deny'
  const [comments, setComments] = useState('');
  const [denyReason, setDenyReason] = useState('');
  const [showDenyForm, setShowDenyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAssetDetails = fixedAssets.find(asset => asset.id === request.assetId);
  const selectedFromLocation = locations.find(loc => loc.name === request.fromLocation);
  const selectedToLocation = locations.find(loc => loc.name === request.toLocation);

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await onApprove(request.id, {
        approvedBy: 'Current Asset Manager', // In real app, this would be the logged-in manager
        approvedDate: new Date().toISOString(),
        comments: comments || 'Final approved by Asset Manager'
      });
      onClose();
    } catch (error) {
      console.error('Error approving request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeny = () => {
    setShowDenyForm(true);
    setAction('deny');
  };

  const handleDenySubmit = async () => {
    if (!denyReason.trim()) {
      alert('Please provide a reason for denying this request.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onDeny(request.id, {
        deniedBy: 'Current Asset Manager', // In real app, this would be the logged-in manager
        deniedDate: new Date().toISOString(),
        reason: denyReason
      });
      onClose();
    } catch (error) {
      console.error('Error denying request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowDenyForm(false);
    setAction('');
    setDenyReason('');
    setComments('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Asset Manager Final Approval
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <SafeIcon icon={FiIcons.FiX} className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Request Details */}
          <div className="bg-blue-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Request Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-600">Request ID</p>
                <p className="font-medium text-blue-900">{request.requestId}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Requested By</p>
                <p className="font-medium text-blue-900">{request.requestedBy}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Request Date</p>
                <p className="font-medium text-blue-900">
                  {format(new Date(request.requestDate), 'MMMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Requested Move Date</p>
                <p className="font-medium text-blue-900">
                  {format(new Date(request.requestedDate), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Asset Details */}
          <div className="bg-green-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Asset Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-600">Asset Name</p>
                <p className="font-medium text-green-900">{selectedAssetDetails?.name}</p>
              </div>
              <div>
                <p className="text-sm text-green-600">Asset Code</p>
                <p className="font-medium text-green-900">{selectedAssetDetails?.code}</p>
              </div>
              <div>
                <p className="text-sm text-green-600">Asset Category</p>
                <p className="font-medium text-green-900">{request.assetCategory}</p>
              </div>
              <div>
                <p className="text-sm text-green-600">Asset TAG Barcode</p>
                <div className="flex items-center">
                  <div className="bg-white border-2 border-green-200 p-2 rounded font-mono text-sm mr-3">
                    {selectedAssetDetails?.code}-{selectedAssetDetails?.id.toString().padStart(4, '0')}
                  </div>
                  <SafeIcon icon={FiIcons.FiBarChart} className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-purple-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-purple-600">From Location</p>
                <p className="font-medium text-purple-900">{selectedFromLocation?.name}</p>
                <p className="text-sm text-purple-600">Code: {selectedFromLocation?.code}</p>
              </div>
              <div>
                <p className="text-sm text-purple-600">To Location</p>
                <p className="font-medium text-purple-900">{selectedToLocation?.name}</p>
                <p className="text-sm text-purple-600">Code: {selectedToLocation?.code}</p>
              </div>
            </div>
          </div>

          {/* HOD Approval Status */}
          {request.approvalStatus?.hodApprovedBy && (
            <div className="bg-yellow-50 p-6 rounded-md mb-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">HOD Approval</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-yellow-600">Approved By</p>
                  <p className="font-medium text-yellow-900">{request.approvalStatus.hodApprovedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-600">Approval Date</p>
                  <p className="font-medium text-yellow-900">
                    {format(new Date(request.approvalStatus.hodApprovedDate), 'MMM dd, yyyy')}
                  </p>
                </div>
                {request.approvalStatus.hodComments && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-yellow-600">HOD Comments</p>
                    <p className="font-medium text-yellow-900">{request.approvalStatus.hodComments}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transport Details */}
          <div className="bg-indigo-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-indigo-900 mb-4">Transport Arrangement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-indigo-600">Transport Type</p>
                <p className="font-medium text-indigo-900">{request.transportType}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-600">Requested Date</p>
                <p className="font-medium text-indigo-900">
                  {format(new Date(request.requestedDate), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Comments */}
          {request.comments && (
            <div className="bg-gray-50 p-6 rounded-md mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Special Comments</h3>
              <p className="text-gray-700">{request.comments}</p>
            </div>
          )}

          {/* Manager Comments Section */}
          {!showDenyForm && (
            <div className="bg-blue-50 p-6 rounded-md mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Manager Comments</h3>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                maxLength={500}
                rows={3}
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add your comments for this approval (optional)..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-blue-600">
                  {comments.length}/500 characters
                </p>
              </div>
            </div>
          )}

          {/* Deny Reason Form */}
          {showDenyForm && (
            <motion.div
              className="bg-red-50 p-6 rounded-md mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-red-900 mb-4">
                Reason for Final Denial *
              </h3>
              <textarea
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Please provide a detailed reason for denying this request as Asset Manager..."
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-red-600">
                  {denyReason.length}/500 characters
                </p>
                <p className="text-sm text-red-600">* Required field</p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {!showDenyForm ? (
              <>
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeny}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  disabled={isSubmitting}
                >
                  <SafeIcon icon={FiIcons.FiX} className="h-4 w-4 mr-2" />
                  Final Deny
                </button>
                <button
                  onClick={handleApprove}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <SafeIcon icon={FiIcons.FiCheck} className="h-4 w-4 mr-2" />
                  )}
                  Final Approve
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDenySubmit}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  disabled={isSubmitting || !denyReason.trim()}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <SafeIcon icon={FiIcons.FiX} className="h-4 w-4 mr-2" />
                  )}
                  Confirm Final Denial
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManagerApprovalModal;
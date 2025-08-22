import React from 'react';
import { format } from 'date-fns';
import QRCode from 'react-qr-code';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const ACDPrintView = ({ acdData }) => {
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-green-600 bg-green-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-orange-600 bg-orange-50';
      case 'damaged': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConditionLabel = (condition) => {
    const options = {
      'excellent': 'Excellent - No visible damage or wear',
      'good': 'Good - Minor wear, fully functional',
      'fair': 'Fair - Visible wear, functioning',
      'poor': 'Poor - Significant wear/damage',
      'damaged': 'Damaged - Requires repair'
    };
    return options[condition] || condition;
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto print:shadow-none shadow-lg">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">ASSET COLLECTION DOCUMENT</h1>
            <p className="text-lg text-blue-600 mt-2">Official Transfer Documentation</p>
          </div>
          <div className="text-right">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-md">
              <p className="font-bold">ACD #{acdData.acdNumber}</p>
              <p className="text-sm">Generated: {format(new Date(acdData.generatedDate), 'MMM dd, yyyy HH:mm')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Request Information */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <SafeIcon icon={FiIcons.FiFileText} className="mr-2" />
            Request Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span className="font-medium text-blue-700">Request ID:</span>
              <span className="text-blue-900">{acdData.request.requestId}</span>
            </div>
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span className="font-medium text-blue-700">Requested By:</span>
              <span className="text-blue-900">{acdData.request.requestedBy}</span>
            </div>
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span className="font-medium text-blue-700">Request Date:</span>
              <span className="text-blue-900">{format(new Date(acdData.request.requestDate), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Transport Type:</span>
              <span className="text-blue-900">{acdData.request.transportType}</span>
            </div>
          </div>
        </div>

        {/* Asset Information */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
            <SafeIcon icon={FiIcons.FiPackage} className="mr-2" />
            Asset Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-green-200 pb-2">
              <span className="font-medium text-green-700">Asset Name:</span>
              <span className="text-green-900">{acdData.request.assetName}</span>
            </div>
            <div className="flex justify-between border-b border-green-200 pb-2">
              <span className="font-medium text-green-700">Asset Code:</span>
              <span className="text-green-900 font-mono">{acdData.request.assetCode}</span>
            </div>
            <div className="flex justify-between border-b border-green-200 pb-2">
              <span className="font-medium text-green-700">Asset Tag:</span>
              <span className="text-green-900 font-mono">{acdData.collectionDetails.assetTagNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Category:</span>
              <span className="text-green-900">{acdData.request.assetCategory}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location and Approval Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Location Details */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
            <SafeIcon icon={FiIcons.FiMapPin} className="mr-2" />
            Location Transfer
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-purple-200">
              <p className="text-sm font-medium text-purple-700">FROM:</p>
              <p className="text-lg font-bold text-purple-900">{acdData.request.fromLocation}</p>
            </div>
            <div className="flex justify-center">
              <SafeIcon icon={FiIcons.FiArrowDown} className="text-purple-600 text-2xl" />
            </div>
            <div className="bg-white p-4 rounded-md border border-purple-200">
              <p className="text-sm font-medium text-purple-700">TO:</p>
              <p className="text-lg font-bold text-purple-900">{acdData.request.toLocation}</p>
            </div>
          </div>
        </div>

        {/* Approval Information */}
        <div className="bg-orange-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-orange-900 mb-4 flex items-center">
            <SafeIcon icon={FiIcons.FiCheckCircle} className="mr-2" />
            HOD Approval
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-orange-200 pb-2">
              <span className="font-medium text-orange-700">Approved By:</span>
              <span className="text-orange-900">{acdData.request.approvalStatus.approvedBy}</span>
            </div>
            <div className="flex justify-between border-b border-orange-200 pb-2">
              <span className="font-medium text-orange-700">Approval Date:</span>
              <span className="text-orange-900">{format(new Date(acdData.request.approvalStatus.approvedDate), 'MMM dd, yyyy')}</span>
            </div>
            <div className="bg-white p-3 rounded-md border border-orange-200">
              <p className="text-sm font-medium text-orange-700 mb-1">Comments:</p>
              <p className="text-orange-900">{acdData.request.approvalStatus.comments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Details */}
      <div className="bg-yellow-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
          <SafeIcon icon={FiIcons.FiClock} className="mr-2" />
          Collection Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md border border-yellow-200">
            <p className="text-sm font-medium text-yellow-700">Collection Date:</p>
            <p className="text-lg font-bold text-yellow-900">
              {format(new Date(acdData.collectionDetails.collectionDate), 'MMMM dd, yyyy')}
            </p>
          </div>
          <div className="bg-white p-4 rounded-md border border-yellow-200">
            <p className="text-sm font-medium text-yellow-700">Collection Time:</p>
            <p className="text-lg font-bold text-yellow-900">{acdData.collectionDetails.collectionTime}</p>
          </div>
          <div className="bg-white p-4 rounded-md border border-yellow-200">
            <p className="text-sm font-medium text-yellow-700">Collected By:</p>
            <p className="text-lg font-bold text-yellow-900">{acdData.collectionDetails.driverName}</p>
          </div>
        </div>
      </div>

      {/* Asset Condition */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiIcons.FiEye} className="mr-2" />
          Asset Condition Assessment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Condition at Collection:</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${getConditionColor(acdData.collectionDetails.assetCondition)}`}>
              <SafeIcon icon={FiIcons.FiShield} className="mr-2" />
              {getConditionLabel(acdData.collectionDetails.assetCondition)}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-md border-2 border-gray-300">
              <p className="text-sm font-medium text-gray-700 mb-2 text-center">Asset QR Code:</p>
              <QRCode
                value={`${acdData.request.assetCode}-${acdData.request.assetId}`}
                size={120}
              />
            </div>
          </div>
        </div>
        {acdData.collectionDetails.collectionNotes && (
          <div className="mt-4 bg-white p-4 rounded-md border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Additional Notes:</p>
            <p className="text-gray-900">{acdData.collectionDetails.collectionNotes}</p>
          </div>
        )}
      </div>

      {/* OTP Verification */}
      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
          <SafeIcon icon={FiIcons.FiLock} className="mr-2" />
          OTP Verification
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md border border-red-200">
            <p className="text-sm font-medium text-red-700">Driver OTP:</p>
            <p className="text-2xl font-mono font-bold text-red-900 tracking-widest">
              {acdData.collectionDetails.driverOTP}
            </p>
            <p className="text-xs text-red-600 mt-1">Verified: {format(new Date(acdData.collectionDetails.timestamp), 'HH:mm:ss')}</p>
          </div>
          <div className="bg-white p-4 rounded-md border border-red-200">
            <p className="text-sm font-medium text-red-700">Custodian OTP:</p>
            <p className="text-2xl font-mono font-bold text-red-900 tracking-widest">
              {acdData.collectionDetails.custodianOTP}
            </p>
            <p className="text-xs text-red-600 mt-1">Verified: {format(new Date(acdData.collectionDetails.timestamp), 'HH:mm:ss')}</p>
          </div>
        </div>
      </div>

      {/* Transport Information */}
      {acdData.request.transportDetails && (
        <div className="bg-indigo-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4 flex items-center">
            <SafeIcon icon={FiIcons.FiTruck} className="mr-2" />
            Transport Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-indigo-200 pb-2">
                <span className="font-medium text-indigo-700">Vehicle Registration:</span>
                <span className="text-indigo-900 font-mono">{acdData.request.transportDetails.registration}</span>
              </div>
              <div className="flex justify-between border-b border-indigo-200 pb-2">
                <span className="font-medium text-indigo-700">Driver:</span>
                <span className="text-indigo-900">{acdData.request.transportDetails.driver}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-indigo-200 pb-2">
                <span className="font-medium text-indigo-700">Transport Type:</span>
                <span className="text-indigo-900">{acdData.request.transportDetails.isInternal ? 'Internal' : 'External'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-indigo-700">Vehicle Type:</span>
                <span className="text-indigo-900">{acdData.request.transportDetails.vehicleType}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signatures Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Signature</h3>
          <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
          <p className="text-sm text-gray-600">Name: {acdData.collectionDetails.driverName}</p>
          <p className="text-sm text-gray-600">Date: {format(new Date(acdData.collectionDetails.collectionDate), 'MMM dd, yyyy')}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Custodian</h3>
          <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
          <p className="text-sm text-gray-600">Name: {acdData.custodianDetails.currentCustodian}</p>
          <p className="text-sm text-gray-600">Date: {format(new Date(acdData.collectionDetails.collectionDate), 'MMM dd, yyyy')}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">HOD Authorization</h3>
          <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
          <p className="text-sm text-gray-600">Name: {acdData.request.approvalStatus.approvedBy}</p>
          <p className="text-sm text-gray-600">Date: {format(new Date(acdData.request.approvalStatus.approvedDate), 'MMM dd, yyyy')}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-300 pt-6 text-center">
        <p className="text-sm text-gray-600">
          This document certifies the official collection of the above-mentioned asset for relocation purposes.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Generated on {format(new Date(acdData.generatedDate), 'MMMM dd, yyyy')} at {format(new Date(acdData.generatedDate), 'HH:mm:ss')}
        </p>
        <p className="text-xs text-gray-500">
          Document ID: ACD-{acdData.acdNumber} | Asset Relocation System v2.0
        </p>
      </div>
    </div>
  );
};

export default ACDPrintView;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ACDPrintView from './ACDPrintView';

const ACDSampleDemo = () => {
  const [showSample, setShowSample] = useState(false);

  // Sample ACD data
  const sampleACDData = {
    acdNumber: "2024-001-ACD",
    generatedDate: "2024-02-15T14:30:00Z",
    request: {
      requestId: "REQ-2024-001",
      requestedBy: "John Smith",
      requestDate: "2024-02-01T09:00:00Z",
      transportType: "Internal",
      assetName: "Executive Desk - Oak",
      assetCode: "FUR-001",
      assetId: 1,
      assetCategory: "Furniture",
      fromLocation: "Main Office - Floor 1",
      toLocation: "Main Office - Floor 3",
      approvalStatus: {
        approvedBy: "Michael Brown (HOD)",
        approvedDate: "2024-02-07T11:30:00Z",
        comments: "Approved for CEO office relocation - handle with care"
      },
      transportDetails: {
        isInternal: true,
        registration: "ABC123GP",
        driver: "Steve Wilson",
        vehicleType: "2-Ton Truck"
      }
    },
    collectionDetails: {
      collectionDate: "2024-02-15",
      collectionTime: "14:30",
      assetCondition: "excellent",
      assetTagNumber: "FUR-001-0001",
      driverOTP: "789654",
      custodianOTP: "123456",
      collectionNotes: "Asset in excellent condition. All drawers and hardware intact. Minor scuff on left side panel noted.",
      driverName: "Steve Wilson",
      timestamp: "2024-02-15T14:30:00Z"
    },
    custodianDetails: {
      currentCustodian: "Robert Johnson",
      newCustodian: "Sarah Davis"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Asset Collection Document (ACD) Sample
            </h1>
            <p className="text-lg text-gray-600">
              This is a sample of how the completed ACD would appear when generated and printed.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowSample(!showSample)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center"
            >
              <SafeIcon icon={FiIcons.FiEye} className="mr-2" />
              {showSample ? 'Hide Sample ACD' : 'View Sample ACD'}
            </button>
          </div>
        </div>

        {showSample && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg"
          >
            <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Asset Collection Document - Sample Output
              </h2>
              <button
                onClick={() => window.print()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
              >
                <SafeIcon icon={FiIcons.FiPrinter} className="mr-2" />
                Print Document
              </button>
            </div>
            
            <ACDPrintView acdData={sampleACDData} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ACDSampleDemo;
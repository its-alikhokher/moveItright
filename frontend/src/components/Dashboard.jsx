import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';
import TransportDetailsForm from './TransportDetailsForm';
import AdminTransportAssignmentForm from './AdminTransportAssignmentForm';
import HODApprovalModal from './HODApprovalModal';
import ManagerApprovalModal from './ManagerApprovalModal';
import NotificationModal from './NotificationModal';
import ACDPrintView from './ACDPrintView';
import { relocationRequests } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { 
  getFilteredRequests, 
  getDashboardConfig, 
  canViewRequest,
  canCreateRequest,
  canApproveRequests,
  canFinalApproveRequests,
  canAssignTransport 
} from '../utils/permissions';

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTransportForm, setShowTransportForm] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showManagerApprovalModal, setShowManagerApprovalModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showACDView, setShowACDView] = useState(false);
  const [showAdminTransportForm, setShowAdminTransportForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notification, setNotification] = useState(null);
  const [requests, setRequests] = useState(relocationRequests);
  
  // Get current user and permissions
  const { user } = useAuth();
  const dashboardConfig = getDashboardConfig(user);
  const filteredRequestsByRole = getFilteredRequests(requests, user);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending HOD Approval': return 'bg-yellow-100 text-yellow-800';
      case 'HOD Approved': return 'bg-blue-100 text-blue-800';
      case 'Pending Manager Approval': return 'bg-orange-100 text-orange-800';
      case 'Manager Approved': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Admin Transport': return 'bg-purple-100 text-purple-800';
      case 'Transport Arranged': return 'bg-blue-100 text-blue-800';
      case 'External Transport Required': return 'bg-orange-100 text-orange-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending HOD Approval': return FiIcons.FiClock;
      case 'HOD Approved': return FiIcons.FiCheckCircle;
      case 'Pending Manager Approval': return FiIcons.FiClock;
      case 'Manager Approved': return FiIcons.FiCheck;
      case 'Approved': return FiIcons.FiCheck;
      case 'Pending Admin Transport': return FiIcons.FiUsers;
      case 'Transport Arranged': return FiIcons.FiCheckCircle;
      case 'External Transport Required': return FiIcons.FiAlertTriangle;
      case 'In Progress': return FiIcons.FiTruck;
      case 'Completed': return FiIcons.FiCheckCircle;
      case 'Denied': return FiIcons.FiX;
      default: return FiIcons.FiInfo;
    }
  };

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'system_admin': return 'System Administrator Dashboard';
      case 'custodian': return 'My Asset Relocation Requests';
      case 'transport_admin': return 'Transport Assignment Dashboard';
      case 'hod': return 'HOD Approval Dashboard';
      case 'asset_manager': return 'Asset Manager Dashboard';
      default: return 'Asset Relocation Dashboard';
    }
  };

  const getStatsCards = () => {
    const baseStats = [
      { 
        label: 'Total Requests', 
        value: filteredRequestsByRole.length, 
        color: 'bg-blue-500', 
        icon: FiIcons.FiFileText 
      }
    ];

    switch (user?.role) {
      case 'custodian':
        return [
          ...baseStats,
          { 
            label: 'Pending Approval', 
            value: filteredRequestsByRole.filter(r => r.status.includes('Pending')).length, 
            color: 'bg-yellow-500', 
            icon: FiIcons.FiClock 
          },
          { 
            label: 'Approved', 
            value: filteredRequestsByRole.filter(r => r.status.includes('Approved')).length, 
            color: 'bg-green-500', 
            icon: FiIcons.FiCheck 
          },
          { 
            label: 'In Progress', 
            value: filteredRequestsByRole.filter(r => r.status === 'In Progress').length, 
            color: 'bg-blue-500', 
            icon: FiIcons.FiTruck 
          }
        ];

      case 'transport_admin':
        return [
          ...baseStats,
          { 
            label: 'Pending Transport Assignment', 
            value: filteredRequestsByRole.filter(r => r.status === 'Pending Admin Transport').length, 
            color: 'bg-purple-500', 
            icon: FiIcons.FiUsers 
          },
          { 
            label: 'Transport Arranged', 
            value: filteredRequestsByRole.filter(r => r.status === 'Transport Arranged').length, 
            color: 'bg-green-500', 
            icon: FiIcons.FiCheck 
          },
          { 
            label: 'External Required', 
            value: filteredRequestsByRole.filter(r => r.status === 'External Transport Required').length, 
            color: 'bg-orange-500', 
            icon: FiIcons.FiAlertTriangle 
          }
        ];

      case 'hod':
        return [
          ...baseStats,
          { 
            label: 'Pending My Approval', 
            value: filteredRequestsByRole.filter(r => r.status === 'Pending HOD Approval').length, 
            color: 'bg-yellow-500', 
            icon: FiIcons.FiClock 
          },
          { 
            label: 'Approved by Me', 
            value: filteredRequestsByRole.filter(r => r.status === 'HOD Approved').length, 
            color: 'bg-green-500', 
            icon: FiIcons.FiCheck 
          },
          { 
            label: 'Completed', 
            value: filteredRequestsByRole.filter(r => r.status === 'Completed').length, 
            color: 'bg-gray-500', 
            icon: FiIcons.FiCheckCircle 
          }
        ];

      case 'asset_manager':
        return [
          ...baseStats,
          { 
            label: 'Pending Final Approval', 
            value: filteredRequestsByRole.filter(r => r.status === 'Pending Manager Approval').length, 
            color: 'bg-orange-500', 
            icon: FiIcons.FiClock 
          },
          { 
            label: 'Final Approved', 
            value: filteredRequestsByRole.filter(r => r.status === 'Manager Approved').length, 
            color: 'bg-green-500', 
            icon: FiIcons.FiCheck 
          },
          { 
            label: 'Completed', 
            value: filteredRequestsByRole.filter(r => r.status === 'Completed').length, 
            color: 'bg-gray-500', 
            icon: FiIcons.FiCheckCircle 
          }
        ];

      default:
        return [
          ...baseStats,
          { 
            label: 'Pending Approval', 
            value: filteredRequestsByRole.filter(r => r.status.includes('Pending')).length, 
            color: 'bg-yellow-500', 
            icon: FiIcons.FiClock 
          },
          { 
            label: 'Approved', 
            value: filteredRequestsByRole.filter(r => r.status.includes('Approved')).length, 
            color: 'bg-green-500', 
            icon: FiIcons.FiCheck 
          },
          { 
            label: 'Completed', 
            value: filteredRequestsByRole.filter(r => r.status === 'Completed').length, 
            color: 'bg-gray-500', 
            icon: FiIcons.FiCheckCircle 
          }
        ];
    }
  };

  const handleViewDetails = (request) => {
    if (!canViewRequest(request, user)) {
      setNotification({
        type: 'error',
        title: 'Access Denied',
        message: 'You do not have permission to view this request.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
      return;
    }

    setSelectedRequest({
      acdNumber: request.requestId.replace('REQ', 'ACD'),
      generatedDate: new Date().toISOString(),
      request: {
        requestId: request.requestId,
        requestedBy: request.requestedBy,
        requestDate: request.requestDate,
        transportType: request.transportType,
        assetName: request.assetName,
        assetCode: request.assetCode,
        assetId: request.assetId,
        assetCategory: request.assetCategory,
        fromLocation: request.fromLocation,
        toLocation: request.toLocation,
        approvalStatus: request.approvalStatus.isApproved ? {
          approvedBy: request.approvalStatus.approvedBy || 'HOD',
          approvedDate: request.approvalStatus.approvedDate || new Date().toISOString(),
          comments: request.approvalStatus.comments || 'Approved'
        } : {
          approvedBy: 'HOD',
          approvedDate: new Date().toISOString(),
          comments: 'Approved for viewing'
        },
        transportDetails: request.transportDetails || {
          isInternal: request.transportType === 'Internal',
          registration: 'ABC123GP',
          driver: 'John Doe',
          vehicleType: '2-Ton Truck'
        }
      },
      collectionDetails: {
        collectionDate: request.transportDetails?.dispatchDate || new Date().toISOString(),
        collectionTime: format(new Date(), 'HH:mm'),
        assetCondition: 'excellent',
        assetTagNumber: `${request.assetCode}-${String(request.assetId).padStart(4, '0')}`,
        driverOTP: '123456',
        custodianOTP: '789012',
        driverName: request.transportDetails?.driver || 'John Doe',
        timestamp: new Date().toISOString(),
        collectionNotes: 'Asset collected in good condition'
      },
      custodianDetails: {
        currentCustodian: 'Current Custodian',
        newCustodian: 'New Custodian'
      }
    });
    setShowACDView(true);
  };

  const handleHODApproval = (request) => {
    if (!canApproveRequests(user) || request.assignedHODId !== user.id) {
      setNotification({
        type: 'error',
        title: 'Access Denied',
        message: 'You do not have permission to approve this request.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
      return;
    }
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  const handleManagerApproval = (request) => {
    if (!canFinalApproveRequests(user) || request.assignedManagerId !== user.id) {
      setNotification({
        type: 'error',
        title: 'Access Denied',
        message: 'You do not have permission to provide final approval for this request.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
      return;
    }
    setSelectedRequest(request);
    setShowManagerApprovalModal(true);
  };

  const handleHODApprove = async (requestId, approvalData) => {
    try {
      setRequests(prev => prev.map(req => 
        req.id === requestId ? {
          ...req,
          status: 'Pending Manager Approval',
          approvalStatus: {
            isApproved: true,
            hodApprovedBy: user.name,
            hodApprovedDate: new Date().toISOString(),
            hodComments: approvalData.comments
          }
        } : req
      ));
      setNotification({
        type: 'approved',
        title: 'Request Approved by HOD',
        message: 'The request has been approved and forwarded to Asset Manager for final approval.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleManagerApprove = async (requestId, approvalData) => {
    try {
      setRequests(prev => prev.map(req => 
        req.id === requestId ? {
          ...req,
          status: req.transportType === 'Internal' ? 'Pending Admin Transport' : 'Approved',
          approvalStatus: {
            ...req.approvalStatus,
            isApproved: true,
            managerApprovedBy: user.name,
            managerApprovedDate: new Date().toISOString(),
            managerComments: approvalData.comments
          }
        } : req
      ));
      setNotification({
        type: 'approved',
        title: 'Request Final Approved',
        message: selectedRequest.transportType === 'Internal' 
          ? 'The request has been approved and sent to Transport Admin for vehicle assignment.'
          : 'The request has been fully approved and is ready for execution.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
    } catch (error) {
      console.error('Error final approving request:', error);
    }
  };

  const handleDeny = async (requestId, denialData) => {
    try {
      setRequests(prev => prev.map(req => 
        req.id === requestId ? {
          ...req,
          status: 'Denied',
          approvalStatus: {
            isApproved: false,
            deniedBy: user.name,
            deniedDate: new Date().toISOString(),
            denialReason: denialData.reason
          }
        } : req
      ));
      setNotification({
        type: 'denied',
        title: 'Request Denied',
        message: 'The asset relocation request has been denied.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
    } catch (error) {
      console.error('Error denying request:', error);
    }
  };

  const handleAdminTransportAssignment = (request) => {
    if (!canAssignTransport(user)) {
      setNotification({
        type: 'error',
        title: 'Access Denied',
        message: 'You do not have permission to assign transport.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
      return;
    }
    setSelectedRequest(request);
    setShowAdminTransportForm(true);
  };
  
  const handleAdminTransportSubmit = (assignmentData) => {
    try {
      setRequests(prev => prev.map(req => 
        req.id === selectedRequest.id ? {
          ...req,
          status: assignmentData.status,
          transportDetails: assignmentData.transportDetails || req.transportDetails,
          adminProcessedBy: assignmentData.adminProcessedBy,
          adminProcessedDate: assignmentData.adminProcessedDate,
          unavailabilityReason: assignmentData.unavailabilityReason
        } : req
      ));
      setShowAdminTransportForm(false);
      
      const notificationMessage = assignmentData.assignmentOption === 'assign' 
        ? 'Internal transport has been assigned to the request.'
        : 'Request returned to requester for external transport arrangement.';
        
      setNotification({
        type: assignmentData.assignmentOption === 'assign' ? 'success' : 'warning',
        title: assignmentData.assignmentOption === 'assign' ? 'Transport Assigned' : 'External Transport Required',
        message: notificationMessage,
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
    } catch (error) {
      console.error('Error processing admin transport assignment:', error);
    }
  };

  const handleSubmitForApproval = (request) => {
    try {
      setRequests(prev => prev.map(req => 
        req.id === request.id ? {
          ...req,
          status: 'Pending HOD Approval'
        } : req
      ));
      
      setNotification({
        type: 'success',
        title: 'Request Submitted for Approval',
        message: 'The request has been submitted to HOD for approval.',
        timestamp: new Date().toISOString()
      });
      setShowNotification(true);
    } catch (error) {
      console.error('Error submitting for approval:', error);
    }
  };

  const filteredRequests = filteredRequestsByRole.filter(request => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && request.status.includes('Pending')) ||
      (filter === 'admin' && request.status === 'Pending Admin Transport') ||
      (filter === 'arranged' && request.status === 'Transport Arranged') ||
      (filter === 'external' && request.status === 'External Transport Required') ||
      (filter === 'approved' && request.status.includes('Approved')) ||
      (filter === 'progress' && request.status === 'In Progress') ||
      (filter === 'completed' && request.status === 'Completed');
    
    const matchesSearch = searchTerm === '' || 
      request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{getDashboardTitle()}</h1>
        <p className="text-gray-600">
          {user?.role === 'custodian' && 'View and manage your asset relocation requests'}
          {user?.role === 'transport_admin' && 'Assign internal transport or approve external transport requirements'}
          {user?.role === 'hod' && 'Review and approve asset relocation requests for your department'}
          {user?.role === 'asset_manager' && 'Provide final approval for asset relocations in your category'}
          {user?.role === 'system_admin' && 'Monitor and manage all system activities and user interactions'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {getStatsCards().map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Role Info */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <div className="flex items-center">
          <SafeIcon icon={FiIcons.FiUser} className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Logged in as: {user?.name} ({user?.department})
            </p>
            <p className="text-xs text-blue-600">
              Role: {user?.role === 'system_admin' ? 'System Administrator' : 
                    user?.role === 'custodian' ? 'Asset Custodian' :
                    user?.role === 'transport_admin' ? 'Transport Administrator' :
                    user?.role === 'hod' ? 'Head of Department' :
                    user?.role === 'asset_manager' ? 'Asset Manager' : user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            {dashboardConfig?.canAssignTransport && (
              <button
                onClick={() => setFilter('admin')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Transport Queue
              </button>
            )}
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
          <div className="relative">
            <SafeIcon icon={FiIcons.FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location Transfer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.requestId}</div>
                      <div className="text-sm text-gray-500">By: {request.requestedBy}</div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(request.requestDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.assetName}</div>
                      <div className="text-sm text-gray-500">{request.assetCode}</div>
                      <div className="text-sm text-gray-500">{request.assetCategory}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="truncate max-w-32">{request.fromLocation}</span>
                        <SafeIcon icon={FiIcons.FiArrowRight} className="mx-2 h-4 w-4 text-gray-400" />
                        <span className="truncate max-w-32">{request.toLocation}</span>
                      </div>
                      <div className="text-sm text-gray-500">{request.transportType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      <SafeIcon icon={getStatusIcon(request.status)} className="mr-1 h-3 w-3" />
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {/* Transport Admin actions */}
                    {dashboardConfig?.canAssignTransport && request.status === 'Pending Admin Transport' && (
                      <button
                        onClick={() => handleAdminTransportAssignment(request)}
                        className="text-purple-600 hover:text-purple-900 mr-4"
                        title="Assign Transport"
                      >
                        <SafeIcon icon={FiIcons.FiTruck} className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* HOD approval action */}
                    {dashboardConfig?.canApproveRequests && request.status === 'Pending HOD Approval' && request.assignedHODId === user.id && (
                      <button
                        onClick={() => handleHODApproval(request)}
                        className="text-orange-600 hover:text-orange-900 mr-4"
                        title="HOD Approval"
                      >
                        <SafeIcon icon={FiIcons.FiUserCheck} className="h-4 w-4" />
                      </button>
                    )}

                    {/* Manager approval action */}
                    {dashboardConfig?.canFinalApprove && request.status === 'Pending Manager Approval' && request.assignedManagerId === user.id && (
                      <button
                        onClick={() => handleManagerApproval(request)}
                        className="text-green-600 hover:text-green-900 mr-4"
                        title="Final Approval"
                      >
                        <SafeIcon icon={FiIcons.FiCheckCircle} className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* Submit for approval after external transport is required */}
                    {user?.role === 'custodian' && request.requestedByUserId === user.id && request.status === 'External Transport Required' && (
                      <button
                        onClick={() => handleSubmitForApproval(request)}
                        className="text-green-600 hover:text-green-900 mr-4"
                        title="Submit for Approval"
                      >
                        <SafeIcon icon={FiIcons.FiSend} className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* View ACD (for all requests user can access) */}
                    {canViewRequest(request, user) && (
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        title="View Details"
                      >
                        <SafeIcon icon={FiIcons.FiEye} className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
              
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No requests found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ACD View Modal */}
      {showACDView && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl">
              <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Asset Collection Document
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                  >
                    <SafeIcon icon={FiIcons.FiPrinter} className="mr-2" />
                    Print Document
                  </button>
                  <button
                    onClick={() => setShowACDView(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <ACDPrintView acdData={selectedRequest} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showApprovalModal && selectedRequest && (
        <HODApprovalModal
          request={selectedRequest}
          onApprove={handleHODApprove}
          onDeny={handleDeny}
          onClose={() => setShowApprovalModal(false)}
        />
      )}

      {showManagerApprovalModal && selectedRequest && (
        <ManagerApprovalModal
          request={selectedRequest}
          onApprove={handleManagerApprove}
          onDeny={handleDeny}
          onClose={() => setShowManagerApprovalModal(false)}
        />
      )}
      
      {showAdminTransportForm && selectedRequest && (
        <AdminTransportAssignmentForm
          request={selectedRequest}
          onSubmit={handleAdminTransportSubmit}
          onClose={() => setShowAdminTransportForm(false)}
        />
      )}

      {showNotification && notification && (
        <NotificationModal
          notification={notification}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
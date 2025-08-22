import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AssetRelocationForm from './AssetRelocationForm';
import { useAuth } from '../context/AuthContext';
import { canCreateRequest } from '../utils/permissions';

const Sidebar = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const handleNewRequest = () => {
    if (!canCreateRequest(user)) {
      alert('You do not have permission to create requests.');
      return;
    }
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const getQuickActions = () => {
    const actions = [];

    // Common actions for all roles
    actions.push({
      icon: FiIcons.FiList,
      label: 'View All Requests',
      description: 'View requests you have access to'
    });

    // Role-specific actions
    switch (user?.role) {
      case 'custodian':
        actions.push(
          {
            icon: FiIcons.FiClock,
            label: 'My Pending Requests',
            description: 'View your pending requests'
          },
          {
            icon: FiIcons.FiCheck,
            label: 'My Approved Requests',
            description: 'View your approved requests'
          }
        );
        break;

      case 'transport_admin':
        actions.push(
          {
            icon: FiIcons.FiTruck,
            label: 'Transport Queue',
            description: 'Requests needing transport assignment'
          },
          {
            icon: FiIcons.FiSettings,
            label: 'Manage Vehicles',
            description: 'Manage internal vehicle fleet'
          }
        );
        break;

      case 'hod':
        actions.push(
          {
            icon: FiIcons.FiUserCheck,
            label: 'Pending Approvals',
            description: 'Requests awaiting your approval'
          },
          {
            icon: FiIcons.FiCheckCircle,
            label: 'Approved by Me',
            description: 'Requests you have approved'
          }
        );
        break;

      case 'asset_manager':
        actions.push(
          {
            icon: FiIcons.FiAward,
            label: 'Final Approvals',
            description: 'Requests needing final approval'
          },
          {
            icon: FiIcons.FiBarChart,
            label: 'Category Reports',
            description: 'View reports for your categories'
          }
        );
        break;

      case 'system_admin':
        actions.push(
          {
            icon: FiIcons.FiUsers,
            label: 'Manage Users',
            description: 'Manage system users'
          },
          {
            icon: FiIcons.FiSettings,
            label: 'System Settings',
            description: 'Configure system settings'
          }
        );
        break;
    }

    return actions;
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Asset Relocation</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <SafeIcon icon={FiIcons.FiX} className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* User Role Info */}
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiIcons.FiUser} className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">{user?.name}</span>
            </div>
            <p className="text-sm text-blue-600">{user?.department}</p>
            <p className="text-xs text-blue-500 capitalize">
              {user?.role === 'system_admin' ? 'System Administrator' : 
               user?.role === 'custodian' ? 'Asset Custodian' :
               user?.role === 'transport_admin' ? 'Transport Administrator' :
               user?.role === 'hod' ? 'Head of Department' :
               user?.role === 'asset_manager' ? 'Asset Manager' : user?.role}
            </p>
          </div>

          {/* New Request Button - Only for custodians */}
          {canCreateRequest(user) && (
            <button
              onClick={handleNewRequest}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center mb-6"
            >
              <SafeIcon icon={FiIcons.FiPlus} className="h-5 w-5 mr-2" />
              New Relocation Request
            </button>
          )}

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {getQuickActions().map((action, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <div className="flex items-start">
                    <SafeIcon icon={action.icon} className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{action.label}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Access Info - for non-admin users */}
          {user?.role !== 'system_admin' && user?.role !== 'transport_admin' && user?.assignedLocations?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Your Assigned Locations</h3>
              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md">
                <p>You have access to {user.assignedLocations.length} location{user.assignedLocations.length !== 1 ? 's' : ''}:</p>
                <ul className="mt-1 list-disc list-inside">
                  {user.assignedLocations.slice(0, 3).map((locId, index) => (
                    <li key={index}>Location {locId}</li>
                  ))}
                  {user.assignedLocations.length > 3 && (
                    <li>... and {user.assignedLocations.length - 3} more</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Category Access Info - for asset managers */}
          {user?.role === 'asset_manager' && user?.assignedCategories?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Your Assigned Categories</h3>
              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md">
                <p>You manage {user.assignedCategories.length} categor{user.assignedCategories.length !== 1 ? 'ies' : 'y'}:</p>
                <ul className="mt-1 list-disc list-inside">
                  {user.assignedCategories.map((catId, index) => (
                    <li key={index}>Category {catId}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* Asset Relocation Form Modal */}
      {showForm && (
        <AssetRelocationForm
          isOpen={showForm}
          onClose={handleFormClose}
        />
      )}
    </>
  );
};

export default Sidebar;
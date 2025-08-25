import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const Header = ({ onSidebarToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-md hover:bg-gray-100 mr-4"
          >
            <SafeIcon icon={FiIcons.FiMenu} className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <SafeIcon icon={FiIcons.FiPackage} className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Asset Relocation System</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <SafeIcon icon={FiIcons.FiUser} className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            title="Logout"
          >
            <SafeIcon icon={FiIcons.FiLogOut} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
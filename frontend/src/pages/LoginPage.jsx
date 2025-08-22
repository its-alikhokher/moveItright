import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(formData.email, formData.password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  const demoUsers = [
    {
      role: 'System Administrator',
      email: 'admin@moveitright.com',
      password: 'admin123',
      description: 'Full system access and user management'
    },
    {
      role: 'Asset Custodian',
      email: 'john.smith@company.com',
      password: 'user123',
      description: 'Can create relocation requests for assigned locations'
    },
    {
      role: 'Transport Administrator',
      email: 'transport.admin@company.com',
      password: 'transport123',
      description: 'Assigns internal transport or approves external transport'
    },
    {
      role: 'HOD (Finance)',
      email: 'michael.brown@company.com',
      password: 'hod123',
      description: 'First-line approval for department requests'
    },
    {
      role: 'Asset Manager (Furniture)',
      email: 'sarah.wilson@company.com',
      password: 'manager123',
      description: 'Final approval for furniture and office equipment'
    },
    {
      role: 'Asset Manager (IT)',
      email: 'lisa.chen@company.com',
      password: 'manager123',
      description: 'Final approval for IT equipment'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <SafeIcon icon={FiIcons.FiPackage} className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          MoveItRight Asset System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <SafeIcon icon={FiIcons.FiAlertCircle} className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo User Accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {demoUsers.map((demoUser, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{demoUser.role}</p>
                      <p className="text-xs text-gray-600">{demoUser.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ email: demoUser.email, password: demoUser.password })}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Email: {demoUser.email}</p>
                    <p>Password: {demoUser.password}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
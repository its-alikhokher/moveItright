import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { useFrappeGetDocCount } from 'frappe-react-sdk';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userCount, setUserCount] = useState(null);
  const { data, error, isValidating } = useFrappeGetDocCount('User');

  useEffect(() => {
    if (data !== undefined) {
      console.log(`📊 Total Users: ${data}`);
      setUserCount(data);
    }
  }, [data]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    console.log("Sidebar close requested");
    console.log("👉 Current user count:", userCount);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={handleSidebarToggle} />
        <main className="flex-1 overflow-y-auto">
          <Dashboard />
          {/* Show in UI also */}
          {isValidating && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
          {userCount !== null && <p>{userCount} total users</p>}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

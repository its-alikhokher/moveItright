import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={handleSidebarToggle} />
        
        <main className="flex-1 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
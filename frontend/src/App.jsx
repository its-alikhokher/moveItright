import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ACDSamplePage from './pages/ACDSamplePage';
import DatabaseSetupPage from './pages/DatabaseSetupPage';
import MainPage from './components/MainPage';
import { FrappeProvider } from "frappe-react-sdk";


function App() {
  return (
    <FrappeProvider>
    {
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/acd-sample" element={<ACDSamplePage />} />
            <Route path="/database-setup" element={<DatabaseSetupPage />} />
            <Route path="/" element={<MainPage />} />
            <Route
              path="/web"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
              />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
      }
    </FrappeProvider>
  );
}

export default App;

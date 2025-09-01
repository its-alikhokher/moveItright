import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ACDSamplePage from './pages/ACDSamplePage';
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
            <Route path="/web" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/acd-sample" element={<ACDSamplePage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
      }
    </FrappeProvider>
  );
}

export default App;

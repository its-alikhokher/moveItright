import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Simple React app like normal website
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

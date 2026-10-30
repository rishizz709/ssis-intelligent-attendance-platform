import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContent from './App';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <StudentProvider>
        <AppContent />
      </StudentProvider>
    </AuthProvider>
  </React.StrictMode>
);

// src/App.tsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SideNav from './components/Common/SideNav';
import AppRoutes from './routes';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <SideNav />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;

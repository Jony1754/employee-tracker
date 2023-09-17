// src/App.tsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import { SidenavToggleProvider } from './context/SidenavToggleContext';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <SidenavToggleProvider>
        <Router>
          <AppRoutes />
        </Router>
      </SidenavToggleProvider>
    </AuthProvider>
  );
};

export default App;

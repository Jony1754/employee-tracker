// src/routes/index.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeManagement from '../containers/Dashboard/EmployeeManagement';
import Statistics from '../containers/Dashboard/Statistics';
import Login from '../containers/Login';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' Component={Login} />
      <Route path='/dashboard' Component={EmployeeManagement} />
      <Route path='/statistics' Component={Statistics} />
      <Route path='/' Component={EmployeeManagement} />
    </Routes>
  );
};

export default AppRoutes;

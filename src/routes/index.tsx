import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import GeneralView from '../containers/Dashboard';
import DashboardLayout from '../components/containers/DashboardLayout';
import Login from '../containers/Login';
import HomePage from '../containers/HomePage';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index path='/login' element={<Login />} />
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/dashboard/*' element={<DashboardLayout />}>
        <Route path='home' element={<HomePage />} />
        <Route path='empleados' element={<GeneralView title='Empleados' />} />
        <Route path='cargos' element={<GeneralView title='Cargos' />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

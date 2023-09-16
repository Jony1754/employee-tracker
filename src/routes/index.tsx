import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GeneralView from '../containers/Dashboard';
import DashboardLayout from '../components/containers/DashboardLayout';
import Login from '../containers/Login';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Login />} />
      <Route path='/dashboard/*' element={<DashboardLayout />}>
        <Route index element={<GeneralView title='Home' />} />
        <Route path='empleados' element={<GeneralView title='Empleados' />} />
        <Route path='cargos' element={<GeneralView title='Cargos' />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

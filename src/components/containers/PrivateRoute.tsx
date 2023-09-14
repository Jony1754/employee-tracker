// src/components/PrivateRoute.tsx

import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  rest?: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element, rest }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  return (
    <Route
      path={path}
      element={authContext.isAuthenticated ? element : <Navigate to='/login' />}
    />
  );
};

export default PrivateRoute;

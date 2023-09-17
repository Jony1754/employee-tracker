import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  children,
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  return authContext.isAuthenticated ? (
    <Route path={path} element={element}>
      {children}
    </Route>
  ) : (
    <Navigate to='/login' replace />
  );
};

export default PrivateRoute;

import { useNavigate } from 'react-router-dom';
import { ReactNode, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import SideNav from '../Common/SideNav';
import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';
interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext) {
      throw new Error('AuthContext is undefined');
    }
    if (!authContext.isAuthenticated) {
      navigate('/login');
    }
  }, [authContext, navigate]);

  return (
    <div className={styles['dashboard-layout']}>
      <Outlet />
      <SideNav />
      {children}
    </div>
  );
};

export default DashboardLayout;

import React, { ReactNode } from 'react';
import SideNav from '../Common/SideNav';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <SideNav />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;

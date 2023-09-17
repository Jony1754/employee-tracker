import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SidenavToggleContextProps {
  isExpanded: boolean;
  toggleSidenav: () => void;
}

const SidenavToggleContext = createContext<
  SidenavToggleContextProps | undefined
>(undefined);

export const SidenavToggleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidenav = () => setIsExpanded((prev) => !prev);

  return (
    <SidenavToggleContext.Provider value={{ isExpanded, toggleSidenav }}>
      {children}
    </SidenavToggleContext.Provider>
  );
};

export const useSidenavToggle = () => {
  const context = useContext(SidenavToggleContext);
  if (context === undefined) {
    throw new Error(
      'useSidenavToggle must be used within a SidenavToggleProvider'
    );
  }
  return context;
};

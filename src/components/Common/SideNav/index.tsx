// src/components/Common/SideNav/index.tsx

import React from 'react';
import styles from './SideNav.module.css';

const SideNav: React.FC = () => {
  return (
    <nav className={styles['sidenav']}>
      <ul>
        <li className={styles['nav-item']}>Inicio</li>
        <li className={styles['nav-item']}>Gestión de Empleados</li>
        <li className={styles['nav-item']}>Estadísticas</li>
        <li className={styles['nav-item']}>Configuraciones</li>
      </ul>
    </nav>
  );
};

export default SideNav;

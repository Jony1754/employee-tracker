import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './SideNav.module.css';
import menuImage from '../../../assets/images/menu.svg';
const SideNav: React.FC = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleListOpen = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <ul className={styles['side-nav']}>
      <div className={styles.toggle}>
        <img className={styles.menu} src={menuImage} alt='' />
      </div>
      <li className={styles['home']}>
        <Link to='/dashboard'>Home</Link>
      </li>
      <li onClick={toggleListOpen}>Listas</li>
      {isListOpen && (
        <ul className={styles['side-nav__submenu']}>
          <li>
            <Link to='/dashboard/empleados'>Empleados</Link>
          </li>
          <li>
            <Link to='/dashboard/cargos'>Cargos</Link>
          </li>
        </ul>
      )}
    </ul>
  );
};

export default SideNav;

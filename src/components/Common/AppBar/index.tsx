import React, { useState, useContext } from 'react';
import styles from './AppBar.module.css';
import logo from '../../../assets/images/logo.png';
import userImage from '../../../assets/images/elisa.png';
import { AuthContext } from '../../../context/AuthContext';
const AppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = useContext(AuthContext);
  return (
    <div className={styles.appBar}>
      <div className={styles.logo}>
        <img src={logo} alt='' />
      </div>
      <div
        className={styles.user}
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <img src={userImage} alt='' className={styles.userImage} />
        <div className={styles.userData}>
          <span className={styles.userName}>Elisa Gomez</span>
          <span className={styles.userRole}>Administrador</span>
        </div>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <a href='#'>Perfil</a>
            <a href='#'>Configuraciones</a>
            <a href='#'>Soporte</a>
            <a href='#'>Salir</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;

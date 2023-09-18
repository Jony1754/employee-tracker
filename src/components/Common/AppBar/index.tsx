import { useState } from 'react';
import styles from './AppBar.module.css';
import logo from '../../../assets/images/logo.png';
import userImage from '../../../assets/images/elisa.png';
import { Link } from 'react-router-dom';
const AppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <Link to='/login'>Salir</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;

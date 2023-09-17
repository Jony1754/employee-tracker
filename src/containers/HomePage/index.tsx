import backgroundImage from '../../assets/images/background.svg';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { TiUserAdd } from 'react-icons/ti';
const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/empleados');
  };

  return (
    <div className={styles.homePage}>
      <h1>
        Bienvenida! <br /> Elisa Gomez{' '}
      </h1>
      <p className={styles.caption}>
        Añade los datos personales de tus empleados y después agrega su cargo en
        tu empresa
      </p>
      <div className={styles.actions}>
        <TiUserAdd className={styles.icon} onClick={handleClick} />
        <p>Empieza aquí</p>
      </div>
      <figure className={styles.imageContainer}>
        <img src={backgroundImage} alt='' className={styles.backgroundImage} />
      </figure>
    </div>
  );
};

export default HomePage;

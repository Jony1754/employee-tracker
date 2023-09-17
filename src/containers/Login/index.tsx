import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import backgroundImage from '../../assets/images/loginimg.jpg';
import logo from '../../assets/images/logo.png';
import styles from './Login.module.css';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authContext) {
      const { login } = authContext;

      if (username && password) {
        login();
        navigate('/dashboard/home');
      } else {
        alert('Please enter valid credentials');
      }
    } else {
      console.error('AuthContext is undefined');
    }
  };

  return (
    <div className={styles.login}>
      <picture className={styles.imageContainer}>
        <img
          src={backgroundImage}
          alt=''
          className={styles.image}
          style={{ visibility: 'hidden' }}
        />{' '}
        <div className={styles.text}></div>
        <h1>
          Bienvenido a la mejor plataforma{' '}
          <strong>organizacional online</strong> <br />{' '}
          <span>Gestion efectiva del talento humano</span>{' '}
        </h1>
      </picture>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <picture>
          <img src={logo} alt='' />
        </picture>
        <div className={styles.formGroup}>
          <label>Usuario: </label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.rememberUser}>
          <label>Recordar cuenta: </label>
          <input type='checkbox' name='' id='' />
        </div>
        <button type='submit'>Iniciar sesion</button>
        <div className={styles.forgotUserContainer}>
          <a href=''>¿Olvidaste tu usuario?</a>
          <a href='#'>¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

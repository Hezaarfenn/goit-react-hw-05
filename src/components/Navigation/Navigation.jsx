import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.navigationLink}>Home</NavLink>
      <NavLink to="/movies" className={styles.navigationLink}>Movies</NavLink>
    </nav>
  );
};

export default Navigation;

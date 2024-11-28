import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.navContainer}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <Link to="/movies" className={styles.navLink}>Movies</Link>
    </nav>
  );
}

export default Navigation;


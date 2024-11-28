import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  return (
    <ul className={styles.movieList}>
      {movies.map(({ id, title }) => (
        <li key={id} className={styles.movieItem}>
          <Link to={`/movies/${id}`} className={styles.movieLink}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
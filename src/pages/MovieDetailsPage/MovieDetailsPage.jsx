import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieDetailPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}` },
      };
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.movieDetailsContainer}>
      <button className={styles.goBackBtn} onClick={() => navigate(-1)}>Go back</button>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <p className={styles.movieOverview}>{movie.overview}</p>
      <img
        className={styles.moviePoster}
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
        alt={movie.title}
      />
      <nav className={styles.navLinks}>
        <Link to="cast" className={styles.navLink}>Cast</Link>
        <Link to="reviews" className={styles.navLink}>Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
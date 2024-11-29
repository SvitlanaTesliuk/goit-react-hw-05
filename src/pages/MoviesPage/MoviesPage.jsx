import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList.jsx';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      const options = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGYyNzg4NzdjMGUwYWUxZmIwY2ZkYTY3OWNmNmQxOCIsIm5iZiI6MTczMjIxODMxOC4zMDM2ODY2LCJzdWIiOiI2NzNmNWM5MWFiNGQ2ZDBlOGQxYWRkMjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sztGoyHwmC_7etju7QtkRerhcioe9rPo7ze0AiF-afo` },
      };
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          options
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.query.value.trim();
    if (inputValue) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
      setMovies([]); 
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          name="query"
          type="text"
          defaultValue={query}
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        query && <p>No movies found for "{query}"</p>
      )}
    </div>
  );
}

export default MoviesPage;
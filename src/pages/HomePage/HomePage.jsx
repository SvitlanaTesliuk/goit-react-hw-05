import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`},
      };
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  return <MovieList movies={movies} />;
}

export default HomePage;
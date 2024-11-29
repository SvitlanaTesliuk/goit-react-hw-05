import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGYyNzg4NzdjMGUwYWUxZmIwY2ZkYTY3OWNmNmQxOCIsIm5iZiI6MTczMjIxODMxOC4zMDM2ODY2LCJzdWIiOiI2NzNmNWM5MWFiNGQ2ZDBlOGQxYWRkMjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sztGoyHwmC_7etju7QtkRerhcioe9rPo7ze0AiF-afo` },
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
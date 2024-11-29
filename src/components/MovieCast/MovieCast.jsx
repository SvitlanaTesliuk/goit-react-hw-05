import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const options = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGYyNzg4NzdjMGUwYWUxZmIwY2ZkYTY3OWNmNmQxOCIsIm5iZiI6MTczMjIxODMxOC4zMDM2ODY2LCJzdWIiOiI2NzNmNWM5MWFiNGQ2ZDBlOGQxYWRkMjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sztGoyHwmC_7etju7QtkRerhcioe9rPo7ze0AiF-afo` },
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      );
      setCast(response.data.cast);
    };
    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/200'
            }
            alt={name}
          />
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const options = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGYyNzg4NzdjMGUwYWUxZmIwY2ZkYTY3OWNmNmQxOCIsIm5iZiI6MTczMjIxODMxOC4zMDM2ODY2LCJzdWIiOiI2NzNmNWM5MWFiNGQ2ZDBlOGQxYWRkMjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sztGoyHwmC_7etju7QtkRerhcioe9rPo7ze0AiF-afo` },
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
        options
      );
      setReviews(response.data.results);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </ul>
  );
}

export default MovieReviews;
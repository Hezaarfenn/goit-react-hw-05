import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieReviews = () => {
  const { movieId } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const { isLoading, setIsLoading } = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'ca02acfdac6d185387b9ec7eed3762ca';

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
        );
        setReviews(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [setIsLoading, setError, movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length === 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;

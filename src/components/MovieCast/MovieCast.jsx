import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useOutletContext();
  const [cast, setCast] = useState([]);
  const { isLoading, setIsLoading } = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'ca02acfdac6d185387b9ec7eed3762ca';

  useEffect(() => {
    async function fetchCast() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        setCast(response.data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCast();
  }, [setIsLoading, setError, movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Cast</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {cast.length > 0 && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={`${actor.name} profile`}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;

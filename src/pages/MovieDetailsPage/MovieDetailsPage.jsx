import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const API_KEY = 'ca02acfdac6d185387b9ec7eed3762ca';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovieDetails(movieResponse.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        setCast(castResponse.data.cast);

        const reviewsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
        );
        setReviews(reviewsResponse.data.results);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, API_KEY]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error loading movie details: {error}</div>;

  const posterUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : '/path/to/placeholder.jpg';

  return (
    <div className={styles.MovieDetailsContainer}>
      <Link to="/" className={styles.goBackBtn}>
        Go Back
      </Link>
      <div className={styles.movieCardOverview}>
        <img src={posterUrl} alt={movieDetails.title} width={200} />

        <div className={styles.movieCardContainer}>
          <h2>
            {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
          </h2>
          <p>User Score: {movieDetails.vote_average.toFixed(2)}</p>

          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <p>{movieDetails.genres.map((genre) => genre.name + ', ')}</p>
        </div>
      </div>
      <hr />

      <h3 className={styles.information}>Additional Information</h3>

      <nav className={styles.navLink}>
        <ul>
          <li>
            <Link to="cast" onClick={() => setShowCast(!showCast)}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" onClick={() => setShowReviews(!showReviews)}>
              Reviews
            </Link>
          </li>
        </ul>
      </nav>

      <hr />

      {showCast && (
        <div>
          <h2 className={styles.castTitle}>Cast</h2>
          <ul className={styles.ul}>
            {cast.length > 0 ? (
              cast.map((actor) => (
                <li key={actor.id}>
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      width={100}
                    />
                  ) : (
                    <img
                      src="/path/to/placeholder.jpg"
                      alt={actor.name}
                      width={100}
                    />
                  )}
                  <p>
                    {actor.name} as {actor.character}
                  </p>
                </li>
              ))
            ) : (
              <p>No cast information available</p>
            )}
          </ul>
        </div>
      )}

      {showReviews && (
        <div>
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews available for this movie.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;

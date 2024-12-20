import { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import axios from 'axios';
import ArrowBackIcon from '../../assets/arrow-back.svg';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'ca02acfdac6d185387b9ec7eed3762ca';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovieDetails(movieResponse.data);

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
      <button onClick={() => navigate(-1)} className={styles.goBackBtn}>
        <img src={ArrowBackIcon} alt="Go Back" className={styles.goBackIcon} />
        Go Back
      </button>
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
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {location.pathname === `/movies/${movieId}/cast` && <MovieCast />}
      {location.pathname === `/movies/${movieId}/reviews` && <MovieReviews />}
    </div>
  );
};

export default MovieDetailsPage;

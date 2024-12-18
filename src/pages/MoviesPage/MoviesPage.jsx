import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get('query') ?? '';
  const page = searchParams.get('page') ?? 1;
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=ca02acfdac6d185387b9ec7eed3762ca&language=en-US&query=${query}&page=${page}&include_adult=false`
        );
        setMovies(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handleSearch = () => {
    setSearchParams({ query: searchInputRef.current.value, page: 1 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: searchInputRef.current.value, page: 1 });
  };

  return (
    <div>
      <h2>Search For Movies</h2>

      <form onSubmit={handleSubmit} className={styles.moviesForm}>
        <input
          type="text"
          ref={searchInputRef}
          value={query}
          onChange={handleSearch}
        />
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;

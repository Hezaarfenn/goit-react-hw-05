import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day',
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTAyYWNmZGFjNmQxODUzODdiOWVjN2VlZDM3NjJjYSIsIm5iZiI6MTcyODQxNTc4Mi4xMDQsInN1YiI6IjY3MDU4ODI2NDAyYmU4NTJiM2U5YzAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.edBEFitmqa6D0yCke7senyBvyUCQJIGcmWioJegu5Hc',
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;

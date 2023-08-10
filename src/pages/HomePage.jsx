import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import fetchTrendingMovies from 'services/api';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    async function getTrendingMovies() {
      const movies = await fetchTrendingMovies();
      if (movies) {
        setTrendingMovies(movies);
      }
    }
    getTrendingMovies();
  }, []);

  return (
    trendingMovies.length > 0 && (
      <div>
        <h1>Trending today</h1>
        <ul>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {movie.title}
                {/* <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                /> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default HomePage;

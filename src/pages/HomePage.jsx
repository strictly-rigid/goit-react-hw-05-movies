import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from 'services/api';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();
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
      <div className={css.homepageContainer}>
        <h1>Trending today</h1>
        <ul className={css.moviesList}>
          {trendingMovies.map(movie => (
            <li key={movie.id} className={css.movieItem}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={css.moviePoster}
                  />
                  <span className={css.movieTitle}>{movie.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default HomePage;

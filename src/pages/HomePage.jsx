import React, { useState, useEffect } from 'react';

import { fetchTrendingMovies } from 'services/api';
import MoviesList from 'components/MoviesList';
import css from './HomePage.module.css';

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
      <div className={css.homepageContainer}>
        <h1>Trending today</h1>
        {/* <ul className={css.moviesList}>
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
        </ul> */}
        <MoviesList movies={trendingMovies} />
      </div>
    )
  );
};

export default HomePage;

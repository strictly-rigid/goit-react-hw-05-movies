import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchQueryRequest } from 'services/api';
import MoviesList from 'components/MoviesList';
import css from './Movies.module.css';

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      async function getMoviesList() {
        const fetchedMoviesList = await fetchQueryRequest(query);
        if (fetchedMoviesList && fetchedMoviesList.results) {
          setMoviesList(fetchedMoviesList.results);
        }
      }
      getMoviesList();
    }
  }, [query]);

  const handleFormSubmit = event => {
    event.preventDefault();

    setSearchParams({ query: event.currentTarget.elements.query.value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="query" />
        <button className={css.btnSubmit} type="submit">
          Search
        </button>
      </form>

      <MoviesList movies={moviesList} />
    </div>
  );
};

export default Movies;

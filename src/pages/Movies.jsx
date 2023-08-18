import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchQueryRequest } from 'services/api';
import css from './Movies.module.css';

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked && searchQuery) {
      async function getMoviesList() {
        const fetchedMoviesList = await fetchQueryRequest(searchQuery);
        if (fetchedMoviesList && fetchedMoviesList.results) {
          setMoviesList(fetchedMoviesList.results);
        }
        setButtonClicked(false);
      }
      getMoviesList();
    }
  }, [buttonClicked, searchQuery]);

  const handleFormSubmit = event => {
    event.preventDefault();
    setButtonClicked(true);
  };

  const updateQueryString = evt => {
    const currentSearchQuery = evt.target.value;
    setSearchQuery(currentSearchQuery);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" onChange={updateQueryString} />
        <button className={css.btnSubmit} type="submit">
          Search
        </button>
      </form>

      <ul>
        {moviesList.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <h3>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

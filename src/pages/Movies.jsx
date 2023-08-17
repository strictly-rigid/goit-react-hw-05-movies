import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { fetchQueryRequest } from 'services/api';
import css from './Movies.module.css';

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  useEffect(
    () => {
      if (buttonClicked && searchQuery) {
        async function getMoviesList() {
          const fetchedMoviesList = await fetchQueryRequest(searchQuery);
          console.log(fetchedMoviesList);
          if (fetchedMoviesList && fetchedMoviesList.results) {
            setMoviesList(fetchedMoviesList.results);
          }
          setSearchParams({});
        }
        getMoviesList(searchQuery);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [buttonClicked]
  );

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const updateQueryString = evt => {
    const currentSearchQuery = evt.target.value;
    if (currentSearchQuery === '') {
      return setSearchParams({});
    } else {
      setSearchParams({ query: currentSearchQuery });
    }
  };

  return (
    <div>
      <input type="text" onChange={updateQueryString} />
      <button
        className={css.btnSubmit}
        type="submit"
        onClick={handleButtonClick}
      >
        Search
      </button>
      <Link>
        {moviesList.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </Link>
    </div>
  );
};

export default Movies;
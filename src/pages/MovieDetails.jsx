import { Suspense, useRef, useState, useEffect } from 'react';

import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from 'services/api';

const MovieDetails = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const { movieId } = useParams();

  const [movieInfo, setMovieInfo] = useState({});
  const [posterUrl, setPosterUrl] = useState('');
  useEffect(() => {
    async function getMovieDetails() {
      const movieDetails = await fetchMovieDetails(movieId);

      if (movieDetails) {
        setMovieInfo(movieDetails);
      }
      const posterPath = movieDetails.poster_path;
      if (posterPath) {
        const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
        setPosterUrl(posterBaseUrl + posterPath);
      }
    }
    getMovieDetails(movieId);
  }, [movieId]);

  const { original_title, vote_average, release_date, overview, genres } =
    movieInfo;

  const year = new Date(release_date).getFullYear();

  return (
    <>
      <Link to={backLinkLocationRef.current}>Go back</Link>
      <h1>
        {original_title} {year}
      </h1>
      <img src={posterUrl} alt="movie poster" />
      <p>User score: {Math.round(vote_average * 10)}% </p>
      <h2>Overview</h2>
      <p>{overview}</p>
      <h3>Genres</h3>
      {genres && genres.length > 0 ? (
        <p>{genres.map(genre => genre.name).join(', ')}</p>
      ) : (
        <p>No genres available</p>
      )}
      <p>Additional information</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Wait, the page is loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;

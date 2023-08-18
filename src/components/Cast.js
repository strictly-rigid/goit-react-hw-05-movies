import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from 'services/api';

export const Cast = () => {
  const { movieId } = useParams();

  const [castInfo, setCastInfo] = useState([]);

  useEffect(() => {
    async function getMovieCast() {
      const movieCast = await fetchMovieCast(movieId);
      if (movieCast) {
        setCastInfo(movieCast.cast);
      }
    }
    getMovieCast(movieId);
  }, [movieId]);

  return (
    <div>
      <ul>
        {castInfo.map(actor => (
          <li key={actor.credit_id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            {actor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

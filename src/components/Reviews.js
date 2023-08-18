import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/api';

export const Reviews = () => {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    async function getMovieReviews() {
      const fetchedReviews = await fetchMovieReviews(movieId);
      if (fetchedReviews && fetchedReviews.results) {
        setMovieReviews(fetchedReviews.results);
      }
    }
    getMovieReviews(movieId);
  }, [movieId]);

  return (
    <div>
      {movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map(review => (
            <li key={review.created_at}>
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, no reviews for this movie.</p>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/api';

export const Reviews = () => {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    async function getMovieReviews() {
      const fetchedReviews = await fetchMovieReviews(movieId);
      console.log(fetchedReviews);
      if (fetchedReviews && fetchedReviews.results) {
        setMovieReviews(fetchedReviews.results);
      }
    }
    getMovieReviews(movieId);
  }, [movieId]);
  console.log(movieReviews);

  return (
    <div>
      <ul>
        {movieReviews.map(review => (
          <li key={review.created_at}>
            <h2>{review.author}</h2>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

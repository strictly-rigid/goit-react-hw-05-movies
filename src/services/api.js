const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '86bcaf318e232372b2e8e2623c959f88';

export async function fetchTrendingMovies(apiKey) {
  const endpoint = '/trending/movie/week';
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error: Unable to fetch data. Status code: ${response.status}`
      );
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMovieDetails(movieId) {
  const endpoint = `/movie/${movieId}`;
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error: Unable to fetch data. Status code: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMovieCast(movieId) {
  const endpoint = `/movie/${movieId}`;
  const url = `${BASE_URL}${endpoint}/credits?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error: Unable to fetch data. Status code: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMovieReviews(movieId) {
  const endpoint = `/movie/${movieId}`;
  const url = `${BASE_URL}${endpoint}/reviews?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error: Unable to fetch data. Status code: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchQueryRequest(searchQuery) {
  const endpoint = '/search/movie';
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&query=${searchQuery}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error: Unable to fetch data. Status code: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

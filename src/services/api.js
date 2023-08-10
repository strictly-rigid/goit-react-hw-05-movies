// import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '86bcaf318e232372b2e8e2623c959f88';

export default async function fetchTrendingMovies(apiKey) {
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
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

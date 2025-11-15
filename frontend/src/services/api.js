const API_KEY = "1dea9ec0026fdd96d550a8b09f3598a9";
const BASE_URL = "https://api.themoviedb.org/3";
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}
export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

// Add this function to fetch videos (trailers)
export const getMovieVideos = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch videos');
  const data = await res.json();
  return data.results || [];
}
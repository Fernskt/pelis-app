import axios from 'axios';

const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Instancia de axios preconfigurada
const api = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: 'es-MX'
  }
});

// Obtener géneros
export const fetchGenres = async () => {
  const { data } = await api.get('/genre/movie/list');
  return data.genres;
};

// Películas por tipo (popular, top_rated, upcoming, etc)
export const fetchMoviesByType = async (type: string) => {
  const { data } = await api.get(`/movie/${type}`);
  return data.results;
};

// Películas por género
export const fetchMoviesByGenre = async (genreId: string) => {
  const { data } = await api.get('/discover/movie', {
    params: { with_genres: genreId }
  });
  return data.results;
};

// Búsqueda de películas por query
export const fetchMoviesBySearch = async (query: string) => {
  const { data } = await api.get('/search/movie', {
    params: { query }
  });
  return data.results;
};

// Detalle de película
export const fetchMovieDetail = async (id: string) => {
  const { data } = await api.get(`/movie/${id}`);
  return data;
};

// Trailers/videos de película
export const fetchMovieVideos = async (id: string) => {
  const { data } = await api.get(`/movie/${id}/videos`);
  return data.results;
};

// Exportar también la instancia axios si la necesitás
export default api;

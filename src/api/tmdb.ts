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
export const fetchMoviesByType = async (
  type: string,
  sortBy?: string,
  page?: number,
  minVotes?: number
) => {
  const params: any = {};
  if (sortBy) params.sort_by = sortBy;
  if (page) params.page = page;
  if (minVotes) params['vote_count.gte'] = minVotes;

  const { data } = await api.get(`/movie/${type}`, { params });
  return data;
};

// Películas por género
export const fetchMoviesByGenre = async (
  genreId: string,
  sortBy?: string,
  page?: number,
  minVotes?: number
) => {
  const params: any = { with_genres: genreId };
  if (sortBy) params.sort_by = sortBy;
  if (page) params.page = page;
  if (minVotes) params['vote_count.gte'] = minVotes;

  const { data } = await api.get('/discover/movie', { params });
  return data;
};

// Películas por actor
export const fetchMoviesByActor = async (
  actorId: string,
  sortBy?: string,
  page?: number,
  minVotes?: number
) => {
  const params: any = { with_cast: actorId };
  if (sortBy) params.sort_by = sortBy;
  if (page) params.page = page;
  if (minVotes) params['vote_count.gte'] = minVotes;

  const { data } = await api.get('/discover/movie', { params });
  return data;
};

// Películas por director
export const fetchMoviesByDirector = async (
  directorId: string,
  sortBy?: string,
  page?: number,
  minVotes?: number
) => {
  const params: any = { with_crew: directorId };
  if (sortBy) params.sort_by = sortBy;
  if (page) params.page = page;
  if (minVotes) params['vote_count.gte'] = minVotes;

  const { data } = await api.get('/discover/movie', { params });
  return data;
};

// Obtener información del actor
export const fetchActorDetail = async (actorId: string) => {
  const { data } = await api.get(`/person/${actorId}`);
  return data;
};

// Obtener información del director
export const fetchDirectorDetail = async (directorId: string) => {
  const { data } = await api.get(`/person/${directorId}`);
  return data;
};



export const fetchMoviesBySearch = async (query: string) => {
  const { data } = await api.get('/search/movie', {
    params: { query }
  });
  return data.results;
};

export const fetchMovieDetail = async (id: string) => {
  const { data } = await api.get(`/movie/${id}`);
  return data;
};

export const fetchMovieVideos = async (id: string) => {
  const { data } = await api.get(`/movie/${id}/videos`);
  return data.results;
};

export default api;

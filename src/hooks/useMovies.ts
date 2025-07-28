import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const useMovies = ({ query = '', page = 1 } = {}) =>
  useQuery({
    queryKey: ['movies', query, page],
    queryFn: async () => {
      const endpoint = query ? '/search/movie' : '/discover/movie';
      const params: any = {
        language: 'es-MX',
        page,
      };
      if (query) params.query = query;
      const { data } = await api.get(endpoint, { params });
      return data;
    },
  });

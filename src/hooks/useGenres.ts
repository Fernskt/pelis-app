import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const useGenres = () =>
  useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data } = await api.get('/genre/movie/list');
      return data.genres;
    },
  });

import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const useMovieDetail = (id?: string) => {
  return useQuery({
    queryKey: ['movie-detail', id],
    queryFn: async () => {
      if (!id) throw new Error("No hay id");
      const { data } = await api.get(`/movie/${id}`);
      return data;
    },
    enabled: !!id, 
  });
};

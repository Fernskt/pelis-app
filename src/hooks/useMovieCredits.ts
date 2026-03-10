import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const useMovieCredits = (movieId: string | undefined) =>
  useQuery({
    queryKey: ['movieCredits', movieId],
    queryFn: async () => {
      const { data } = await api.get(`/movie/${movieId}/credits`, {
        params: { language: 'es-MX' },
      });
      return data;
    },
    enabled: !!movieId,
  });

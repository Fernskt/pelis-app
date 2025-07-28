import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const useMovieTrailer = (id?: string) => {
  return useQuery({
    queryKey: ['movie-trailer', id],
    queryFn: async () => {
      if (!id) throw new Error("No hay id");
      const { data } = await api.get(`/movie/${id}/videos`);
      // Buscamos el primer trailer de YouTube
      const trailer = data.results.find(
        (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      return trailer || null;
    },
    enabled: !!id,
  });
};

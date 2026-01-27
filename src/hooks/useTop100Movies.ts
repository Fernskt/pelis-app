import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const useTop100Movies = () => 
  useQuery({
    queryKey: ['top100'],
    queryFn: async () => {
      const requests = Array.from({ length: 5 }, (_, i) =>
        api.get('/movie/top_rated', {
          params: { page: i + 1, language: 'es-MX' },
        })
      );
      const responses = await Promise.all(requests);
      const movies = responses.flatMap(res => res.data.results);
      return movies.slice(0, 100);
    }
  });

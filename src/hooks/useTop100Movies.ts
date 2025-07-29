import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const useTop100Movies = () => 
  useQuery({
    queryKey: ['top100'],
    queryFn: async () => {
      // Array de promises para 5 páginas
      const requests = Array.from({ length: 5 }, (_, i) =>
        api.get('/movie/top_rated', {
          params: { page: i + 1, language: 'es-MX' },
        })
      );
      // Ejecutar en paralelo
      const responses = await Promise.all(requests);
      const movies = responses.flatMap(res => res.data.results);
      return movies.slice(0, 100); // sólo 100 por si acaso
    }
  });

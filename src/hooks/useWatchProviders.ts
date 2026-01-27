import { useQuery } from '@tanstack/react-query';
import api from '../api/tmdb';

export const fetchWatchProviders = async (id: string) => {
  const { data } = await api.get(`/movie/${id}/watch/providers`);
  return data.results;
};

export const useWatchProviders = (id: string | undefined) => {
  return useQuery({
    queryKey: ['watchProviders', id],
    queryFn: () => fetchWatchProviders(id!),
    enabled: !!id,
  });
};

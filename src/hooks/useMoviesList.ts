// hooks/useMoviesList.ts
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByType, fetchMoviesByGenre } from '../api/tmdb';

export const useMoviesByType = (
  type: string,
  sortBy = 'popularity.desc',
  page = 1,
  minVotes?: number
) =>
  useQuery({
    queryKey: ['movies-type', type, sortBy, page, minVotes],
    queryFn: () => fetchMoviesByType(type, sortBy, page, minVotes),
  });

export const useMoviesByGenre = (
  genreId: string,
  sortBy = 'popularity.desc',
  page = 1,
  minVotes?: number
) =>
  useQuery({
    queryKey: ['movies-genre', genreId, sortBy, page, minVotes],
    queryFn: () => fetchMoviesByGenre(genreId, sortBy, page, minVotes),
  });

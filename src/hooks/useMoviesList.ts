import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByType, fetchMoviesByGenre } from '../api/tmdb';

export const useMoviesByType = (type: string) =>
  useQuery({ queryKey: ['movies-type', type], queryFn: () => fetchMoviesByType(type) });

export const useMoviesByGenre = (genreId: string) =>
  useQuery({ queryKey: ['movies-genre', genreId], queryFn: () => fetchMoviesByGenre(genreId) });


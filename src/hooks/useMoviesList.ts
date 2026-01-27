// hooks/useMoviesList.ts
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByType, fetchMoviesByGenre, fetchMoviesByActor, fetchActorDetail, fetchMoviesByDirector, fetchDirectorDetail } from '../api/tmdb';

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

export const useMoviesByActor = (
  actorId: string,
  sortBy = 'popularity.desc',
  page = 1,
  minVotes?: number
) =>
  useQuery({
    queryKey: ['movies-actor', actorId, sortBy, page, minVotes],
    queryFn: () => fetchMoviesByActor(actorId, sortBy, page, minVotes),
  });

export const useMoviesByDirector = (
  directorId: string,
  sortBy = 'popularity.desc',
  page = 1,
  minVotes?: number
) =>
  useQuery({
    queryKey: ['movies-director', directorId, sortBy, page, minVotes],
    queryFn: () => fetchMoviesByDirector(directorId, sortBy, page, minVotes),
  });

export const useActorDetail = (actorId: string | undefined) =>
  useQuery({
    queryKey: ['actor-detail', actorId],
    queryFn: () => fetchActorDetail(actorId!),
    enabled: !!actorId,
  });

export const useDirectorDetail = (directorId: string | undefined) =>
  useQuery({
    queryKey: ['director-detail', directorId],
    queryFn: () => fetchDirectorDetail(directorId!),
    enabled: !!directorId,
  });

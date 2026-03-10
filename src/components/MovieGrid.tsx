import React from 'react';
import MovieCard from './MovieCard';
import { useBreakpoint } from '../utils/useBreakpoint';

interface MovieGridProps {
  movies: any[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {

  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;

  // Filtrar películas sin poster y con puntaje menor a 1
  const moviesWithPoster = movies?.filter(movie => movie.poster_path && movie.vote_average >= 1) || [];

  if (!moviesWithPoster.length) {
    return (
      <div
        style={{
          color: '#fff',
          textAlign: 'center',
          marginTop: 40,
          fontSize: '1.2rem',
        }}
      >
        No hay películas para mostrar.
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(150px, 1fr))' :  'repeat(auto-fit, minmax(180px, 1fr))',
        gap: isMobile ? 18 : 24,
        width: isMobile ? '90%' : '95%',
        margin: '0 auto',
        padding: isMobile ? '32px 0' : '32px',
      }}
    >
      {moviesWithPoster.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;

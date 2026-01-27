import React from 'react';
import MovieCard from './MovieCard';
import { useBreakpoint } from '../utils/useBreakpoint';

interface MovieGridProps {
  movies: any[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {

  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;

  // Filtrar películas sin poster
  const moviesWithPoster = movies?.filter(movie => movie.poster_path) || [];

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
        width: '90%',
        margin: '0 auto',
        padding: '32px 0',
      }}
    >
      {moviesWithPoster.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;

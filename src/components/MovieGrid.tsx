import React from 'react';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: any[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  if (!movies?.length) {
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 24,
        width: '90%',
        margin: '0 auto',
        padding: '32px 0',
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;

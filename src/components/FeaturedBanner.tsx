import React from 'react';
import { Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useBreakpoint } from '../utils/useBreakpoint';

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

interface FeaturedBannerProps {
  movies: any[];
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ movies }) => {

  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;

  // Filtrar películas con backdrop_path
  const moviesWithBackdrop = movies?.filter(m => m.backdrop_path) || [];

  const movie = moviesWithBackdrop.length
    ? moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)]
    : null;

  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <section
      style={{
        background: `linear-gradient(to right, #1a1a1aEE 10%, #00000044 100%), url(${IMAGE_URL}/original${movie.backdrop_path}) center/cover no-repeat`,
        color: '#fff',
        padding: '48px 32px',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ fontSize: isMobile ? 42 : 58, fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>{movie.title}</h1>
        <p style={{ fontSize: isMobile ? 14 : 20, color: 'var(--texto-secundario)' }}>{movie.overview}</p>
        <p style={{ margin: "14px 0", fontWeight: 500 }}>
          ⭐ {movie.vote_average?.toFixed(1)} / 10 &nbsp;|&nbsp; {movie.release_date?.substring(0, 4)}
        </p>
        <Button
          appearance="primary"
          size="lg"
          style={{ marginTop: 12, fontWeight: 600 }}
          onClick={() => navigate(`/detail/${movie.id}`)}
        >
          Ver Detalles
        </Button>
      </div>
    </section>
  );
};

export default FeaturedBanner;

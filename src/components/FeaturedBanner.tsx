import React, { useState, useMemo } from 'react';
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

  // Filtrar películas con backdrop_path y puntaje >= 1
  const moviesWithBackdrop = movies?.filter(m => m.backdrop_path && m.vote_average >= 1) || [];

  const movie = useMemo(() => {
    return moviesWithBackdrop.length
      ? moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)]
      : null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  const navigate = useNavigate();
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  if (!movie) return null;

  const OVERVIEW_LIMIT = 300;
  const isLongOverview = movie.overview && movie.overview.length > OVERVIEW_LIMIT;
  const displayedOverview = isLongOverview && !overviewExpanded
    ? movie.overview.substring(0, OVERVIEW_LIMIT).trimEnd() + '…'
    : movie.overview;

  // Helpers de animación de entrada (CSS keyframes, sin librerías)
  const anim = (name: string, delay: number): React.CSSProperties => ({
    animation: `${name} 0.65s ease both`,
    animationDelay: `${delay}s`,
  });

  return (
    <section
      style={{
        background: `linear-gradient(to right, #1a1a1aEE 10%, #00000044 100%), url(${IMAGE_URL}/original${movie.backdrop_path}) center/cover no-repeat`,
        color: '#fff',
        padding: '48px 32px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...anim('fadeIn', 0),
      }}
    >
      <div style={{ margin: '95px 0' }}>
        <h1 style={{ fontSize: isMobile ? 42 : 68, fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px', ...anim('fadeUp', 0.1) }}>
          {movie.title}
        </h1>
        <p style={{maxWidth: 600, fontSize: isMobile ? 14 : 20, color: 'var(--texto-secundario)', ...anim('fadeUp', 0.22) }}>
          {displayedOverview}
          {isLongOverview && (
            <button
              onClick={() => setOverviewExpanded(prev => !prev)}
              style={{
                background: 'none',
                border: 'none',
                color: '#e0b040',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 'inherit',
                padding: '0 0 0 6px',
                textDecoration: 'underline',
              }}
            >
              {overviewExpanded ? 'ver menos' : 'ver más'}
            </button>
          )}
        </p>
        <p style={{ margin: '14px 0', fontWeight: 500, ...anim('fadeUp', 0.32) }}>
          ⭐ {movie.vote_average?.toFixed(1)} / 10 &nbsp;|&nbsp; {movie.release_date?.substring(0, 4)}
        </p>
        <Button
          appearance="primary"
          size="lg"
          style={{ marginTop: 12, fontWeight: 600, ...anim('fadeUp', 0.42) }}
          onClick={() => navigate(`/detail/${movie.id}`)}
        >
          Ver Detalles
        </Button>
      </div>
    </section>
  );
};

export default FeaturedBanner;

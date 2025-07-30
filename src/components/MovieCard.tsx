import { Link } from 'react-router-dom';
import { useBreakpoint } from '../utils/useBreakpoint';

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;


const MovieCard = ({ movie }: { movie: any }) => {

  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    transition: 'transform 0.2s',
  } as const;

  const detailStyle = {
    width: '100%',
    textAlign: 'center' as const,
    padding: '0 6px',
  } as const;

  const titleStyle = {
    fontSize: isMobile ? '.8rem' : '1rem',
    color: '#fff',
    fontWeight: 700,
    margin: 10,
    textWrap: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: '1.2',
  } as const;

  const subtitleStyle = {
    fontSize: isMobile ? '.8rem' : '1rem',
    color: 'var(--color-secundario)',
    margin: 0,
    letterSpacing: '0.5px',
  } as const;

  const cardStyle = {
    maxWidth: isMobile ? 150 : 180,
    borderRadius: 8,
    boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 28px -10px',
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    transition: 'box-shadow 0.2s',
    marginBottom: 12,
  } as const;

  const imgStyle = {
    width: isMobile ? 150 : 180,
    height: isMobile ? 180 : 250,
    objectFit: 'cover' as const,
    borderRadius: 8,
    marginBottom: 14,
    background: '#222',
  } as const;

  return (
    <Link to={`/detail/${movie.id}`} style={linkStyle}>
      <div style={cardStyle}>
        <img
          src={`${IMAGE_URL}/w500${movie.poster_path}`}
          alt={movie.title}
          style={imgStyle}
        />
        <div style={detailStyle}>
          <p style={titleStyle}>{movie.title}</p>
          <p style={subtitleStyle}>
            {movie.release_date?.substring(0, 4)} - ⭐{movie.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

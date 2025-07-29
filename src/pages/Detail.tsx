import { useParams } from 'react-router-dom';
import { VStack, Loader, Button, Tag, Text } from 'rsuite';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useMovieTrailer } from '../hooks/useMovieTrailer';
import { Link } from 'react-router-dom';
import { useBreakpoint } from '../utils/useBreakpoint';

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const Detail: React.FC = () => {

const { isXS, isSM } = useBreakpoint();
const isMobile = isXS || isSM;

  // ==== ESTILOS EN OBJETOS ====
  const styles = {
    root: {
      color: 'white',
      width: '100%',
    },
    backdropSection: (backdropPath: string) => ({
      minHeight: '100vh',
      width: '100%',
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(rgba(10,12,15,0.82), rgba(10,12,15,0.82)), url(${IMAGE_URL}/original${backdropPath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative', // importante para overlays
      overflow: 'hidden',
    } as React.CSSProperties),
    content: {
      maxWidth: 900,
      margin: '80px auto',
    },
    flexRow: {
      display: isMobile ? 'block': 'flex',
      gap: 32,
      flexWrap: 'wrap' as const,
    },
    poster: {
      width: isMobile ? 100 : 280,
      height: isMobile ? 150 : '',
      borderRadius: 12,
      boxShadow: '0 8px 32px #0008',
    },
    movieTitle: {
      fontWeight: 800,
      fontSize: isMobile ? 24 : 48,
      lineHeight: 1.3,
      margin: isMobile ? '16px 0 4px' : '',
      textTransform: 'uppercase' as const,
    },
    tagline: {
      color: 'var(--color-secundario)',
      opacity: 0.9,
     
    },
    subtitle: {
      color: 'var(--color-secundario)',
      opacity: 0.9,
      fontSize: isMobile ? 14 : 18,
      fontWeight: 700,
    },
    tagsRow: {
      margin: '12px 0',
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap' as const,
    },
    overview: {
      color: 'var(--texto-secundario)',
      fontStyle: 'italic',
      marginTop: 24,
    },
    homepageBtn: {
      marginTop: 16,
    },
    genreBtn: {
      marginTop: 24,
      marginRight: 8,
    },
    trailerSection: {
      width: isMobile ? '100%' : '60%',
      margin: '32px auto',
      textAlign: 'center' as const,
    },
    trailerContainer: {
      position: 'relative' as const,
      paddingBottom: '56.25%',
      height: 0,
    },
    iframe: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      borderRadius: isMobile ? 0 : 12,
    },
    centered: {
      color: 'white',
      textAlign: 'center' as const,
    },
    centeredError: {
      color: '#fff',
      textAlign: 'center' as const,
      marginTop: 64,
    },
    centeredLoader: {
      color: '#fff',
      marginTop: 64,
      textAlign: 'center' as const,
    },
  };
  // ============================

  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading, isError } = useMovieDetail(id);
  const { data: trailer, isLoading: loadingTrailer } = useMovieTrailer(id);

  if (!id) {
    return <div style={styles.centered}>ID de película no válido</div>;
  }

  if (isLoading) {
    return (
      <div style={styles.centeredLoader}>
        <Loader size="lg" content="Cargando detalles..." />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div style={styles.centeredError}>
        Error al cargar los detalles de la película.
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <VStack alignItems="flex-start" spacing={24}>
        <VStack style={styles.backdropSection(movie.backdrop_path)}>
          <VStack style={styles.content}>
            <div style={styles.flexRow}>
              <img
                src={`${IMAGE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                style={styles.poster}
              />
              <div style={{ flex: 1 }}>
                <h1 style={styles.movieTitle}>{movie.title}</h1>
                <Text style={styles.subtitle}>{movie.tagline}</Text>

                <div style={styles.tagsRow}>
                  <Tag color="orange" size="lg">
                    {movie.release_date?.substring(0, 4)}
                  </Tag>
                  <Tag color="green" size="lg">
                    ⭐ {movie.vote_average?.toFixed(1)} / 10
                  </Tag>
                  <Tag color="blue" size="lg">{movie.runtime} min</Tag>
                </div>

                <Text style={styles.overview}>{movie.overview}</Text>

                {movie.genres?.map((g: any) => (
                  <Button
                    key={g.id}
                    appearance="ghost"
                    size="sm"
                    style={styles.genreBtn}
                    as={Link}
                    to={`/genre/${g.id}`}
                  >
                    {g.name}
                  </Button>
                ))}
                <br />
                <VStack spacing={8} style={{ marginTop: 16 }}>
                  <Text style={styles.tagline}>País: <span style={{color: '#fff'}}>{movie.production_countries[0]?.name || 'Desconocido'}</span> </Text>
                  <Text style={styles.tagline}>Compañía: <span style={{color: '#fff'}}> {movie.production_companies[0]?.name || 'Desconocido'}</span></Text>
                  <Text style={styles.tagline}>Fecha de Estreno: <span style={{color: '#fff'}}>{movie.release_date || 'Desconocido'}</span> </Text>
                </VStack>

                {movie.homepage && (
                  <Button
                    appearance="primary"
                    color="yellow"
                    style={styles.homepageBtn}
                    as="a"
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sitio Oficial
                  </Button>
                )}


              </div>
            </div>
          </VStack>
        </VStack>

        {trailer && !loadingTrailer && (
          <div style={styles.trailerSection}>
            <h3>Trailer</h3>
            <div style={styles.trailerContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.iframe}
              ></iframe>
            </div>
          </div>
        )}
      </VStack>
    </div>
  );
};

export default Detail;

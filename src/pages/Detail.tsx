import { useParams } from 'react-router-dom';
import { VStack, Loader, Button, Tag, Text } from 'rsuite';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useMovieTrailer } from '../hooks/useMovieTrailer';
import { Link } from 'react-router-dom';

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

// ==== ESTILOS EN OBJETOS ====
const styles = {
  root: {
    color: 'white',
    width: '100%',
  },
  backdropSection: (backdropPath: string) => ({
    minHeight: '100vh', // o height: '100vh' si no hay nada fuera
    width: '100%',
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
    display: 'flex',
    gap: 32,
    flexWrap: 'wrap' as const,
  },
  poster: {
    width: 280,
    borderRadius: 12,
    boxShadow: '0 8px 32px #0008',
  },
  movieTitle: {
    fontWeight: 800,
    fontSize: 36,
  },
  tagline: {
    color: 'var(--color-secundario)',
    opacity: 0.9,
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
    width: '60%',
    margin: '32px auto',
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
    borderRadius: 12,
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

const Detail: React.FC = () => {
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
                <Text style={styles.tagline}>{movie.tagline}</Text>

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
                  <Text style={styles.tagline}>País: {movie.production_countries[0]?.name || 'Desconocido'}</Text>
                  <Text style={styles.tagline}>Compañía: {movie.production_companies[0]?.name || 'Desconocido'}</Text>
                  <Text style={styles.tagline}>Fecha de Estreno: {movie.release_date || 'Desconocido'}</Text>
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

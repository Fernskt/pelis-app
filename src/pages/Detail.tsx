import { useParams } from 'react-router-dom';
import { VStack, Loader, Button, Tag, Text } from 'rsuite';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useMovieTrailer } from '../hooks/useMovieTrailer';
import { useMovieCredits } from '../hooks/useMovieCredits';
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
      
      margin: '80px auto',
    },
    flexRow: {
      display: isMobile ? 'block': 'flex',
      gap: 32,
      flexWrap: 'wrap' as const,
    },
    poster: {
      width: isMobile ? 100 : '',
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
    actorsSection: {
      marginTop: 24,
    },
    actorsTitle: {
      color: 'var(--color-secundario)',
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 12,
    },
    actorsGrid: {
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap' as const,
    },
    actorCard: {
      textAlign: 'center' as const,
      maxWidth: 60,
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    actorPhoto: {
      width: 60,
      height: 90,
      borderRadius: 8,
      objectFit: 'cover' as const,
      boxShadow: '0 4px 12px #0006',
      marginBottom: 8,
    },
    actorName: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 600,
    },
    actorCharacter: {
      color: 'var(--texto-secundario)',
      fontSize: 11,
      fontStyle: 'italic',
    },
    directorSection: {
      marginTop: 16,
    },
    directorLabel: {
      color: 'var(--color-secundario)',
      fontSize: 14,
      fontWeight: 700,
    },
    directorName: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'underline',
      display: 'inline-block',
    },
  };
  // ============================

  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading, isError } = useMovieDetail(id);
  const { data: trailer, isLoading: loadingTrailer } = useMovieTrailer(id);
  const { data: credits } = useMovieCredits(id);

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
                  <Tag color="violet" size="lg">{movie.runtime} min</Tag>
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

                {credits?.crew && credits.crew.find((member: any) => member.job === 'Director') && (
                  <div style={styles.directorSection}>
                    <span style={styles.directorLabel}>Director: </span>
                    <Link 
                      to={`/director/${credits.crew.find((member: any) => member.job === 'Director').id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <span style={styles.directorName}>
                        {credits.crew.find((member: any) => member.job === 'Director').name}
                      </span>
                    </Link>
                  </div>
                )}

                {credits?.cast && credits.cast.length > 0 && (
                  <div style={styles.actorsSection}>
                    <div style={styles.actorsTitle}>Reparto Principal</div>
                    <div style={styles.actorsGrid}>
                      {credits.cast.slice(0, 4).map((actor: any) => (
                        <Link 
                          key={actor.id} 
                          to={`/actor/${actor.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div style={styles.actorCard}>
                            <img
                              src={
                                actor.profile_path
                                  ? `${IMAGE_URL}/w185${actor.profile_path}`
                                  : `https://via.placeholder.com/${isMobile ? '80x120' : '100x150'}?text=Sin+Foto`
                              }
                              alt={actor.name}
                              style={styles.actorPhoto}
                            />
                            <div style={styles.actorName}>{actor.name}</div>
                            <div style={styles.actorCharacter}>{actor.character}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

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

import { useParams } from 'react-router-dom';
import { VStack, Loader, Button, Tag, Text } from 'rsuite';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useMovieTrailer } from '../hooks/useMovieTrailer';
import { useMovieCredits } from '../hooks/useMovieCredits';
import { useWatchProviders } from '../hooks/useWatchProviders';
import { Link } from 'react-router-dom';
import { useBreakpoint } from '../utils/useBreakpoint';
import Reveal from '../components/Reveal';

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const Detail: React.FC = () => {

const { isXS, isSM } = useBreakpoint();
const isMobile = isXS || isSM;

  // Mapeo de plataformas a sus URLs
  const platformLinks: { [key: number]: string } = {
    8: 'https://www.netflix.com/ar/',
    337: 'https://www.disneyplus.com/es-ar',
    384: 'https://www.max.com/ar/es',
    119: 'https://www.primevideo.com/',
    619: 'https://www.starplus.com/es-ar',
    350: 'https://tv.apple.com/ar',
    531: 'https://www.paramountplus.com/ar/',
    283: 'https://www.crunchyroll.com/',
    386: 'https://www.peacocktv.com/',
    1899: 'https://www.max.com/ar/es', // HBO Max Argentina
    2: 'https://tv.apple.com/ar', // Apple TV
    3: 'https://play.google.com/store/movies',
  };

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
      position: 'relative', 
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
    providersSection: {
      marginTop: 24,
      padding: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 12,
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    providersTitle: {
      color: 'var(--color-secundario)',
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 12,
    },
    providersGrid: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap' as const,
      alignItems: 'center',
    },
    providerLogo: {
      width: 50,
      height: 50,
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    providerLink: {
      display: 'block',
      textDecoration: 'none',
    },
  };
  // ============================

  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading, isError } = useMovieDetail(id);
  const { data: trailer, isLoading: loadingTrailer } = useMovieTrailer(id);
  const { data: credits } = useMovieCredits(id);
  const { data: watchProviders } = useWatchProviders(id);

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
                  {movie.release_date ? (
                    <Link to={`/year/${movie.release_date.substring(0, 4)}`} >
                      <Tag color="orange" size="lg" style={{ cursor: 'pointer' }}>
                        {movie.release_date.substring(0, 4)}
                      </Tag>
                    </Link>
                  ) : (
                    <Tag color="orange" size="lg">—</Tag>
                  )}
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
                  <Text style={styles.tagline}>País: {movie.production_countries[0] ? (
                    <Link to={`/country/${movie.production_countries[0].iso_3166_1}`} state={{ countryName: movie.production_countries[0].name }} style={{ textDecoration: 'none' }}>
                      <span style={{ color: '#fff', cursor: 'pointer', textDecoration: 'underline' }}>{movie.production_countries[0].name}</span>
                    </Link>
                  ) : <span style={{color: '#fff'}}>Desconocido</span>} </Text>
                  <Text style={styles.tagline}>Compañía: <span style={{color: '#fff'}}> {movie.production_companies[0]?.name || 'Desconocido'}</span></Text>
                  <Text style={styles.tagline}>Fecha de Estreno: <Link to={`/year/${movie.release_date.substring(0, 4)}`} style={{ textDecoration: 'none' }} ><span style={{ color: '#fff', cursor: 'pointer', textDecoration: 'underline' }}>{movie.release_date || 'Desconocido'}</span> </Link></Text>
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

                {credits?.cast && credits.cast.filter((a: any) => a.profile_path).length > 0 && (
                  <div style={styles.actorsSection}>
                    <div style={styles.actorsTitle}>Reparto Principal</div>
                    <div style={styles.actorsGrid}>
                      {credits.cast
                        .filter((actor: any) => actor.profile_path)
                        .slice(0, 8)
                        .map((actor: any, index: number) => (
                          <Reveal key={actor.id} variant="fadeUp" delay={index * 0.07}>
                            <Link 
                              to={`/actor/${actor.id}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <div style={styles.actorCard}>
                                <img
                                  src={`${IMAGE_URL}/w185${actor.profile_path}`}
                                  alt={actor.name}
                                  style={styles.actorPhoto}
                                />
                                <div style={styles.actorName}>{actor.name}</div>
                                <div style={styles.actorCharacter}>{actor.character}</div>
                              </div>
                            </Link>
                          </Reveal>
                        ))}
                    </div>
                  </div>
                )}

                {watchProviders?.AR?.flatrate && watchProviders.AR.flatrate.length > 0 && (
                  <div style={styles.providersSection}>
                    <div style={styles.providersTitle}>Podés verla en:</div>
                    <div style={styles.providersGrid}>
                      {watchProviders.AR.flatrate.map((provider: any) => (
                        <a
                          key={provider.provider_id}
                          href={platformLinks[provider.provider_id] || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.providerLink}
                          title={provider.provider_name}
                        >
                          <img
                            src={`${IMAGE_URL}/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            style={styles.providerLogo}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          />
                        </a>
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

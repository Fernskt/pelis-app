import React from 'react';
import { useParams } from 'react-router-dom';
import { useMoviesByType, useMoviesByGenre } from '../hooks/useMoviesList';
import { useGenres } from '../hooks/useGenres';
import MovieGrid from '../components/MovieGrid';
import { Loader } from 'rsuite';

const MOVIE_TYPES: Record<string, string> = {
    popular: 'Populares',
    top_rated: 'Mejor valoradas',
    upcoming: 'Próximamente',
    now_playing: 'En cartelera',
    tendencias: 'Tendencias',
};

const MoviesList: React.FC = () => {
    const { type, id } = useParams<{ type?: string; id?: string }>();

    let moviesQuery;
    let title = 'Películas';

    // Traés TODOS los géneros (cacheados por React Query)
    const { data: genres, isLoading: isLoadingGenres } = useGenres();

    // Si es por tipo (tendencias, popular, etc.)
    if (type) {
        moviesQuery = useMoviesByType(type === 'tendencias' ? 'popular' : type);
        title = MOVIE_TYPES[type] || 'Películas';
    }
    // Si es por género
    else if (id) {
        moviesQuery = useMoviesByGenre(id);

        const genreObj = genres?.find((g: any) => String(g.id) === String(id));
        title = isLoadingGenres
            ? 'Cargando...'
            : genreObj
                ? `Películas de ${genreObj.name}`
                : 'Películas por género';
    }

    const { data: movies, isLoading, isError } = moviesQuery || {};

    return (
        <section
            style={{
                minHeight: '65vh',
                padding: 8,
                background: 'transparent',
                marginTop: 42,
            }}
        >
            <h2 style={{ color: '#ffb300', marginBottom: 32, fontSize: 24, marginLeft: 16 }}>{title}</h2>
            {isLoading && <Loader center content="Cargando películas..." />}
            {isError && (
                <p style={{ color: 'red', textAlign: 'center' }}>
                    Error al cargar películas.
                </p>
            )}
            {!isLoading && !isError && (!movies || movies.length === 0) && (
                <p style={{ color: '#fff', textAlign: 'center' }}>
                    No hay películas para mostrar.
                </p>
            )}
            {!isLoading && !isError && movies && (
                <MovieGrid movies={movies} />
            )}
        </section>
    );
};

export default MoviesList;

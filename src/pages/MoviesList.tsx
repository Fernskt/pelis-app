import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useMoviesByType, useMoviesByGenre, useMoviesByActor, useActorDetail, useMoviesByDirector, useDirectorDetail, useMoviesByCountry, useMoviesByYear } from '../hooks/useMoviesList';
import { useGenres } from '../hooks/useGenres';
import MovieGrid from '../components/MovieGrid';
import { Loader, RadioGroup, Radio, Pagination } from 'rsuite';
import { useBreakpoint } from '../utils/useBreakpoint';

const MOVIE_TYPES: Record<string, string> = {
    popular: 'Populares',
    top_rated: 'Mejor valoradas',
    upcoming: 'Próximamente',
    now_playing: 'En cartelera',
    tendencias: 'Tendencias',
};

const SORT_MAP = {
    default: 'popularity.desc',
    rating: 'vote_average.desc',
    year: 'primary_release_date.desc'
} as const;

const MoviesList: React.FC = () => {
    const { isXS, isSM } = useBreakpoint();
    const isMobile = isXS || isSM;
    const { type, id, actorId, directorId, countryCode, year } = useParams<{ type?: string; id?: string; actorId?: string; directorId?: string; countryCode?: string; year?: string }>();
    const location = useLocation();
    const locationState = location.state as { countryName?: string } | null;
    const [order, setOrder] = React.useState<'default' | 'rating' | 'year'>('default');
    const [page, setPage] = React.useState(1);

    const minVotes = order === 'rating' || order === 'year' ? 500 : undefined;

    let moviesQuery;
    let title = 'Películas';

    const { data: genres, isLoading: isLoadingGenres } = useGenres();
    const { data: actor, isLoading: isLoadingActor } = useActorDetail(actorId);
    const { data: director, isLoading: isLoadingDirector } = useDirectorDetail(directorId);

    if (type) {
        moviesQuery = useMoviesByType(
            type === 'tendencias' ? 'popular' : type,
            SORT_MAP[order],
            page,
            minVotes
        );
        title = MOVIE_TYPES[type] || 'Películas';
    }
    else if (id) {
        moviesQuery = useMoviesByGenre(id, SORT_MAP[order], page, minVotes);

        const genreObj = genres?.find((g: any) => String(g.id) === String(id));
        title = isLoadingGenres
            ? 'Cargando...'
            : genreObj
                ? `Películas de ${genreObj.name}`
                : 'Películas por género';
    }
    else if (actorId) {
        moviesQuery = useMoviesByActor(actorId, SORT_MAP[order], page, minVotes);
        title = isLoadingActor
            ? 'Cargando...'
            : actor
                ? `Películas de ${actor.name}`
                : 'Películas del actor';
    }
    else if (directorId) {
        moviesQuery = useMoviesByDirector(directorId, SORT_MAP[order], page, minVotes);
        title = isLoadingDirector
            ? 'Cargando...'
            : director
                ? `Películas de ${director.name}`
                : 'Películas del director';
    }
    else if (countryCode) {
        moviesQuery = useMoviesByCountry(countryCode, SORT_MAP[order], page, minVotes);
        title = `Películas de ${locationState?.countryName || countryCode}`;
    }
    else if (year) {
        moviesQuery = useMoviesByYear(year, SORT_MAP[order], page, minVotes);
        title = `Películas de ${year}`;
    }

    const { data, isLoading, isError } = moviesQuery || {};

    React.useEffect(() => {
        setPage(1);
    }, [order, type, id, actorId, directorId, countryCode, year]);

    return (
        <section
            style={{
                minHeight: '65vh',
                padding: 8,
                background: 'transparent',
                marginTop: 42,
            }}
        >
            <div style={{ marginBottom: 16, display: isMobile ? 'block' : 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <h2 style={{ color: 'var(--color-secundario)', fontSize: 24, marginLeft: 16 }}>{title}</h2>
                {title !== 'Tendencias' && <RadioGroup
                    name="order"
                    inline
                    appearance="picker"
                    value={order}
                    onChange={value => setOrder(value as 'default' | 'rating' | 'year')}
                    style={{ marginLeft: 16, color: "var(--color-secundario)" }}
                >
                    <Radio value="default" style={{ fontWeight: 600, marginRight: 12 }}>Default</Radio>
                    <Radio value="rating" style={{ fontWeight: 600, marginRight: 12 }}>Mejor puntuada</Radio>
                    <Radio value="year" style={{ fontWeight: 600 }}>Año (histórico)</Radio>
                </RadioGroup>}
            </div>


            {isLoading && <Loader center content="Cargando películas..." />}
            {isError && (
                <p style={{ color: 'red', textAlign: 'center' }}>
                    Error al cargar películas.
                </p>
            )}
            {!isLoading && !isError && (!data || data.results.length === 0) && (
                <p style={{ color: '#fff', textAlign: 'center' }}>
                    No hay películas para mostrar.
                </p>
            )}
            {!isLoading && !isError && data && (
                <>
                    <MovieGrid movies={data.results} />
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '36px 0 12px' }}>
                        <Pagination
                            prev
                            next
                            first
                            ellipsis
                            size="md"
                            total={data.total_pages}
                            limit={1}
                            activePage={page}
                            onChangePage={setPage}
                            maxButtons={isMobile ? 3 : 7}
                            style={{
                                background: "transparent",
                                color: "var(--color-secundario)",
                                borderRadius: 12,
                                fontWeight: 700,
                                border: 'none',
                                display: 'flex',
                                justifyContent: 'center',

                            }}
                        />
                    </div>
                </>
            )}
        </section>
    );
};

export default MoviesList;

import React from 'react';
import { useMovies } from '../hooks/useMovies';
import FeaturedBanner from '../components/FeaturedBanner';
import MovieGrid from '../components/MovieGrid';
import { Pagination } from 'rsuite';
import { useBreakpoint } from '../utils/useBreakpoint';
import MovieFilters from '../components/MovieFilters';
import { useSearchParams as useRouterSearchParams } from 'react-router-dom';
import Position from 'rsuite/esm/internals/Overlay/Position';

const Home = () => {
  const { isXS } = useBreakpoint();

  const [routerParams] = useRouterSearchParams();

  const [searchParams, setSearchParams] = React.useState({
    query: routerParams.get('q') ?? '',
    page: 1,
    year: undefined,
    genres: undefined,
    director: undefined,
    platforms: undefined,
    title: undefined
  });

  React.useEffect(() => {
    const q = routerParams.get('q') ?? '';
    setSearchParams(prev => ({ ...prev, query: q, page: 1 }));
  }, [routerParams]);

  // Cambiadores centralizados
  const handleFiltersChange = (filters: any) =>
    setSearchParams(prev => ({
      ...prev,
      ...filters,
      page: 1
    }));

  const handlePageChange = (page: number) =>
    setSearchParams(prev => ({
      ...prev,
      page
    }));

  // Hook
  const { data, isLoading, isError } = useMovies(searchParams);

  if (isLoading) return <div style={{ color: "#fff" }}>Cargando...</div>;
  if (isError || !data) return <div style={{ color: "#fff" }}>Error cargando películas</div>;

  return (
    <>
      <FeaturedBanner movies={data.results} />
{/* 
      <div style={{ margin: '24px auto 0', maxWidth: 1150, display: 'flex', justifyContent: 'flex-end' }}>
        <MovieFilters onChange={handleFiltersChange} />
      </div> */}
      <div style={{ position: 'relative', top: -100, marginBottom: -100 }}>
         <MovieGrid movies={data.results}/>
      </div>
     

      <div style={{ display: 'flex', justifyContent: 'center', margin: 32 }}>
        <Pagination
          prev
          next
          first
          ellipsis
          size="md"
          total={data.total_pages}
          limit={1}
          activePage={searchParams.page}
          onChangePage={handlePageChange}
          maxButtons={isXS ? 3 : 7}
          style={{
            background: "transparent",
            color: "var(--color-secundario)",
            borderRadius: 12,
            fontWeight: 700,
            border: 'none'
          }}
        />
      </div>
    </>
  );
};

export default Home;

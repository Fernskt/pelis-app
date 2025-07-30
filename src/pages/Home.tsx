import React from 'react';
import { useMovies } from '../hooks/useMovies';
import FeaturedBanner from '../components/FeaturedBanner';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import { Pagination } from 'rsuite';
import { useBreakpoint } from '../utils/useBreakpoint';
import MovieFilters from '../components/MovieFilters';

const Home = () => {
  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;

  const [searchParams, setSearchParams] = React.useState({
    query: '',
    page: 1,
    year: undefined,
    genres: undefined,
    director: undefined,
    platforms: undefined,
    title: undefined
  });

  // Cambiadores centralizados
  const handleSearch = (q: string) =>
    setSearchParams(prev => ({
      ...prev,
      query: q,
      page: 1
    }));

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

      <div style={{
        margin: '24px auto 0',
        maxWidth: 1150,
        display: isMobile ? 'block' : 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }} >
        <SearchBar onSearch={handleSearch} value={searchParams.query} />
        <MovieFilters onChange={handleFiltersChange} />
      </div>
      <MovieGrid movies={data.results} />

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

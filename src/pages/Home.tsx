import React from 'react';
import { useMovies } from '../hooks/useMovies';
import FeaturedBanner from '../components/FeaturedBanner';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import { HStack, Pagination } from 'rsuite';
import { useBreakpoint } from '../utils/useBreakpoint';
import MovieFilters from '../components/MovieFilters';

const Home = () => {
  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState({});

  const { data, isLoading, isError } = useMovies({ query, page, ...filters });

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  const handleFiltersChange = (filtros: any) => {
    setFilters(filtros);
    setPage(1);
  };

  if (isLoading) return <div style={{ color: "#fff" }}>Cargando...</div>;
  if (isError || !data) return <div style={{ color: "#fff" }}>Error cargando películas</div>;

  return (
    <>
      <FeaturedBanner movies={data.results} />
      
      <div style={{ margin: '24px auto 0', maxWidth: 1150, display: isMobile ? 'block' : 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <SearchBar onSearch={handleSearch} value={query} />
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
          activePage={page}
          onChangePage={setPage}
          maxButtons={isXS ? 3 : 7}
          style={{
            background: "transparent",
            color: "#ffb300",
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

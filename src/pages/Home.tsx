import React from 'react';
import { useMovies } from '../hooks/useMovies';
import FeaturedBanner from '../components/FeaturedBanner';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import { Pagination } from 'rsuite';

const Home = () => {
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1); 
  };

  const { data, isLoading, isError } = useMovies({ query, page });

  if (isLoading) return <div style={{ color: "#fff" }}>Cargando...</div>;
  if (isError || !data) return <div style={{ color: "#fff" }}>Error cargando películas</div>;

  // TMDB trae: data.page, data.total_pages
  return (
    <>
      <FeaturedBanner movies={data.results} />
      <SearchBar onSearch={handleSearch} value={query} />
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
          maxButtons={7}
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

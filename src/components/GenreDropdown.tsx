import React from 'react';
import { Dropdown } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useGenres } from '../hooks/useGenres';
import { useBreakpoint } from '../utils/useBreakpoint';

const excludeGenres = ["Aventura", "Familia", "Fantasía", "Romance", "Película de TV"];

const GenreDropdown: React.FC = () => {
  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;

  const navigate = useNavigate();
  const { data: genres, isLoading } = useGenres();

  const filteredGenres = genres
    ? genres.filter((g: any) => !excludeGenres.includes(g.name))
    : [];

  const handleSelect = (id: number) => {
    navigate(`/genre/${id}`);
  };

  return (
    <Dropdown
      title="Géneros"
      trigger="click"
      placement={isMobile ? "bottomStart" : "bottomStart"}
      style={{
        background: "transparent",
        color: "#fff",
        fontWeight: 600,
        border: "none",
        fontSize: 16,
        minWidth: isMobile ? '100%' : 120,
        padding: 0,
      }}
      menuStyle={{
        borderRadius: isMobile ? 0 : 10,
        marginTop: isMobile ? 0 : 8,
        boxShadow: "0 4px 16px #0007",
        minWidth: isMobile ? '100vw' : 180,
        width: isMobile ? '100vw' : 'auto',
        left: isMobile ? '0 !important' : undefined,
        zIndex: 1000,
        padding: 0,
        maxHeight: isMobile ? '70vh' : '80vh',
        overflowY: 'auto',
      }}
    >
      {isLoading && (
        <Dropdown.Item
          disabled
          style={{ color: 'var(--color-secundario)', fontWeight: 500, padding: 12 }}
        >
          Cargando...
        </Dropdown.Item>
      )}
      {filteredGenres.map((genre: any) => (
        <Dropdown.Item
          key={genre.id}
          style={{
            background: 'none',
            fontSize: isMobile ? 18 : 16,
            textAlign: 'left',
            padding: isMobile ? '14px 24px' : '6px 18px',
            borderBottom: isMobile ? '1px solid #ffffff11' : 'none',
          }}
          onClick={() => handleSelect(genre.id)}
        >
          {genre.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default GenreDropdown;

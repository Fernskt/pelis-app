import React from 'react';
import { Dropdown } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useGenres } from '../hooks/useGenres';

const excludeGenres = ["Aventura", "Familia", "Fantasía", "Romance", "Película de TV"];

const GenreDropdown: React.FC = () => {
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
      placement="bottomStart"
      style={{
        background: "transparent",
        color: "#fff",
        fontWeight: 600,
        border: "none",
        fontSize: 16,
        minWidth: 120,
        padding: 0,
      }}
      menuStyle={{
        background: "#181818",
        borderRadius: 10,
        marginTop: 8,
        boxShadow: "0 4px 16px #0007",
        minWidth: 180,
        zIndex: 1000,
        padding: 0,
      }}
    >
      {isLoading && (
        <Dropdown.Item
          disabled
          style={{ color: '#ffb300', fontWeight: 500, padding: 12 }}
        >
          Cargando...
        </Dropdown.Item>
      )}
      {filteredGenres.map((genre: any) => (
        <Dropdown.Item
          key={genre.id}
          style={{
            color: '#fff',
            background: 'none',
            fontSize: 16,
            textAlign: 'left',
            padding: '6px 18px',
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

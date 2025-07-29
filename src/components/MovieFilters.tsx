import React from 'react';
import { SelectPicker, TagPicker, Button } from 'rsuite';
import { useBreakpoint } from '../utils/useBreakpoint';

const YEARS = Array.from({ length: 2025 - 1950 }, (_, i) => (2024 - i).toString());
/* const DIRECTORS = [
  { label: "Christopher Nolan", value: "Christopher Nolan" },
  { label: "Steven Spielberg", value: "Steven Spielberg" },
  { label: "Martin Scorsese", value: "Martin Scorsese" },
  { label: "Greta Gerwig", value: "Greta Gerwig" },
  { label: "Sofia Coppola", value: "Sofia Coppola" },
];
const PLATFORMS = [
  { label: "Netflix", value: "netflix" },
  { label: "Amazon Prime", value: "prime" },
  { label: "Disney+", value: "disney" },
  { label: "HBO Max", value: "hbo" },
  { label: "Apple TV+", value: "apple" }
]; */
const GENRES = [
    { label: "Acción", value: 28 },
    { label: "Aventura", value: 12 },
    { label: "Comedia", value: 35 },
    { label: "Drama", value: 18 },
    { label: "Terror", value: 27 },
    { label: "Romance", value: 10749 },
    { label: "Crimen", value: 80 },
    { label: "Fantasía", value: 14 },
];

interface Filters {
    year?: string;
    director?: string;
    platforms?: string[];
    genres?: number[];
    title?: string;
}

interface MovieFiltersProps {
    onChange: (filters: Filters) => void;
    loading?: boolean;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({ onChange }) => {
    const { isXS, isSM } = useBreakpoint();
    const isMobile = isXS || isSM;
    const [year, setYear] = React.useState<string | undefined>();
    const [director, setDirector] = React.useState<string | undefined>();
    const [platforms, setPlatforms] = React.useState<string[]>([]);
    const [genres, setGenres] = React.useState<number[]>([]);
    const [title, setTitle] = React.useState<string>("");

    React.useEffect(() => {
        onChange({ year, director, platforms, genres, title });
    }, [year, director, platforms, genres, title]);

    return (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <SelectPicker
                data={YEARS.map(y => ({ label: y, value: y }))}
                searchable
                placeholder="Año"
                style={{ width: isMobile ? '90%' : 110, height: 36 }}
                value={year}
                onChange={v => setYear(v ?? undefined)}
                cleanable
                block={false}
            />
            {/* <SelectPicker
        data={DIRECTORS}
        searchable
        placeholder="Director/a"
        style={{ width: 170 }}
        value={director}
        onChange={v => setDirector(v ?? undefined)}
        cleanable
        block={false}
      /> */}
            {/* <TagPicker
        data={PLATFORMS}
        placeholder="Plataformas"
        style={{ width: 180 }}
        value={platforms}
        onChange={setPlatforms}
        cleanable
      /> */}
            <TagPicker
                data={GENRES}
                placeholder="Géneros (podés combinar)"
                style={{ width: isMobile ? '90%' : 220, height: 35 }}
                value={genres}
                onChange={setGenres}
                cleanable
            />
            {/* <InputGroup inside style={{ width: 200 }}>
        <Input
          value={title}
          onChange={setTitle}
          placeholder="Buscar por título"
          style={{
            background: "#222", color: "#fff", border: "none", borderRadius: 8
          }}
        />
      </InputGroup> */}
            {/*  <Button
        appearance="primary"
        color="yellow"
        loading={loading}
        onClick={() => onChange({ year, director, platforms, genres, title })}
        style={{
          minWidth: 120,
          borderRadius: 10,
          fontWeight: 700,
        }}
      >
        Aplicar filtros
      </Button> */}
            <Button
                appearance="ghost"
                onClick={() => {
                    setYear(undefined);
                    setDirector(undefined);
                    setPlatforms([]);
                    setGenres([]);
                    setTitle("");
                }}
                style={{
                    width: isMobile ? '90%' : 150,
                    minWidth: 110,
                    height: 35,
                    borderRadius: 10,
                    color: "#ffb300",
                    borderColor: "#ffb300"
                }}
            >
                Limpiar
            </Button>
        </div>
    );
};

export default MovieFilters;

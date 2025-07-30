import React from 'react';
import { SelectPicker, TagPicker, Button } from 'rsuite';
import { useBreakpoint } from '../utils/useBreakpoint';

const YEARS = Array.from({ length: 2025 - 1950 }, (_, i) => (2024 - i).toString());

const GENRES = [
    { label: "Acción", value: 28 },
    { label: "Aventura", value: 12 },
    { label: "Comedia", value: 35 },
    { label: "Drama", value: 18 },
    { label: "Terror", value: 27 },
    { label: "Romance", value: 10749 },
    { label: "Crimen", value: 80 },
    { label: "Fantasía", value: 14 },
    { label: "Ciencia Ficción", value: 878 },
    { label: "Animación", value: 16 },
    { label: "Documental", value: 99 },
    { label: "Misterio", value: 9648 },
    { label: "Historia", value: 36 },
    { label: "Guerra", value: 10752 },
    { label: "Western", value: 37 }
];

interface Filters {
    year?: string;
    genres?: number[];
}

interface MovieFiltersProps {
    onChange: (filters: Filters) => void;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({ onChange }) => {
    const { isXS, isSM } = useBreakpoint();
    const isMobile = isXS || isSM;
    const [year, setYear] = React.useState<string | undefined>();
    const [genres, setGenres] = React.useState<number[]>([]);
    const [pendingGenres, setPendingGenres] = React.useState<number[]>([]);

    const handleYear = (v: string | null) => {
        setYear(v ?? undefined);
        onChange({ year: v ?? undefined, genres });
    };

    const handleGenresChange = (vals: number[]) => {
        setPendingGenres(vals);
    };
    const handleGenresClose = () => {
        setGenres(pendingGenres);
        onChange({ year, genres: pendingGenres });
    };

    const handleClear = () => {
        setYear(undefined);
        setGenres([]);
        setPendingGenres([]);
        onChange({ year: undefined, genres: [] });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16
        }}>
            <SelectPicker
                data={YEARS.map(y => ({ label: y, value: y }))}
                searchable
                placeholder="Año"
                style={{ width: isMobile ? '90%' : 110, height: 36 }}
                value={year}
                onChange={handleYear}
                cleanable
                block={false}
            />

            <TagPicker
                data={GENRES}
                placeholder="Géneros (podés combinar)"
                style={{ width: isMobile ? '90%' : 220, height: 36}}
                value={pendingGenres}
                onChange={handleGenresChange}
                onClose={handleGenresClose}
                cleanable
            />

            <Button
                appearance="ghost"
                onClick={handleClear}
                style={{
                    width: isMobile ? '90%' : 120,
                    minWidth: 100,
                    height: 36,
                }}
            >
                Limpiar
            </Button>
        </div>
    );
};

export default MovieFilters;

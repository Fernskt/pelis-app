import React from 'react';
import { Table, Loader } from 'rsuite';
import { useTop100Movies } from '../hooks/useTop100Movies';
import { Link } from 'react-router-dom';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import ArrowUpIcon from '@rsuite/icons/ArrowUp';
import SortIcon from '@rsuite/icons/Sort';

import { useBreakpoint } from '../utils/useBreakpoint';

const { Column, HeaderCell, Cell } = Table;

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const titleCellStyle: React.CSSProperties = {
    color: 'var(--color-secundario)', fontWeight: 700, fontSize: 18, textDecoration: 'none'
};

const tableStyle: React.CSSProperties = {
    background: '#181818',
    color: '#fff',
    fontSize: 16,
    boxShadow: '0 6px 28px #000b',
    margin: '0 auto',
    width: '100%',

};

const sortIcon = (dir: 'asc' | 'desc') =>
    dir === 'asc'
        ? <ArrowUpIcon style={{ marginLeft: 2, fontSize: 14, color: 'var(--color-secundario)' }} />
        : <ArrowDownIcon style={{ marginLeft: 2, fontSize: 14, color: 'var(--color-secundario)' }} />;

type OrderBy = 'rank' | 'year' | 'votos' | 'puntaje' | 'titulo';
type OrderDir = 'asc' | 'desc';

interface MovieWithIndex {
    idx: number;
    id: number;
    title: string;
    poster_path: string;
    release_date?: string;
    vote_count: number;
    vote_average: number;
}

const sortFunctions = {
    rank: (a: MovieWithIndex, b: MovieWithIndex, dir: OrderDir) => dir === 'asc' ? a.idx - b.idx : b.idx - a.idx,
    year: (a: MovieWithIndex, b: MovieWithIndex, dir: OrderDir) => {
        const yearA = parseInt(a.release_date?.substring(0, 4) || '0', 10);
        const yearB = parseInt(b.release_date?.substring(0, 4) || '0', 10);
        return dir === 'asc' ? yearA - yearB : yearB - yearA;
    },
    votos: (a: MovieWithIndex, b: MovieWithIndex, dir: OrderDir) =>
        dir === 'asc' ? a.vote_count - b.vote_count : b.vote_count - a.vote_count,
    puntaje: (a: MovieWithIndex, b: MovieWithIndex, dir: OrderDir) =>
        dir === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average,
    titulo: (a: MovieWithIndex, b: MovieWithIndex, dir: OrderDir) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return dir === 'asc' 
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
    }
};

const Top100Table: React.FC = () => {
    const { data: movies, isLoading, isError } = useTop100Movies();
    const [orderBy, setOrderBy] = React.useState<OrderBy>('rank');
    const [orderDir, setOrderDir] = React.useState<OrderDir>('asc');
    const { isXS, isSM } = useBreakpoint();
    const isMobile = isXS || isSM;

    const posterCellStyle: React.CSSProperties = {
    width: isMobile ? 80 : 60, height: isMobile ? 120 : 90, borderRadius: 8, objectFit: 'cover', boxShadow: '0 2px 10px #0006'
};


    const sortedMovies = React.useMemo(() => {
        if (!movies) return [];
        const moviesWithIndex = movies.map((m, i) => ({ ...m, idx: i + 1 }));
        return moviesWithIndex.slice().sort((a, b) => sortFunctions[orderBy](a, b, orderDir));
    }, [movies, orderBy, orderDir]);

    const handleSort = (col: OrderBy) => {
        console.log('Ordenando por:', col, 'Estado actual:', orderBy, orderDir);
        if (orderBy === col) {
            setOrderDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setOrderBy(col);
            setOrderDir('desc');
        }
    };

    if (isLoading)
        return <div style={{ color: '#fff', textAlign: 'center', margin: 40 }}><Loader size="lg" content="Cargando Top 100..." /></div>;

    if (isError)
        return <div style={{ color: 'red', textAlign: 'center', margin: 40 }}>Error al cargar el Top 100.</div>;

    return (
        <div style={{ padding: isMobile ? 0 : 32, margin: '64px 0' }}>

            <Table
                data={sortedMovies}
                loading={isLoading}
                virtualized
                rowHeight={ isMobile ? 150 : 110}
                headerHeight={54}
                style={tableStyle}
                hover
                autoHeight
            >
                <Column width={ isMobile ? 30 : 70} align="center" fixed>
                    <HeaderCell
                        style={{
                            color: 'var(--color-secundario)',
                            fontWeight: 700,
                            background: '#171717',
                            letterSpacing: 1,
                            padding: 0
                        }}
                    >
                        <div 
                            onClick={() => handleSort('rank')}
                            style={{ cursor: 'pointer', padding: '10px', width: '100%', height: '100%' }}
                        >
                            # {orderBy === 'rank' ? sortIcon(orderDir) : <SortIcon style={{ fontSize: '1.2rem' }}/> }
                        </div>
                    </HeaderCell>
                    <Cell dataKey="idx" style={{ fontWeight: 700, color: '#fff', background: '#202020' }}>
                        {(rowData) => rowData.idx}
                    </Cell>
                </Column>
                <Column width={80} align="center">
                    <HeaderCell style={{
                        color: 'var(--color-secundario)', fontWeight: 700, background: '#171717'
                    }}>Poster</HeaderCell>
                    <Cell style={{ background: '#202020' }}>
                        {(rowData: any) =>
                            <img
                                src={`${IMAGE_URL}/w200${rowData.poster_path}`}
                                alt={rowData.title}
                                style={posterCellStyle}
                            />
                        }
                    </Cell>
                </Column>
                <Column width={340} flexGrow={1}>
                    <HeaderCell 
                        style={{
                            color: 'var(--color-secundario)', 
                            fontWeight: 700, 
                            background: '#171717',
                            padding: 0
                        }}
                    >
                        <div 
                            onClick={() => handleSort('titulo')}
                            style={{ cursor: 'pointer', padding: '10px', width: '100%', height: '100%'}}
                        >
                           <span> Título </span>
                            {orderBy === 'titulo' ? sortIcon(orderDir) : <SortIcon style={{ fontSize: '1.2rem' }}/> }
                        </div>
                    </HeaderCell>
                    <Cell style={{ background: '#202020' }}>

                        {(rowData: any) =>
                            <>
                                <Link to={`/detail/${rowData.id}`} style={titleCellStyle}>{rowData.title}</Link>
                                {/* {isMobile && (<p>Año: {rowData.release_date?.substring(0, 4)}</p>)} */}
                                {isMobile && (<p>Puntaje: ⭐ {rowData.vote_average?.toFixed(1)}</p>)}
                                {isMobile && (<p>Votos: {rowData.vote_count?.toLocaleString()}</p>)}
                               
                            </>
                        }

                    </Cell>
                </Column>
                <Column width={isMobile ? 60 : 120} align="center">
                            <HeaderCell
                                style={{
                                    color: 'var(--color-secundario)',
                                    fontWeight: 700,
                                    background: '#171717',
                                    padding: 0
                                }}
                            >
                                <div 
                                    onClick={() => handleSort('year')}
                                    style={{ cursor: 'pointer', padding: '10px', height: '100%' }}
                                >
                                    Año
                                    {orderBy === 'year' ? sortIcon(orderDir) : <SortIcon style={{ fontSize: '1.2rem' }}/>}
                                </div>
                            </HeaderCell>
                            <Cell style={{ color: '#fff', background: '#202020' }}>
                                {(rowData: any) => rowData.release_date?.substring(0, 4)}
                            </Cell>
                        </Column>

                {!isMobile && (
                    <>
                        <Column width={120} align="center">
                            <HeaderCell
                                style={{
                                    color: 'var(--color-secundario)',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    background: '#171717'
                                }}
                                onClick={() => handleSort('puntaje')}
                            >
                                Puntaje
                                {orderBy === 'puntaje' && sortIcon(orderDir)}
                            </HeaderCell>
                            <Cell style={{ color: '#fff', background: '#202020' }}>
                                {(rowData: any) => <>⭐ {rowData.vote_average?.toFixed(1)}</>}
                            </Cell>
                        </Column>
                        <Column width={120} align="center">
                            <HeaderCell
                                style={{
                                    color: 'var(--color-secundario)',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    background: '#171717'
                                }}
                                onClick={() => handleSort('votos')}
                            >
                                Votos
                                {orderBy === 'votos' && sortIcon(orderDir)}
                            </HeaderCell>
                            <Cell style={{ color: '#fff', background: '#202020' }}>
                                {(rowData: any) => rowData.vote_count?.toLocaleString()}
                            </Cell>
                        </Column>
                        <Column width={120} align="center">
                            <HeaderCell style={{
                                color: 'var(--color-secundario)', fontWeight: 700, background: '#171717'
                            }}>Acción</HeaderCell>
                            <Cell style={{ background: '#202020' }}>
                                {(rowData: any) =>
                                    <Link to={`/detail/${rowData.id}`}
                                        style={{
                                            color: 'var(--color-secundario)', textDecoration: 'underline', fontWeight: 700,
                                            fontSize: 15
                                        }}>
                                        Ver Detalle
                                    </Link>
                                }
                            </Cell>
                        </Column>
                        <Column width={120} align="center">
                            <HeaderCell style={{
                                color: 'var(--color-secundario)', fontWeight: 700, background: '#171717'
                            }}>Ver Trailer</HeaderCell>
                            <Cell style={{ background: '#202020' }}>
                                {(rowData: any) =>
                                    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(rowData.title + ' trailer')}`}
                                        target="_blank" rel="noopener noreferrer"
                                        style={{
                                            color: 'var(--color-secundario)', textDecoration: 'underline', fontWeight: 700,
                                            fontSize: 15
                                        }}>
                                        Ver Trailer
                                    </a>
                                }
                            </Cell>
                        </Column>
                    </>
                )}
            </Table>
        </div>
    );
};

export default Top100Table;

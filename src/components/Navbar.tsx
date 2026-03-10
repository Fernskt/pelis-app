import React from 'react';
import GenreDropdown from './GenreDropdown';
import { Navbar as RsNavbar, Nav, Dropdown } from 'rsuite';
import { Link } from 'react-router-dom';
import MenuIcon from '@rsuite/icons/Menu';
import { useBreakpoint } from '../utils/useBreakpoint';
import { useGenres } from '../hooks/useGenres';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import SearchBar from './SearchBar';


const excludeGenres = ["Aventura", "Familia", "Fantasía", "Romance", "Película de TV"];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [showGenres, setShowGenres] = React.useState(false);
  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;
  const navigate = useNavigate();
  const handleNavSearch = (q: string) => navigate(q ? `/?q=${encodeURIComponent(q)}` : '/');
  const { data: genres } = useGenres();

  const filteredGenres = genres
    ? genres.filter((g: any) => !excludeGenres.includes(g.name))
    : [];

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <RsNavbar
      style={{
        background: scrolled
          ? 'linear-gradient(to right, #390f19, #0b1d2da8)'
          : '#04080c28',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        color: 'white',
        fontSize: 16,
        borderBottom: '1px solid #7875800f',
        transition: 'background 1s, backdrop-filter 1s, box-shadow 1s',
        boxShadow: scrolled ? '0 2px 12px #0007' : undefined,

        margin: '0',
      }}
    >
      <RsNavbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}><img src={logo} alt='FilmBase' style={{ marginRight: 8 }} /> Film<span style={{ fontWeight: '800', color: 'var(--color-secundario)' }}>Base</span></h2>
      </RsNavbar.Brand>

      {isMobile ? (
        <Nav pullRight>
          <Dropdown
            title={<MenuIcon style={{ fontSize: 18, color: 'var(--color-secundario)' }} />}
            placement="bottomEnd"
            noCaret
            style={{
              background: 'transparent',
              border: 'none',
            }}
            menuStyle={{
              width: '100vw',
              borderRadius: 0,
              left: '0 !important',
              right: '0 !important',
              marginTop: 0,
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            <Dropdown.Item panel style={{ padding: '12px 16px', borderBottom: '1px solid #ffffff11' }}>
              <div onClick={(e) => e.stopPropagation()}>
                <SearchBar onSearch={handleNavSearch} width={300} />
              </div>
            </Dropdown.Item>
            <div
              style={{
                padding: '14px 24px',
                fontSize: 18,
                fontWeight: 600,
                borderBottom: '1px solid #ffffff11',
                cursor: 'pointer',
                color: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowGenres(!showGenres);
              }}
            >
              Géneros {showGenres ? <ArrowDownIcon /> : <ArrowRightIcon />}
            </div>
            
            {showGenres && filteredGenres.map((genre: any) => (
              <Dropdown.Item
                key={genre.id}
                style={{
                  padding: '12px 24px 12px 40px',
                  fontSize: 16,
                  borderBottom: '1px solid #ffffff11',
                  backgroundColor: '#00000022',
                }}
                onClick={() => {
                  navigate(`/genre/${genre.id}`);
                  setShowGenres(false);
                }}
              >
                {genre.name}
              </Dropdown.Item>
            ))}

            <Dropdown.Item 
              panel
              style={{
                height: '8px',
                padding: 0,
                borderBottom: '1px solid #ffffff22',
                cursor: 'default',
              }}
            />
            
            <Dropdown.Item 
              as={Link} 
              to="/list/tendencias"
              style={{
                padding: '14px 24px',
                fontSize: 18,
                borderBottom: '1px solid #ffffff11',
              }}
            >
              Tendencias
            </Dropdown.Item>
            <Dropdown.Item 
              as={Link} 
              to="/top100"
              style={{
                padding: '14px 24px',
                fontSize: 18,
                borderBottom: '1px solid #ffffff11',
              }}
            >
              Top 100
            </Dropdown.Item>

            {/*  <Dropdown.Separator /> */}
            {/* <Dropdown.Item>Iniciar Sesión</Dropdown.Item> */}
          </Dropdown>
        </Nav>
      ) : (
        <>
          <Nav>
            <GenreDropdown />
            <Nav.Item as={Link} to="/list/tendencias">
              Tendencias
            </Nav.Item>
            <Nav.Item as={Link} to="/top100">Top 100</Nav.Item>
          </Nav>
          <Nav pullRight style={{ display: 'flex', alignItems: 'center' }}>
            <Nav.Item panel style={{ padding: '0 12px' }}>
              <SearchBar onSearch={handleNavSearch} width={500} />
            </Nav.Item>
          </Nav>
        </>
      )}
    </RsNavbar>
  );
};

export default Navbar;

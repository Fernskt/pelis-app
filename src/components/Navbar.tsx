import React from 'react';
import GenreDropdown from './GenreDropdown';
import { Navbar as RsNavbar, Nav, Dropdown } from 'rsuite';
import { Link } from 'react-router-dom';
import MenuIcon from '@rsuite/icons/Menu';
import { useBreakpoint } from '../utils/useBreakpoint';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;

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
      <RsNavbar.Brand as={Link} to="/">
        🎬 <span style={{ fontWeight: 'bold' }}>Pelis Online</span>
      </RsNavbar.Brand>

      {isMobile ? (
        // SOLO menú hamburguesa, sin ningún Nav "desktop"
        <Nav pullRight>
          <Dropdown
            title={<MenuIcon style={{ fontSize: 18, color: '#ffb300' }} />}
            placement="bottomEnd"
            noCaret
            style={{
              
              background: 'transparent',
              border: 'none',
            }}
          >
            <Dropdown.Item as={Link} to="/list/tendencias">
              Tendencias
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/top100">Top 100</Dropdown.Item>
            {/* OJO: si GenreDropdown es grande, podrías usarlo como submenu */}
            <Dropdown.Item>
              <GenreDropdown />
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Iniciar Sesión</Dropdown.Item>
          </Dropdown>
        </Nav>
      ) : (
        // SOLO menú desktop, sin ningún menú hamburguesa ni Dropdown
        <>
          <Nav>
            <GenreDropdown />
            <Nav.Item as={Link} to="/list/tendencias">
              Tendencias
            </Nav.Item>
            <Nav.Item as={Link} to="/top100">Top 100</Nav.Item>
          </Nav>
          <Nav pullRight>
            <Nav.Item>Iniciar Sesión</Nav.Item>
          </Nav>
        </>
      )}
    </RsNavbar>
  );
};

export default Navbar;

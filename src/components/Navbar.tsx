import React from 'react';
import GenreDropdown from './GenreDropdown';
import { Navbar as RsNavbar, Nav, Dropdown } from 'rsuite';
import { Link } from 'react-router-dom';
import MenuIcon from '@rsuite/icons/Menu';
import { useBreakpoint } from '../utils/useBreakpoint';
import logo from '../assets/logo.svg';

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
      <RsNavbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}><img src={logo} alt='moviescope' style={{ marginRight: 8 }} /> Movie<span style={{ fontWeight: '800', color: 'var(--color-secundario)' }}>Scope</span></h2>
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
          >
            <Dropdown.Item as={Link} to="/list/tendencias">
              Tendencias
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/top100">Top 100</Dropdown.Item>

            <GenreDropdown />

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
          {/* <Nav pullRight>
            <Nav.Item>Iniciar Sesión</Nav.Item>
          </Nav> */}
        </>
      )}
    </RsNavbar>
  );
};

export default Navbar;

import React from 'react';
import GenreDropdown from './GenreDropdown';
import { Navbar as RsNavbar, Nav } from 'rsuite';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);

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
        background: scrolled ? 'linear-gradient(to right, #390f19, #0b1d2da8)' : '#04080c28',
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
      }}
    >
      <RsNavbar.Brand as={Link} to="/">
        🎬 <span style={{ fontWeight: 'bold' }}>Pelis Online</span>
      </RsNavbar.Brand>
      <Nav>
        <GenreDropdown />
        <Nav.Item as={Link} to="/list/tendencias">Tendencias</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item>Iniciar Sesión</Nav.Item>
      </Nav>
    </RsNavbar>
  );
};

export default Navbar;

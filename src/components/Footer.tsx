import React from 'react';
import { Container, Divider, FlexboxGrid } from 'rsuite';
import { FaGithub, FaLinkedin, FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useBreakpoint } from '../utils/useBreakpoint';

const Footer: React.FC = () => {
  const { isXS } = useBreakpoint();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "#17171b",
      color: "#fff",
      marginTop: 48,
      padding: isXS ? "32px 0 12px 0" : "48px 0 16px 0",
      fontSize: "1rem",
      boxShadow: "0 -6px 30px #000c"
    }}>
      <Container>
        <FlexboxGrid justify={isXS ? "center" : "space-between"} align="middle" style={{ flexWrap: "wrap", padding: "0 16px", gap: "16px" }}>
          <FlexboxGrid.Item  style={{ textAlign: isXS ? 'center' : 'left', marginBottom: isXS ? 14 : 0 }}>
            <strong style={{ color: "var(--color-secundario)", fontSize: 22 }}>FilmBase</strong>
            <div style={{ fontSize: 14, color: "#e1e1e1", marginTop: 2 }}>Descubre, explora y disfruta el mundo del cine.</div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item style={{ textAlign: "center" }}>
            <ul style={{
              color: "var(--color-secundario)",
              listStyle: "none",
              display: isXS ? "block" : "flex",
              gap: isXS ? 0 : 22,
              padding: 0, margin: 0
            }}>
              <li style={{ margin: isXS ? '10px 0' : '0 10px' }}>
                <Link to="/about" style={{ color: "var(--color-secundario)", textDecoration: "none", fontWeight: 600 }}>Acerca de</Link>
              </li>
              <li style={{ margin: isXS ? '10px 0' : '0 10px' }}>
                <Link to="/faqs" style={{ color: "var(--color-secundario)", textDecoration: "none", fontWeight: 600 }}>FAQs</Link>
              </li>
              <li style={{ margin: isXS ? '10px 0' : '0 10px' }}>
                <Link to="/help" style={{ color: "var(--color-secundario)", textDecoration: "none", fontWeight: 600 }}>Ayuda</Link>
              </li>
            </ul>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item style={{ textAlign: isXS ? 'center' : 'right', marginTop: isXS ? 10 : 0 }}>
            <a href="mailto:tu@email.com" style={{ color: "var(--color-secundario)", margin: "0 16px" }} aria-label="Mail">
              <FaRegEnvelope size={22} />
            </a>
            <a href="https://github.com/Fernskt" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-secundario)", margin: "0 16px" }} aria-label="Github">
              <FaGithub size={22} />
            </a>
            <a href="https://www.linkedin.com/in/hasperue/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-secundario)", margin: "0 16px" }} aria-label="Linkedin">
              <FaLinkedin size={22} />
            </a>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider style={{ background: "#333", margin: "24px 0 18px 0" }} />
        <p style={{
          color: "#e1e1e1", textAlign: "center",
          fontSize: 13, margin: 0
        }}>
          Desarrollado por <a href='https://www.linkedin.com/in/hasperue/' target='_blank' rel="noopener noreferrer" style={{ color: "var(--color-secundario)", fontWeight: 600 }}>Fernando Hasperué</a>
        </p>
        <p style={{
          color: "#8b8b8b", textAlign: "center",
          maxWidth: 640, margin: "16px auto 0", fontSize: "0.92rem", fontStyle: "italic"
        }}>
          Esta aplicación es un proyecto personal sin fines comerciales ni relación con empresas de entretenimiento. Información proveniente de APIs públicas de películas. {year}.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

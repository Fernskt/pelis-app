import React from 'react';
import { Container, Divider, FlexboxGrid } from 'rsuite';
import { useBreakpoint } from '../utils/useBreakpoint';

const Footer: React.FC = () => {
  const { isXS } = useBreakpoint();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "#1a1a1a",
      color: "#fff",
      marginTop: 40,
      padding: "32px 0 16px 0",
      fontSize: "1rem"
    }}>
      <Container>
        <FlexboxGrid justify="center" align="middle" style={{ flexWrap: "wrap", padding: "0 16px", margin: "8px", gap: "16px" }}>
          <FlexboxGrid.Item>
            <p className="copyright" style={{ margin: 0 }}>
              Copyright © {year} - CAC-Movies
            </p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <ul className="footer__links" style={{ color: "#ffb300", listStyle: "none", display: isXS ? "block" : "flex", gap: "18px", padding: 0, margin: 0, textAlign: isXS ? "center" : "left"}}>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Ayuda</a></li>
              <li><a href="#">Administración películas</a></li>
            </ul>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider style={{ background: "#333", margin: "24px 0" }} />
        <p className="about" style={{ color: "#ccc", textAlign: "center", maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>
          Explora una extensa selección de películas en español latino con CAC-Movies. Disfruta de toda la información que necesitas sobre tus títulos favoritos.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

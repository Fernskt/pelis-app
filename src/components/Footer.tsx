import React from 'react';
import { Container, Divider, FlexboxGrid } from 'rsuite';

const Footer: React.FC = () => {
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
        <FlexboxGrid justify="space-between" align="middle" style={{ flexWrap: "wrap" }}>
          <FlexboxGrid.Item>
            <p className="copyright" style={{ margin: 0 }}>
              Copyright © {year} - CAC-Movies
            </p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <ul className="footer__links" style={{ listStyle: "none", display: "flex", gap: "18px", padding: 0, margin: 0 }}>
              <li><a href="#" style={{ color: "#ffb300" }}>Términos y condiciones</a></li>
              <li><a href="#" style={{ color: "#ffb300" }}>Preguntas frecuentes</a></li>
              <li><a href="#" style={{ color: "#ffb300" }}>Ayuda</a></li>
              <li><a href="#" style={{ color: "#ffb300" }}>Administración películas</a></li>
            </ul>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider style={{ background: "#333", margin: "24px 0" }} />
        <p className="about" style={{ color: "#ccc", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          Explora una extensa selección de películas en español latino con CAC-Movies. Disfruta de toda la información que necesitas sobre tus títulos favoritos.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

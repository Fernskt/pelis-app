import React from 'react';
import { Container, FlexboxGrid, Divider } from 'rsuite';
import { FaGithub, FaLinkedin, FaRegEnvelope, FaFilm, FaCode, FaDatabase } from 'react-icons/fa';
import { useBreakpoint } from '../utils/useBreakpoint';

const ACCENT = 'var(--color-secundario, #ffb300)';

const techStack = [
  { icon: <FaCode size={28} color={ACCENT} />, name: 'React + TypeScript', desc: 'Interfaz moderna y tipada.' },
  { icon: <FaFilm size={28} color={ACCENT} />, name: 'TMDB API', desc: 'Base de datos de películas en tiempo real.' },
  { icon: <FaDatabase size={28} color={ACCENT} />, name: 'RSuite + Vite', desc: 'Componentes UI y bundler ultrarrápido.' },
];

const About: React.FC = () => {
  const { isXS } = useBreakpoint();

  return (
    <div style={{ background: '#0a0c0f', minHeight: '80vh', paddingBottom: 64 }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #17171b 60%, #1a1200 100%)',
        padding: isXS ? '48px 20px 36px' : '72px 0 56px',
        textAlign: 'center',
        borderBottom: `2px solid ${ACCENT}22`,
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}>
          <FaFilm size={36} color={ACCENT} />
          <span style={{ color: ACCENT, fontSize: isXS ? 32 : 44, fontWeight: 800, letterSpacing: 1 }}>
            FilmBase
          </span>
        </div>
        <p style={{
          color: '#e1e1e1',
          fontSize: isXS ? 16 : 20,
          maxWidth: 620,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Tu espacio para descubrir, explorar y disfrutar el mundo del cine.
        </p>
      </div>

      <Container style={{ maxWidth: 860, padding: isXS ? '0 16px' : undefined, margin: '0 auto' }}>

        {/* Sobre el proyecto */}
        <section style={{ marginTop: 56 }}>
          <h2 style={{ color: ACCENT, fontSize: isXS ? 22 : 28, fontWeight: 700, marginBottom: 16 }}>
            ¿Qué es FilmBase?
          </h2>
          <p style={{ color: '#cccccc', fontSize: 16, lineHeight: 1.8, margin: 0 }}>
            FilmBase es un proyecto personal desarrollado con pasión por el cine y la programación.
            Permite buscar películas, explorar géneros, ver trailers, consultar reparto y conocer en qué
            plataformas de streaming están disponibles, todo en un solo lugar y en español.
          </p>
          <p style={{ color: '#cccccc', fontSize: 16, lineHeight: 1.8, marginTop: 16 }}>
            La información proviene de <strong style={{ color: ACCENT }}>The Movie Database (TMDB)</strong>,
            una de las APIs públicas más completas del mundo del entretenimiento.
          </p>
        </section>

        <Divider style={{ background: '#2a2a2a', margin: '40px 0' }} />

        {/* Tecnologías */}
        <section>
          <h2 style={{ color: ACCENT, fontSize: isXS ? 22 : 28, fontWeight: 700, marginBottom: 28 }}>
            Tecnologías utilizadas
          </h2>
          <FlexboxGrid justify="start" style={{ gap: 20, flexWrap: 'wrap' }}>
            {techStack.map(({ icon, name, desc }) => (
              <FlexboxGrid.Item key={name} style={{ width: isXS ? '100%' : 'calc(33% - 14px)' }}>
                <div style={{
                  background: '#17171b',
                  border: `1px solid #2a2a2a`,
                  borderRadius: 12,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  height: '100%',
                }}>
                  {icon}
                  <strong style={{ color: '#fff', fontSize: 15 }}>{name}</strong>
                  <span style={{ color: '#999', fontSize: 14 }}>{desc}</span>
                </div>
              </FlexboxGrid.Item>
            ))}
          </FlexboxGrid>
        </section>

        <Divider style={{ background: '#2a2a2a', margin: '40px 0' }} />

        {/* Sobre el desarrollador */}
        <section style={{ marginBottom: 8 }}>
          <h2 style={{ color: ACCENT, fontSize: isXS ? 22 : 28, fontWeight: 700, marginBottom: 16 }}>
            Sobre el desarrollador
          </h2>
          <p style={{ color: '#cccccc', fontSize: 16, lineHeight: 1.8, margin: 0 }}>
            Soy <strong style={{ color: '#fff' }}>Fernando Hasperué</strong>, desarrollador frontend apasionado
            por crear experiencias digitales limpias y funcionales. FilmBase nació como un proyecto para
            aprender y mejorar, combinando dos de mis grandes pasiones: el cine y el código.
          </p>
          <div style={{ display: 'flex', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
            <a
              href="mailto:tu@email.com"
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: ACCENT, textDecoration: 'none', fontWeight: 600 }}
              aria-label="Enviar email"
            >
              <FaRegEnvelope size={18} /> Contacto
            </a>
            <a
              href="https://github.com/Fernskt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: ACCENT, textDecoration: 'none', fontWeight: 600 }}
              aria-label="GitHub"
            >
              <FaGithub size={18} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hasperue/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: ACCENT, textDecoration: 'none', fontWeight: 600 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} /> LinkedIn
            </a>
          </div>
        </section>

        <Divider style={{ background: '#2a2a2a', margin: '40px 0' }} />

        {/* Aviso legal */}
        <p style={{ color: '#666', fontSize: 13, fontStyle: 'italic', textAlign: 'center', margin: 0 }}>
          Este sitio es un proyecto personal sin fines comerciales ni vinculación con empresas de entretenimiento.
          Los datos de películas son provistos por <a href="#" rel="noopener noreferrer" style={{ color: ACCENT }}>TMDB</a>.
        </p>

      </Container>
    </div>
  );
};

export default About;

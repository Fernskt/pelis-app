import React from 'react';
import { Container, Divider } from 'rsuite';
import {
  FaLifeRing,
  FaSearch,
  FaFilm,
  FaList,
  FaStar,
  FaPlayCircle,
  FaTv,
  FaFilter,
} from 'react-icons/fa';
import { useBreakpoint } from '../utils/useBreakpoint';

const ACCENT = 'var(--color-secundario, #ffb300)';

const sections = [
  {
    icon: <FaSearch size={24} color={ACCENT} />,
    title: 'Buscar películas',
    steps: [
      'Haz clic en la barra de búsqueda de la parte superior.',
      'Escribe el título de la película que deseas encontrar.',
      'Los resultados aparecerán en tiempo real mientras escribes.',
      'Haz clic en una película para ver sus detalles.',
    ],
  },
  {
    icon: <FaFilter size={24} color={ACCENT} />,
    title: 'Filtrar por género',
    steps: [
      'Ve a la sección "Películas" desde el menú de navegación.',
      'Usa el selector de géneros para elegir una categoría (Acción, Drama, Comedia, etc.).',
      'El catálogo se actualizará automáticamente con las películas del género seleccionado.',
    ],
  },
  {
    icon: <FaFilm size={24} color={ACCENT} />,
    title: 'Ver detalles de una película',
    steps: [
      'Haz clic en cualquier película del catálogo o de los resultados de búsqueda.',
      'En la página de detalles encontrarás sinopsis, puntuación, reparto y géneros.',
      'También podrás ver el tráiler oficial si está disponible.',
    ],
  },
  {
    icon: <FaPlayCircle size={24} color={ACCENT} />,
    title: 'Ver el tráiler',
    steps: [
      'Abre la página de detalles de una película.',
      'Si hay un tráiler disponible, aparecerá un botón o sección de reproducción.',
      'El tráiler se reproduce directamente desde YouTube en la misma página.',
    ],
  },
  {
    icon: <FaTv size={24} color={ACCENT} />,
    title: 'Dónde verla en streaming',
    steps: [
      'En la página de detalles, desplázate hacia la sección "Disponible en".',
      'Verás los logos de los servicios de streaming donde está disponible la película.',
      'Haz clic en el logo del servicio para ir directamente a la plataforma.',
    ],
  },
  {
    icon: <FaStar size={24} color={ACCENT} />,
    title: 'Top 100 películas',
    steps: [
      'Accede a "Top 100" desde el menú de navegación.',
      'Encontrarás las 100 películas mejor puntuadas según TMDB.',
      'Puedes hacer clic en cualquiera para ver sus detalles completos.',
    ],
  },
  {
    icon: <FaList size={24} color={ACCENT} />,
    title: 'Explorar el catálogo',
    steps: [
      'Desde la página principal verás un banner con películas destacadas.',
      'Desplázate hacia abajo para explorar el catálogo general.',
      'Usa la paginación o el scroll infinito para cargar más resultados.',
    ],
  },
];

const Help: React.FC = () => {
  const { isXS } = useBreakpoint();

  return (
    <div style={{ background: '#0a0c0f', minHeight: '80vh', paddingBottom: 64 }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #17171b 60%, #1a1200 100%)',
          padding: isXS ? '48px 20px 36px' : '72px 0 56px',
          textAlign: 'center',
          borderBottom: `2px solid ${ACCENT}22`,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <FaLifeRing size={36} color={ACCENT} />
          <span style={{ color: ACCENT, fontSize: isXS ? 28 : 42, fontWeight: 800, letterSpacing: 1 }}>
            Centro de Ayuda
          </span>
        </div>
        <p
          style={{
            color: '#e1e1e1',
            fontSize: isXS ? 15 : 18,
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Aprende a sacarle el máximo partido a FilmBase con estas guías paso a paso.
        </p>
      </div>

      <Container style={{ maxWidth: 860, padding: isXS ? '0 16px' : undefined, margin: '0 auto' }}>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {sections.map(({ icon, title, steps }) => (
            <div
              key={title}
              style={{
                background: '#17171b',
                border: '1px solid #2a2a2a',
                borderRadius: 14,
                padding: isXS ? '20px 18px' : '28px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                {icon}
                <h3 style={{ color: '#fff', fontSize: isXS ? 17 : 20, fontWeight: 700, margin: 0 }}>
                  {title}
                </h3>
              </div>
              <ol style={{ margin: 0, paddingLeft: 20 }}>
                {steps.map((step, i) => (
                  <li
                    key={i}
                    style={{
                      color: '#cccccc',
                      fontSize: 15,
                      lineHeight: 1.8,
                      marginBottom: i < steps.length - 1 ? 6 : 0,
                    }}
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <Divider style={{ background: '#2a2a2a', margin: '48px 0 32px' }} />

        {/* Contacto */}
        <div
          style={{
            background: '#17171b',
            border: `1px solid ${ACCENT}44`,
            borderRadius: 14,
            padding: isXS ? '24px 18px' : '32px 40px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: ACCENT, fontSize: isXS ? 18 : 22, fontWeight: 700, marginBottom: 10 }}>
            ¿Todavía tienes dudas?
          </h3>
          <p style={{ color: '#cccccc', fontSize: 15, lineHeight: 1.8, margin: '0 0 18px' }}>
            Si no encontraste lo que buscabas, visita nuestra sección de{' '}
            <a href="/faqs" style={{ color: ACCENT, textDecoration: 'underline' }}>
              Preguntas Frecuentes
            </a>{' '}
            o contáctanos directamente.
          </p>
          <a
            href="mailto:contacto@filmbase.app"
            style={{
              display: 'inline-block',
              background: ACCENT,
              color: '#111',
              fontWeight: 700,
              fontSize: 15,
              padding: '10px 28px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Enviar un mensaje
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Help;

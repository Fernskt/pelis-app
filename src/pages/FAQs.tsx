import React, { useState } from 'react';
import { Container, Divider } from 'rsuite';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useBreakpoint } from '../utils/useBreakpoint';

const ACCENT = 'var(--color-secundario, #ffb300)';

const faqs: { question: string; answer: string }[] = [
  {
    question: '¿De dónde proviene la información de las películas?',
    answer:
      'Toda la información (títulos, sinopsis, puntuaciones, reparto, trailers, etc.) proviene de The Movie Database (TMDB), una de las bases de datos de entretenimiento más completas y actualizadas del mundo.',
  },
  {
    question: '¿Puedo ver las películas directamente en FilmBase?',
    answer:
      'No, FilmBase es una plataforma de descubrimiento. Puedes consultar en qué servicios de streaming está disponible cada película (Netflix, Disney+, Prime Video, etc.) y desde ahí acceder a verla.',
  },
  {
    question: '¿Cómo funciona el buscador?',
    answer:
      'Escribe el título de la película en el buscador de la barra superior. Los resultados se actualizan en tiempo real mientras escribes, utilizando la API de TMDB.',
  },
  {
    question: '¿Qué es el Top 100?',
    answer:
      'Es una lista con las 100 películas mejor puntuadas según los usuarios de TMDB. Puedes consultarla desde el menú de navegación.',
  },
  {
    question: '¿Puedo filtrar películas por género?',
    answer:
      'Sí. En la sección de películas encontrarás un selector de géneros que te permite explorar el catálogo por categoría: Acción, Drama, Comedia, Terror, Ciencia ficción y más.',
  },
  {
    question: '¿La información de streaming está disponible para mi país?',
    answer:
      'Los proveedores de streaming mostrados corresponden a la disponibilidad en España. La disponibilidad puede variar según la región.',
  },
  {
    question: '¿Con qué frecuencia se actualiza el contenido?',
    answer:
      'El contenido se obtiene directamente desde la API de TMDB en cada consulta, por lo que la información siempre está actualizada.',
  },
  {
    question: '¿FilmBase tiene app móvil?',
    answer:
      'De momento, FilmBase es una aplicación web adaptada para dispositivos móviles (responsive). No existe una app nativa para iOS o Android.',
  },
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: '#17171b',
        border: `1px solid ${open ? ACCENT + '66' : '#2a2a2a'}`,
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          background: 'none',
          border: 'none',
          padding: '20px 24px',
          cursor: 'pointer',
          textAlign: 'left',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        <span>{question}</span>
        {open
          ? <FaChevronUp size={14} color={ACCENT} style={{ flexShrink: 0 }} />
          : <FaChevronDown size={14} color="#888" style={{ flexShrink: 0 }} />}
      </button>
      {open && (
        <p
          style={{
            color: '#cccccc',
            fontSize: 15,
            lineHeight: 1.8,
            margin: 0,
            padding: '0 24px 20px',
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQs: React.FC = () => {
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
          <FaQuestionCircle size={36} color={ACCENT} />
          <span style={{ color: ACCENT, fontSize: isXS ? 28 : 42, fontWeight: 800, letterSpacing: 1 }}>
            Preguntas Frecuentes
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
          Resolvemos las dudas más comunes sobre FilmBase.
        </p>
      </div>

      <Container style={{ maxWidth: 800, padding: isXS ? '0 16px' : undefined, margin: '0 auto' }}>
        <section style={{ marginTop: 48 }}>
          {faqs.map(faq => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </section>

        <Divider style={{ background: '#2a2a2a', margin: '40px 0' }} />

        <p style={{ color: '#888', fontSize: 14, textAlign: 'center', lineHeight: 1.8 }}>
          ¿No encontraste lo que buscabas?{' '}
          <a href="/help" style={{ color: ACCENT, textDecoration: 'underline' }}>
            Contáctanos
          </a>{' '}
          y te ayudamos.
        </p>
      </Container>
    </div>
  );
};

export default FAQs;

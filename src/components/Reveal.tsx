import React from 'react';
import { useInView, UseInViewOptions } from '../hooks/useInView';

export type RevealVariant = 'fadeUp' | 'fadeDown' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn';

const HIDDEN_TRANSFORMS: Record<RevealVariant, string> = {
  fadeUp:    'translateY(32px)',
  fadeDown:  'translateY(-32px)',
  fadeIn:    'translateY(0)',
  fadeLeft:  'translateX(-32px)',
  fadeRight: 'translateX(32px)',
  scaleIn:   'scale(0.9)',
};

interface RevealProps {
  children: React.ReactNode;
  /** Tipo de animación de entrada. Default: 'fadeUp' */
  variant?: RevealVariant;
  /** Demora en segundos antes de iniciar la animación. Default: 0 */
  delay?: number;
  /** Duración en segundos. Default: 0.55 */
  duration?: number;
  /** Opciones para el IntersectionObserver */
  inViewOptions?: UseInViewOptions;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Componente reutilizable que revela su contenido con una animación suave
 * cuando entra en el viewport (scroll-driven). Usa IntersectionObserver internamente.
 *
 * @example
 * <Reveal variant="fadeUp" delay={0.1}>
 *   <MovieCard movie={movie} />
 * </Reveal>
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.55,
  inViewOptions,
  style,
  className,
}) => {
  const { ref, inView } = useInView({ threshold: 0.08, once: true, ...inViewOptions });

  const animStyle: React.CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : HIDDEN_TRANSFORMS[variant],
    transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
    // willChange sólo cuando hay animación pendiente; se libera cuando ya está visible
    willChange: inView ? 'auto' : 'opacity, transform',
    ...style,
  };

  return (
    <div ref={ref} style={animStyle} className={className}>
      {children}
    </div>
  );
};

export default Reveal;

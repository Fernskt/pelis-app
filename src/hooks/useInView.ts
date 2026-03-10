import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions {
  /** Porcentaje del elemento visible para disparar (0–1). Default: 0.1 */
  threshold?: number;
  /** Margen alrededor del viewport. Default: '0px' */
  rootMargin?: string;
  /** Si es true, deja de observar una vez que el elemento es visible. Default: true */
  once?: boolean;
}

/**
 * Hook reutilizable que detecta si un elemento está dentro del viewport
 * usando IntersectionObserver (sin librerías externas, máxima performance).
 *
 * @example
 * const { ref, inView } = useInView({ threshold: 0.2 });
 * return <div ref={ref} style={{ opacity: inView ? 1 : 0 }} />;
 */
export const useInView = (options: UseInViewOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
};

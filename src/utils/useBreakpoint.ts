import { useState, useEffect } from 'react';

export function useMedia(mq: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(mq).matches);

  useEffect(() => {
    const mql = window.matchMedia(mq);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mq]);

  return matches;
}

export const BREAKPOINTS = {
  xs: '(max-width: 575.98px)',                // <576
  sm: '(min-width: 576px) and (max-width: 767.98px)',  // 576-767
  md: '(min-width: 768px) and (max-width: 991.98px)',  // 768-991
  lg: '(min-width: 992px) and (max-width: 1199.98px)', // 992-1199
  xl: '(min-width: 1200px)',                           // 1200+
};

export const useBreakpoint = () => {
  const isXS = useMedia(BREAKPOINTS.xs);
  const isSM = useMedia(BREAKPOINTS.sm);
  const isMD = useMedia(BREAKPOINTS.md);
  const isLG = useMedia(BREAKPOINTS.lg);
  const isXL = useMedia(BREAKPOINTS.xl);

  return { isXS, isSM, isMD, isLG, isXL };
};

export const useBreakpointName = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  const { isXS, isSM, isMD, isLG, isXL } = useBreakpoint();
  if (isXS) return 'xs';
  if (isSM) return 'sm';
  if (isMD) return 'md';
  if (isLG) return 'lg';
  return 'xl';
};

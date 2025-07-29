import React from 'react';

function useMedia(mq: string): boolean {
  const [matches, setMatches] = React.useState(() => window.matchMedia(mq).matches);

  React.useEffect(() => {
    const mql = window.matchMedia(mq);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mq]);

  return matches;
}

const BreakpointTest: React.FC = () => {
  const isXS = useMedia('(max-width: 575.98px)');
  const isSM = useMedia('(min-width: 576px) and (max-width: 767.98px)');
  const isMobile = isXS || isSM;

  console.log('isMobile', isMobile);

  return (
    <div style={{padding: 60, background: '#222', color: '#fff', fontSize: 26}}>
      <div>
        XS: {String(isXS)} | SM: {String(isSM)} | isMobile: {String(isMobile)}
      </div>
      <div style={{marginTop: 32, color: '#ffb300', fontWeight: 900, fontSize: 40}}>
        {isMobile ? 'MENÚ HAMBURGUESA' : 'MENÚ DESKTOP'}
      </div>
    </div>
  );
};

export default BreakpointTest;

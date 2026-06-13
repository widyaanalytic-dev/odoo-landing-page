import { useEffect, useState } from 'react';

/** Tighter silo layout on viewports below desktop slide mode (< 1024px) */
export function useCompactProblemScene(): boolean {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return compact;
}

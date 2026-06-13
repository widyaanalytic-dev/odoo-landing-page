import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PROBLEM_SCENE } from '../problem.visual.config';

interface ProblemSceneCanvasProps {
  children: ReactNode;
}

export function ProblemSceneCanvas({ children }: ProblemSceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      if (width > 0) setScale(width / PROBLEM_SCENE.width);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[560px] overflow-visible"
      style={{ aspectRatio: `${PROBLEM_SCENE.width} / ${PROBLEM_SCENE.height}` }}
    >
      <div
        className="absolute left-0 top-0 overflow-visible"
        style={{
          width: PROBLEM_SCENE.width,
          height: PROBLEM_SCENE.height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  );
}

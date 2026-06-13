import type { ReactNode } from 'react';
import { PROBLEM_SCENE } from '../problem.visual.config';

interface ProblemSceneCanvasProps {
  children: ReactNode;
}

export function ProblemSceneCanvas({ children }: ProblemSceneCanvasProps) {
  return (
    <div
      className="relative mx-auto w-full overflow-hidden"
      style={{
        height: `clamp(220px, 52vw, ${PROBLEM_SCENE.height}px)`,
        maxWidth: `${PROBLEM_SCENE.width}px`,
      }}
    >
      <div className="absolute inset-0 origin-center scale-[0.58] min-[360px]:scale-[0.68] min-[390px]:scale-[0.76] min-[430px]:scale-[0.85] sm:scale-[0.95] md:scale-100">
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  );
}

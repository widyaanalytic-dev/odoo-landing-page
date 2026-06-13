import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { Highlight } from '../ui/Highlight';
import { SlideLayout } from '../ui/SlideLayout';
import { ProblemVisual } from '../visuals/ProblemVisual';

const BASE_DELAY = 0.4;
const BG_DURATION = 0.7;
const ROW_GAP = BG_DURATION + 0.35;
const WORD_GAP = 0.25;

function ProblemHighlight({ text }: { text: string }) {
  const words = useMemo(() => text.split(/\s+/), [text]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [delays, setDelays] = useState(() => words.map((_, i) => BASE_DELAY + i * WORD_GAP));

  const computeDelays = useCallback(() => {
    const tops = wordRefs.current.map((el) => el?.offsetTop ?? 0);
    if (tops.length === 0 || tops.every((top) => top === 0)) return;

    const uniqueTops = [...new Set(tops)].sort((a, b) => a - b);
    const rowOf = tops.map((top) => uniqueTops.indexOf(top));

    setDelays(
      rowOf.map((row, i) => {
        const indexInRow = rowOf.slice(0, i).filter((r) => r === row).length;
        return BASE_DELAY + row * ROW_GAP + indexInRow * WORD_GAP;
      }),
    );
  }, []);

  useLayoutEffect(() => {
    computeDelays();

    const container = wordRefs.current[0]?.parentElement;
    if (!container) return;

    const observer = new ResizeObserver(computeDelays);
    observer.observe(container);
    return () => observer.disconnect();
  }, [computeDelays, text]);

  return (
    <h2 className="text-headline-lg mt-5 max-w-full overflow-hidden text-balance sm:mt-8 lg:mt-10">
      <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 lg:justify-start">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          ref={(el) => {
            wordRefs.current[i] = el;
          }}
          className="inline-flex"
        >
          <Highlight dark tight bgSlide bgDuration={BG_DURATION} delay={delays[i] ?? BASE_DELAY + i * WORD_GAP}>
            {word}
          </Highlight>
        </span>
      ))}
      </span>
    </h2>
  );
}

export function ProblemSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.problem, locale);

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      visual={<ProblemVisual slideIndex={index} />}
    >
      <div className="mx-auto min-w-0 w-full max-w-xl overflow-hidden lg:max-w-2xl">
        <p className="text-lead text-brand-navy/75">{content.lead}</p>
        <ProblemHighlight text={content.highlight} />
      </div>
    </SlideLayout>
  );
}

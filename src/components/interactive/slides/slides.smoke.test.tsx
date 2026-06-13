import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { slideMetaList } from '../../../data/slides.config';
import { slideComponents } from './index';
import { LangProvider } from '../LangProvider';
import { ScrollProvider } from '../ScrollContext';

function renderSlide(id: (typeof slideMetaList)[number]['id'], index: number) {
  const meta = slideMetaList[index];
  const Slide = slideComponents[id];
  return render(
    <LangProvider>
      <ScrollProvider>
        <main id="scroll-container">
          <div id="scroll-content">
            <Slide index={index} meta={meta} />
          </div>
        </main>
      </ScrollProvider>
    </LangProvider>,
  );
}

describe('slide smoke render', () => {
  it('renders every registered slide without crashing', () => {
    slideMetaList.forEach((meta, index) => {
      const { unmount } = renderSlide(meta.id, index);
      expect(document.body.textContent?.length).toBeGreaterThan(0);
      unmount();
    });
  });
});

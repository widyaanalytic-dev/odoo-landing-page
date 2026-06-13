import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { getSlideCount, getSlideIndex, navSections, slideMetaList } from '../../../data/slides.config';
import { slidePrimaryContentKey } from '../../../data/slide-content.map';
import { slideComponents } from './index';
import { LangProvider } from '../LangProvider';
import { ScrollProvider } from '../ScrollContext';
import type { SlideId } from '../../../data/slides.config';

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

describe('slide registry', () => {
  it('has a component for every slide definition', () => {
    for (const meta of slideMetaList) {
      expect(slideComponents[meta.id as SlideId]).toBeDefined();
    }
  });

  it('slide count matches slide definitions', () => {
    expect(getSlideCount()).toBe(slideMetaList.length);
  });

  it('nav sections map to valid slides', () => {
    for (const section of navSections) {
      expect(getSlideIndex(slideMetaList, section.slideId)).toBeGreaterThanOrEqual(0);
      if (section.groupStartSlideId) {
        expect(getSlideIndex(slideMetaList, section.groupStartSlideId)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('every slide meta has a primary content key', () => {
    for (const meta of slideMetaList) {
      expect(meta.contentKey).toBe(slidePrimaryContentKey[meta.id]);
    }
  });
});

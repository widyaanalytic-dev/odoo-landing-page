import { describe, expect, it } from 'vitest';
import { slideComponents } from '../components/interactive/slides/index';
import { getSlideCount, getSlideIndex, navSections, slideMetaList } from './slides.config';
import { landingContent, t } from './landing';
import type { SlideId } from './slides.config';

describe('landing content', () => {
  it('t() returns locale-specific copy', () => {
    expect(t(landingContent.hero, 'id').h1.highlight).toContain('ERP');
    expect(t(landingContent.hero, 'en').h1.highlight).toContain('ERP');
  });

  it('cta copy exists for both locales', () => {
    expect(t(landingContent.cta, 'id').highlight.accent).toBeTruthy();
    expect(t(landingContent.cta, 'en').bullets.length).toBeGreaterThan(0);
  });

  it('about company copy exists for both locales', () => {
    const id = t(landingContent.aboutCompany, 'id');
    const en = t(landingContent.aboutCompany, 'en');

    expect(id.headline).toBe('Widya Analytic');
    expect(en.headline).toBe('Widya Analytic');
    expect(id.focusAreas).toHaveLength(3);
    expect(en.focusAreas).toHaveLength(3);
  });

  it('cta identity copy exists for both locales', () => {
    const id = t(landingContent.cta, 'id');
    const en = t(landingContent.cta, 'en');

    expect(id.visual.identityTitle).toBeTruthy();
    expect(en.visual.identityTitle).toBeTruthy();
    expect(id.visual.identity).toHaveLength(6);
    expect(en.visual.identity).toHaveLength(6);
    expect(id.visual.identity.some((item) => 'href' in item && item.href)).toBe(true);
  });

  it('about vision copy exists for both locales', () => {
    expect(t(landingContent.aboutVision, 'id').vision).toBeTruthy();
    expect(t(landingContent.aboutVision, 'en').missions.length).toBe(6);
  });

  it('about products copy exists for both locales', () => {
    const id = t(landingContent.aboutProducts, 'id');
    const en = t(landingContent.aboutProducts, 'en');

    expect(id.headline).toBeTruthy();
    expect(en.headline).toBeTruthy();
    expect(id.products).toHaveLength(3);
    expect(en.products).toHaveLength(3);
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
    }
  });
});

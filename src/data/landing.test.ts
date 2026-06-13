import { describe, expect, it } from 'vitest';
import { landingContent, t } from './landing';

describe('landing content', () => {
  it('t() returns locale-specific copy', () => {
    expect(t(landingContent.hero, 'id').h1.highlight).toContain('ERP');
    expect(t(landingContent.hero, 'en').h1.highlight).toContain('ERP');
  });

  it('contact copy exists for both locales', () => {
    expect(t(landingContent.contact, 'id').highlight.accent).toBeTruthy();
    expect(t(landingContent.contact, 'en').bullets.length).toBeGreaterThan(0);
  });

  it('about company copy exists for both locales', () => {
    const id = t(landingContent.aboutCompany, 'id');
    const en = t(landingContent.aboutCompany, 'en');

    expect(id.headline).toBe('Widya Analytic');
    expect(en.headline).toBe('Widya Analytic');
    expect(id.focusAreas).toHaveLength(3);
    expect(en.focusAreas).toHaveLength(3);
  });

  it('contact identity copy exists for both locales', () => {
    const id = t(landingContent.contact, 'id');
    const en = t(landingContent.contact, 'en');

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


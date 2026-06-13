import { describe, expect, it } from 'vitest';
import { CONTACT_EMAIL, landingContent } from './landing';
import { WHY_US_PILLAR_ORDER, PROCESS_STEP_ORDER, DEFAULT_PRODUCTION_PORTFOLIO } from './visual-ids';

describe('content integrity', () => {
  it('why-us bullets cover every pillar id for both locales', () => {
    for (const locale of ['id', 'en'] as const) {
      const bullets = landingContent.whyUs[locale].bullets;
      for (const pillarId of WHY_US_PILLAR_ORDER) {
        expect(bullets.some((bullet) => bullet.iconId === pillarId)).toBe(true);
      }
    }
  });

  it('process steps cover every configured step id for both locales', () => {
    for (const locale of ['id', 'en'] as const) {
      const steps = landingContent.process[locale].steps;
      for (const stepId of PROCESS_STEP_ORDER) {
        expect(steps.some((step) => step.id === stepId)).toBe(true);
      }
    }
  });

  it('portfolio production includes default item id', () => {
    for (const locale of ['id', 'en'] as const) {
      const items = landingContent.portfolioProduction[locale].items;
      expect(items.some((item) => item.id === DEFAULT_PRODUCTION_PORTFOLIO)).toBe(true);
    }
  });

  it('cta identity email uses CONTACT_EMAIL constant', () => {
    for (const locale of ['id', 'en'] as const) {
      const emailItem = landingContent.contact[locale].visual.identity.find((item) => item.iconId === 'email');
      expect(emailItem?.value).toBe(CONTACT_EMAIL);
      expect(emailItem && 'href' in emailItem ? emailItem.href : '').toBe(`mailto:${CONTACT_EMAIL}`);
    }
  });
});

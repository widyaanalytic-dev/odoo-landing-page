import { describe, expect, it } from 'vitest';
import { CONTACT_EMAIL, landingContent } from './landing';
import { partnerLogos } from './partners';
import { WHY_US_PILLAR_ORDER, PROCESS_STEP_ORDER } from './visual-ids';

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

  it('portfolio section has copy for both locales', () => {
    for (const locale of ['id', 'en'] as const) {
      expect(landingContent.portfolio[locale].highlight.accent.length).toBeGreaterThan(0);
      expect(landingContent.portfolio[locale].visual.stats.length).toBe(3);
      expect(landingContent.portfolio[locale].visual.allPartnersLabel.length).toBeGreaterThan(0);
    }
  });

  it('partner logos include featured entries with src paths', () => {
    expect(partnerLogos.length).toBe(19);
    const featured = partnerLogos.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
    for (const partner of partnerLogos) {
      expect(partner.src.startsWith('/partners/')).toBe(true);
      expect(partner.name.length).toBeGreaterThan(0);
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

import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { PortfolioPanelVisual } from './PortfolioPanelVisual';
import { DEFAULT_SERVICES_PORTFOLIO, servicesIndustryTheme } from './portfolio.visual.config';

interface PortfolioServicesVisualProps {
  slideIndex: number;
}

export function PortfolioServicesVisual({ slideIndex }: PortfolioServicesVisualProps) {
  const { locale } = useLang();
  const content = t(landingContent.portfolioServices, locale);

  return (
    <PortfolioPanelVisual
      slideIndex={slideIndex}
      eyebrow={content.eyebrow}
      items={content.items}
      defaultItemId={DEFAULT_SERVICES_PORTFOLIO}
      themeById={servicesIndustryTheme}
      visual={content.visual}
    />
  );
}

import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { PortfolioPanelVisual } from './PortfolioPanelVisual';
import { DEFAULT_PRODUCTION_PORTFOLIO, productionIndustryTheme } from './portfolio.visual.config';

interface PortfolioProductionVisualProps {
  slideIndex: number;
}

export function PortfolioProductionVisual({ slideIndex }: PortfolioProductionVisualProps) {
  const { locale } = useLang();
  const content = t(landingContent.portfolioProduction, locale);

  return (
    <PortfolioPanelVisual
      slideIndex={slideIndex}
      eyebrow={content.eyebrow}
      items={content.items}
      defaultItemId={DEFAULT_PRODUCTION_PORTFOLIO}
      themeById={productionIndustryTheme}
      visual={content.visual}
    />
  );
}

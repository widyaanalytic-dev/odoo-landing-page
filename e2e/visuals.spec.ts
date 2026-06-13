import { expect, test, type Page } from '@playwright/test';

const SCROLL_SETTLE_MS = 1_400;

async function waitForSlideInView(page: Page, slideIndex: number) {
  await expect(page.locator(`[data-slide="${slideIndex}"]`)).toBeInViewport({ timeout: 15_000 });
}

async function pressArrowDown(page: Page, times: number) {
  for (let i = 0; i < times; i += 1) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(SCROLL_SETTLE_MS);
  }
}

test.describe('interactive visuals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#scroll-container')).toBeVisible();
  });

  test('hero ERP demo renders Odoo sales dashboard', async ({ page }) => {
    await expect(page.getByAltText('Odoo').first()).toBeVisible();
    await expect(page.getByText('Penjualan').or(page.getByText('Sales')).first()).toBeVisible();
    await expect(page.getByText('Order Penjualan').or(page.getByText('Sales Orders')).first()).toBeVisible();
  });

  test('why-us grid opens pillar detail panel', async ({ page }) => {
    await pressArrowDown(page, 9);
    await waitForSlideInView(page, 9);

    const pillarTab = page.getByRole('tab', { name: /Pengalaman lintas industri|Cross-industry experience/i });
    await expect(pillarTab).toBeVisible();
    await pillarTab.click();

    await expect(page.getByRole('tabpanel')).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Pilih keahlian untuk melihat detail|Select an expertise area for details/i }),
    ).toBeVisible();
  });

  test('solution module buttons respond to user tap', async ({ page }) => {
    await page.getByRole('button', { name: 'Solusi', exact: true }).click();
    await waitForSlideInView(page, 8);

    const salesButton = page.locator('[data-slide="8"]').getByRole('button', { name: 'Sales' }).first();
    await expect(salesButton).toBeVisible();
    await salesButton.click();
    await expect(salesButton).toHaveAttribute('aria-pressed', 'true');
  });
});

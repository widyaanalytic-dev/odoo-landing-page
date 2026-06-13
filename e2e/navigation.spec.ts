import { expect, test, type Page } from '@playwright/test';

const SCROLL_SETTLE_MS = 1_400;

async function waitForSlideInView(page: Page, slideIndex: number) {
  await expect(page.locator(`[data-slide="${slideIndex}"]`)).toBeInViewport({ timeout: 15_000 });
}

async function pressArrowDown(page: Page, times = 1) {
  for (let i = 0; i < times; i += 1) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(SCROLL_SETTLE_MS);
  }
}

test.describe('scroll navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#scroll-container')).toBeVisible();
    await waitForSlideInView(page, 0);
  });

  test('navbar jumps to about section', async ({ page }) => {
    await page.getByRole('button', { name: 'Tentang', exact: true }).click();
    await waitForSlideInView(page, 1);
    await expect(page.locator('[data-slide="1"]')).toContainText('Widya Analytic');
  });

  test('navbar jumps to contact section', async ({ page }) => {
    await page.getByRole('button', { name: 'Kontak', exact: true }).click();
    // Last slide may not register full viewport ratio with Lenis + snap; assert content instead
    await expect(page.getByText('admin@widyaanalytic.org').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('[data-slide="14"]')).toContainText('Hubungi Kami');
  });

  test('keyboard arrow down advances slides', async ({ page }) => {
    await pressArrowDown(page, 1);
    await waitForSlideInView(page, 1);

    await pressArrowDown(page, 1);
    await waitForSlideInView(page, 2);
  });

  test('locale toggle switches copy', async ({ page }) => {
    await expect(page.getByText('Solusi ERP Terpercaya')).toBeVisible();

    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.getByText('Trusted ERP Solutions')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByRole('button', { name: 'Home', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute('aria-pressed', 'true');
  });
});

import { test, expect } from '@playwright/test';

test.describe(`Home page`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
  });

  test(`should have heading text`, async ({ page }) => {
    await expect(page.locator(`h1`).first()).toHaveText(`Jamstack E-commerce`);
    await expect(page.locator(`p`).first()).toHaveText(`Shopify Storefront with Nextjs`);
  });
});

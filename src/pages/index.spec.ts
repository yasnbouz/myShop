import { test, expect } from '@playwright/test';

test.describe(`Home page`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:3000/`);
  });

  test(`should have heading text`, async ({ page }) => {
    await expect(page.locator(`h1`)).toHaveText(`Jamstack E-commerce`);
    await expect(page.locator(`h1 + p`)).toHaveText(`Shopify Storefront with Nextjs`);
  });
  test(`should navigate to the product page`, async ({ page }) => {
    // Click img[alt="Jordan Delta 2"]
    await page.locator(`img[alt="Jordan Delta 2"]`).click();
    await expect(page).toHaveURL(`http://localhost:3000/products/jordan-delta-2`);
    await expect(page.locator(`h1`)).toHaveText(`Jordan Delta 2`);
  });
});

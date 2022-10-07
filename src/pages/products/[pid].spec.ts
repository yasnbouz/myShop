import { test, expect } from '@playwright/test';

test.describe(`Product Page`, () => {
  test(`should`, async ({ page }) => {
    page.goto(`http://localhost:3000/products/jordan-delta-2`);
    await expect(page.locator(`h1`)).toHaveText(`Jordan Delta 2`);
  });
});

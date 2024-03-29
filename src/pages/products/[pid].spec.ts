import { test, expect, Page } from '@playwright/test';

async function grapProduct(page: Page, index = 0) {
  // Catch the product URL from the home page
  await page.goto(`/`);
  const link = await page.locator(`a[href^="/products/"]`).nth(index);
  const url = await link.getAttribute(`href`);
  if (url) {
    await page.goto(url);
  }
  return url;
}
test.describe.configure({ mode: `serial` });
test.describe(`Product Page`, () => {
  let productURL: string | null;
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    productURL = await grapProduct(page);
  });
  test.afterAll(async () => {
    await page.close();
  });

  test(`when product is sold out`, async () => {
    // if product sold out try another product
    let btnSoldOut = await page.$(`text=sold out!`);
    let retries = 1;
    // console.log(await btnSoldOut?.isVisible());
    while (btnSoldOut) {
      // eslint-disable-next-line no-await-in-loop
      productURL = await grapProduct(page, retries);
      // eslint-disable-next-line no-await-in-loop
      btnSoldOut = await page.$(`text=sold out!`);
      // eslint-disable-next-line no-plusplus
      retries++;
    }
    // await expect(btnSoldOut).toBeVisible();
  });
  test(`when product is found`, async () => {
    const productElm = await page.locator(`h1`).first();
    const productTitle = await productElm.textContent();
    const matchedTitle = productURL?.toLowerCase()?.replace(`/products/`, ``) ?? ``;
    const expectedTitle = productTitle?.toLowerCase().replace(/\s/g, `-`);
    expect(expectedTitle).toMatch(matchedTitle);
  });
  test(`when we add product to the cart`, async () => {
    // add the product
    await page.locator(`text=Add To Cart`).click();
    const cartButton = await page.getByTestId(`cart`);
    // check the cart counter if it's incremented
    const counter = await cartButton.locator(`span`).textContent();
    expect(counter).toBe(`1`);
    // open the cart slidebar
    await cartButton.click();
    // check product title
    const productTitle = await page.locator(`h1`).first().textContent();
    await expect(
      await page
        .getByRole(`dialog`)
        .getByText(productTitle as string)
        .textContent(),
    ).toBeTruthy();
  });
  test(`when incrementing the quantity of the product`, async () => {
    await expect(page.getByText(/Qty 1/)).toBeTruthy();
    await page.getByRole(`button`, { name: `+` }).click();
    await expect(page.getByText(/Qty 2/)).toBeTruthy();
  });
  test(`when decrementing the quantity of the product`, async () => {
    await expect(page.getByText(/Qty 2/)).toBeTruthy();
    await page.getByRole(`button`, { name: `-` }).click();
    await expect(page.getByText(/Qty 1/)).toBeTruthy();
  });
  test(`when product deleted from the cart`, async () => {
    await page.getByRole(`dialog`).locator(`button[name="trash"]`).click();
    await expect(page.getByRole(`dialog`).locator(`button[name="trash"]`)).not.toBeVisible();
    await expect(page.getByRole(`dialog`).locator(`text=Nothing in your cart!`)).toBeVisible();
  });
  test(`when product url is not found`, async () => {
    const pathname = `/products/xxx`;
    await page.goto(pathname);
    // response status code must be 404
    const response = await page.request.get(pathname);
    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe(`Not Found`);
    await expect(page.locator(`text=This page could not be found.`)).toBeVisible();
  });
});

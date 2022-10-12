import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, `.env.local`) });

const config: PlaywrightTestConfig = {
  testDir: `./src`,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? `html` : `list`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: `on-first-retry`,
    baseURL: process.env.PLAYWRIGHT_BASE_URL || `http://localhost:3000`,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: `chromium`,
      use: {
        ...devices[`Desktop Chrome`],
      },
    },
    {
      name: `firefox`,
      use: {
        ...devices[`Desktop Firefox`],
      },
    },
    {
      name: `webkit`,
      use: {
        ...devices[`Desktop Safari`],
      },
    },
  ],
};

export default config;

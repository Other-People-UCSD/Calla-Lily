import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'e2e/test-results',
  use: {
    baseURL: 'http://127.0.0.1:3000'
  },
  reporter: process.env.CI ? 'blob' : 'html',
  // Run local dev server before starting the tests
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  retries: process.env.CI ? 2 : 0,
  projects: [ 
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
      testIgnore: [/desktop.spec.(js|ts)/, 'api.spec.js'],
    },
    {
      name: 'Samsung Galaxy',
      use: { ...devices['Galaxy S9+'] },
      testIgnore: [/desktop.spec.(js|ts)/, 'api.spec.js'],
    },
  ],
  expect: {
    toHaveSnapshot: {
      maxDiffPixelRatio: 0.05,
    }
  }
});
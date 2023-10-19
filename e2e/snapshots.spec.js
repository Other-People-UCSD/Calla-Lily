import { test, expect } from '@playwright/test';

test.describe('Parser (Custom Posts)', () => {
  test.describe.configure({ mode: 'parallel' });
  test('Imaginary Friend', async ({ page }) => {
    // Arrange
    await page.goto('./6/you-have-created-an-imaginary-friend');
    // Assert
    await expect(page).toHaveScreenshot();
  });

  test('Missed Connections', async ({ page }) => {
    // Arrange
    await page.goto('./2023/missed-connections');
    // Assert
    await expect(page).toHaveScreenshot();
  })
});

test.describe('Parser (Niche)', () => {
  test.skip('Kalbelia (iFrame)', async ({ page }) => {
    // Arrange
    await page.route(/()$/, route => route.abort());
    await page.goto('./4/kalbelia');

    // Assert
    await expect(page).toHaveScreenshot(options);
  })
});

test.describe('Parser (Basic)', () => {
  const options = {
    fullPage: true,
  }

  test('The Middle of All Middles', async ({ page }) => {
    // Arrange
    await page.goto('./3/the-middle-of-all-middles');
    // Assert
    await expect(page).toHaveScreenshot(options);
  });

  test('Brain Fish (inline style)', async ({ page }) => {
    // Arrange
    await page.goto('./1/brain-fish');
    // Assert
    await expect(page).toHaveScreenshot(options);
  })
});
import { test, expect } from '@playwright/test';

test.describe('Customs', () => {
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

test.describe('Niche', () => {
  test.describe.configure({ mode: 'parallel' });
  const options = {
    fullPage: true,
  }

  test.skip('Kalbelia (iFrame)', async ({ page }) => {
    // Arrange
    await page.route(/()$/, route => route.abort());
    await page.goto('./4/kalbelia');
    // Assert
    await expect(page).toHaveScreenshot(options);
  });

  test('Hole (Defined Width)', async ({ page }) => {
    // Arrange
    await page.goto('./2023/hole');
    // Assert
    await expect(page).toHaveScreenshot(options);
  });

  test('Zodiac Animals (img mask-floating)', async ({ page }) => {
    // Arrange
    await page.goto('./5/the-twelve-zodiac-animals-visit');
    // Assert
    await expect(page).toHaveScreenshot(options);
  });

  test('Blood Pacts (text wrapping)', async ({ page }) => {
    // Arrange
    await page.goto('./2/blood-pacts');
    // Assert
    await expect(page).toHaveScreenshot(options);
  });

  test('poets sleep in graves (Blackout)', async ({ page }) => {
    // Arrange
    await page.goto('./2023/poets-sleep-in-graves');
    // Assert
    await expect(page).toHaveScreenshot(options);
  });
});

test.describe('Basic', () => {
  test.describe.configure({ mode: 'parallel' });
  const options = {
    fullPage: true,
  }

  test('Middle of All Middles (imgs + text)', async ({ page }) => {
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
  });

  test('Worm (Content Warning)', async ({ page }) => {
    // Arrange
    await page.goto('./4/worm');
    // Assert
    await expect(page).toHaveScreenshot();
  })
});
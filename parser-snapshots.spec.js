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

  test('Kalbelia (iFrame)', async ({ page }) => {
    // Arrange
    // Block iframe and audio request. Not necessary to check if iframe URL is valid.
    // Testing if parser correctly injects an iframe and audio element
    await page.route(/.*/, async (route, request) => {
      const req = request.url();
      if (req.match(/youtube/) || req.match(/.mp3/)) {
        console.log('Aborting:', request.url());
        await route.abort()
      } else {
        await route.continue();
      }
    });
    await page.goto('./4/kalbelia');
    // Assert
    await expect(page).toHaveScreenshot();
  });

  test('Worm (Content Warning)', async ({ page }) => {
    // Arrange
    await page.goto('./4/worm');
    // Assert
    await expect(page).toHaveScreenshot();
  })

  test('Hole (Defined Width)', async ({ page }) => {
    // Arrange
    await page.goto('./2023/hole');
    // Assert
    await expect(page).toHaveScreenshot();
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

// Most basic parsing elements are covered by the custom and niche tests.
// Do not need redundant basic tests.
// test.describe('Basic', () => {
//   test.describe.configure({ mode: 'parallel' });
// }); 
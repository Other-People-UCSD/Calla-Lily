import { test, expect } from '@playwright/test';

// Desktop-only tests
// Ignore images, unnecessary and slows navigation tests
test.beforeEach(async ({ page }) => {
  await page.route(/.*/, async (route, request) => {
    if (request.resourceType() == "image") {
      route.abort();
    } else {
      route.continue();
    }
  });
});

// Navigation
test('Index to Poetry', async ({ page }) => {
  // Arrange
  await page.goto('./');

  // Act
  await page.click('text=Poetry')
  // Assert
  await expect(page).toHaveURL('./poetry');
});

test('Poetry to Index', async ({ page }) => {
  await page.goto('./poetry');
  await page.getByRole('link', { name: 'Other People ©' }).click();
  await expect(page).toHaveURL('./');
});


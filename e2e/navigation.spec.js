import { test, expect } from '@playwright/test';

test.describe('MobileNav', () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    // Ignore images, unnecessary and slows navigation tests    
    await page.route(/.*/, async (route, request) => {
      if (request.resourceType() == "image") {
        route.abort();
      } else {
        route.continue();
      }
    });
    await page.goto('./');
  });

  test.afterEach(async ({ page }) => {
    page.close;
  });

  test('Open Menu', async ({ page }) => {
    // Act
    await page.getByLabel('Open Menu').click();
    // Assert
    await expect(page.locator("#navContent")).toBeVisible();
  });

  test('Open then Close Menu', async ({ page }) => {
    // Act
    await page.getByLabel('Open Menu').click();
    await page.getByLabel('Close Menu').click();
    // Assert
    await expect(page.locator("#navContent")).not.toBeVisible();
  });


  test('Menu to About', async ({ page }) => {
    // Act
    await page.getByLabel('Open Menu').click();
    await page.getByRole('link', { name: '(THE) PEOPLE' }).click();
    // Assert
    await expect(page).toHaveURL('./about');
  });
});


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
    await page.close();
  });

  test('Open Menu', async ({ page }) => {
    // Act
    await page.getByRole('button', {name: 'Menu'}).click();
    // Assert
    await expect(page.getByRole('navigation')).toHaveClass(/nav__content/);
  });

  test('Open then Close Menu', async ({ page }) => {
    // Act
    await page.getByRole('button', {name: 'Menu'}).click();
    await page.getByRole('button', {name: 'Close'}).click();
    // Assert
    await expect(page.getByRole('nav')).not.toBeAttached();
  });


  test('Menu to About', async ({ page }) => {
    // Act
    await page.getByRole('button', {name: 'Menu'}).click();
    await page.getByRole('link', { name: 'About Us' }).click();
    // Assert
    await expect(page).toHaveURL('./about');
  });
});


test('Open Search', async ({ page }) => {
  // Act
  // Ignore images, unnecessary and slows navigation tests
  await page.route(/.*/, async (route, request) => {
    if (request.resourceType() == "image") {
      route.abort();
    } else {
      route.continue();
    }
  });
  await page.goto('./');
  await page.getByLabel('Open Search').click();
  // Assert
  await expect(page).toHaveURL('./search');
});
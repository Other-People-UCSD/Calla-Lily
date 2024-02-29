import { test, expect } from '@playwright/test';

test.describe('User Input returns Results', () => {
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
    await page.goto('./search');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Query for sunflowers', async ({ page }) => {
    // Act
    await page.getByPlaceholder('Search').fill('Sunflowers');
    // Assert
    await expect(page.getByText('SAND IS NOT GOOD FOR SUNFLOWERS')).toBeAttached();
  });

  test('Filter and # of results', async ({ page }) => {
    // Act
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByRole('button', { name: 'Poetry' }).click();
    await page.getByLabel('Toggle 1').click();
    await page.getByRole('button', { name: '2020' }).click();
    // Assert
    await expect(page.getByText(/Found [0-9]+ results/)).toContainText('8');
  });
});


test.describe('Saved User Settings', () => {
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
    await page.goto('./search');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });


  test('Query for sunflowers', async ({ page }) => {
    // Act
    await page.getByPlaceholder('Search').fill('Sunflowers');
    // Assert
    await expect(page.getByText('SAND IS NOT GOOD FOR SUNFLOWERS')).toBeAttached();

    await page.goto('./');
    await page.goBack();

    await expect(page.getByText('SAND IS NOT GOOD FOR SUNFLOWERS')).toBeAttached();
  });

  test('Filter and # of results', async ({ page }) => {
    // Act
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByRole('button', { name: 'Poetry' }).click();
    await page.getByLabel('Toggle 1').click();
    await page.getByRole('button', { name: '2020' }).click();
    // Assert
    await expect(page.getByText(/Found [0-9]+ results/)).toContainText('8');

    await page.goto('./');
    await page.goBack();

    await expect(page.getByText(/Found [0-9]+ results/)).toContainText('8');
  });

  test('Do not save if goto /search', async ({ page }) => {
    // Act
    await page.getByPlaceholder('Search').fill('Sunflowers');
    // Assert
    await expect(page.getByText('SAND IS NOT GOOD FOR SUNFLOWERS')).toBeAttached();

    await page.goto('./');
    await page.goto('./search');

    await expect(page.getByText('SAND IS NOT GOOD FOR SUNFLOWERS')).not.toBeAttached();
  });
});

test.describe('Shared URL', () => {
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
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Check filters', async ({ page }) => {
    // Act
    await page.goto('./search?collections=1&genres=Poetry&contentYears=2020');
    await page.getByRole('button', { name: 'Filter' }).click();
    // Assert
    await expect(page.getByRole('button', { name: 'Poetry' })).toHaveClass(/selected/);
    await expect(page.getByLabel('Toggle 1')).toHaveClass(/selected/);
    await expect(page.getByRole('button', { name: '2020' })).toHaveClass(/selected/);
  });

  test('Check query', async ({ page }) => {
    // Act
    await page.goto('./search?q=sunflowers');
    // Assert
    await expect(page.getByText('SAND IS NOT GOOD FOR SUNFLOWERS')).toBeAttached();
  });
});

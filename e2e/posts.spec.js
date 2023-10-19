const { test, expect } = require("@playwright/test");

test.describe('Post Attributes', () => {
  test('Contains Metadata', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:3000/1/skin-vilar');

    // Assert
    await expect(page.getByRole('heading', { name: 'skin' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '/ Caitlyn Vilar' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Poetry' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No.' })).toBeVisible();
  });

  test('Go to Next and Prev', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:3000/1/skin-vilar');
    // Act
    await page.getByRole('link', { name: 'next>' }).click();
    // Assert
    await expect(page).not.toHaveURL('http://localhost:3000/1/skin-vilar');
    // Act
    await page.getByRole('link', { name: '<prev' }).click();
    // Assert
    await expect(page).toHaveURL('http://localhost:3000/1/skin-vilar');
  });

  test('First post has no previous', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:3000/1/skin-vilar');
    // Assert
    await expect(page.getByRole('link', { name: '<prev' })).not.toBeVisible();
  });

  test('Most recent post has no next', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:3000/');
    await page.getByLabel('Open Menu').click();
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill(' ');
    // Act
    await page.getByRole('listitem').first().click();
    // Assert
    await expect(page.getByRole('link', { name: 'next>' })).not.toBeVisible();
  });
});


// Only 1/3 copy-protections are E2E testable.
// Playwright does not support Context Menu via right click to test the prevent default behavior.
// Playwright cannot select text and drag it to test the prevent default behavior.
test.describe('Post Copy-Protection', () => {
  test('Keyboard (Ctrl+C) Alert', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:3000/1/skin-vilar');
    page.on("dialog", async (alert) => {
      const text = alert.message();
      // Assert
      await expect(text).toMatch(/NOT PERMITTED/);
      // Finish
      await alert.accept();
    });

    // Act
    await page.getByText('at the hotel roompeeling off my bathing suiti catch a glimpseof myself in the mi').click({
      button: 'right'
    });
    await page.locator('body').press('Control+c');
  });
});
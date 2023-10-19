const { test, expect } = require("@playwright/test");

test.describe('DesktopHeader', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test.afterEach(async ({ page }) => {
    page.close;
  });

  test('Index to Poetry', async ({ page }) => {
    // Arrange
    // Act
    await page.click('text=Poetry')
    // Assert
    await expect(page).toHaveURL('./poetry');
  });

  test('Poetry to Index', async ({ page }) => {
    await page.getByRole('link', { name: 'Other People ©' }).click();
    await expect(page).toHaveURL('./');
  });

});



test.describe('MobileNav', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });


  test.afterEach(async ({ page }) => {
    page.close;
  });


  test('Open Menu', async ({ page }) => {
    await page.getByLabel('Open Menu').click();
    await expect(page.locator("#navContent")).toBeVisible();
  });

  test('Open then Close Menu', async ({ page }) => {
    await page.getByLabel('Open Menu').click();
    await page.getByLabel('Close Menu').click();
    await expect(page.locator("#navContent")).not.toBeVisible();
  });


  test('Menu to About', async ({ page }) => {
    await page.getByLabel('Open Menu').click();
    await page.getByRole('link', { name: '(THE) PEOPLE' }).click();
    await expect(page).toHaveURL('./about');
  });
});


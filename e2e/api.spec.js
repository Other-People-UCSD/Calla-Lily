import { test, expect } from '@playwright/test';

test('api/pages returns list of URLs', async ({ request }) => {
  // Arrange
  const res = await request.fetch('http://127.0.0.1:3000/api/pages.json')
  // Act
  await expect(res.status()).toBe(200);
  const data = await res.json();
  const dataLength = Object.keys(data).length;    
  // Assert
  await expect(dataLength).toBeGreaterThan(0);
});

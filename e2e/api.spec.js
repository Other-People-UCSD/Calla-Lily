import { test, expect } from '@playwright/test';

test('api/pages returns list of URLs', async ({ request }) => {
  // Arrange
  const res = await request.fetch('./api/pages.json')
  // Act
  await expect(res.status()).toBe(200);
  const data = await res.json();
  const dataLength = Object.keys(data).length;    
  // Assert
  await expect(dataLength).toBeGreaterThan(0);
});

test('api/post-data is operational', async ({ request }) => {
  // Arrange
  const res = await request.fetch('./api/post-data.json')
  // Act
  // Assert
  await expect(res.status()).toBe(200);
});

test('api/post-metadata is operational', async ({ request }) => {
  // Arrange
  const res = await request.fetch('./api/post-metadata.json')
  // Act
  // Assert
  await expect(res.status()).toBe(200);
});

// If last two assertions pass, then post-metadata endpoint will contain data 
// If fully passing, then sitemap.xml is expected to pass
test('api/site-urls includes pages and posts', async ({ request }) => {
  // Arrange
  const res = await request.fetch('./api/site-urls.json')
  // Act
  await expect(res.status()).toBe(200);
  const data = await res.json();
  // Assert
  await expect(data).toHaveProperty('urls');
  await expect(data.urls).toContain('https://www.otherpeoplesd.com/submissions');
  await expect(data.urls).toContain('https://www.otherpeoplesd.com/1/skin-vilar');
  await expect(data.urls).toContain('https://www.otherpeoplesd.com/2023/hole');
});


test('api/post/[...slug] works as catch-all', async ({ request }) => {
  // Arrange
  const res = await request.fetch('./api/post/1/skin-vilar');
  // Act
  await expect(res.status()).toBe(200);
  const data = await res.json();
  const dataLength = Object.keys(data).length;    
  // Assert
  await expect(dataLength).toBeGreaterThan(0);
});

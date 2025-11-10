const { test, expect } = require('@playwright/test');

/**
 * Example Homepage Tests
 * Replace with your actual website URL and selectors
 */
test.describe('Homepage Tests', () => {
  
  test('should load homepage successfully', async ({ page }) => {
    // Replace with your actual website URL
    await page.goto('https://example.com');
    
    // Verify page loaded
    await expect(page).toHaveTitle(/Your Site Name/);
    
    // Check for main navigation
    await expect(page.locator('nav, .navbar, #navigation')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Click on a navigation link (replace selector)
    await page.click('a:has-text("About"), nav a:first-child, .nav-link');
    
    // Verify navigation worked
    await expect(page).toHaveURL(/about|#about/);
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Navigate to contact page or check if form is on homepage
    await page.click('a:has-text("Contact"), #contact-link');
    
    // Verify contact form elements
    await expect(page.locator('input[name="name"], #name, input[placeholder*="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"], #email, input[type="email"]')).toBeVisible();
    await expect(page.locator('textarea, textarea[name="message"], #message')).toBeVisible();
  });

  test('should submit contact form', async ({ page }) => {
    await page.goto('https://example.com/contact');
    
    // Fill form
    await page.fill('input[name="name"], #name', 'Test User');
    await page.fill('input[name="email"], #email', 'test@example.com');
    await page.fill('textarea[name="message"], #message', 'This is a test message');
    
    // Submit form
    await page.click('button[type="submit"], button:has-text("Submit"), #submit');
    
    // Verify success message
    await expect(page.locator('.success, .alert-success, text=Thank you')).toBeVisible();
  });
});


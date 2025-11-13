// tests/spec/wholeseller-signup.spec.js
const { test, expect } = require('@playwright/test');
const { generateRandomEmail } = require('../helpers/randomemail-helper')
const WholesalerSignupPage = require('../pages/wholeseller-singup');

test.describe('Wholesaler Signup Tests', () => {
  test('Positive: Wholesaler Signup - Pakistan', async ({ page }) => {
    const signup = new WholesalerSignupPage(page);
    await signup.goto();

    await signup.wholesellerSignupPage(
      'Ali',
      'Khan',
      '03001234567',
      generateRandomEmail(),
      'Main Market',
      'Lahore',
      '54000',
      'PK Duty-Free'
    );

    await expect(page.locator('span.h1.fw-bolder')).toHaveText('Thank You!', { timeout: 15000 });
  });
});
// tests/spec/wholeseller-signup.spec.js
const { test, expect } = require('@playwright/test');
const { generateRandomEmail, generateUniqueStoreName } = require('../helpers/randomemail-helper')
const { WholesalerSignupPage } = require('../pages/wholeseller-singup');

test.describe('Wholesaler Signup Test', () => {
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
      generateUniqueStoreName()
    );

    await expect(page.locator('span.h1.fw-bolder')).toHaveText('Thank You!', { timeout: 15000 });
  })



  test('Nagetive: Wholesaler Signup - Pakistan', async ({ page }) => {
    const signup = new WholesalerSignupPage(page);
    await signup.goto();

    await signup.wholesellerSignupPage(
      'Ali',
      'Khan',
      '03001234567',
      'test@yopmail.com',
      'Main Market',
      'Lahore',
      '54000',
      'PK Duty-Free'
    );
    await expect(page.getByText('Email should be unique.')).toBeVisible();

  });
});
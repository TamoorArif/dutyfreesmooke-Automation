const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/signup-page');
const { generateRandomEmail } = require('../helpers/randomemail-helper');

test.describe('Signup Tests', () => {

  test('Positive: Single User Sign Up', async ({ page }) => {
    const signupPage = new SignupPage(page); 
    const email = generateRandomEmail();
    await signupPage.goto();                 
    await signupPage.signup(email, 'Tamoor', 'Test@123', 'Test@123');
    // const verifiedEmail = await signupPage.getEmailVerified();
    // expect(verifiedEmail.trim()).toContain(email);
  });

  test('Negative: Duplicate Email Sign Up', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email = 'Test@yopmail.com'; // Existing user email
    await signupPage.goto();                 
    await signupPage.signup(email, 'Tamoor', 'Test@123', 'Test@123');

    // Capture error message for duplicate email
    const errorText = await signupPage.getErrorMessage();
    expect(errorText.trim()).toContain(
      'Another user is already registered using this email address.'
    );
  });

});

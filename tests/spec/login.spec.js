// tests/login.spec.js
const { test, expect }= require( '@playwright/test');
const { LoginPage }= require('../pages/login-page');

test.describe('Login Tests', () => {
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('test@yopmail.com', 'Test@123');

    const emailVerified = await loginPage.getEmailVerified();
    expect(emailVerified).toContain('Test@yopmail.com');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrongemail12@yopmail.com', 'wrongPassword');

    await loginPage.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
     const errorText = await loginPage.getErrorMessage();
     if (errorText.includes('Wrong login/password')) {
      console.log('Wrong credentials error displayed');
      expect(errorText).toContain('Wrong login'); // Adjust exact assertion if needed
    } else if (errorText.includes('Too many login failures, please wait a bit before trying again.')) {
      console.log('Account temporarily locked');
      expect(errorText).toContain('Too many login failures');
    } else {
      throw new Error(`Unexpected error message: ${errorText}`);
    }
  });

});



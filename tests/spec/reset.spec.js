// tests/login.spec.js
const { test, expect }=require('@playwright/test');
const {Resetpassword}=require( '../pages/reset-password');

test.describe('Reset Password Test', () => {
  test('should reset password with valid email', async ({ page }) => {
    const resetPage = new Resetpassword(page);
    await resetPage.goto();
    await resetPage.restemail('Test@yopmail.com');
    await expect(resetPage.getsuccessMessage);
    
  });

  // test('should show error with invalid credentials', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.goto();
  //   await loginPage.login('wrongemail12@yopmail.com', 'wrongPassword');

  //   await loginPage.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
  //    const errorText = await loginPage.getErrorMessage();
  //    if (errorText.includes('Wrong login/password')) {
  //     console.log('Wrong credentials error displayed');
  //     expect(errorText).toContain('Wrong login'); // Adjust exact assertion if needed
  //   } else if (errorText.includes('Too many login failures, please wait a bit before trying again.')) {
  //     console.log('Account temporarily locked');
  //     expect(errorText).toContain('Too many login failures');
  //   } else {
  //     throw new Error(`Unexpected error message: ${errorText}`);
  //   }
  // });

});



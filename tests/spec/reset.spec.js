// tests/spec/reset.spec.js

const { test, expect } = require('@playwright/test');
const { Resetpassword } = require('../pages/reset-password');

test('Positive: Reset password with valid email', async ({ page }) => {

  const reset = new Resetpassword(page);

  // Go to page + open Forgot Password popup
  await reset.goto();

  // Enter email & submit
  await reset.resetEmail('Test@yopmail.com');

  // Verify success message
  await reset.verifySuccess();
});

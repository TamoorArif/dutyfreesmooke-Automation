// tests/spec/reset.spec.js
const { test, expect } = require('@playwright/test');
const { Resetpassword } = require('../pages/reset-password');

test('should reset password with valid email', async ({ page }) => {
  const reset = new Resetpassword(page);
  await reset.goto();
  await reset.resetEmail('Test@yopmail.com');

  await reset.verifySuccess();   // checks "Check your email" or toast
});
// tests/spec/newArrival.spec.js

const { test, expect } = require('@playwright/test');
const { NewArrivalsPage } = require('../pages/newarrival-page');

test.describe('New Arrivals Tests', () => {

  test('Verify New Arrivals link opens and products are visible', async ({ page }) => {
    const newArrivals = new NewArrivalsPage(page);

    await newArrivals.goto();            // Navigate + handle modal + load products
    await newArrivals.verifyNewArrivalProducts(); // Assert product count > 0
  });

  test('Verify first product opens with correct details', async ({ page }) => {
    const newArrivals = new NewArrivalsPage(page);

    await newArrivals.goto();
    await newArrivals.openFirstProduct(); // Match title after click
  });

});

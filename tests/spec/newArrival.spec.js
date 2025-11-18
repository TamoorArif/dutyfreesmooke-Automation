// tests/spec/newArrival.spec.js  ←← FINAL SPEC FILE (COPY-PASTE KAR DO)

const { test, expect } = require('@playwright/test');
const { NewArrivalsPage } = require('../pages/newarrival-page');

test.describe('New Arrivals Tests', () => {

    test('Verify New Arrivals link & product details', async ({ page }) => {
        const newArrivals = new NewArrivalsPage(page);

        await newArrivals.goto();                  // Home → Age gate → New Arrivals page
        await newArrivals.verifyNewArrivalProducts(); // Grid + images + titles + prices check
    });

    test('Verify redirection to product detail page', async ({ page }) => {
        const newArrivals = new NewArrivalsPage(page);

        await newArrivals.goto();                  // Same navigation
        await newArrivals.openFirstProduct();      // First product click + title match on PDP
    });

});
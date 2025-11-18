const { test, expect } = require('@playwright/test');
const { NewArrivalsPage } = require('../pages/newarrival-page');

test.describe('New Arrivals Tests', () => {

    test('Verify New Arrivals link & product details', async ({ page }) => {
        const newArrivals = new NewArrivalsPage(page);

        await newArrivals.goto();
        await newArrivals.verifyNewArrivalProducts();
    });

    test('Verify redirection to product detail page', async ({ page }) => {
        const newArrivals = new NewArrivalsPage(page);

        await newArrivals.goto();
        await newArrivals.openFirstProduct();
    });

});

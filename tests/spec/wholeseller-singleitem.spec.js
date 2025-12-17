const { test, expect } = require('@playwright/test');
const { WholeSellerPages } = require('../pages/wholeseller-singleitem-pages');

test.describe('Whole Seller Pages Tests', () => {
    test('Verify wholeseller can add first in-stock product to cart & complete checkout', async ({ page }) => {
        const wholesellersPage = new WholeSellerPages(page);
        await wholesellersPage.goto();
        await wholesellersPage.addFirstItemToCart();
        await wholesellersPage.checkout();
    });
});
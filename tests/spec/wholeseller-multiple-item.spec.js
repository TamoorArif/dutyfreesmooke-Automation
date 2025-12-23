const { test, expect } = require('@playwright/test');
const { WholeSellerPages } = require('../pages/wholeseller-multiple-item-pages');

test.setTimeout(10 * 60 * 1000);
test.describe('Whole Seller Multiple Items Tests', () => {
    test.beforeEach(async ({ page, context }) => {
        // Clear browser cache, cookies, and permissions
        await context.clearCookies();
        await context.clearPermissions();
        
        // Navigate to base URL first to enable storage access
        await page.goto('https://stage-dutyfree.odoo.com/', { waitUntil: 'domcontentloaded' });
        
        // Clear storage after navigation
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
    });

    test('Verify wholeseller can add multiple products with multiple items to cart & complete checkout', async ({ page }) => {
        const wholesellersPage = new WholeSellerPages(page);
        await wholesellersPage.goto();
        
        // Add 5 products with 3 items each (default)
        const addedProducts = await wholesellersPage.addMultipleItemsToCart();
        await page.waitForTimeout(2000);
        expect(addedProducts).toBeGreaterThan(0);
        
        await wholesellersPage.checkout();
    });

    test('Verify wholeseller can add 3 products with 2 items each to cart & complete checkout', async ({ page }) => {
        const wholesellersPage = new WholeSellerPages(page);
        await wholesellersPage.goto();
        
        // Add 3 products with 2 items each
        const addedProducts = await wholesellersPage.addMultipleItemsToCart(3, 2);
        expect(addedProducts).toBeGreaterThan(0);
        
        await wholesellersPage.checkout();
    });

    // test.only('Verify wholeseller can add multiple products to cart and verify cart quantity', async ({ page }) => {
    //     const wholesellersPage = new WholeSellerPages(page);
    //     await wholesellersPage.goto();
        
    //     // Get initial cart quantity
    //     const initialQuantity = await wholesellersPage.cartQuantity.textContent().catch(() => '0');
    //     console.log("initialQuantity", initialQuantity);
    //     const initialQty = Number(initialQuantity) || 0;
    //     console.log("initialQty", initialQty);
    //     // Add 2 products with 2 items each
    //     const addedProducts = await wholesellersPage.addMultipleItemsToCart(2, 2);
    //     expect(addedProducts).toBeGreaterThan(0);
        
    //     // Wait for cart to update
    //     await page.waitForTimeout(2000);
        
    //     // Verify cart quantity increased
    //     const finalQuantity = await wholesellersPage.cartQuantity.textContent().catch(() => '0');
    //     const finalQty = Number(finalQuantity) || 0;
    //     console.log("finalQuantity", finalQuantity);
    //     console.log("finalQty", finalQty);
    //     expect(finalQty).toBeGreaterThan(initialQty);
    // });
});


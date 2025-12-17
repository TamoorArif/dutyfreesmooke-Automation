const { test, expect } = require('@playwright/test');
const { WholeSellerPages } = require('../pages/wholeseller-multiple-item-pages');

test.describe('Whole Seller Multiple Items Tests', () => {
    test('Verify wholeseller can add multiple products with multiple items to cart & complete checkout', async ({ page }) => {
        const wholesellersPage = new WholeSellerPages(page);
        await wholesellersPage.goto();
        
        // Add 5 products with 3 items each (default)
        const addedProducts = await wholesellersPage.addMultipleItemsToCart();
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

    test('Verify wholeseller can add multiple products to cart and verify cart quantity', async ({ page }) => {
        const wholesellersPage = new WholeSellerPages(page);
        await wholesellersPage.goto();
        
        // Get initial cart quantity
        const initialQuantity = await wholesellersPage.cartQuantity.textContent().catch(() => '0');
        const initialQty = Number(initialQuantity) || 0;
        
        // Add 2 products with 2 items each
        const addedProducts = await wholesellersPage.addMultipleItemsToCart(2, 2);
        expect(addedProducts).toBeGreaterThan(0);
        
        // Wait for cart to update
        await page.waitForTimeout(2000);
        
        // Verify cart quantity increased
        const finalQuantity = await wholesellersPage.cartQuantity.textContent().catch(() => '0');
        const finalQty = Number(finalQuantity) || 0;
        
        expect(finalQty).toBeGreaterThan(initialQty);
    });
});


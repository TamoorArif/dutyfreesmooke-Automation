const { test, expect } = require('@playwright/test');
const { AddCartPage } = require('../pages/addcart-page');

test.describe('Add to Cart Tests', () => {

    test('Verify first product adds to cart & cart count increases', async ({ page }) => {
        const cart = new AddCartPage(page);

        // Step 1: Go to website & open New Arrivals
        await cart.goto();

        // Step 3: Add first product
        const beforeQty = Number(await cart.getCartQuantity() || 0);
        await cart.addFirstItemToCart();

        // Step 4: Verify cart quantity increased
        await page.waitForTimeout(2000); // Odoo delay
        const afterQty = Number(await cart.getCartQuantity());

        expect(afterQty).toBeGreaterThan(beforeQty);

        // Step 5: Verify cart icon visible
        await expect(cart.cartWrapper).toBeVisible();
        await expect(cart.cartLink).toBeVisible();
        await expect(cart.cartIcon).toBeVisible();
        await cart.addToCart();
        await expect(cart.cartQuantity).toHaveText("1");
    });

});

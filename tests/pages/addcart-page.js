const { expect } = require('@playwright/test');

class AddCartPage {
    constructor(page) {
        this.page = page;
        this.ageActionbtn = page.locator('.age-actions .btn.btn-over');

        // New Arrivals link
        this.newArrivalsLink = page.locator('#auto_id_20');
        this.gridItem=page.locator('#o_wsale_products_grid .oe_product');
        this.firstProduct=page.locator('#o_wsale_products_grid .oe_product:first-child #add_to_cart')

        // Cart wrapper
        this.cartWrapper = page.locator('#auto_id_110');

        // Cart link
        this.cartLink = page.locator('#auto_id_111.hm-icon.hm-icon-cart.as_mini_cart');

        // Cart icon
        this.cartIcon = page.locator('#auto_id_113');

        // Cart quantity
        this.cartQuantity = page.locator('#auto_id_114');
        // add to cart icon
        this.addtocarticon = page.locator('#auto_id_115');
        // add to cart modal
        this.addtocartmodal = page.locator('.as-mini-cart-modal .modal-content');
    //    check out button
    this.checkoutbtn=page.locator('.as-mini-cart-modal .modal-footer .btn-primary');
    }

    async goto() {
        await this.page.goto('https://stage-dutyfree.odoo.com/', { waitUntil: 'domcontentloaded' });

        // Handle age modal - wait for it, click, then wait for it to disappear
        const modal = this.page.locator('#mc_modal');
        try {
            await modal.waitFor({ state: 'visible', timeout: 5000 });
            await this.ageActionbtn .click();
            // Wait for modal to be hidden before proceeding
            await modal.waitFor({ state: 'hidden', timeout: 5000 });
        } catch (e) {
            // Modal not present or already dismissed, continue
        }

        // Navigate to New Arrivals - ensure link is clickable
        await expect(this.newArrivalsLink).toBeVisible({ timeout: 10000 });
        await this.newArrivalsLink.click();
        await expect(this.page).toHaveURL(/new-arrivals-duty-free-smoke/, { timeout: 20000 });

        // Wait for page to load
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { });
    }
    


    async addFirstItemToCart() {
        await expect(this.gridItem.first()).toBeVisible({ timeout: 5000 });
        await this.firstProduct.click();
    
    }

    async getCartQuantity() {
        return await this.cartQuantity.textContent();
        
    }

    async openCart() {
        await this.cartLink.click();
        await this.page.waitForLoadState("domcontentloaded");
    }
    async addToCart() {
        await this.addtocarticon.click();
        await this.addtocartmodal.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.checkoutbtn).toBeVisible({ timeout: 5000 });
        await this.checkoutbtn.click();
        // await this.addtocartbtn.click();
        // await this.page.waitForLoadState("domcontentloaded");
        // await expect(this.cartQuantity).toHaveText("1");
    }
}
module.exports = { AddCartPage };
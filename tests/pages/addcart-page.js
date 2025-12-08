const { expect } = require('@playwright/test');

class AddCartPage {
    constructor(page) {
        this.page = page;
        this.ageActionbtn = page.locator('.age-actions .btn.btn-over');
        this.profilebtn = page.locator('#userloginpopup');
        this.loginfiled = page.locator('#login');   
        this.passwordfiled = page.locator('#password');
        this.loginsubmitbtn = page.locator('#loginsubmitbutton');
        this.appbtn = page.locator('#o_backend_user_dropdown_link');
        this.websitebtn = page.locator('#result_app_13');
        this.configurationbtn = page.locator('[data-menu-xmlid="website.menu_website_global_configuration"]');
        this.paymentprovidersbtn = page.locator('[data-menu-xmlid="website_sale.menu_ecommerce_payment_providers"]');
        this.demopaymentBtn = page.locator('[data-id="datapoint_2"]');
        this.enbleTestPayment = page.locator('[data-value="test"]');
        this.publishbtn = page.locator('[name="action_toggle_is_published"]');

        // New Arrivals link
        this.newArrivalsLink = page.locator('#auto_id_20');
        this.gridItem=page.locator('#o_wsale_products_grid .oe_product');
        this.firstProduct=page.locator('#o_wsale_products_grid .oe_product:first-child #add_to_cart')
        this.cartButton=page.locator('.hm-icon.hm-icon-cart.as_mini_cart');
        // Cart quantity
        this.cartQuantity = page.locator('#auto_id_121');
        // Cart wrapper
        this.checkoutModal = page.locator('.as-mini-cart-modal');

        // Cart link
        this.checkSubmitBtn = page.locator('.modal-footer [href="/shop/payment"]');

        this.demoRadioBtn = page.locator('input[data-payment-method-code="demo"]');


        this.paymentSubmitBtn = page.locator('button[name="o_payment_submit_button"]');


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
        await this.profilebtn.click();
        await this.loginfiled.fill('common@dutyfree.com');
        await this.passwordfiled.fill('df13579');
        await this.loginsubmitbtn.click();
        // await this.appbtn.click();
        // await this.websitebtn.click();
        // await this.configurationbtn.click();
        // await this.paymentprovidersbtn.click();
        // await this.demopaymentBtn.click();

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
        await expect(this.cartQuantity).toBeVisible({ timeout: 5000 });
        return await this.cartQuantity.textContent();
        
    }

    async openCart() {
        await this.cartButton.click();
        await expect(this.checkoutModal).toBeVisible({ timeout: 5000 });
        await this.checkSubmitBtn.click();
        await expect(this.page).toHaveURL(/\/shop\/payment$/, {
            timeout: 20000
          });
          
          await expect(this.demoRadioBtn).toBeVisible({ timeout: 15000 });
          await this.demoRadioBtn.scrollIntoViewIfNeeded();
          await this.demoRadioBtn.click({ force: true });
    
          await this.paymentSubmitBtn.click();
    }
    
    async addMultipleProductsToCart(count = 3) {
        // Wait for first product to be visible
        await expect(this.gridItem.first()).toBeVisible({ timeout: 10000 });
    
        const totalProducts = await this.gridItem.count();
    
        for (let i = 0; i < count && i < totalProducts; i++) {
            const productCard = this.gridItem.nth(i);
            const addToCartBtn = productCard.locator('#add_to_cart');
    
            // Scroll to product
            await productCard.scrollIntoViewIfNeeded();
    
            // Wait and click Add to Cart
            await expect(addToCartBtn).toBeVisible({ timeout: 5000 });
            await addToCartBtn.click();
    
            // Small wait for cart update
            await this.page.waitForTimeout(800);
        }
    }
    
    
}
module.exports = { AddCartPage };
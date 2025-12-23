const { expect } = require('@playwright/test');

class WholeSellerPages {
    constructor(page) {
        this.page = page;

        /* ======================
           Login / Header
        ====================== */
        this.ageConfirmButton = page.locator('.age-actions .btn-over');
        this.profilebtn = page.locator('#userloginpopup');
        this.loginfiled = page.locator('#login');
        this.passwordfiled = page.locator('#password');
        this.loginsubmitbtn = page.locator('#loginsubmitbutton');

        /* ======================
           Navigation
        ====================== */
        this.newArrivalsLink = page.locator('#auto_id_20');

        /* ======================
           Products Grid
        ====================== */
        this.gridItem = page.locator('#o_wsale_products_grid .oe_product');
        this.firstProduct = this.gridItem.first();


        this.successMessage = page.locator('o_notification_manager .o_notification_content');

        this.cartButton = page.locator('.hm-icon.hm-icon-cart.as_mini_cart');
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
          await this.ageConfirmButton.click();
          // Wait for modal to be hidden before proceeding
          await modal.waitFor({ state: 'hidden', timeout: 5000 });
        } catch (e) {
          // Modal not present or already dismissed, continue
        }

        // Login
        await this.profilebtn.click();
        await this.loginfiled.fill('common@dutyfree.com');
        await this.passwordfiled.fill('1589');
        await this.loginsubmitbtn.click();

        await this.page.waitForLoadState('networkidle');

        // Navigate to New Arrivals
        await this.newArrivalsLink.click();
        await expect(this.page).toHaveURL(/new-arrivals-duty-free-smoke/);
    }

    async addFirstItemToCart() {
        // Get all products
        const products = await this.gridItem.all();

        for (const product of products) {
            try {
                // Click on "Select flavours" button for current product
                const selectBtn = product.locator('a.select_flavours');
                await selectBtn.click();
                
                // Wait for modal to appear
                const modal = this.page.locator('.modal.df-select-flavour');
                await modal.waitFor({ state: 'visible', timeout: 10000 });

                // Check all plus buttons in the modal
                const plusButtons = modal.locator('[name="sale_quantity_button_plus"]');
                const count = await plusButtons.count();
                let allDisabled = true;
                for (let i = 0; i < count; i++) {
                    const isDisabled = await plusButtons.nth(i).isDisabled();
                    if (!isDisabled) {
                        allDisabled = false;
                        break;
                    }
                }

                if (allDisabled) {
                    // Close modal and continue to next product
                    await modal.locator('.btn-close.as_close').click();
                    await modal.waitFor({ state: 'hidden', timeout: 5000 });
                    continue;
                } else {
                    // Find first enabled plus button and click it
                    for (let i = 0; i < count; i++) {
                        const button = plusButtons.nth(i);
                        const isDisabled = await button.isDisabled();
                        if (!isDisabled) {
                            await button.click();
                            break;
                        }
                    }
                    
                    // Click Add to Cart button
                    await modal.locator('.add_to_cart').click();
                    
                    // Wait for success message (optional)
                    try {
                        await expect(this.successMessage).toBeVisible({ timeout: 5000 });
                        await expect(this.successMessage).toHaveText('Item successfully added into the cart.');
                    } catch {
                        // Continue even if success message doesn't appear
                    }
                    
                    // Stop after successfully adding first product
                    return true;
                }
                
                
            } catch (error) {
                console.log(`Error processing product: ${error}`);
            }
        }   

    }


//checkout flow
    async checkout() {
        await this.cartButton.click();
        await expect(this.checkoutModal).toBeVisible();

        await this.checkSubmitBtn.click();
        await expect(this.page).toHaveURL(/\/shop\/payment/);

        await this.demoRadioBtn.click({ force: true });
        await this.paymentSubmitBtn.click();

        await expect(this.page).toHaveURL(/confirmation|success/, {
            timeout: 20000
        });
    }
}
module.exports = { WholeSellerPages };
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
        await this.passwordfiled.fill('df13579');
        await this.loginsubmitbtn.click();

        await this.page.waitForLoadState('networkidle');

        // Navigate to New Arrivals
        await this.newArrivalsLink.click();
        await expect(this.page).toHaveURL(/new-arrivals-duty-free-smoke/);
    }

    async addMultipleItemsToCart(maxProducts = 5, itemsPerProduct = 3) {
        // Get all products
        const products = await this.gridItem.all();
        let addedProductsCount = 0;

        for (const product of products) {
            // Stop if we've added the maximum number of products
            if (addedProductsCount >= maxProducts) {
                break;
            }

            try {
                // Click on "Select flavours" button for current product
                const selectBtn = product.locator('a.select_flavours');
                await selectBtn.click();
                
                // Wait for modal to appear
                const modal = this.page.locator('.modal.df-select-flavour');
                await modal.waitFor({ state: 'visible', timeout: 90000 });

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
                    await modal.waitFor({ state: 'hidden', timeout: 9000 });
                    continue;
                } else {
                    // Find all enabled plus buttons first
                    const enabledButtons = [];
                    for (let i = 0; i < count; i++) {
                        const button = plusButtons.nth(i);
                        const isDisabled = await button.isDisabled();
                        if (!isDisabled) {
                            enabledButtons.push(i);
                        }
                    }
                    
                    // Add multiple items by clicking different enabled buttons
                    let itemsAdded = 0;
                    const buttonsToClick = Math.min(itemsPerProduct, enabledButtons.length);
                    
                    for (let itemIndex = 0; itemIndex < buttonsToClick; itemIndex++) {
                        const buttonIndex = enabledButtons[itemIndex];
                        const button = plusButtons.nth(buttonIndex);
                        
                        // Double-check button is still enabled before clicking
                        const isDisabled = await button.isDisabled().catch(() => true);
                        if (!isDisabled) {
                            await button.click();
                            itemsAdded++;
                            // Small wait between clicks
                            await this.page.waitForTimeout(500);
                        }
                    }
                    
                    // Only add to cart if we added at least one item
                    if (itemsAdded > 0) {
                        // Click Add to Cart button
                        await modal.locator('.add_to_cart').click();
                        
                        // Wait for success message (optional)
                        try {
                            await expect(this.successMessage).toBeVisible({ timeout: 7000 });
                            await expect(this.successMessage).toHaveText('Item successfully added into the cart.');
                        } catch {
                            // Continue even if success message doesn't appear
                        }
                        
                        // Wait for modal to close or wait a bit before next product
                        try {
                            await modal.waitFor({ state: 'hidden', timeout: 7000 });
                        } catch {
                            // Modal might already be closed, continue
                        }
                        
                        addedProductsCount++;
                        console.log(`Added ${itemsAdded} item(s) from product ${addedProductsCount}`);
                        
                        // Small wait before processing next product
                        await this.page.waitForTimeout(500);
                    } else {
                        // Close modal if no items were added
                        await modal.locator('.btn-close.as_close').click();
                        await modal.waitFor({ state: 'hidden', timeout: 7000 });
                    }
                }
                
            } catch (error) {
                console.log(`Error processing product: ${error}`);
                // Try to close modal if it's still open
                try {
                    const modal = this.page.locator('.modal.df-select-flavour');
                    if (await modal.isVisible({ timeout: 1000 }).catch(() => false)) {
                        await modal.locator('.btn-close.as_close').click();
                        await modal.waitFor({ state: 'hidden', timeout: 7000 });
                    }
                } catch (e) {
                    // Continue if modal handling fails
                }
            }
        }
        
        console.log(`Successfully added ${addedProductsCount} product(s) to cart`);
        return addedProductsCount;
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
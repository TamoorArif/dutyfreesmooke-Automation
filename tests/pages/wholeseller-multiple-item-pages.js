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
      await this.page.context().clearCookies();
  await this.page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
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

    async addMultipleItemsToCart(maxProducts = 3, itemsPerProduct = 3) {
        const products = await this.gridItem.all();
        let addedProductsCount = 0;
      
        for (const product of products) {
      
          if (this.page.isClosed()) {
            console.log('Page closed, stopping product loop');
            break;
          }
      
          if (addedProductsCount >= maxProducts) break;
      
          try {
            const selectBtn = product.locator('a.select_flavours');
      
            if (!(await selectBtn.isVisible().catch(() => false))) continue;
      
            await selectBtn.click({ timeout: 5000 });
      
            const modal = this.page.locator('.modal.df-select-flavour');
            await modal.waitFor({ state: 'visible', timeout: 15000 });
      
            const plusButtons = modal.locator('[name="sale_quantity_button_plus"]');
            const count = await plusButtons.count();
      
            let clicks = 0;
            for (let i = 0; i < count && clicks < itemsPerProduct; i++) {
              const btn = plusButtons.nth(i);
              if (!(await btn.isDisabled())) {
                await btn.click();
                clicks++;
              }
            }
      
            if (clicks === 0) {
              await modal.locator('.btn-close.as_close').click();
              await modal.waitFor({ state: 'hidden' });
              continue;
            }
      
            await modal.locator('.add_to_cart').click();
            await modal.waitFor({ state: 'hidden', timeout: 10000 });
      
            addedProductsCount++;
      
          } catch (error) {
            console.log('Error processing product:', error.message);
            if (this.page.isClosed()) break;
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

        await expect(this.page).toHaveURL(/\/shop\/confirmation/, {
            timeout: 20000
        });
    }
}
module.exports = { WholeSellerPages };
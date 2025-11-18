// pages/newarrival-page.js ← SABSE FINAL (100% PASS)

const { expect } = require('@playwright/test');

class NewArrivalsPage {
  constructor(page) {
    this.page = page;
    this.ageConfirmButton = page.locator('.age-actions .btn.btn-over');

    // ID se click (tumhari demand)
    this.newArrivalsLink = page.locator('#auto_id_19');

    // Products ka best selector (actual clickable cards)
    this.gridProducts = page.locator('#products_grid .col-lg-3 >> visible=true');
  }

  async goto() {
    await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });

    // Age gate optional
    try {
      await this.page.locator('#mc_modal').waitFor({ state: 'visible', timeout: 10000 });
      await this.ageConfirmButton.click();
    } catch (e) { }

    await expect(this.newArrivalsLink).toBeVisible({ timeout: 10000 });
    await this.newArrivalsLink.click();

    // URL assertion
    await expect(this.page).toHaveURL(/new-arrivals-duty-free-smoke/, { timeout: 15000 });

    await this.page.waitForLoadState('networkidle', { timeout: 30000 });

    // YEH 2 LINES MAGIC HAIN — lazy load ko pakad lengi
    await this.page.waitForFunction(() => document.querySelectorAll('#products_grid .col-lg-3').length > 0, { timeout: 30000 });
    await expect(this.gridProducts.first()).toBeVisible({ timeout: 20000 });
  }

  async verifyNewArrivalProducts() {
    const count = await this.gridProducts.count();
    expect(count).toBeGreaterThan(0);
    console.log(`New Arrivals page pe ${count} products mile`);
  }

  async openFirstProduct() {
    const firstProduct = this.gridProducts.first();
    const title = await firstProduct.locator('.oe_product_title').innerText();
    await firstProduct.click();

    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator('h1.product-name')).toContainText(title.trim());
  }
}

module.exports = { NewArrivalsPage };
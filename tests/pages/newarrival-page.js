const { expect } = require('@playwright/test');

class NewArrivalsPage {
  constructor(page) {
    this.page = page;

    // New Arrivals Menu Link
    this.newArrivalsLink = page.locator('a[href="/shop/category/new-arrivals-duty-free-smoke"]');

    // Section Container
    this.newArrivalsSection = page.locator('#dynamic_product_new_arrivals_homepage');

    // Product Cards inside New Arrival Section
    this.productCards = this.newArrivalsSection.locator('.collections-list-item');
  }

  async goto() {
    await this.page.goto('http://139.59.24.22:8069/', {
      waitUntil: 'domcontentloaded'
    });

    // Verify Menu Option exists & text is correct
    await expect(this.newArrivalsLink).toBeVisible();
    await expect(this.newArrivalsLink).toContainText("New Arrivals");

    // Click New Arrivals Menu
    await this.newArrivalsLink.click();

    // Wait for product section
    await expect(this.newArrivalsSection).toBeVisible();
  }

  async verifyNewArrivalProducts() {
    // Ensure at least 1 product is there
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const product = this.productCards.nth(i);

      // Product Image
      await expect(product.locator('img')).toBeVisible();

      // Product Title
      await expect(product.locator('.title')).toBeVisible();

      // Product Price
      await expect(product.locator('.product-price')).toBeVisible();
    }
  }

  async openFirstProduct() {
    const firstProduct = this.productCards.first();
    const title = await firstProduct.locator('.title').innerText();

    await firstProduct.click();

    // Validate redirection with correct title
    await expect(this.page.locator('h1.product-name')).toContainText(title);
  }
}

module.exports = { NewArrivalsPage };

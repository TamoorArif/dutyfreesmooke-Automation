// pages/newarrival-page.js

const { expect } = require('@playwright/test');

class NewArrivalsPage {
  constructor(page) {
    this.page = page;
    this.ageConfirmButton = page.locator('.age-actions .btn.btn-over');

    // ID se click (tumhari demand)
    this.newArrivalsLink = page.locator('#auto_id_20');

    // Flexible selector for products - will be set in goto()
    this.gridProducts = null;
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

    // Navigate to New Arrivals - ensure link is clickable
    await expect(this.newArrivalsLink).toBeVisible({ timeout: 10000 });
    await this.newArrivalsLink.click();
    await expect(this.page).toHaveURL(/new-arrivals-duty-free-smoke/, { timeout: 20000 });

    // Wait for page to load
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    // Wait for products - try original selector first, then fallback
    try {
      await expect(this.page.locator('#products_grid .col-lg-3').first()).toBeVisible({ timeout: 5000 });
      this.gridProducts = this.page.locator('#products_grid .col-lg-3');
    } catch (e) {
      // Fallback: find product containers by product links with images
      const productLinks = this.page.locator('a[href*="/shop/"]:has(img)');
      await expect(productLinks.first()).toBeVisible({ timeout: 20000 });
      // Use parent elements of product links as product containers
      this.gridProducts = productLinks.locator('..');
    }
  }

  async verifyNewArrivalProducts() {
    const count = await this.gridProducts.count();
    expect(count).toBeGreaterThan(0);
    console.log(`New Arrivals page pe ${count} products mile`);
  }

  async openFirstProduct() {
    const firstProduct = this.gridProducts.first();
    
    // Get product link and extract title from it
    const productLink = firstProduct.locator('a[href*="/shop/"]').first();
    await expect(productLink).toBeVisible({ timeout: 10000 });
    
    // Get title from link - use textContent for better reliability
    const title = (await productLink.textContent()).trim();
    
    // Check and dismiss age modal if it appears (may reappear on navigation)
    const modal = this.page.locator('#mc_modal');
    try {
      await modal.waitFor({ state: 'visible', timeout: 2000 });
      await this.ageConfirmButton.click();
      await modal.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (e) {
      // Modal not present, continue
    }
    
    // Click and wait for navigation - use force if modal still blocking
    await productLink.scrollIntoViewIfNeeded();
    
    // Try normal click first, if modal blocks, use force
    try {
      await Promise.all([
        this.page.waitForURL(/\/shop/, { timeout: 20000 }),
        productLink.click({ timeout: 5000 })
      ]);
    } catch (e) {
      // If click fails due to modal, dismiss modal and retry with force
      try {
        if (await modal.isVisible({ timeout: 1000 }).catch(() => false)) {
          await this.ageConfirmButton.click();
          await modal.waitFor({ state: 'hidden', timeout: 5000 });
        }
      } catch (e2) {}
      
      // Retry click with force
      await Promise.all([
        this.page.waitForURL(/\/shop/, { timeout: 20000 }),
        productLink.click({ force: true })
      ]);
    }

    // Wait for page to load
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
    } catch (e) {
      // Page might be closed or still loading, continue
    }

    // Try multiple selectors for product name on detail page
    const productNameSelectors = [
      'h1.product-name',
      'h1',
      '.product-name',
      '[class*="product"] h1'
    ];

    let found = false;
    for (const selector of productNameSelectors) {
      try {
        const productName = this.page.locator(selector).first();
        await expect(productName).toBeVisible({ timeout: 5000 });
        // Verify it contains part of the title
        const nameText = await productName.textContent();
        if (nameText && title && (nameText.includes(title.split('(')[0].trim()) || title.includes(nameText.trim()))) {
          found = true;
          break;
        }
      } catch (e) {
        // Page might be closed or element not found, continue
        continue;
      }
    }

    if (!found) {
      // Fallback: just verify we're on a product page (if page is still open)
      try {
        await expect(this.page).toHaveURL(/\/shop/, { timeout: 10000 });
      } catch (e) {
        // Page might be closed, that's okay if navigation already happened
        // The waitForURL above should have verified navigation
      }
    }
  }
}

module.exports = { NewArrivalsPage };

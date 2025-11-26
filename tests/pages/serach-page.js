// pages/search-page.js
const { expect } = require('@playwright/test');

class SearchPage {
  constructor(page) {
    this.page = page;

    // LOCATORS
    this.searchInput = page.locator('#auto_id_98');
    this.dropdown = page.locator('.o_searchbar_form .o_dropdown_menu');
    this.resultItems = page.locator('.o_searchbar_form .o_dropdown_menu .dropdown-item');
    this.noResultText = page.getByText(/No results/i);

    // Product structure inside dropdown
    this.itemImage = '.oe_product_image';
    this.itemTitle = '.oe_product_name';
    this.itemCategory = '.oe_product_category';
    this.itemPrice = '.oe_currency_value';
  }

  async goto() {
    await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });

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
  }

  async openSearch() {
    // Search bar is always visible
    await expect(this.searchInput).toBeVisible();
  }

  async typeSearch(query) {
    await this.searchInput.click();

    await this.searchInput.pressSequentially(query, { delay: 100 });

    await this.page.waitForTimeout(500);
    // Wait dropdown container only
    await this.page.waitForSelector('.o_dropdown_menu', { timeout: 10000 });

    
  }
  async resultCount(){
    const count = await this.resultItems.count();

    // For debug
    console.log("Dropdown item count:", count);

    return count;  // return for test validation

  }
  async itemClick() {
  const hrefValue = await this.resultItems.nth(1).getAttribute('href');
  
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }).catch(() => {}), 
    this.resultItems.nth(1).click()
  ]);

  // For SPA/hash URLs, wait a short time and verify manually
  await this.page.waitForTimeout(500);
  const currentUrl = this.page.url();
  expect(currentUrl).toContain(hrefValue); // hash URL check
}


  


  async getResultCount() {
    return await this.resultItems.count();
  }

  async verifyResultItemStructure(index) {
    const item = this.resultItems.nth(index);
    await expect(item.locator(this.itemImage)).toBeVisible();
    await expect(item.locator(this.itemTitle)).toBeVisible();
    await expect(item.locator(this.itemCategory)).toBeVisible();
    await expect(item.locator(this.itemPrice)).toBeVisible();
  }

  async clickResult(index) {
    await this.resultItems.nth(index).click();
  }

  async closeDropdownByESC() {
    await this.page.keyboard.press('Escape');
  }

  async clickOutside() {
    await this.page.click('body');
  }
}

module.exports = { SearchPage };

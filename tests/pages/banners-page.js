// pages/home-banner-page.js
const { expect } = require('@playwright/test');
class HomeBannerPage {
  constructor(page) {
    this.page = page;

    this.ageActionbtn = page.locator('.age-actions .btn.btn-over');
    this.carousel = page.locator('[data-name="Main Banner Slider"] .carousel-inner');
    this.slides = page.locator('[data-name="Main Banner Slider"] .carousel-item');
    this.indicators = page.locator('[data-name="Main Banner Slider"] .carousel-indicators button');
    this.nextArrow = page.locator('[data-name="Main Banner Slider"] .carousel-control-next');
    this.prevArrow = page.locator('[data-name="Main Banner Slider"] .carousel-control-prev');
  }

  async goto() {
    await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });

    // If age modal appears → handle it
    const modal = this.page.locator('#mc_modal');
    if (await modal.isVisible({ timeout: 20000 }).catch(() => false)) {
      await this.ageActionbtn.click();
    }

    // Continue only after banner is ready
    await this.carousel.waitFor({ state: 'visible', timeout: 10000 });
  }


  async getSlideCount() {
    return await this.slides.count();
  }

  async clickIndicator(index) {
    await this.indicators.nth(index).click();
  }

  async clickNext() {
    await this.nextArrow.click();
  }

  async clickPrev() {
    await this.prevArrow.click();
  }

  async verifySlideActive(index) {
    const slide = this.slides.nth(index);

    await this.page.waitForFunction(el => el.classList.contains('active'), await slide.elementHandle());

    await expect(slide).toHaveClass(/active/);
  }


  async clickBanner(index) {
    const banner = this.slides.nth(index).locator('a');
    await banner.click();
  }
}

module.exports = { HomeBannerPage };

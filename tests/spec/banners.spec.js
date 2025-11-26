const { test, expect } = require('@playwright/test');
const { HomeBannerPage } = require('../pages/banners-page');

test.describe('Homepage Banner Tests', () => {

  test('Verify banner count, navigation, indicators, and click actions', async ({ page }) => {
    const bannerPage = new HomeBannerPage(page);

    // Open homepage + age verification
    await bannerPage.goto();
    await bannerPage.handleAgeModal();
    await bannerPage.bannerReady();

    // Validate total slides > 0
    const totalSlides = await bannerPage.getSlideCount();
    await expect(totalSlides).toBeGreaterThan(0);

    // --- 1) Indicator Click ---
    await bannerPage.clickIndicator(1);
    await bannerPage.verifySlideActive(1);

    // --- 2) Next Arrow ---
    await bannerPage.clickNext();
    await bannerPage.verifySlideActive(2);

    // --- 3) Previous Arrow ---
    await bannerPage.clickPrev();
    await bannerPage.verifySlideActive(1);

    // --- 4) Banner Click Redirect ---
    await bannerPage.clickBanner(0);

    // Redirect must happen (URL changes)
    await expect(page).not.toHaveURL('http://139.59.24.22:8069/');
  });

});

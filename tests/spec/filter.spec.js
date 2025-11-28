const { test, expect } = require('@playwright/test');
const { Filterpage } = require('../pages/filter-page');

test.describe('Filter Tests', () => {

    test('Open filter panel', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await expect(filter.FlavoursLabel).toBeVisible();
    });

    test.only('Select Flavour and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectFlavour();
        await filter.applyFilter();
        const products = page.locator('#products_grid .col-lg-3');

        // Pehle grid wait karo attached hone ka
        await page.waitForSelector('#products_grid', { state: 'attached', timeout: 15000 });

        // Then at least 1 product appear hone ka wait
        await expect(products.first()).toBeVisible({ timeout: 20000 });

        // Bonus safety: minimum count > 0
        await expect(products).toHaveCountGreaterThan(0);
    });

    test('Select Nicotine Strength and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectNicotine();
        await filter.applyFilter();
        // Wait until at least 1 product appears
        const products = page.locator('#products_grid .col-lg-3');

        // Ye wait karega jab tak 1 product visible na ho jaye
        await expect(products.first()).toBeVisible({ timeout: 15000 });
    });

    test('Select Nicotine Strength 2 and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectNicotine2();
        await filter.applyFilter();
        // Wait until at least 1 product appears
        const products = page.locator('#products_grid .col-lg-3');

        // Ye wait karega jab tak 1 product visible na ho jaye
        await expect(products.first()).toBeVisible({ timeout: 15000 });
    });

    test('Select Puff Count and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectPuffCount();
        await filter.applyFilter();
        // Wait until at least 1 product appears
        const products = page.locator('#products_grid .col-lg-3');

        // Ye wait karega jab tak 1 product visible na ho jaye
        await expect(products.first()).toBeVisible({ timeout: 15000 });
    });

    test('Reset filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.resetFilter();
        // Wait until at least 1 product appears
        const products = page.locator('#products_grid .col-lg-3');

        // Ye wait karega jab tak 1 product visible na ho jaye
        await expect(products.first()).toBeVisible({ timeout: 15000 });
    });

});

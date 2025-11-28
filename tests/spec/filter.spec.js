const { test, expect } = require('@playwright/test');
const { Filterpage } = require('../pages/filter-page');

test.describe('Filter Tests', () => {

    test('Open filter panel', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await expect(filter.FlavoursLabel).toBeVisible();
    });

    test('Select Flavour and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectFlavour();
        await filter.applyFilter();
       await expect(page).toHaveURL(/category=9.*attribute_group_value=10-1/);

    });

    test('Select Nicotine Strength and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectNicotine();
        await filter.applyFilter();
        await expect(page).toHaveURL(/category=9.*(attribute_group_value|attribute_value)=13-517/);
;
    });

    test('Select Nicotine Strength 2 and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectNicotine2();
        await filter.applyFilter();
        await expect(page).toHaveURL(/category=9.*(attribute_group_value|attribute_value)=14-15/)
    });

    test('Select Puff Count and apply filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.selectPuffCount();
        await filter.applyFilter();
       // Puff Count
await expect(page).toHaveURL(/category=9.*(attribute_group_value|attribute_value|filters)=1-1/);

    });

    test('Reset filter', async ({ page }) => {
        const filter = new Filterpage(page);
        await filter.goto();
        await filter.openFilter();
        await filter.resetFilter();
        await expect(page).toHaveURL(/category=9/); // Reset ke baad sirf category param check
     });
 });

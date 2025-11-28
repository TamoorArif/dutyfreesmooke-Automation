const { test, expect } = require('@playwright/test');
const { SortPage } = require('../pages/sort-page');

test.describe('Sort By Dropdown Tests', () => {

    test('Verify dropdown opens & all options are visible', async ({ page }) => {
        const sp = new SortPage(page);

        await sp.goto();
        await sp.openSort();
        await sp.dropdownDelay

        await expect(sp.getOption("Featured")).toBeVisible();
        await expect(sp.getOption("Newest Arrivals")).toBeVisible();
        await expect(sp.getOption("Name (A-Z)")).toBeVisible();
        await expect(sp.getOption("Price - Low to High")).toBeVisible();
        await expect(sp.getOption("Price - High to Low")).toBeVisible();
    });

    test('Verify clicking Price Low to High', async ({ page }) => {
        const sp = new SortPage(page);

        await sp.goto();
        await sp.openSort();
        await sp.dropdownDelay();

        await sp.getOption("Price - Low to High").click();
        

        // URL should include correct query
        await expect(page).toHaveURL(/order=list_price\+asc/); //order=list_price+asc
    });

    test('Verify clicking Name (A-Z)', async ({ page }) => {
        const sp = new SortPage(page);

        await sp.goto();
        await sp.openSort();
        await sp.dropdownDelay();
    

        await sp.getOption("Name (A-Z)").click();
        
// order=name+asc
        await expect(page).toHaveURL(/order=name\+asc/); 
    });

});

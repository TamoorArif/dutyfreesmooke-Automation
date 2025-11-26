const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/serach-page')

test.describe('Search Dropdown Tests', () => {

  test('Verify complete search dropdown functionality', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

     await searchPage.typeSearch('vel');
     const count= await searchPage.resultCount();

    expect(count).toBeGreaterThan(0);   // Should show suggestions
    await searchPage.itemClick()
});

  test('Verify no result case', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.typeSearch('xyzabc123');
    const count= await searchPage.resultCount();

    expect(count).toBe(0);    // No suggestions
});

  test('Close dropdown - ESC + outside click', async ({ page }) => {
    const search = new SearchPage(page);

    await search.goto();
    await search.typeSearch('vel');

    // ESC close
    await search.closeDropdownByESC();
    await expect(search.dropdown).not.toBeVisible();

    // Again open
    await search.typeSearch('vel');

    // Outside click close
    await search.clickOutside();
    await expect(search.dropdown).not.toBeVisible();
  });

});

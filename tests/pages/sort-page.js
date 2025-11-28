class SortPage {
    constructor(page) {
        this.page = page;
        this.ageConfirmButton = page.locator('.age-actions .btn.btn-over');
        this.newArrivalsLink = page.locator('#auto_id_20');
        this.sortButton = page.locator('.o_sortby_dropdown .dropdown-toggle');
        this.sortmenu = page.locator('.o_sortby_dropdown .dropdown-menu');


        // Dropdown menu options by IDs
        this.featured = page.locator('#sort_option_website_sequence_asc');
        this.newest = page.locator('#sort_option_create_date_desc');
        this.az = page.locator('#sort_option_name_asc');
        this.lowHigh = page.locator('#sort_option_list_price_asc');
        this.highLow = page.locator('#sort_option_list_price_desc');
    }

    async goto() {
        await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });

        // Handle age modal
        const modal = this.page.locator('#mc_modal');
        try {
            await modal.waitFor({ state: 'visible', timeout: 5000 });
            await this.ageConfirmButton.click();
            await modal.waitFor({ state: 'hidden', timeout: 5000 });
        } catch (e) {
            // Modal not present, continue
        }
    }

    async openSort() {
        await this.newArrivalsLink.click();
        await this.sortButton.scrollIntoViewIfNeeded();
        await this.sortButton.click();
        // await this.page.waitForTimeout(500);
        // await expect(this.sortmenu).toBeVisible({ timeout: 5000 });
        
    }

    async dropdownDelay() {
       await this.sortButton.click({ force: true });   // Force click
    await this.page.waitForTimeout(500);            // Small delay
    // await expect(this.sortmenu.first()).toBeVisible({ timeout: 5000 });
      
    }

    getOption(optionText) {
        switch(optionText) {
            case "Featured": return this.featured;
            case "Newest Arrivals": return this.newest;
            case "Name (A-Z)": return this.az;
            case "Price - Low to High": return this.lowHigh;
            case "Price - High to Low": return this.highLow;
            default: throw new Error(`Option "${optionText}" not found`);
        }
        
    }
    
}

module.exports = { SortPage };

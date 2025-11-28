const { expect } = require('@playwright/test');

class Filterpage {
    constructor(page) {
        this.page = page;
        this.ageConfirmButton = page.locator('.age-actions .btn.btn-over');
        this.newArrivalsLink = page.locator('#auto_id_20');
        this.filter = page.locator('#filterquery');

        // Use label locators for safe clicking
        this.FlavoursLabel = page.locator('label[for="attrgroup_10_1"]');
        this.NicotinStrengthLabel = page.locator('label[for="attrval_13_517"]');
        this.NicotinStrength2Label = page.locator('label[for="attrgroup_14_15"]');
        this.PuffCountLabel = page.locator('label[for="filter_1_1"]');

        this.filterapply = page.locator('#filterapply');
        this.filterreset = page.locator('#filterreset');
    }

    async goto() {
        await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });

        // Handle age modal if present
        const modal = this.page.locator('#mc_modal');
        try {
            await modal.waitFor({ state: 'visible', timeout: 5000 });
            await this.ageConfirmButton.click();
            await modal.waitFor({ state: 'hidden', timeout: 5000 });
        } catch (e) {
            // Modal not present or already dismissed
        }
    }

    async openFilter() {
        await this.newArrivalsLink.click();
        await this.filter.scrollIntoViewIfNeeded();
        await this.filter.click();
    }

    async selectFlavour() {
        await this.FlavoursLabel.scrollIntoViewIfNeeded();
        await this.FlavoursLabel.click();
    }

    async selectNicotine() {
        await this.NicotinStrengthLabel.scrollIntoViewIfNeeded();
        await this.NicotinStrengthLabel.click();
    }

    async selectNicotine2() {
        await this.NicotinStrength2Label.scrollIntoViewIfNeeded();
        await this.NicotinStrength2Label.click();
    }

    async selectPuffCount() {
        await this.PuffCountLabel.scrollIntoViewIfNeeded();
        await this.PuffCountLabel.click();
    }

    async applyFilter() {
        await this.filterapply.waitFor({ state: 'visible', timeout: 10000 });
        await this.filterapply.click();
        await this.page.waitForLoadState('networkidle');
    }

    async resetFilter() {
        await this.filterreset.waitFor({ state: 'visible', timeout: 10000 });
        await this.filterreset.click();
        await this.page.waitForLoadState('networkidle');
    }

    // Full filter flow
    async filterProducts({ flavour = false, nicotine = false, nicotine2 = false, puff = false }) {
        await this.openFilter();
        if (flavour) await this.selectFlavour();
        if (nicotine) await this.selectNicotine();
        if (nicotine2) await this.selectNicotine2();
        if (puff) await this.selectPuffCount();
        await this.applyFilter();
    }
}

module.exports = { Filterpage };

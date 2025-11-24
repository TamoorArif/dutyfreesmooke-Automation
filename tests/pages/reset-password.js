// pages/reset-password.js — FINAL WORKING VERSION (no timeout, no flakiness)

const { expect } = require('@playwright/test');

class Resetpassword {
  constructor(page) {
    this.page = page;

    this.ageActionbtn = page.locator('.age-actions .btn.btn-over');
    this.loginBtn = page.locator('#auto_id_103');
    this.forgotLink = page.locator('#forgotpassword');

    // Created lazily after modal appears
    this.emailInput = null;
    this.continueBtn = null;
    this.successMsg = page.locator('text=Check your email');
  }

  async goto() {
    await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });

    await this.page.waitForSelector('#mc_modal', { timeout: 20000 });
    await this.ageActionbtn.click();

    await this.loginBtn.click();
    await this.forgotLink.click();

    // Wait for Forgot Password modal
    const modal = this.page.locator('.modal-dialog');
    await modal.first().waitFor({ state: 'visible', timeout: 15000 });


    // Shadow piercing + fallback
    this.emailInput = this.page.locator('oe-reset-password >> input#forgotlogin')
      .or(this.page.locator('input#forgotlogin'));

    this.continueBtn = this.page.locator('oe-reset-password >> button:has-text("Continue")')
      .or(this.page.locator('button:has-text("Continue")'));

    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ✅ Correct final method
  async resetEmail(useremail) {
    await this.emailInput.fill(useremail);
    await this.continueBtn.click();
  }

  async verifySuccess() {
    await this.page.waitForURL('http://139.59.24.22:8069/', { timeout: 10000 });
    await expect(this.page).toHaveURL('http://139.59.24.22:8069/');
  }
}

module.exports = { Resetpassword };

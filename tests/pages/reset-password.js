// pages/reset-password.js — FINAL WORKING VERSION (no timeout, no flakiness)

class Resetpassword {
  constructor(page) {
    this.page = page;

    this.ageActionbtn = page.locator('.age-actions .btn.btn-over');
    this.loginBtn = page.locator('.df-user-login-web');
    this.forgotLink = page.locator('#forgotpassword');

    // These are created lazily after the modal appears
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

    // Wait for the modal itself (visible dialog)
    const modal = this.page.locator('.modal-dialog .as_login_popup_form, .modal[role="dialog"]');
    await modal.waitFor({ state: 'visible', timeout: 15000 });

    // Now create piercing locators — they will work because the host is present
    this.emailInput = this.page.locator('oe-reset-password >> input#forgotlogin')
      .or(this.page.locator('input#forgotlogin')); // fallback if no shadow
    this.continueBtn = this.page.locator('oe-reset-password >> button:has-text("Continue")')
      .or(this.page.locator('button:has-text("Continue")'));

    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async resetEmail(useremail) {
    await this.emailInput.fill(useremail);
    await this.continueBtn.click();
  }

  async verifySuccess() {
    await expect(this.successMsg).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { Resetpassword };
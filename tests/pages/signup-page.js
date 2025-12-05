class SignupPage {
  constructor(page) {
    this.page = page;
    this.ageConfirmButton = page.locator('.age-actions .btn.btn-over');
    this.profileclick = page.locator('#userloginpopup');
    this.singleuserhyperlink = page.locator('#signuptoday');
    this.emailforsingleUser = page.locator('#logins');
    this.nameforsingleUser = page.locator('#names');
    this.password = page.locator('#passwords');
    this.confirmPassword = page.locator('#confirm_passwords');
    this.signupBtn = page.locator('#signupbutton');
    this.emailVerified = page.locator('#unique_verify_email');
    //   this.errorMessage = page.locator('.error-message'); 
    //   this.successToast = page.locator('.toast-success'); 
    this.errorMessage = page.locator("#errors")
  }

    async goto() {
    await this.page.goto('https://stage-dutyfree.odoo.com/', { waitUntil: 'domcontentloaded' });

    // Handle age modal - wait for it, click, then wait for it to disappear
    const modal = this.page.locator('#mc_modal');
    try {
      await modal.waitFor({ state: 'visible', timeout: 5000 });
      await this.ageConfirmButton.click();
      // Wait for modal to be hidden before proceeding
      await modal.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (e) {
      // Modal not present or already dismissed, continue
    }
  

    await this.profileclick.click(); // 
    await this.singleuserhyperlink.click();
  }

  async signup(singleUserEmail, singleUserName, password, confirmPassword) {
    await this.emailforsingleUser.fill(singleUserEmail);
    await this.nameforsingleUser.fill(singleUserName);
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
    await this.signupBtn.click();
  }
  async getEmailVerified() {
    // Wait until the email element is visible
    await this.emailVerified.waitFor({ state: 'visible', timeout: 15000 });

    // Return the first matched email text
    const emails = await this.emailVerified.allTextContents();
    return emails.length > 0 ? emails[0].trim() : null;
  }

  //   Get error message text (negative assertion)
  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    return await this.errorMessage.textContent();
  }

  // Optional: check for success toast
  //   async getSuccessToast() {
  //     await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
  //     return await this.successToast.textContent();
};
module.exports = { SignupPage }

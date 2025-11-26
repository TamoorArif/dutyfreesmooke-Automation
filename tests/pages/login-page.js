// pages/loginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.ageActionbtn = page.locator('.age-actions .btn.btn-over');
    this.loginbtn = page.locator('#userloginpopup');
    this.useremail = page.locator('#login');
    this.userpassword = page.locator('#password');
    this.submitbtn = page.locator('#loginsubmitbutton');
    this.emailverified = page.locator('.gap-2 .text-break');
    this.errorMessage = page.locator('#errormsg');
  }

  async goto() {
    await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('#mc_modal', { state: 'visible', timeout: 20000 });
    await this.ageActionbtn.click();
    await this.loginbtn.click();
  }


  async login(useremail, userpassword) {
    await this.useremail.fill(useremail);
    await this.userpassword.fill(userpassword);
    await this.submitbtn.click();
    await expect(this.emailverified).toHaveText('Test@yopmail.com');
    await expect(this.errorMessage).toHaveText('Wrong login/password');
  }

  async getEmailVerified() {
    return await this.emailverified.textContent();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

};
module.exports = { LoginPage }

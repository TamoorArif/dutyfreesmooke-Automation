// pages/Resetpassword.js
class Resetpassword {
  constructor(page) {
    this.page = page;
    this.ageActionbtn = page.locator('.age-actions .btn.btn-over');
    this.loginbtn = page.locator('.df-user-login-web');
    this.ressetpswlink = page.locator('#forgotpassword');
    this.resetInput= page.locator('#login');
    this.submitbtn = page.locator('.resetbtn');
    this.successMeessege=page.locator('.as-success-popup .modal-title')
  }

  async goto() {
    await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('#mc_modal', { state: 'visible', timeout: 20000 });
    await this.ageActionbtn.click();
    await this.loginbtn.click();
    await this.ressetpswlink.click();

  }


  async restemail(useremail) {
    await this.resetInput.fill(useremail);
    await this.submitbtn.click();
  }
  
  async getsuccessMessage() {
    return await this.successMeessege.textContent('Successful Password Reset');
  }

};
module.exports = {Resetpassword}

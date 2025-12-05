// pages/wholeseller-signup.js
class WholesalerSignupPage {
  constructor(page) {
    this.page = page;
    this.ageConfirmButton = page.locator('.age-actions .btn.btn-over');
    this.profileclick = page.locator('#userloginpopup');
    this.wholeselleruserhyperlink = page.locator('#wholesignuptoday');

    this.firstname = page.locator("#firstname");
    this.lastname = page.locator("#lastname");
    this.contactnumber = page.locator("#contact_number");
    this.email = page.locator("#email");
    this.street = page.locator("#street");
    this.country = page.locator("#country_id");
    this.City = page.locator("#city");
    this.PostalCode = page.locator("#zip");
    this.StoreName = page.locator("#store_name");
    this.TypeofBusiness = page.locator("#business_type");
    this.submitBtn = page.locator("#submitbuttonwhole");
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
  


    await this.profileclick.click();
    await this.wholeselleruserhyperlink.click();
    await this.firstname.waitFor({ state: 'visible' });
  }

  async wholesellerSignupPage(firstname, lastname, contact_number, email, street, city, zip, storename) {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.contactnumber.fill(contact_number);
    await this.email.fill(email);
    await this.street.fill(street);

    // Country
    await this.country.selectOption({ label: 'Pakistan' });

    // Province - Custom Input
    await this.page.locator('#custom_state_id').waitFor({ state: 'visible' });
    await this.page.locator('#custom_state_id').fill('Punjab');

    await this.City.fill(city);
    await this.PostalCode.fill(zip);
    await this.StoreName.fill(storename);

    // Type of Business
    await this.TypeofBusiness.selectOption({ label: 'Distributor' });

    // Interest in - Select2 Multi-Select
    await this.page.locator('#s2id_interest_types').click({ force: true });
    await this.page.locator('.select2-input').type('Vapes');
    await this.page.keyboard.press('Enter');
    await this.page.locator('.select2-input').type('Cigarettes');
    await this.page.keyboard.press('Enter');
    await this.page.keyboard.press('Escape');
    // Submit
    await this.submitBtn.click();
  }
}

module.exports = { WholesalerSignupPage };
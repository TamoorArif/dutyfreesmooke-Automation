// pages/wholeseller-singup.js
class WholesalerSignupPage {
  constructor(page) {
    this.page = page;
    this.ageActionbtn = page.locator('.age-actions .btn.btn-over');
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
    await this.page.goto('http://139.59.24.22:8069/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('#mc_modal');
      await this.ageActionbtn.click();
    // await this.ageActionbtn.click();
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

    // Type of Business - Use exact visible option
    await this.TypeofBusiness.selectOption({ label: 'Distributor' });

    // Interest in - Custom Multi-Select (Select2)
    await this.page.locator('#s2id_interest_types').click();
    await this.page.locator('.select2-results li:nth-child(1)').click();

    await this.page.locator('#s2id_interest_types').click();
    await this.page.locator('.select2-results li:nth-child(2)').click();

    await this.submitBtn.click();
  }
}

module.exports = WholesalerSignupPage;
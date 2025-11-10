/**
 * Helper functions for tests
 */

class TestHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot with a custom name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
  }

  /**
   * Wait for element to be visible
   */
  async waitForElementVisible(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }
}

module.exports = { TestHelper };


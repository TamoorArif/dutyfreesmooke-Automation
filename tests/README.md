# Test Files Guide

## Test File Structure

All test files should be placed in the `tests/` directory and end with `.spec.js` or `.test.js`.

## Available Example Tests

1. **example.spec.js** - Basic Playwright examples
2. **login.spec.js** - Login page test examples
3. **ecommerce.spec.js** - E-commerce functionality tests
4. **homepage.spec.js** - Homepage and navigation tests

## How to Write Your Own Tests

### Basic Test Structure

```javascript
const { test, expect } = require('@playwright/test');

test('test name', async ({ page }) => {
  await page.goto('https://your-website.com');
  // Your test code here
});
```

### Common Actions

- **Navigate**: `await page.goto('URL')`
- **Fill input**: `await page.fill('selector', 'value')`
- **Click**: `await page.click('selector')`
- **Check text**: `await expect(page.locator('selector')).toHaveText('text')`
- **Check visibility**: `await expect(page.locator('selector')).toBeVisible()`
- **Wait**: `await page.waitForSelector('selector')`

### Finding Elements

Use CSS selectors, text selectors, or Playwright's built-in locators:

```javascript
// By CSS selector
page.locator('#id')
page.locator('.class')
page.locator('button')

// By text
page.getByText('Click me')
page.getByRole('button', { name: 'Submit' })

// By placeholder
page.getByPlaceholder('Enter email')
```

## Running Tests

- Run all tests: `npm test`
- Run specific file: `npx playwright test tests/spec/login.spec.js`
- Run in headed mode: `npm run test:headed`
- Run in debug mode: `npm run test:debug`


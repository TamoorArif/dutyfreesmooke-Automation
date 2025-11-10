# Duty-Free Automation

A Playwright automation project for testing and automation.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

For system dependencies (on Linux):
```bash
npx playwright install --with-deps
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see the browser):
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run tests with UI mode:
```bash
npm run test:ui
```

View test report:
```bash
npm run test:report
```

Generate code (record tests):
```bash
npm run test:codegen
```

## Project Structure

```
.
├── tests/              # Test files
├── playwright.config.js # Playwright configuration
├── package.json        # Project dependencies
└── README.md          # This file
```

## Writing Tests

Create your test files in the `tests/` directory. Test files should end with `.spec.js` or `.test.js`.

Example test:
```javascript
const { test, expect } = require('@playwright/test');

test('my test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## Configuration

The Playwright configuration is in `playwright.config.js`. You can customize:
- Test directories
- Browsers and devices
- Timeouts
- Screenshots and videos
- Base URL
- And more...

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-test)


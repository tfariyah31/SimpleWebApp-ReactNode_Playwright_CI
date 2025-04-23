// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test('should log in with valid credentials', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000'); // Change if login page is under a different path

    //await page.getByLabel('Username').fill('usera');
   // await page.getByLabel('Password').fill('password');
   // await page.getByRole('button', { name: /login/i }).click();

    await page.fill('input[type="text"]', 'usera');
    await page.fill('input[type="password"]', 'password');

    await page.click('button[type="submit"]');

  // Verify navigation to the product list page
    await expect(page).toHaveURL('http://127.0.0.1:3000/products');

      });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000');

    await page.fill('input[type="text"]', 'testuser');
    await page.fill('input[type="password"]', 'testpassword');

    await page.click('button[type="submit"]');

    const errorMessage = page.locator('.MuiAlert-message'); 
  await expect(errorMessage).toHaveText('Invalid credentials');
  });
});

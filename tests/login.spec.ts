import { test, expect } from '@playwright/test';
import { LoginPage } from './auth/login.page';
import { TEST_USER } from './fixtures/credentials';



test.describe('Authentication', () => {

  test('TC-AUTH-001 - Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await expect(page).not.toHaveURL(/.*\/hub\/$/);
    await expect(page.locator('body')).not.toContainText('Invalid');
  });

  test('TC-AUTH-002 - Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, 'wrongpassword123');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-AUTH-003 - Login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginButton.click();
    await expect(page).toHaveURL(/.*\/hub\//);
  });

});

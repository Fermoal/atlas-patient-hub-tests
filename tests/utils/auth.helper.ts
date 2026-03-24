import { Page } from '@playwright/test';
import { TEST_USER } from '../fixtures/credentials';

export async function loginAs(page: Page) {
  await page.goto('/hub/login');
  await page.getByRole('button', { name: 'Log In', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Email' }).fill(TEST_USER.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(TEST_USER.password);
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  // Wait for dashboard to load — any element that only exists when logged in
  await page.getByRole('link', { name: 'Manage Appointments' }).waitFor({ state: 'visible', timeout: 15000 });
}
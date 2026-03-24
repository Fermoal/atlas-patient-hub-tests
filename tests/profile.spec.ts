import { test, expect } from '@playwright/test';
import { loginAs } from '../tests/utils/auth.helper';
import { ProfilePage } from './profile/profile.page';

test.describe.configure({ mode: 'serial' });

test.describe('Profile', () => {

  test('TC-PROF-001 - View profile information', async ({ page }) => {
    await loginAs(page);
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await expect(profilePage.profileHeading).toBeVisible();
    await expect(profilePage.birthdateInfo).toBeVisible();
    await expect(profilePage.primaryDoctorInfo).toBeVisible();
  });

  test('TC-PROF-002 - Profile shows correct patient name', async ({ page }) => {
    await loginAs(page);
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await expect(page.getByRole('heading', { name: 'Fernando Alvarado' })).toBeVisible();
  });

  test('TC-PROF-003 - Profile shows primary doctor', async ({ page }) => {
    await loginAs(page);
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await expect(page.getByText('Primary doctor Dr. Brian')).toBeVisible();
  });

  test('TC-PROF-004 - Close profile returns to dashboard', async ({ page }) => {
    await loginAs(page);
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    // Close profile by clicking nav button again
    await profilePage.profileButton.click();
    await expect(page.getByRole('link', { name: 'Manage Appointments' })).toBeVisible();
  });

});
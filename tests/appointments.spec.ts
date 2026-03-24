import { test, expect } from '@playwright/test';
import { loginAs } from '../tests/utils/auth.helper';
import { AppointmentsPage } from './appointments/appointments.page';

test.describe.configure({ mode: 'serial' });

test.describe('Appointments', () => {

  test('TC-APPT-001 - View appointments section', async ({ page }) => {
    await loginAs(page);
    const apptPage = new AppointmentsPage(page);
    await apptPage.goto();
    await expect(apptPage.appointmentsHeading).toBeVisible();
    // Either shows appointments or empty state message
    const hasAppointments = await page.locator('[class*="appointment"]').count() > 0;
    const hasEmptyMessage = await apptPage.emptyMessage.isVisible();
    expect(hasAppointments || hasEmptyMessage).toBeTruthy();
  });

  test('TC-APPT-002 - Schedule section is visible', async ({ page }) => {
    await loginAs(page);
    const apptPage = new AppointmentsPage(page);
    await apptPage.goto();
    await expect(apptPage.scheduleHeading).toBeVisible();
    await expect(apptPage.doctorSelectButton).toBeVisible();
  });

  test('TC-APPT-003 - Doctor selector works', async ({ page }) => {
    await loginAs(page);
    const apptPage = new AppointmentsPage(page);
    await apptPage.goto();
    await apptPage.doctorSelectButton.click();
    // Target the dropdown option specifically
  await expect(page.locator('.select-list-option').filter({ hasText: 'Dr. Brian' })).toBeVisible();
  });

  test('TC-APPT-004 - Schedule full appointment flow', async ({ page }) => {
    await loginAs(page);
    const apptPage = new AppointmentsPage(page);
    await apptPage.goto();
    await apptPage.scheduleHeading.waitFor({ state: 'visible' });
    await apptPage.doctorSelectButton.click();
    // Use specific dropdown selector
    await page.locator('.select-list-option').filter({ hasText: 'Dr. Brian' }).click();
    await apptPage.nextButton.click();
    // Select first available day
    await page.locator('button.available, button[class*="day"]:not([disabled])').first().click();
    // Select a time slot
    await page.locator('.select-button').first().click();
    await page.locator('component-app-select').getByText(/AM|PM/).first().click();
    await apptPage.purposeInput.fill('Automated test appointment');
    await apptPage.scheduleAppointmentButton.click();
    await expect(apptPage.confirmAndScheduleButton).toBeVisible();
    await apptPage.confirmAndScheduleButton.click();
    await expect(apptPage.successHeading).toBeVisible({ timeout: 15000 });
  });

});
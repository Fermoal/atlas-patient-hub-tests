import { test, expect } from '@playwright/test';
import { loginAs } from '../tests/utils/auth.helper';
import { BillingPage } from './billing/billing.page';

test.describe.configure({ mode: 'serial' });

test.describe('Billing & Payments', () => {

  test('TC-BILL-001 - View billing section with invoices', async ({ page }) => {
    await loginAs(page);
    const billingPage = new BillingPage(page);
    await billingPage.goto();
    await expect(billingPage.invoicesHeading).toBeVisible();
    await expect(billingPage.makePaymentSection).toBeVisible();
  });

  test('TC-BILL-002 - View invoice amount and details', async ({ page }) => {
    await loginAs(page);
    const billingPage = new BillingPage(page);
    await billingPage.goto();
    // Invoice with $100.00 exists in staging
    await expect(page.getByText('$100.00')).toBeVisible();
    await expect(page.getByText('Outstanding balance')).toBeVisible();
  });

  test('TC-BILL-003 - Send payment without selecting method shows error', async ({ page }) => {
    await loginAs(page);
    const billingPage = new BillingPage(page);
    await billingPage.goto();
    await billingPage.sendPaymentButton.click();
    await expect(billingPage.errorHeading).toBeVisible({ timeout: 10000 });
  });

  test('TC-BILL-004 - Add invalid card shows error', async ({ page }) => {
    await loginAs(page);
    const billingPage = new BillingPage(page);
    await billingPage.goto();
    await billingPage.payWithDifferentCardLink.click();
    await billingPage.fillCardDetails(
      '4485 9483 8384 9484',
      '01 / 28',
      '123'
    );
    await billingPage.addButton.click();
    await expect(billingPage.errorHeading).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Your card number is invalid.')).toBeVisible();
  });

  test('TC-BILL-005 - Cancel add card returns to billing', async ({ page }) => {
    await loginAs(page);
    const billingPage = new BillingPage(page);
    await billingPage.goto();
    await billingPage.payWithDifferentCardLink.click();
    await billingPage.cancelButton.click();
    await expect(billingPage.invoicesHeading).toBeVisible();
  });

  test('TC-BILL-006 - View invoice PDF link exists', async ({ page }) => {
    await loginAs(page);
    const billingPage = new BillingPage(page);
    await billingPage.goto();
    await expect(page.locator('invoices-list').getByRole('link')).toBeVisible();
  });

});
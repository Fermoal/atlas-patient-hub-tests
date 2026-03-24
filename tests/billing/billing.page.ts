import { Page, Locator } from '@playwright/test';

export class BillingPage {
  readonly page: Page;
  readonly manageBillingLink: Locator;
  readonly invoicesHeading: Locator;
  readonly makePaymentSection: Locator;
  readonly sendPaymentButton: Locator;
  readonly payWithDifferentCardLink: Locator;
  readonly addNewCardButton: Locator;
  readonly addButton: Locator;
  readonly errorHeading: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.manageBillingLink = page.getByRole('link', { name: 'Manage Billing' });
    this.invoicesHeading = page.getByText('Invoices', { exact: true });
    this.makePaymentSection = page.getByText('Make a Payment', { exact: true });
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.payWithDifferentCardLink = page.getByRole('link', { name: 'Pay with a different card' });
    this.addNewCardButton = page.getByRole('button', { name: 'Add New Credit Card' });
    this.addButton = page.getByRole('button', { name: 'Add', exact: true });
    this.errorHeading = page.getByRole('heading', { name: 'Error' });
    this.errorMessage = page.locator('.m-error');
    this.cancelButton = page.locator('add-credit-card').getByText('Cancel');
  }

  async goto() {
    await this.manageBillingLink.click();
    await this.invoicesHeading.waitFor({ state: 'visible' });
  }

  async fillCardDetails(cardNumber: string, expiry: string, cvc: string) {
    await this.page.locator('iframe[name*="privateStripeFrame"]').nth(0)
      .contentFrame().getByRole('textbox', { name: 'Credit or debit card number' }).fill(cardNumber);
    await this.page.locator('iframe[name*="privateStripeFrame"]').nth(1)
      .contentFrame().getByRole('textbox', { name: 'Credit or debit card' }).fill(expiry);
    await this.page.locator('iframe[name*="privateStripeFrame"]').nth(2)
      .contentFrame().getByRole('textbox', { name: 'Credit or debit card CVC/CVV' }).fill(cvc);
  }
}
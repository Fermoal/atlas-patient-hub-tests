import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly logInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.logInButton = page.getByRole('button', { name: 'Log In', exact: true });
    this.submitButton = page.getByRole('button', { name: 'Log in', exact: true });
    this.errorMessage = page.getByText(
        /Invalid login information\.|Sorry, but there was an error processing your request/i
      );
  }

  async goto() {
    await this.page.goto('/hub/login');
    await this.logInButton.waitFor({ state: 'visible' });
    await this.logInButton.click();
    await this.emailInput.waitFor({ state: 'visible', timeout: 25000 });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
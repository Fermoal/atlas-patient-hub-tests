import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly profileHeading: Locator;
  readonly birthdateInfo: Locator;
  readonly primaryDoctorInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.getByRole('navigation').getByRole('button');
    this.profileHeading = page.getByRole('heading', { name: 'Fernando Alvarado' });
    this.birthdateInfo = page.getByText('Birthdate');
    this.primaryDoctorInfo = page.getByText('Primary doctor');
  }

  async goto() {
    await this.profileButton.click();
    await this.profileHeading.waitFor({ state: 'visible' });
  }
}
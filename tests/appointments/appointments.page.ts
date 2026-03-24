import { Page, Locator } from '@playwright/test';

export class AppointmentsPage {
  readonly page: Page;
  readonly manageAppointmentsLink: Locator;
  readonly appointmentsHeading: Locator;
  readonly scheduleHeading: Locator;
  readonly doctorSelectButton: Locator;
  readonly nextButton: Locator;
  readonly scheduleAppointmentButton: Locator;
  readonly confirmAndScheduleButton: Locator;
  readonly successHeading: Locator;
  readonly purposeInput: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.manageAppointmentsLink = page.getByRole('link', { name: 'Manage Appointments' });
    this.appointmentsHeading = page.getByRole('heading', { name: 'Appointments' });
    this.scheduleHeading = page.getByRole('heading', { name: 'Schedule an Appointment' });
    this.doctorSelectButton = page.locator('.select-button').first();
    this.nextButton = page.locator('.next-button');
    this.scheduleAppointmentButton = page.getByRole('button', { name: 'Schedule Appointment' });
    this.confirmAndScheduleButton = page.getByRole('button', { name: 'Confirm and Schedule' });
    this.successHeading = page.getByRole('heading', { name: 'Appointment Successfully' });
    this.purposeInput = page.getByRole('textbox', { name: 'Please describe the purpose' });
    this.emptyMessage = page.getByText("You don't currently have any");
  }

  async goto() {
    await this.manageAppointmentsLink.click();
    await this.appointmentsHeading.waitFor({ state: 'visible' });
  }

  async scheduleAppointment(doctorName: string, purpose: string) {
    await this.scheduleHeading.waitFor({ state: 'visible' });
    await this.doctorSelectButton.click();
    await this.page.locator('.select-list-option').filter({ hasText: doctorName }).click();
    await this.nextButton.click();
    // Select first available day
    const firstAvailableDay = this.page.locator('button[class*="day"]:not([disabled])').first();
    await firstAvailableDay.click();
    // Select first available time slot
    const firstSlot = this.page.locator('.select-button').first();
    await firstSlot.click();
    const firstTime = this.page.locator('component-app-select').first();
    await firstTime.click();
    await this.purposeInput.fill(purpose);
    await this.scheduleAppointmentButton.click();
    await this.confirmAndScheduleButton.click();
    await this.successHeading.waitFor({ state: 'visible', timeout: 15000 });
  }
}
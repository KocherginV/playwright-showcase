import { Locator, Page } from '@playwright/test';

export class Homepage {
  readonly page: Page;
  readonly banner: Locator;
  readonly column: Locator;
  readonly ctaButton: Locator;
  readonly roomContainer: Locator;
  readonly amendities: Locator;
  readonly bookButton: Locator;
  readonly calendar: Locator;
  readonly month: Locator;
  readonly currentMonth: string;
  readonly date: Date;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly subjectField: Locator;
  readonly messageTextArea: Locator;
  readonly submitButton: Locator;
  readonly legalName: Locator;
  readonly address: Locator;
  readonly phoneNumber: Locator;
  readonly contactEmail: Locator;
  readonly cookiePolicyLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly adminLink: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly confirmBookingButton: Locator;
  readonly cancelBookingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.banner = page.locator('#collapseBanner');
    this.column = page.locator('.jumbotron > .row > .col-sm-3');
    this.ctaButton = page.locator('button', { hasText: 'Let me hack!' });
    this.roomContainer = page.locator('div.row.hotel-room-info').nth(0);
    this.amendities = page.locator('div.row.hotel-room-info > .col-sm-7 ul li');
    this.bookButton = page.locator('button', { hasText: 'Book this room' });
    this.calendar = page.locator('.col-sm-6 .rbc-calendar');
    this.month = page.locator('.col-sm-6 .rbc-calendar .rbc-toolbar-label');
    this.date = new Date();
    this.currentMonth =
      this.date.toLocaleString('en-us', { month: 'long' }) +
      ' ' +
      this.date.toLocaleString('en-us', { year: 'numeric' });
    this.firstName = page.locator('[name~=firstname]');
    this.lastName = page.locator('[name~=lastname]');
    this.phone = page.locator('[name~=phone]');
    this.email = page.locator('[name~=email]');
    this.nameField = page.locator('#name');
    this.emailField = page.locator('#email');
    this.phoneField = page.locator('#phone');
    this.subjectField = page.locator('#subject');
    this.messageTextArea = page.locator('#description');
    this.submitButton = page.locator('#submitContact');
    this.legalName = page.locator('.col-sm-5 p').nth(0);
    this.address = page.locator('.col-sm-5 p').nth(1);
    this.phoneNumber = page.locator('.col-sm-5 p').nth(2);
    this.contactEmail = page.locator('.col-sm-5 p').nth(3);
    this.cookiePolicyLink = page.locator('a[href*="cookie"]');
    this.privacyPolicyLink = page.locator('a[href*="privacy"]');
    this.adminLink = page.locator('.text-muted a[href*="admin"]');
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#doLogin');
    this.confirmBookingButton = page.locator('button.btn.btn-outline-primary.float-right.book-room');
    this.cancelBookingButton = page.locator('button.btn.btn-outline-danger.float-right.book-room');
  }
}

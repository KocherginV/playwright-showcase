import { Locator, Page } from '@playwright/test';

export class AdminLoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-testid="username"]');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#doLogin');
  }
}

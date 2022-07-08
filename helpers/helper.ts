import { Page } from '@playwright/test';
import { AdminLoginPage } from '../pages/adminLoginPage';

export class Helper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    const adminLoginPage = new AdminLoginPage(this.page);
    await adminLoginPage.usernameField.type(username);
    await adminLoginPage.passwordField.type(password);
    await adminLoginPage.loginButton.click();
  }
}

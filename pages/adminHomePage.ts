import { Page, Locator } from '@playwright/test';

export class AdminHomePage {
    readonly page: Page;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.locator('a', { hasText: 'Logout' });
    }
}

import { Page, Locator } from '@playwright/test';

export class AdminHomePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly message: (number: number) => Locator;
  readonly messagesLink: Locator;
  readonly guestName: (number: number) => Locator;
  readonly messageSubject: (number: number) => Locator;
  readonly messageModal: Locator;
  readonly detailedMessageAuthor: Locator;
  readonly detailedMessageEmail: Locator;
  readonly detailedMessageSubject: Locator;
  readonly detailedMessageText: Locator;
  readonly detailedMessagePhone: Locator;
  readonly closeMessageModalButton: Locator;
  readonly deleteMessageButton: (number: number) => Locator;




  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('a', { hasText: 'Logout' });
    this.message = (number) => page.locator(`#message${number}`);
    this.messagesLink = page.locator('a[href="#/admin/messages"]');
    this.guestName = (number) => page.locator(`div[data-testid="message${number}"] > p`);
    this.messageSubject = (number) => page.locator(`div[data-testid="messageDescription${number}"] > p`);
    this.messageModal = page.locator('div[data-testid="message"]');
    this.detailedMessageAuthor = page.locator('div[data-testid="message"] > div > .col-10 > p');
    this.detailedMessageEmail = page.locator('div[data-testid="message"] > div > .col-12 > p').nth(0);
    this.detailedMessageSubject = page.locator('div[data-testid="message"] > div > .col-12 > p').nth(1);
    this.detailedMessageText = page.locator('div[data-testid="message"] > div > .col-12 > p').nth(2);
    this.detailedMessagePhone = page.locator('div[data-testid="message"] > div > .col-2 > p');
    this.closeMessageModalButton = page.locator('button[class="btn btn-outline-primary"]');
    this.deleteMessageButton = (number) => page.locator(`span[data-testid="DeleteMessage${number}"]`);
  }
}

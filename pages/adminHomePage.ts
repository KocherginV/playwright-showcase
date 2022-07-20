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
  readonly roomNameField: Locator;
  readonly roomTypeDropdown: Locator;
  readonly roomAccessibilityDropdown: Locator;
  readonly roomPrice: Locator;
  readonly roomWifiCheckbox: Locator;
  readonly roomRefreshmentCheckbox: Locator;
  readonly roomTvCheckbox: Locator;
  readonly roomSafeCheckbox: Locator;
  readonly roomRadioCheckbox: Locator;
  readonly roomViewsCheckbox: Locator;
  readonly createRoomButton: Locator;
  readonly createdRoomName: (roomNumber: number) => Locator;
  readonly createdRoomType: (roomType: string) => Locator;
  readonly createdRoomAccessibilty: (createdRoomNumber: number, accessible: string) => Locator;
  readonly createdRoomPrice: (createdRoomNumber: number) => Locator;
  readonly createdRoomAmendities: (createdRoomNumber: number) => Locator;
  readonly deleteCreatedRoomButton: (createdRoomNumber: number) => Locator;




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
    this.roomNameField = page.locator('input[data-testid="roomName"]');
    this.roomTypeDropdown = page.locator('select#type');
    this.roomAccessibilityDropdown = page.locator('select#accessible');
    this.roomPrice = page.locator('#roomPrice');
    this.roomWifiCheckbox = page.locator('#wifiCheckbox');
    this.roomTvCheckbox = page.locator('#tvCheckbox');
    this.roomRadioCheckbox = page.locator('#radioCheckbox');
    this.roomRefreshmentCheckbox = page.locator('#refreshCheckbox');
    this.roomSafeCheckbox = page.locator('#safeCheckbox');
    this.roomViewsCheckbox = page.locator('#viewsCheckbox');
    this.createRoomButton = page.locator('#createRoom');
    this.createdRoomName = (roomNumber) => page.locator(`#roomName${roomNumber}`);
    this.createdRoomType = (roomType) => page.locator(`#type${roomType}`);
    this.createdRoomAccessibilty = (createdRoomNumber, accessible) => page.locator(`div[id="room${createdRoomNumber}"] p[id^="accessible${accessible}"]`);
    this.createdRoomPrice = (createdRoomNumber) => page.locator(`div[id="room${createdRoomNumber}"] p[id^="roomPrice"]`);
    this.createdRoomAmendities = (createdRoomNumber) => page.locator(`div[id="room${createdRoomNumber}"] .col-sm-5 > p`);
    this.deleteCreatedRoomButton = (createdRoomNumber) => page.locator(`div[id="room${createdRoomNumber}"] > .col-sm-1 > span`);
  }
}

import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/adminLoginPage';
import * as testData from '../helpers/testData.json';
import { Helper } from '../helpers/helper';
import { AdminHomePage } from '../pages/adminHomePage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationintesting.online/#/admin');
});

test.describe('Login tests', () => {
  test('Can login with valid credentials', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    const helper = new Helper(page);

    await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);
    await expect(adminLoginPage.loginButton).not.toBeVisible();
  });

  test('Can not login without valid credentials', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    const helper = new Helper(page);

    await helper.login(testData.credentials.invalid.username, testData.credentials.invalid.password);
    await expect(adminLoginPage.loginButton).toBeVisible();
  });

  test('Can logout', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    const helper = new Helper(page);
    const adminHomePage = new AdminHomePage(page);

    await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);
    await adminHomePage.logoutButton.click();
    await expect(adminLoginPage.loginButton).toBeVisible();
  });
});

test.describe('Room tests', () => {
  test('Can create room', async ({page}) => {
    const helper = new Helper(page);
    const adminHomePage = new AdminHomePage(page);
    await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);

    //debug remove as well as change config
    await page.pause();
    //end debug

    await adminHomePage.roomNameField.type(testData.room.name);
    await adminHomePage.roomTypeDropdown.selectOption(testData.room.type);
    await adminHomePage.roomAccessibilityDropdown.selectOption(testData.room.accessibility);
    await adminHomePage.roomPrice.type(testData.room.price);
    await adminHomePage.roomWifiCheckbox.check();
    await adminHomePage.roomRefreshmentCheckbox.check();
    await adminHomePage.roomTvCheckbox.check();
    await adminHomePage.roomSafeCheckbox.check();
    await adminHomePage.roomRadioCheckbox.check();
    await adminHomePage.roomViewsCheckbox.check();
    await adminHomePage.createRoomButton.click();

    await expect(adminHomePage.createdRoomName(102)).toContainText(testData.room.name);
    await expect(adminHomePage.createdRoomType('Twin')).toContainText(testData.room.type);
    //so far fails here, because test does not get the value
    await expect(adminHomePage.createdRoomAccessibilty(2, 'true')).toHaveValue('true');
    await expect(adminHomePage.createdRoomPrice(2)).toContainText(testData.room.price);
    await expect(adminHomePage.createdRoomAmendities(2)).toContainText(testData.room.amendities);

    await adminHomePage.deleteCreatedRoomButton.click();
  })
});

test.skip('Messages tests', () => {
  test('Can see message', async ({ page }) => {
    const helper = new Helper(page);
    const adminHomePage = new AdminHomePage(page);

    await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);
    await adminHomePage.messagesLink.click();
    await expect(adminHomePage.message(0)).toBeVisible();
    await expect(adminHomePage.guestName(0)).toHaveText('James Dean');
    await expect(adminHomePage.messageSubject(0)).toHaveText('Booking enquiry');
  });

  test('Can read full message', async ({ page }) => {
    const helper = new Helper(page);
    const adminHomePage = new AdminHomePage(page);

    await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);
    await adminHomePage.messagesLink.click();
    await adminHomePage.message(0).click();

    await expect(adminHomePage.messageModal).toBeVisible();
    await expect(adminHomePage.detailedMessageAuthor).toHaveText('From: James Dean');
    await expect(adminHomePage.detailedMessageEmail).toHaveText('Email: james@email.com');
    await expect(adminHomePage.detailedMessageSubject).toHaveText('Booking enquiry');
    await expect(adminHomePage.detailedMessageText).toHaveText('I would like to book a room at your place');
    await expect(adminHomePage.detailedMessagePhone).toHaveText('Phone: 01402 619211');

    await adminHomePage.closeMessageModalButton.click();
    await expect(adminHomePage.messageModal).not.toBeVisible();
  });
});

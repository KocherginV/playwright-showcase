import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/adminLoginPage';
import * as testData from '../helpers/testData.json';
import { Helper } from '../helpers/helper';
import { AdminHomePage } from '../pages/adminHomePage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationintesting.online/#/admin');
})

test.describe('Login tests', () => {

    test('Can login with valid credentials', async ({page}) => {
        const adminLoginPage = new AdminLoginPage(page);
        const helper = new Helper(page);

        await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);
        await expect(adminLoginPage.loginButton).not.toBeVisible();
    });

    test('Can not login without valid credentials', async ({page}) => {
        const adminLoginPage = new AdminLoginPage(page);
        const helper = new Helper(page);

        await helper.login(testData.credentials.invalid.username, testData.credentials.invalid.password);
        await expect(adminLoginPage.loginButton).toBeVisible();
    });

    test('Can logout',async ({page}) => {
        const adminLoginPage = new AdminLoginPage(page);
        const helper = new Helper(page);
        const adminHomePage = new AdminHomePage(page);

        await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);
        await adminHomePage.logoutButton.click();
        await expect(adminLoginPage.loginButton).toBeVisible();
    });
});

test.describe('Messages tests', () => {

    test('Can see message', async ({page}) => {
        const helper = new Helper(page);
        const adminHomePage = new AdminHomePage(page);

        await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);
        await adminHomePage.messagesLink.click();
        await expect(adminHomePage.message(0)).toBeVisible();
        await expect(adminHomePage.guestName(0)).toHaveText('James Dean');
        await expect(adminHomePage.messageSubject(0)).toHaveText('Booking enquiry');
    });

    test('Can read full message',async ({page}) => {
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

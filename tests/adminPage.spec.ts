import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/adminLoginPage';
import * as testData from '../helpers/testData.json'

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationintesting.online/#/admin');
})

test.describe('Login tests', () => {

    test('Can login with valid credentials', async ({page}) => {
        const adminLoginPage = new AdminLoginPage(page);
        await adminLoginPage.usernameField.type(testData.credentials.valid.username);
        await adminLoginPage.passwordField.type(testData.credentials.valid.password);
        await adminLoginPage.loginButton.click();
        await expect(adminLoginPage.loginButton).not.toBeVisible();
    });

    test('Can not login without valid credentials', async ({page}) => {
        const adminLoginPage = new AdminLoginPage(page);
        await adminLoginPage.usernameField.type(testData.credentials.invalid.username);
        await adminLoginPage.passwordField.type(testData.credentials.invalid.password);
        await adminLoginPage.loginButton.click();
        await expect(adminLoginPage.loginButton).toBeVisible();
    })
});

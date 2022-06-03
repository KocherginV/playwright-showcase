import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://automationintesting.online/#/');
})

test.describe('banner tests', () =>{
    test('should display banner', async ({ page }) => {
        await expect(page.locator('#collapseBanner')).toBeVisible();
    });
    test('should display four columns', async ({page}) => {
        const column = page.locator('.jumbotron > .row > .col-sm-3');
        await expect(column).toHaveCount(4);
    });
});
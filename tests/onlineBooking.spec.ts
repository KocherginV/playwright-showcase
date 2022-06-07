import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://automationintesting.online/#/');
})

test.describe('banner tests', () => {
    test('should display banner', async ({ page }) => {
        await expect(page.locator('#collapseBanner')).toBeVisible();
    });
    test('should display four columns', async ({ page }) => {
        const column = page.locator('.jumbotron > .row > .col-sm-3');
        await expect(column).toHaveCount(4);
    });
    test('cta button is displayed', async ({ page }) => {
        const ctaButton = page.locator('button', {hasText: "Let me hack!"});
        await expect(ctaButton).toBeVisible();
    });
    test('banner disappears after button is clicked', async ({page}) => {
        const ctaButton = page.locator('button', {hasText: "Let me hack!"});
        await ctaButton.click();
        await expect(page.locator('#collapseBanner')).not.toBeVisible();
    });
});

test.describe('rooms tests', () => {
    test('single room is displayed', async ({ page }) => {
        const roomConatiner = page.locator('div.row.hotel-room-info').nth(0);
        await expect(roomConatiner).toBeVisible();
    });
    test('three amendities are displayed inside of the room', async ({ page }) => {
        const amendities = page.locator('div.row.hotel-room-info > .col-sm-7 ul li');
        await expect(amendities).toHaveCount(3);
    });
    test('correct amendities are displayed inside of the room', async ({ page }) => {
        const amendities = page.locator('div.row.hotel-room-info > .col-sm-7 ul li');
        await expect(amendities).toContainText(['TV', 'WiFi', 'Safe']);
    });
});
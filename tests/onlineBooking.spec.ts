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
    
    test('banner disappears after button is clicked', async ({ page }) => {
        const ctaButton = page.locator('button', {hasText: "Let me hack!"});
        
        await ctaButton.click();
        
        await expect(page.locator('#collapseBanner')).not.toBeVisible();
    });
});

test.describe('room tests', () => {
    
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
    
    test('calendar is displayed once boook button is clicked', async ({ page }) => {
        const bookBtn = page.locator('button', {hasText: "Book this room"});
        const calendar = page.locator('.col-sm-6 .rbc-calendar');
        
        await bookBtn.click();
        
        await expect(calendar).toBeVisible();
    });
    
    test('correct month & year are displayed in calendar', async ({ page }) => {
        const bookBtn = page.locator('button', {hasText: "Book this room"});
        const month = page.locator('.col-sm-6 .rbc-calendar .rbc-toolbar-label');
        const date = new Date();
        const currentMonth = date.toLocaleString('en-us', {month: 'long'}) + " " + date.toLocaleString('en-us', {year: 'numeric'});
        
        await bookBtn.click();
        
        await expect(month).toBeVisible();
        await expect(month).toContainText(currentMonth);
    })
    
    test('correct fields are displayed in booking form', async ({ page }) => {
        const bookBtn = page.locator('button', {hasText: "Book this room"});
        const firstname = page.locator('[name~=firstname]');
        const lastname = page.locator('[name~=lastname]');
        const email = page.locator('[name~=email]');
        const phone = page.locator('[name~=phone]');
        
        await bookBtn.click();
        
        await expect(firstname).toBeVisible();
        await expect(firstname).toHaveAttribute('placeholder', 'Firstname');
        await expect(lastname).toBeVisible();
        await expect(lastname).toHaveAttribute('placeholder', 'Lastname');
        await expect(email).toBeVisible();
        await expect(email).toHaveAttribute('placeholder', 'Email');
        await expect(phone).toBeVisible();
        await expect(phone).toHaveAttribute('placeholder', 'Phone');
    })
});
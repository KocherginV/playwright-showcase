import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://automationintesting.online/#/');
})

test.describe('Banner tests', () => {

    test('Should display banner', async ({ page }) => {
        await expect(page.locator('#collapseBanner')).toBeVisible();
    });

    test('Should display four columns', async ({ page }) => {
        const column = page.locator('.jumbotron > .row > .col-sm-3');

        await expect(column).toHaveCount(4);
    });

    test('CTA button is displayed', async ({ page }) => {
        const ctaButton = page.locator('button', {hasText: "Let me hack!"});

        await expect(ctaButton).toBeVisible();
    });

    test('Banner disappears after button is clicked', async ({ page }) => {
        const ctaButton = page.locator('button', {hasText: "Let me hack!"});

        await ctaButton.click();

        await expect(page.locator('#collapseBanner')).not.toBeVisible();
    });
});

test.describe('Room tests', () => {

    test('Single room is displayed', async ({ page }) => {
        const roomConatiner = page.locator('div.row.hotel-room-info').nth(0);

        await expect(roomConatiner).toBeVisible();
    });

    test('Three amendities are displayed inside of the room', async ({ page }) => {
        const amendities = page.locator('div.row.hotel-room-info > .col-sm-7 ul li');

        await expect(amendities).toHaveCount(3);
    });

    test('Correct amendities are displayed inside of the room', async ({ page }) => {
        const amendities = page.locator('div.row.hotel-room-info > .col-sm-7 ul li');

        await expect(amendities).toContainText(['TV', 'WiFi', 'Safe']);
    });

    test('Calendar is displayed once boook button is clicked', async ({ page }) => {
        const bookBtn = page.locator('button', {hasText: "Book this room"});
        const calendar = page.locator('.col-sm-6 .rbc-calendar');

        await bookBtn.click();

        await expect(calendar).toBeVisible();
    });

    test('Correct month & year are displayed in calendar', async ({ page }) => {
        const bookBtn = page.locator('button', {hasText: "Book this room"});
        const month = page.locator('.col-sm-6 .rbc-calendar .rbc-toolbar-label');
        const date = new Date();
        const currentMonth = date.toLocaleString('en-us', {month: 'long'}) + " " + date.toLocaleString('en-us', {year: 'numeric'});

        await bookBtn.click();

        await expect(month).toBeVisible();
        await expect(month).toContainText(currentMonth);
    });

    test('Correct fields are displayed in booking form', async ({ page }) => {
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
    });
});

test.describe('Contact form tests', () => {

    test('Contact form is displayed', async ({ page }) => {
        const nameField = page.locator('#name');
        const emailField = page.locator('#email');
        const phoneField = page.locator('#phone');
        const subjectField = page.locator('#subject');
        const messageTextArea = page.locator('#description');
        const submitBtn = page.locator('#submitContact');

        await expect(nameField).toBeVisible();
        await expect(nameField).toHaveAttribute('placeholder', 'Name');
        await expect(nameField).toBeEditable();

        await expect(emailField).toBeVisible();
        await expect(emailField).toHaveAttribute('placeholder', 'Email');
        await expect(emailField).toBeEditable();

        await expect(phoneField).toBeVisible();
        await expect(phoneField).toHaveAttribute('placeholder', 'Phone');
        await expect(phoneField).toBeEditable();

        await expect(subjectField).toBeVisible();
        await expect(subjectField).toHaveAttribute('placeholder', 'Subject');
        await expect(subjectField).toBeEditable();

        await expect(messageTextArea).toBeVisible();
        await expect(messageTextArea).toBeEditable();

        await expect(submitBtn).toBeVisible();
        await expect(submitBtn).not.toBeDisabled();
    });

    test('Contact info displayed', async ({ page }) => {
        const legalName = page.locator('.col-sm-5 p').nth(0);
        const address = page.locator('.col-sm-5 p').nth(1);
        const phoneNumber = page.locator('.col-sm-5 p').nth(2);
        const contactEmail = page.locator('.col-sm-5 p').nth(3);

        await expect(legalName).toBeVisible();
        await expect(legalName).toHaveText('Shady Meadows B&B');

        await expect(address).toBeVisible();
        await expect(address).toHaveText('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S');

        await expect(phoneNumber).toBeVisible();
        await expect(phoneNumber).toHaveText('012345678901');

        await expect(contactEmail).toBeVisible();
        await expect(contactEmail).toHaveText('fake@fakeemail.com');
    })
})

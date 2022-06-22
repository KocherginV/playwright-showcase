import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';


test.beforeEach(async ({ page }) => {
    await page.goto('https://automationintesting.online/#/');
})

test.describe('Banner tests', () => {

    test('Should display banner', async ({ page }) => {
        const homepage = new Homepage(page);

        await expect(homepage.banner).toBeVisible();
    });

    test('Should display four columns', async ({ page }) => {
        const homepage = new Homepage(page);

        await expect(homepage.column).toHaveCount(4);
    });

    test('CTA button is displayed', async ({ page }) => {
        const homepage = new Homepage(page);

        await expect(homepage.ctaButton).toBeVisible();
    });

    test('Banner disappears after button is clicked', async ({ page }) => {
        const homepage = new Homepage(page);

        await homepage.ctaButton.click();

        await expect(homepage.banner).not.toBeVisible();
    });
});

test.describe('Room tests', () => {

    test('Single room is displayed', async ({ page }) => {
        const homepage = new Homepage(page);

        await expect(homepage.roomContainer).toBeVisible();
    });

    test('Three amendities are displayed inside of the room', async ({ page }) => {
        const homepage = new Homepage(page);

        await expect(homepage.amendities).toHaveCount(3);
    });

    test('Correct amendities are displayed inside of the room', async ({ page }) => {
        const homepage = new Homepage(page);

        await expect(homepage.amendities).toContainText(['TV', 'WiFi', 'Safe']);
    });

    test('Calendar is displayed once boook button is clicked', async ({ page }) => {
        const homepage = new Homepage(page);

        await homepage.bookButton.click();

        await expect(homepage.calendar).toBeVisible();
    });

    test('Correct month & year are displayed in calendar', async ({ page }) => {
        const homepage = new Homepage(page);

        await homepage.bookButton.click();

        await expect(homepage.month).toBeVisible();
        await expect(homepage.month).toContainText(homepage.currentMonth.toString());
    });

    test('Correct fields are displayed in booking form', async ({ page }) => {
        const homepage = new Homepage(page);

        await homepage.bookButton.click();

        await expect(homepage.firstName).toBeVisible();
        await expect(homepage.firstName).toHaveAttribute('placeholder', 'Firstname');

        await expect(homepage.lastName).toBeVisible();
        await expect(homepage.lastName).toHaveAttribute('placeholder', 'Lastname');

        await expect(homepage.email).toBeVisible();
        await expect(homepage.email).toHaveAttribute('placeholder', 'Email');

        await expect(homepage.phone).toBeVisible();
        await expect(homepage.phone).toHaveAttribute('placeholder', 'Phone');
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
    });
})

test.describe('Footer tests', () => {

    test('Cookie policy link is displayed', async ({page}) => {
        const cookiePolicyLink = page.locator('a[href*="cookie"]');

        await expect(cookiePolicyLink).toBeVisible();
        await expect(cookiePolicyLink).toHaveText('Cookie-Policy');
    });

    test('Privacy policy link is displayed', async ({page}) => {
        const privacyPolicyLink = page.locator('a[href*="privacy"]');

        await expect(privacyPolicyLink).toBeVisible();
        await expect(privacyPolicyLink).toHaveText('Privacy-Policy');
    });

    test('Admin panel link is displayed', async ({page}) => {
        const adminLink = page.locator('.text-muted a[href*="admin"]');

        await expect(adminLink).toBeVisible();
        await expect(adminLink).toHaveText('Admin panel');
    });

    test('Cookie policy link leads to cookie policy page', async ({page}) => {
        const cookiePolicyLink = page.locator('a[href*="cookie"]');

        await cookiePolicyLink.click();
        await expect(page).toHaveURL('https://automationintesting.online/#/cookie');
    });

    test('Privacy policy link leads to privacy policy page', async ({page}) => {
        const privacyPolicyLink = page.locator('a[href*="privacy"]');

        await privacyPolicyLink.click();
        await expect(page).toHaveURL('https://automationintesting.online/#/privacy');
    });

    test('Admin panel link leads to admin page', async ({page}) => {
        const adminLink = page.locator('.text-muted a[href*="admin"]');
        const usernameField = page.locator('#username');
        const passwordField = page.locator('#password');
        const loginButton = page.locator('#doLogin');

        await adminLink.click();
        await expect(page).toHaveURL('https://automationintesting.online/#/admin');

        await expect(usernameField).toBeVisible();
        await expect(usernameField).toBeEditable();
        await expect(usernameField).toHaveAttribute('placeholder', 'Username');

        await expect(passwordField).toBeVisible();
        await expect(passwordField).toBeEditable();
        await expect(passwordField).toHaveAttribute('placeholder', 'Password');

        await expect(loginButton).toBeVisible();
        await expect(loginButton).not.toBeDisabled();
        await expect(loginButton).toHaveText('Login');
    });

})

import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import testData from '../helpers/testData.json';
import { Helper } from '../helpers/helper';
import { AdminHomePage } from '../pages/adminHomePage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationintesting.online/#/');
});

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

  test('Booking form can be closed', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.bookButton.click();

    await expect(homepage.calendar).toBeVisible();
    await expect(homepage.bookButton).not.toBeVisible();
    await expect(homepage.confirmBookingButton).toBeVisible();
    await expect(homepage.cancelBookingButton).toBeVisible();

    await homepage.cancelBookingButton.click();
    await expect(homepage.confirmBookingButton).not.toBeVisible();
    await expect(homepage.cancelBookingButton).not.toBeVisible();
    await expect(homepage.calendar).not.toBeVisible();
    await expect(homepage.bookButton).toBeVisible();
  });
});

test.describe('Contact form tests', () => {
  test('Contact form is displayed', async ({ page }) => {
    const homepage = new Homepage(page);

    await expect(homepage.nameField).toBeVisible();
    await expect(homepage.nameField).toHaveAttribute('placeholder', 'Name');
    await expect(homepage.nameField).toBeEditable();

    await expect(homepage.emailField).toBeVisible();
    await expect(homepage.emailField).toHaveAttribute('placeholder', 'Email');
    await expect(homepage.emailField).toBeEditable();

    await expect(homepage.phoneField).toBeVisible();
    await expect(homepage.phoneField).toHaveAttribute('placeholder', 'Phone');
    await expect(homepage.phoneField).toBeEditable();

    await expect(homepage.subjectField).toBeVisible();
    await expect(homepage.subjectField).toHaveAttribute('placeholder', 'Subject');
    await expect(homepage.subjectField).toBeEditable();

    await expect(homepage.messageTextArea).toBeVisible();
    await expect(homepage.messageTextArea).toBeEditable();

    await expect(homepage.submitButton).toBeVisible();
    await expect(homepage.submitButton).not.toBeDisabled();
  });

  test('Contact info displayed', async ({ page }) => {
    const homepage = new Homepage(page);

    await expect(homepage.legalName).toBeVisible();
    await expect(homepage.legalName).toHaveText('Shady Meadows B&B');

    await expect(homepage.address).toBeVisible();
    await expect(homepage.address).toHaveText('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S');

    await expect(homepage.phoneNumber).toBeVisible();
    await expect(homepage.phoneNumber).toHaveText('012345678901');

    await expect(homepage.contactEmail).toBeVisible();
    await expect(homepage.contactEmail).toHaveText('fake@fakeemail.com');
  });

  test('Submit message', async ({ page }) => {
    const homepage = new Homepage(page);
    const helper = new Helper(page);
    const adminHomePage = new AdminHomePage(page);

    await homepage.nameField.type(testData.message.name);
    await homepage.emailField.type(testData.message.email);
    await homepage.phoneField.type(testData.message.phone);
    await homepage.subjectField.type(testData.message.subject);
    await homepage.messageTextArea.type(testData.message.body);
    await homepage.submitButton.click();

    await page.goto('https://automationintesting.online/#/admin');
    await helper.login(testData.credentials.valid.username, testData.credentials.valid.password);

    await adminHomePage.messagesLink.click();
    await adminHomePage.message(1).click();
    await expect(adminHomePage.messageModal).toBeVisible();
    await expect(adminHomePage.detailedMessageAuthor).toHaveText(`From: ${testData.message.name}`);
    await expect(adminHomePage.detailedMessageEmail).toHaveText(`Email: ${testData.message.email}`);
    await expect(adminHomePage.detailedMessageSubject).toHaveText(testData.message.subject);
    await expect(adminHomePage.detailedMessageText).toHaveText(testData.message.body);
    await expect(adminHomePage.detailedMessagePhone).toHaveText(`Phone: ${testData.message.phone}`);
    await adminHomePage.closeMessageModalButton.click();
    await adminHomePage.deleteMessageButton(1).click();
    await expect(adminHomePage.message(1)).not.toBeVisible();
  });
});

test.describe('Footer tests', () => {
  test('Cookie policy link is displayed', async ({ page }) => {
    const homepage = new Homepage(page);

    await expect(homepage.cookiePolicyLink).toBeVisible();
    await expect(homepage.cookiePolicyLink).toHaveText('Cookie-Policy');
  });

  test('Privacy policy link is displayed', async ({ page }) => {
    const homepage = new Homepage(page);

    await expect(homepage.privacyPolicyLink).toBeVisible();
    await expect(homepage.privacyPolicyLink).toHaveText('Privacy-Policy');
  });

  test('Admin panel link is displayed', async ({ page }) => {
    const homepage = new Homepage(page);

    await expect(homepage.adminLink).toBeVisible();
    await expect(homepage.adminLink).toHaveText('Admin panel');
  });

  test('Cookie policy link leads to cookie policy page', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.cookiePolicyLink.click();
    await expect(page).toHaveURL('https://automationintesting.online/#/cookie');
  });

  test('Privacy policy link leads to privacy policy page', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.privacyPolicyLink.click();
    await expect(page).toHaveURL('https://automationintesting.online/#/privacy');
  });

  test('Admin panel link leads to admin page', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.adminLink.click();
    await expect(page).toHaveURL('https://automationintesting.online/#/admin');

    await expect(homepage.usernameField).toBeVisible();
    await expect(homepage.usernameField).toBeEditable();
    await expect(homepage.usernameField).toHaveAttribute('placeholder', 'Username');

    await expect(homepage.passwordField).toBeVisible();
    await expect(homepage.passwordField).toBeEditable();
    await expect(homepage.passwordField).toHaveAttribute('placeholder', 'Password');

    await expect(homepage.loginButton).toBeVisible();
    await expect(homepage.loginButton).not.toBeDisabled();
    await expect(homepage.loginButton).toHaveText('Login');
  });
});

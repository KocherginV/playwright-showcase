import { Locator, Page } from "@playwright/test";

export class Homepage {
    readonly page: Page;
    readonly banner: Locator;
    readonly column: Locator;
    readonly ctaButton: Locator;
    readonly roomContainer: Locator;
    readonly amendities: Locator;
    readonly bookButton: Locator;
    readonly calendar: Locator;
    readonly month: Locator;
    readonly currentMonth: String;
    readonly date: Date;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly phone: Locator;
    readonly email: Locator;

    constructor(page: Page) {
        this.page = page;
        this.banner = page.locator('#collapseBanner');
        this.column = page.locator('.jumbotron > .row > .col-sm-3');
        this.ctaButton = page.locator('button', {hasText: "Let me hack!"});
        this.roomContainer = page.locator('div.row.hotel-room-info').nth(0);
        this.amendities = page.locator('div.row.hotel-room-info > .col-sm-7 ul li');
        this.bookButton = page.locator('button', {hasText: "Book this room"});
        this.calendar = page.locator('.col-sm-6 .rbc-calendar');
        this.month = page.locator('.col-sm-6 .rbc-calendar .rbc-toolbar-label');
        this.date = new Date();
        this.currentMonth = this.date.toLocaleString('en-us', {month: 'long'}) + " " + this.date.toLocaleString('en-us', {year: 'numeric'});
        this.firstName = page.locator('[name~=firstname]');
        this.lastName =  page.locator('[name~=lastname]');
        this.phone = page.locator('[name~=phone]');
        this.email = page.locator('[name~=email]');
    }
}

import {Locator, Page} from '@playwright/test';

class ContactPage {
    private page: Page;
    name: Locator;
    email: Locator;
    phone: Locator;
    message: Locator;
    submitBtn: Locator;
    alertText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('.contact-name input');
        this.email = page.locator('.contact-email input');
        this.phone = page.locator('.contact-phone input');
        this.message = page.locator('.contact-message textarea');
        this.submitBtn = page.locator('button[type=submit]');
        this.alertText = page.locator('div[role="alert"]');
    }

    async navigate() {
        await this.page.goto('/');
        await this.page.click('//nav[@id="zak-primary-nav"]//a[text()="Contact"]');
        await this.page.waitForLoadState();
    }

    async submitForm(name: string, email: string, phone: string, message: string) {
        await this.name.fill(name);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.message.fill(message);
        await this.submitBtn.click();
    }
}

export default ContactPage;
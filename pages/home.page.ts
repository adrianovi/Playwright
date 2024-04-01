import {Page, Locator} from '@playwright/test';

class HomePage {
    page: Page;
    getStartedBtn: Locator;
    headingText: Locator;
    homeText: Locator;
    homeLink: Locator;
    searchIcon: Locator;
    navLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedBtn = page.locator('#get-started');
        this.headingText = page.locator('text=think different. Make different.');
        this.homeText = page.locator('#zak-primary-nav >> text=Home');
        this.homeLink = page.locator('#zak-primary-nav:has-text("Home")');
        this.searchIcon = page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]');
        this.navLinks = page.locator('#zak-primary-menu li[id*=menu]');
    }

    async navigate() {
        await this.page.goto('/');
    }

    getNavLiniksText() {
        return this.navLinks.allTextContents();
    }
}

export default HomePage;
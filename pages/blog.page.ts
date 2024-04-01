import {Locator, Page} from '@playwright/test';

class BlogPage {
    private page: Page;
    links: Locator;

    constructor(page: Page) {
        this.page = page;
        this.links = page.locator('#recent-posts-3 li a');
    }

    async navigate() {
        await this.page.goto('/');
        await this.page.click('//nav[@id="zak-primary-nav"]//a[text()="Blog"]');
        await this.page.waitForLoadState();
    }
}

export default BlogPage;
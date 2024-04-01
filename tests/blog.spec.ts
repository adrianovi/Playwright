import {test, expect} from '@playwright/test';
import BlogPage from '../pages/blog.page';

test.describe('Blog', () => {
    let blogPage: BlogPage;

    test('Blog', async ({ page }) => {
        blogPage = new BlogPage(page);
        await blogPage.navigate();
        
        expect(await blogPage.links.count()).toEqual(5);
        (await blogPage.links.allTextContents()).forEach(linkText =>
            {
                expect(linkText.length).toBeGreaterThan(10);
            });
    });
})

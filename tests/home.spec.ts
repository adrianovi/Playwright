import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    });
    
    test('Open HomePage and verify title', async ({ page }) => {
        // verify title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    });
    
    test('Open About page and verify title', async ({ page }) => {
        await page.click('//nav[@id="zak-primary-nav"]//a[text()="About"]');
        await page.waitForLoadState();
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    });

    test('Click get started button using CSS selector', async ({ page }) => {
        await expect(page).not.toHaveURL(/.*#get-started/);
        // click get started button
        await homePage.getStartedBtn.click();

        // verify url has #get-started
        await expect(page).toHaveURL(/.*#get-started/);
    });

    test('Verify heading text is visible using text selector', async () => {
        // verify heading text is visible
        // eslint-disable-next-line playwright/no-useless-not
        await expect(homePage.headingText).not.toBeHidden();
        await expect(homePage.headingText).toBeVisible();
    });
    
    test('Verify home link is enabled using text and css selector', async () => {
        // const homeText = page.locator('#zak-primary-nav >> text=Home');
        // const homeText = page.locator('#zak-primary-nav:has-text("Home")');
        await expect(homePage.homeText).toBeEnabled();
    });
    
    test('Verify search icon is visile using Xpath', async () => {
        await expect(homePage.searchIcon).toBeVisible();    
    });
    
    test('Verify text of all nav links', async () => {
        const expectedLinks = ['Home', 'About', 'Shop', 'Blog', 'Contact', 'My account'];

        const blogLink = homePage.navLinks.nth(3);

        for (const element of await homePage.navLinks.elementHandles()) {
            console.log(await element.textContent());
        }
        
        expect(await homePage.getNavLiniksText()).toEqual(expectedLinks);  
        await expect(blogLink).toHaveText(expectedLinks[3]);
    });
});

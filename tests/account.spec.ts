import {test, expect} from '@playwright/test';

test.describe('My Account', () => {
    test('Access orders', async ({page}) => {
        await page.goto('/my-account');
        await page.click('li a[href*="orders"]');
        await expect(page).toHaveURL(/.*orders/);
    });

    test('Access downloads', async ({page}) => {
        await page.goto('/my-account');
        await page.click('li a[href*="downloads"]');
        await expect(page).toHaveURL(/.*downloads/);
    });
});

test.describe('Account Page', () => {
    test.use({storageState: 'notLoggedInState.json'});

    test('Verify login and register is visible', async ({page}) => {
        await page.goto('/my-account');
        await expect(page.locator('button[name="login"]')).toBeVisible();
        await expect(page.locator('button[name="register"]')).toBeVisible();
    });
});
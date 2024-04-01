import { test, expect } from '@playwright/test';
import CartPage from '../pages/cart.page';
import path from 'path';

test.describe('Upload File', () => {
    let cartPage: CartPage;
    const fileName = ['WorkShopAppium.txt', 'EDIT.gif'];

    for (const name of fileName) {
        test(`should upload a ${name} file`, async ({ page }) => {
            cartPage = new CartPage(page);
            
            // Open ulr
            await page.goto('https://practice.sdetunicorns.com/cart/');
    
            // Store test file path
            const filePath = path.join(__dirname, `../data/${name}`);
    
            // Upload the file
            cartPage.uploadComponent().uploadFile(filePath);
    
            // Harcoded sleep - WRONG WAY
            // await page.waitForTimeout(5000);
            
            // Wait for condition
            // await page.locator('#wfu_messageblock_header_1_label_1').waitFor({state: 'visible', timeout: 10000});
    
            // Assert the file is uploaded
            await expect(cartPage.uploadComponent().successTxt)
                .toContainText('uploaded successfully', {timeout: 10000});
        });
    }

    test('should upload a test file on a hidden input field', async ({ page }) => {
        // Open ulr
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // Store test file path
        const filePath = path.join(__dirname, '../data/WorkShopAppium.txt');

        // DOM manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1');
            if (selector) {
                selector.className = '';
            }
        });

        // Upload the file
        await page.setInputFiles('input#upfile_1', filePath); // DOM manipulation if error is thrown here

        // Click submit button
        await page.locator('#upload_1').click();

        // Assert the file is uploaded
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText('uploaded successfully');
    });
})

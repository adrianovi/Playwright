import { test, expect } from '@playwright/test';
import ContactPage from '../pages/contact.page';

test.describe('Contact', () => {
    let contactPage: ContactPage;
    
    test('Exercise 1', async ({ page }) => {
        contactPage = new ContactPage(page);
        await contactPage.navigate();

        await contactPage.submitForm('Joe', 'joe@email.com', '123456', 'lorep ipsum');

        // open inspector
        // await page.pause();

        // add soft assertion
        // await expect.soft(page.locator('.contact-message textarea')).toHaveText('This is a message');

        // verify all soft assertions pass
        // expect(test.info().errors.length).toBeLessThan(1);
        
        await expect(contactPage.alertText).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
    });
});
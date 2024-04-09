import { test, expect, APIResponse } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import apiController from '../controller/api.controller';
// import { faker } from '@faker-js/faker';

test.describe('Contact', () => {
    let contactPage: ContactPage;
    let randomPerson: APIResponse;

    test.beforeAll(async () => {
        await apiController.init();
        randomPerson = await apiController.getUsers();
        console.log(randomPerson);

        const postResponseBody = await apiController.createUserTodo();
        console.log(postResponseBody);
    });
    
    
    test('Exercise with API', async ({ page }) => {
        contactPage = new ContactPage(page);
        await contactPage.navigate();

        await contactPage.submitForm(
            randomPerson['name'],
            randomPerson['email'],
            randomPerson['phone'],
            randomPerson['website']);
        //await contactPage.submitForm(faker.person.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraph(2));

        // open inspector
        // await page.pause();

        // add soft assertion
        // await expect.soft(page.locator('.contact-message textarea')).toHaveText('This is a message');

        // verify all soft assertions pass
        // expect(test.info().errors.length).toBeLessThan(1);
        
        await expect(contactPage.alertText).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
    });
});
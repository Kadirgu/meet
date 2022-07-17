import puppeteer from "puppeteer";

describe('show/hide an event details', () => {
    let browser;
    let page;
    jest.setTimeout(60000);

    beforeAll(async () => {
            browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/meet');
        await page.waitForSelector('.event');
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeNull();
    });

    afterAll(() => {
        browser.close();
    });
});
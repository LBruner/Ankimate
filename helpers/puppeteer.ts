import puppeteer from "puppeteer";

export const getPuppeteerPage = async () => {
    const browser = await puppeteer.launch();
    return await browser.newPage()
}

require('dotenv').config();

const puppeteer= require('puppeteer');
const datastudioUrl = process.env.DATA_STUDIO_URL;

getDataStudioScreenshot()

function getDataStudioScreenshot() {
  (async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(datastudioUrl, {
    waitUntil: 'networkidle2'
    });
    await page.setViewport({ width: 1920, height: 1040 });
    await page.screenshot({
          path: 'brief.png',
          clip: {
              x: 350,
              y: 80,
              width: 1225,
              height: 1200
          },
          omitBackground: true
    });
    await browser.close();
  })();
}

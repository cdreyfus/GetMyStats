require('dotenv').config();

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: false }).then(async browser => {
  const page = await browser.newPage();
  await page.goto("https://console.firebase.google.com/u/0/");

  await page.waitForSelector('input[type="email"]')
  await page.type('input[type="email"]', process.env.GOOGLE_USER)
  await page.click('#identifierNext')

  await page.waitForSelector('input[type="password"]', { visible: true })
  await page.type('input[type="password"]', process.env.GOOGLE_PWD)

  await page.waitForSelector('#passwordNext', { visible: true })
  await page.click('#passwordNext')

  await page.waitForSelector('.recent-projects-header', { visible: true })

  const appAdminPackage = process.env.APP_ADMIN
  const url = "https://console.firebase.google.com/u/0/project/prod-b16ce/crashlytics/app/".concat(appAdminPackage).concat("/issues?state=open&time=last-seven-days&type=crash");
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector("g.crashes > rect:nth-child(7)")
  const result = await page.evaluate(() => {
    let crashFreePercent = document.querySelector(".crash-free-users > .fire-stat > .ng-star-inserted > .value-wrapper > span").innerText
    let usersAffected = document.querySelector(".stat.secondary > .fire-stat > .ng-star-inserted > .value-wrapper > span").innerText

    return { crashFreePercent, usersAffected }
  })

  console.log(result);

  await browser.close();
})
import dotenv from 'dotenv';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer-extra';

dotenv.config();
puppeteer.use(StealthPlugin())

export async function getStats() {
  let stats = puppeteer.launch({ headless: false }).then(async browser => {
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

    let map = new Map();
    var appsArray = [process.env.APP_MB, process.env.APP_MAIN, process.env.APP_CONTROL, process.env.APP_REGUL, process.env.APP_ADMIN]
    for (var app of appsArray) {
      const url = "https://console.firebase.google.com/u/0/project/prod-b16ce/crashlytics/app/".concat(app).concat("/issues?state=open&time=last-seven-days&type=crash");
      
      await page.goto(url);
      await page.waitForSelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.crash-free-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > fire-stat > div > div:nth-child(3) > div > span", { visible: true })
      await page.waitForSelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.top-issues-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > div > fire-stat.stat.secondary > div > div:nth-child(2) > div.value-wrapper > span", { visible: true })
      
      const result = await page.evaluate(() => {
        let crashFreePercent = document.querySelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.crash-free-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > fire-stat > div > div:nth-child(3) > div > span").innerText
        let usersAffected = document.querySelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.top-issues-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > div > fire-stat.stat.secondary > div > div:nth-child(2) > div.value-wrapper > span").innerText
        return { crashFreePercent, usersAffected }
      })
      map.set(app, result);
    }
    await browser.close();
    // console.log(map)
    return map
  })
  return stats
}   

import dotenv from 'dotenv';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer-extra';

dotenv.config();
puppeteer.use(StealthPlugin())

const getDateMinusDays = (minusDays) => {
  var date = new Date();
  date.setDate(date.getDate() - minusDays);
  return date;
}

export async function getStats() {
  const browser = await puppeteer.launch({ headless: false });
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

  var appsArray = [process.env.APP_MB, process.env.APP_MAIN, process.env.APP_CONTROL, process.env.APP_REGUL, process.env.APP_ADMIN];

<<<<<<< HEAD
  const results = appsArray.reduce(async (prevMapPromise, app) => {
=======
  const results = await appsArray.reduce(async (prevMapPromise, app) => {
>>>>>>> 213f8ba... foobar
    const prevMap = await prevMapPromise;

    const urlCrashlytics = "https://console.firebase.google.com/u/0/project/prod-b16ce/crashlytics/app/".concat(app);
    const urlLastSevenDays = urlCrashlytics.concat("/issues?state=open&time=last-seven-days&type=crash");

    await page.goto(urlLastSevenDays);
    await page.waitForSelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.crash-free-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > fire-stat > div > div:nth-child(3) > div > span", { visible: true })
    await page.waitForSelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.top-issues-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > div > fire-stat.stat.secondary > div > div:nth-child(2) > div.value-wrapper > span", { visible: true })

    let crashFreePercent = await page.evaluate(() => document.querySelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.crash-free-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > fire-stat > div > div:nth-child(3) > div > span").textContent)
    let usersAffected = await page.evaluate(() => document.querySelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.top-issues-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > div > fire-stat.stat.secondary > div > div:nth-child(2) > div.value-wrapper > span").textContent)

    var lastWeekMonday = getDateMinusDays(14)
    var lastWeekSunday = getDateMinusDays(8)

    const urlCrashlyticsLastWeek = urlCrashlytics.concat("/issues?state=open&time=" + lastWeekMonday + ":" + lastWeekSunday + "&type=crash")

    await page.goto(urlCrashlyticsLastWeek);
    await page.waitForSelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.crash-free-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > fire-stat > div > div:nth-child(3) > div > span", { visible: true })

    let crashFreePercentPreviousWeek = await page.evaluate(() => document.querySelector("#main > ng-transclude > div > div > div > c9s-issues > c9s-issues-index > div > div > div > c9s-issues-metrics > div > mat-card.crash-free-container.mat-card > div.c9s-issues-scalars.ng-star-inserted > fire-stat > div > div:nth-child(3) > div > span").textContent)

    prevMap.set(app, { crashFreePercent, usersAffected, crashFreePercentPreviousWeek });
    return prevMap;
  }, Promise.resolve(new Map()))

  await browser.close();
  return results
}



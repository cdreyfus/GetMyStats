
function getGlobalInfoByApp(appName){
    const url = "https://console.firebase.google.com/u/0/project/prod-b16ce/crashlytics/app/android:com.sncf.androidenterprise.internal".concat(appName).concat("/issues?state=open&time=last-seven-days&type=crash");
    console.log(url);
  
    const appResult = async browser => {
      await page.goto(url, {
      waitUntil: 'networkidle2'
      });
  
      const result = await page.evaluate(() => {
        let crashFreePercent = document.querySelector(".crash-free-users > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > span:nth-child(1)").innerText
        let usersAffected = document.querySelector("fire-stat.stat:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").innerText
        return { crashFreePercent, usersAffected }
      })
      console.log(result);
      
    }
    console.log(appResult);
    return appResult
  }
  
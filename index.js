import { getDataStudioScreenshot } from './datastudio.js';
import { getStats } from './crashlytics.js';

//getDataStudioScreenshot()

getStats().then(map => {
    console.log(map)
    // for (app in map) {
    //     const diffCrash = resultLastWeek.get('crashFreePercent') - previousResults.get('crashFreePercentPreviousWeek')
    //     console.log(app + ": " + diffCash);
    // }
});

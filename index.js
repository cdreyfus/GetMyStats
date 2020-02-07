import { getDataStudioScreenshot } from './datastudio.js';
import { getStats } from './crashlytics.js';

//getDataStudioScreenshot()

getStats().then(map => console.log(map));

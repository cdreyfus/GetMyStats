import { getDataStudioScreenshot } from './datastudio.js';
import { getStats } from './crashlytics.js';

//getDataStudioScreenshot()

const statsMap = getStats()
console.log(statsMap)

/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const fs = require('fs');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/loadfilter?') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    fs.writeFileSync('Products_dedicated.json', JSON.stringify(products));
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

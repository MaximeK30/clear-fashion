/* eslint-disable no-console, no-process-exit */
const adressbrand = require('./sources/adressbrand');
const fs = require('fs');

async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection?p=2') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adressbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    fs.writeFileSync('Products_adress.json', JSON.stringify(products));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

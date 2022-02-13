/* eslint-disable no-console, no-process-exit */
const montlimartbrand = require('./sources/montlimartbrand');
const fs = require('fs');


async function sandbox (eshop = 'https://www.montlimart.com/polos-t-shirts.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    

    const products = await montlimartbrand.scrape(eshop);

    



    //enlever les cartes cadeaux et les undefined (bannieres)

    

    products.forEach((element, index) => {
      if (element.name === 'Carte Cadeau Montlimart' || typeof(element.name) === "undefined" ) {
        products.splice(index,1);
      }
    });


    //Pour enregistrer les dates mais problème avec local storage car coté server d'apres ce que j'ai compris 

    //const  product_Montlimard = new Set(productList_Montlimart);

    //localStorage.setItem=("montlimard_products" ,JSON.stringify(product_Montlimard))

    

    
    console.log('done');
    fs.writeFileSync('Products_Montlimard.json', JSON.stringify(products));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

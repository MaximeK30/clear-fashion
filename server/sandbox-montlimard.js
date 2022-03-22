/* eslint-disable no-console, no-process-exit */
const montlimartbrand = require('./sources/montlimartbrand');
const fs = require('fs');
require("dotenv").config();


async function sandbox (eshop = `https://www.montlimart.com/polos-t-shirts.html?limit=all`) {
  try {
    
    
  
    let lien=eshop+'/?limit=all';
    final_products=[];
    console.log(`🕵️‍♀️  browsing ${lien} source`);
    const products = await montlimartbrand.scrape(lien);
    final_products=products.flat();
  
    

    const { MongoClient } = require('mongodb');
    uri=process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    
      
    await client.connect();
    const database = client.db("ClearFashion");
    const foods = database.collection("Product_final");
    // create an array of documents to insert
    const docs = final_products;
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await foods.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  
    await client.close();
      
    
    

    


    
    fs.writeFileSync('Products_Montlimards.json', JSON.stringify(final_products));
    process.exit(0);
    

    

    
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

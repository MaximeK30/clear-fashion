/* eslint-disable no-console, no-process-exit */
const adressbrand = require('./sources/adressbrand');
const fs = require('fs');
require("dotenv").config();

async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection?p=2') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adressbrand.scrape(eshop);

    console.log(products);
    product=[{"brand":"adresse","name":"Pull ","price":470000,"link":"https://adresse.paris/petits.html","photo":"https://adresse.paris/31197-home_default/pull.jpg","date":"2022-3-20","_id":"a105"}]
    console.log('done');
    fs.writeFileSync('Products_adress.json', JSON.stringify(products));

    const { MongoClient } = require('mongodb');
    uri=process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    
      
    await client.connect();
    const database = client.db("ClearFashion");
    const foods = database.collection("Product_final");
    // create an array of documents to insert
    const docs = products;
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await foods.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  
    await client.close();
      

    




    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

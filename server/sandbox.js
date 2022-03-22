/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const fs = require('fs');
require("dotenv").config();

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/loadfilter?') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    fs.writeFileSync('Products_dedicated.json', JSON.stringify(products));
    console.log('done');

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

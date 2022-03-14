const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());
const fs = require('fs');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.gap6f.mongodb.net/ClearFashion?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collection = client.db("ClearFashion").collection("Products");

app.get('/products', (request, response) => {
  client.connect( async (err) => {
    var id =request.params.id;
    console.log("connected")
    const test = await collection.find({}).toArray();
    //console.log(test);
    response.send(test);
    
  });
 
});

app.get('/products/search', (request, response) => {
  client.connect( async (err) => {
    
    let limit = parseInt(request.query.limit) ? parseInt(request.query.limit) : 12;
    let brand = request.query.brand 
    console.log(brand);
    let price = parseFloat(request.query.price);
    const mongoQuery = []
    if (price)
    {
      mongoQuery.push({ $match :{"price": price}});
    }
    if(brand)
    {
      mongoQuery.push({ $match :{"brand": brand}});
    }
    mongoQuery.push({ $sort :{ "price": 1}})
    console.log(price);
    const test = await collection.aggregate(mongoQuery).limit(limit).toArray();

    console.log(test);
    response.send(test);
    
  });
  
});

app.get('/products/:id', (request, response) => {
  client.connect( async (err) => {
    var id =request.params.id;
    console.log("connected")
    const test = await collection.find({"_id":id}).toArray();
    //console.log(test);
    response.send(test);
    
  });
 
});




app.listen(PORT);
client.close();
console.log(`📡 Running on port ${PORT}`);

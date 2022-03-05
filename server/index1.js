//const {MongoClient} = require('mongodb');
//const MONGODB_URI = 'mongodb+srv://root:root@cluster0.gap6f.mongodb.net/products?retryWrites=true&w=majority';
//const MONGODB_DB_NAME = 'clearfashion';
//
//const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
//const db =  client.db(MONGODB_DB_NAME);
//
//console.log(db);

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.gap6f.mongodb.net/ClearFashion?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect( async (err) => {
  const collection = client.db("ClearFashion").collection("Products");
  //console.log(collection)
  
  const test = await collection.find({"age":{$ne:null}},{"age":1}).toArray();
  console.log(test);
  // perform actions on the collection object
  client.close();
});
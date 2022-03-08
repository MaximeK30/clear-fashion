//const {MongoClient} = require('mongodb');
//const MONGODB_URI = 'mongodb+srv://root:root@cluster0.gap6f.mongodb.net/products?retryWrites=true&w=majority';
//const MONGODB_DB_NAME = 'clearfashion';
//
//const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
//const db =  client.db(MONGODB_DB_NAME);
//
//console.log(db);

const { contents } = require('cheerio/lib/api/traversing');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.gap6f.mongodb.net/ClearFashion?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect( async (err) => {
  const collection = client.db("ClearFashion").collection("Products");
  //console.log(collection)
  
  const test = await collection.find({"age":{$ne:null}},{"age":1}).toArray();
  console.log(test);
  // perform actions on the collection object

  
  //console.log(content)
  //const insertResult = await collection.insertMany(content);
  //console.log('Inserted documents =>', insertResult);

  //const insertResult = await collection.insertMany(content);
  //console.log('Inserted documents =>', insertResult);
  client.close()
});


//const content = fs.readFile('Products_adress.json', 'utf8', async function(err, data) {
//  client.connect( async (err) => {
//  const content1 = data;
//  const insertResult = await  client.db("ClearFashion").collection("Products").insertMany(content1);
//  console.log('Inserted documents =>', insertResult);
//  })
//});
//client.close()

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  var fs=require('fs');
  var data=fs.readFileSync('Products_adress.json', 'utf8');
  var words=JSON.parse(data);
  const insertResult = await  client.db("ClearFashion").collection("Products").insertMany(words);
  console.log('Inserted documents =>', insertResult);


  // the following code examples can be pasted here...

  return 'done.';
  
}

  
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


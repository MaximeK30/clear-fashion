/* eslint-disable no-console, no-process-exit */
const montlimartbrand = require('./sources/montlimartbrand');
const fs = require('fs');


async function sandbox (eshop = `https://www.montlimart.com/polos-t-shirts.html?`) {
  try {
    let t=true;
    let i=0;
    let premier= {name:"nnbkj"};
    console.log(premier.name);
    let final_products=[];
    while(t==true)
    {

      i+=1;
      let lien=eshop+'?p='+i;
      
      console.log(`🕵️‍♀️  browsing ${lien} source`);
      const products = await montlimartbrand.scrape(lien);
      products.forEach((element, index) => {
        if (element.name === 'Carte Cadeau Montlimart' || element.name == undefined ) {
          products.splice(index,1);
        }

      });
      console.log(products[1])
      if (premier.name!=products[1].name)
      {
        console.log('done');
        final_products.push(products);
        
        
      }
      else
      {
          t=false;
      }
      

      premier= products[1];
    }


    final_products=final_products.flat();
    
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://root:root@cluster0.gap6f.mongodb.net/ClearFashion?retryWrites=true&writeConcern=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect( async (err) => {
    const collection = client.db("ClearFashion").collection("Pull_Montlimart");
    //console.log(collection)
  
    const result = await collection.insertMany(final_products);
    console.log(result);
    // perform actions on the collection object
    client.close();
    });


    


    
    fs.writeFileSync('Products_Montlimards.json', JSON.stringify(final_products));
    process.exit(0);
    

    

    



    //enlever les cartes cadeaux et les undefined (bannieres)

    

    


    //Pour enregistrer les dates mais problème avec local storage car coté server d'apres ce que j'ai compris 

    //const  product_Montlimard = new Set(productList_Montlimart);

    //localStorage.setItem=("montlimard_products" ,JSON.stringify(product_Montlimard))

    

    
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable


const cheapest_tshirt = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/collections/t-shirts-homme/products/classique-noir-t-shirt-homme?variant=39629285949624'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr/products/le-t-shirt'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/t-shirts-et-polos/3983-t-shirt-ranelagh-1300000259194.html'
}];

console.table(cheapest_tshirt);
console.log(cheapest_tshirt[0]);




/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var length_marketplace=marketplace.length;
console.table(marketplace);
console.log(length_marketplace);



// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

var brands=[];
for ( var i=0 ; i< length_marketplace;i++){

  if (brands.includes(marketplace[i]["brand"]))
  {
    continue;
  }
  else
  {
    brands.push(marketplace[i]["brand"]);
  }
  
}


// Solution avancée
// var brandNames=[]
// marketplace.forEach(obj=> brandNames.push(obj.brand))
// marketplace.forEach(function(entry){ brandNames.push(entrey.brand);}
// const unique BrandNames = new Set(brandNames);


console.table(brands);
console.log(brands.length);



// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable



var sort_byprice=[];
sort_byprice= marketplace.sort(function(a,b){
  return a.price - b.price;
});

console.table(sort_byprice);




// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

var sort_bydate =[];

sort_bydate=marketplace.sort(function(a,b){
  a = a.date.split('-').join('');
  b = b.date.split('-').join('');
  if (a>b) {return 1;}
  else if (a<b) { return -1;}
  else {return 0 ;}
  
});

console.table(sort_bydate);




// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list



function InRange(marketplace){
  var intherange=[]

}
var intherange=[]
marketplace.forEach(function(obj){
   if(obj.price >= 50 && obj.price<=100)
   {
      intherange.push(obj);
   } })

   console.table(intherange);




// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace

// 2. Log the average

var basketprice=0;
var value=marketplace.forEach(function(obj){
  basketprice += obj.price;})
var average= basketprice / length_marketplace;
console.log("Average Basket:");
  console.log(average);



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands


const total_brands = {};
for (i=0;i<brands.length;i++){
  total_brands[brands[i]]=[];
}

marketplace.forEach(function(obj){

  total_brands[obj.brand].push(obj);

});

console.table(total_brands);

console.log( brands[1] + " : "+ total_brands[brands[1]].length);



// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

//sorting=total_brands.forEach(function(a){
//  console.log(a)
//});

//console.log(sorting);
//console.table(sorting);

total_brands[brands[0]]=total_brands[brands[0]].sort(function(a,b){
  return b.price - a.price;
});
total_brands[brands[1]]=total_brands[brands[1]].sort(function(a,b){
  return b.price - a.price;
});total_brands[brands[2]]=total_brands[brands[2]].sort(function(a,b){
  return b.price - a.price;
});total_brands[brands[3]]=total_brands[brands[3]].sort(function(a,b){
  return b.price - a.price;
});
total_brands[brands[4]]=total_brands[brands[4]].sort(function(a,b){
  return b.price - a.price;
});

console.table(total_brands);






// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort





/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products





/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

 
 // COTELE_PARIS.forEach(function(a){
 //   const today = new Date().toJSON().substring(0,10);
 //   //const date = new Date (a.date);
 //   
 //   if(a.released.substring(5,6) == today.substring(5,6) && )
 //   {
 //     if(today.substring(8,9)-a.substring(8,9))
 //     {
 //       Console.log(true);
 //     }
 //   }
 //   else if (a.released.substring(5,6) == today.substring(5,6)-1 ){
 //     if(today.substring(5,6)>=15 && a.released.substring(5,6)>1 && a.released.substring(5,6)<15)
 //     {
//
 //     }
 //   }
 //   
 // })
 const a='12-10-2010'.split('-').join('/')
 const b='11-10-2010'.split('-').join('/')

 console.log(a);

 const date1 = new Date(a);
 const date2 = new Date(b);


 const diffTime = Math.abs(date2 - date1);
 const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));  

console.log(diffDays);




// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

COTELE_PARIS.some(function(a){ 
  if(a.price>100){
    console.log(false);
    return false;
  }
});

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
COTELE_PARIS.forEach(function(a){ 
  if(a.uuid=='b56c6d88-749a-5b4c-b571-e5b5c6483131')
  {
    console.log(a);
  }
 
});

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

i=0
COTELE_PARIS.forEach(function(a){ 
  
  if(a.uuid=='b56c6d88-749a-5b4c-b571-e5b5c6483131')
  {
    COTELE_PARIS.splice(i,1)
    console.table(COTELE_PARIS);
    
  }
  i+=1;
 
});



// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

console.log(blueJacket);

console.log(jacket);

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

const jacket1 = Object.assign({}, blueJacket);
jacket1.favorite = true;

console.log(blueJacket);

console.log(marketplace.jacket1);

/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage


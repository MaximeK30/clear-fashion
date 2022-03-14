// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};



// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const sectionFavs = document.querySelector('#favs');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbnewProducts');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const percentile50 = document.querySelector('#p50');
const percentile90 = document.querySelector('#p90');
const percentile95 = document.querySelector('#p95');
const lastdate=document.querySelector('#lastreleaseddate');

const btn = document.getElementById('favo');
const btn1 = document.getElementById('rp');
const btn2 = document.getElementById('rr');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <div>
          <span>Brand : </span>
          <strong>${product.brand}</strong>
        </div>
        <div>
          <span>Link : </span>
          <a href="${product.link}" target="_blank">${product.name}</a>
        </div>
          <span>Price : </span>
          <strong>${product.price} €</strong>
        <div> 
          <label id="add" for="favorite-product">Add to favorite</label>
          <input type="checkbox" id ='${product.uuid}' onclick="checkFavorite('${product.uuid}')" ${product.favorite ? "checked" : ""}>
          
        </div>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const renderNewIndicators = pagination => {
  const count = pagination.length;

  spanNbNewProducts.innerHTML = count;
};


const renderp50 = p50 => {
  const arrayp50 = sortasc(p50);
  const countp50 = percentile(arrayp50,0.5);
  console.log(countp50);
  percentile50.innerHTML = Math.round(countp50);

};
const renderp90 = p90 => {
  const arrayp90 = sortasc(p90);
  const countp90 = percentile(arrayp90,0.9);
  console.log(countp90);
  percentile90.innerHTML = Math.round(countp90);

};
const renderp95 = p95 => {
  const arrayp95 = sortasc(p95);
  const countp95 = percentile(arrayp95,0.95);
  console.log(countp95);
  percentile95.innerHTML = Math.round(countp95);

};

const renderreleasedate = release => {
  release=sortdatedesc(release);
  const last_release_date = release[0].released;
  lastdate.innerHTML=last_release_date;
};






/**
 * Render page selector
 * @param  {Object} brand
 * @param  {Object} brandSelected
 * 
 */
 const renderBrands = (brand,brandSelected) => {
  //const {currentPage, pageCount} = pagination;
  const options = Array.from(
    brand,
    (brand) => `<option value="${brand}">${brand}</option>`
  ).join('');

  selectBrand.innerHTML = options;
  selectBrand.selectedIndex = brand.indexOf(brandSelected);
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  

};

//Creation of a new render with Brands 
const renderbis = ( products,pagination,brandSelected)=>
{
  if (button_click_release===true)
  {
    products=new functionrelease(products)
    btn2.style.backgroundColor = 'Salmon'
  }
  if (button_click_reasonable===true)
  {
    products=new functionreasonable(products)
    btn1.style.backgroundColor = 'Salmon'

  }

  if (button_click_favourite ===true)
  {
    products=new functionfavorite()
    btn.style.backgroundColor = 'salmon';
    
    
  }
  if (button_click_favourite === false)
{
  favoriteProducts= new functionfavorite()
  const Products = products.map(product => {
    const found = favoriteProducts.find(fav => fav.uuid === product.uuid);
    if(found) 
    {
      product.favorite = true;
    }
    return product;
  });
  products = Products;
  btn.style.backgroundColor = 'White'
}
if (button_click_favourite === true)
{
  products=products;
}




// To check the box in the  product main page if a product is in favorite
  let combobrand=['All brands']
  for ( var i=0 ; i< products.length;i++){

    if (combobrand.includes(products[i].brand))
    {
      continue;
    }
    else
    {
      combobrand.push(products[i].brand);
    }
    
  }
 //combobrand.sort();  sort a partir de index 1 à faire apres 

  var total_brands = {};
 
for (var i=0;i<products.length;i++)
{
  total_brands[products[i].brand]=[];
}

for (var i=0; i<products.length; i++)
{
  total_brands[products[i].brand].push(products[i])
}

if (brandSelected !="All brands")
{
  products=total_brands[brandSelected]
}


  

  renderPagination(pagination);
  renderProducts(products);
  renderIndicators(pagination);
  renderNewIndicators(functionreasonable(products));
  renderBrands(combobrand,brandSelected);
  renderp50(products);
  renderp90(products);
  renderp95(products);
  renderreleasedate(products);
 

}






/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,"All brands"));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,'All brands'))
);

/**
 *  Feature 1 - Browse pages
 */

selectPage.addEventListener('change', event =>{fetchProducts(parseInt(event.target.value), parseInt(selectShow.value))
  .then(setCurrentProducts)
  .then(() => renderbis(currentProducts, currentPagination,'All brands'));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,'All brands'))
);

/**
 *  Feature 2 - Filter by brands
 */

 selectBrand.addEventListener('change', event => {
  fetchProducts(parseInt(selectPage.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,event.target.value));
    
});



/**
 *  Feature 2 - Filter by recent products
 */


// First step create the button for "by recently released" / 14 days

function functionrelease (products)
{
  const ArraynewProducts=[];
  for ( var i =0; i <products.length;i++)
  {
    if((Math.abs(new Date().getTime() - new Date(products[i].released).getTime())/(24*60*60*1000) < 14))
    {
      ArraynewProducts.push(products[i]);
    }
  }
  //renderProducts(ArraynewProducts);
  return ArraynewProducts;
  

}

var button_click_release=false;

function recentrelease()
{
  if(button_click_release==false)
  {
    button_click_release=true;
    btn2.style.backgroundColor = 'White'
    
  }
  else button_click_release=false ;
  {
    btn2.style.backgroundColor = 'White'
    
    fetchProducts(parseInt(selectPage.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,'All brands'));
  }

}

/**
 *  Feature  4 - Filter by reasonable price
 */

function functionreasonable(products)
{

  var intherange=[]
  for ( var i =0; i <products.length;i++)
  {
   if(products[i].price < 50)
   {
      intherange.push(products[i]);
   }
  } 
  return intherange;
   
}

var button_click_reasonable = false;

function reasonableprice()
{

  if(button_click_reasonable==false)
  {
    button_click_reasonable=true;
    btn1.style.backgroundColor = 'White'
    
  }
  else button_click_reasonable=false ;
  {
    btn1.style.backgroundColor = 'White'
    fetchProducts(parseInt(selectPage.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,'All brands'));
  }

}


var button_click_favourite=false

 
function favouritearticle()
{ 
  
 
  if (button_click_favourite==false)
  {
    button_click_favourite=true
    
  }
else button_click_favourite=false;
{
  
  
  fetchProducts(parseInt(selectPage.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,'All brands'));
  
};}

function functionfavorite()
{
  return JSON.parse(localStorage.getItem("my_fav"));
}




/**
 *  Feature  5 - 6  Sort by price and sort by date 
 */

//cheapest

function sortasc(products)
{
  var sort_byprice=[];
  sort_byprice= products.sort(function(a,b){
  return a.price - b.price;

})
    return sort_byprice;
};

function sortdesc(products)
{
  var sort_byprice=[];
  sort_byprice= products.sort(function(a,b){
  return b.price - a.price;
})
return sort_byprice;
};

function sortdateasc(products)
{
  var sort_bydate=[]
  sort_bydate=products.sort(function(a,b){
    return Date.parse(a.released)-Date.parse(b.released);
  })
  return sort_bydate;

}
function sortdatedesc(products)
{
  var sort_bydate=[]
  sort_bydate=products.sort(function(a,b){
    return Date.parse(b.released)-Date.parse(a.released);
  })
  return sort_bydate;

}
//PROBLEME DECROISSANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//resolu

selectSort.addEventListener('change', event => { 
  console.log(event.target.value);
  if (event.target.value=="price-asc")
    {fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
      .then(setCurrentProducts)
      .then(() => renderbis(sortasc(currentProducts), currentPagination,"All brands"));
    } 
  
    else if (event.target.value=="price-desc")
    {fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
      .then(setCurrentProducts)
      .then(() => renderbis(sortdesc(currentProducts), currentPagination,"All brands"));
    }

    else if (event.target.value=="date-asc")
      {fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
        .then(setCurrentProducts)
        .then(() => renderbis(sortdateasc(currentProducts), currentPagination,"All brands"));}

    else if (event.target.value=="date-desc")
      {
        fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
        .then(setCurrentProducts)
        .then(() => renderbis(sortdatedesc(currentProducts), currentPagination,"All brands"));}

    else 
    {fetchProductsparseInt(currentPagination.currentPage, parseInt(selectShow.value))
      .then(setCurrentProducts)
      .then(() => renderbis(currentProducts, currentPagination,"All brands"));

    }

  });

  /**
 *  Feature 8 - Number of products indicator
 */

  //DEJA FAIT ?


/**
 *  Feature 9 - Number of recent products indicator
 */

// Done at the begining of the code with the other indicator


/**
 *  Feature 10 - p50, p90 and p95 price value indicator
 */

//functions 

//npm instal percentile not work

// const percentile = require("percentile");
//console.log(percentile(80, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

 // From google : 
//array should be sorted we add the property price 
function percentile(arr, p) {
  if (arr.length === 0) return 0;
  if (p <= 0) return arr[0];
  if (p >= 1) return arr[arr.length - 1];
  var index = (arr.length - 1) * p,
      lower = Math.floor(index),
      upper = lower + 1,
      weight = index % 1;

  if (upper >= arr.length) 
  return arr[lower].price;
  return arr[lower].price * (1 - weight) + arr[upper].price * weight;
}


// render function above

/**
 *  Feature 11 - Last released date indicator
 */

// We retake the function sortdate descand we take the date of the first element
//render in the render section


/**
 *  Feature 12 - Open product link
 */
// Already done 

/**
 * Feature 13 - Save as favorite
 */


var favoriteProducts=[]
var set_products=[]

 function checkFavorite(product_id){
  favoriteProducts=JSON.parse(localStorage.getItem("my_fav"))
  
 
  if (favoriteProducts==null)
  {
    favoriteProducts=[]
  }

  const product = currentProducts.find(product => {
    return product.uuid === product_id;
  });  
  const product_fav = Object.assign({}, product);
  product_fav.favorite = true;
  console.log(product_fav);
  
  if( isFavouriteProduct(product_fav)==false){

    favoriteProducts.push(product_fav);
  }
  else
  {
    favoriteProducts = favoriteProducts.filter(product => product.uuid != product_id);
    alert("Already in your favourite products ! Click on the button My favourite")
  }
  
  // const unique BrandNames = new Set(brandNames);
  localStorage.setItem("my_fav", JSON.stringify(favoriteProducts)); 
  console.log(JSON.parse(localStorage.getItem("my_fav")));
  

}

function isFavouriteProduct(product){
  var favourite = false;
  for(var i in favoriteProducts){
    if(product.uuid === favoriteProducts[i].uuid) 
    {
      favourite = true;
    }
    
  }
  return favourite;
}

function isInArray(needle, haystack) {
 
 if (haystack==null)
 {
    return false;
 }
 else
 {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
    if (haystack[i] == needle)
      return true;
    }
    return false;
  }
}




/**
 * Render list of products
 * @param  {Array} favs
 */
 const renderfavourite = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <div>
          <span>Brand : </span>
          <strong>${product.brand}</strong>
        </div>
        <div>
          <span>Link : </span>
          <a href="${product.link}" target="_blank">${product.name}</a>
        </div>
          <span>Price : </span>
          <strong>${product.price} €</strong>
        
      </div>
      
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionFavs.innerHTML = '<h2>Favourite</h2>';
  sectionFavs.appendChild(fragment);
};





//____________________________________________

//let favoriteProducts=[]
//let FavoriteChecked = false;
//
//var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//// add class 'fav' to each favorite
//favorites.forEach(function(favorite) {
//  document.getElementById(favorite).className = 'fav';
//});
//// register click event listener
//document.querySelector('.li').addEventListener('click', function(e) {
//  var id = e.target.id,
//      item = e.target,
//      index = favorites.indexOf(id);
//  // return if target doesn't have an id (shouldn't happen)
// 
//  if (index == -1) {
//    favorites.push(id);
//    item.className = 'fav';
//  // item is already favorite
//  } else {
//    favorites.splice(index, 1);
//    item.className = '';
//  }
//  // store array in local storage
//  localStorage.setItem('favorites', JSON.stringify(favorites));
//});

// local storage stores strings so we use JSON to stringify for storage and parse to get out of storage


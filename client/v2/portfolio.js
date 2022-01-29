// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};


// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');


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
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
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
  }
  if (button_click_reasonable===true)
  {
    products=new functionreasonable(products)
  }



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
  renderProducts(products)
  renderIndicators(pagination);
  renderBrands(combobrand,brandSelected);

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
    
  }
  else button_click_release=false ;
  {
    
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
    
  }
  else button_click_reasonable=false ;
  {
    
    fetchProducts(parseInt(selectPage.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => renderbis(currentProducts, currentPagination,'All brands'));
  }

}






 


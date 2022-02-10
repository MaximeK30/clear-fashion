const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.products-grid .item .product-info')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name a')
        .attr('title')
        
        
        
      const price = parseInt(
        $(element)
          .find('.price-box')
          .text()
      );
      const link = $(element)
        .find('.product-name a')
        .attr('href');
        
        
    
       

      return {'brand':'Montlimart',name, price,link,'photo': $(element)
      .find('.productList-image img')
      .attr('src'),
    '_id': uuidv5(link, uuidv5.URL)};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
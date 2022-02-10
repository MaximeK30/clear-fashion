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

  return $('.product-image-container')
  .map((i, element) => {


    const name = $(element)
    .find('.product-image-container .right-block .product-name-container.versionmob .product-name')
    .attr('title');

    const link =$(element)
    .find('.left-block .product-image-container a')
    .attr('href');

    const price =
    parseFloat($(element).parent()
      .find('.price')
      .text())
  ;
   const photo =  $(element)
        .find('.left-block .product-image-container a img')
        .attr('data-original');


    return {
     'brand': 'adresse',
      name,
      link,
      photo,
      '_id': uuidv5(link, uuidv5.URL)
    };
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
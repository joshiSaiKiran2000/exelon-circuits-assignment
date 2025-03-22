const puppeteer = require('puppeteer');
const Product = require('../models/productModel');

async function scrapeBooks() {
  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://books.toscrape.com/');

    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.product_pod'));

      const ratingMap = {
        One: 1,
        Two: 2,
        Three: 3,
        Four: 4,
        Five: 5
      };

      return items.map(el => {
        const title = el.querySelector('h3 a').getAttribute('title');
        const priceText = el.querySelector('.price_color').innerText.replace('£', '');
        const ratingClass = el.querySelector('.star-rating').classList[1];

        return {
          productName: title,
          price: parseFloat(priceText),
          description: 'No description available',
          ratings: ratingMap[ratingClass] || 0
        };
      });
    });


    for (const product of products) {
      await Product.findOneAndUpdate(
        { productName: product.productName },
        product,
        { upsert: true, new: true }
      );
    }

    await browser.close();
  } catch (err) {
    console.error('Error during scraping:', err);
  }
}

module.exports = scrapeBooks;

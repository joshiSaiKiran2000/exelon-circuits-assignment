const cron = require('node-cron');
const scrapeBooks = require('./scraper');

function startCron() {
  console.log(' immediately...');
  scrapeBooks(); 

  cron.schedule('0 * * * *', async () => {
    await scrapeBooks();
  });

}

module.exports = startCron;

const axios = require('axios');
const cheerio = require('cheerio');

async function testYello() {
  try {
    const res = await axios.get('https://www.yello.ae/category/information-technology', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    console.log('Fetched successfully, status:', res.status, 'HTML length:', res.data.length);
    const $ = cheerio.load(res.data);
    const results = [];
    
    // Find all listing elements
    $('div.company').each((i, el) => {
      const name = $(el).find('h4 a, h3 a').text().trim();
      const phone = $(el).find('.phone, a[href^="tel:"]').text().trim() || $(el).text().match(/(\+?971[\d\s-]{7,12}|0[4-9][\d\s-]{7})/)?.[0];
      const address = $(el).find('.address, .location').text().trim();
      const link = $(el).find('h4 a, h3 a').attr('href');
      if (name) {
        results.push({ name, phone, address, link: link ? 'https://www.yello.ae' + link : null });
      }
    });

    // If div.company wasn't the class, inspect other items
    if (results.length === 0) {
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.startsWith('/company/')) {
          results.push({ name: $(el).text().trim(), link: 'https://www.yello.ae' + href });
        }
      });
    }

    console.log('Results count:', results.length);
    console.log('Sample results:', JSON.stringify(results.slice(0, 10), null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testYello();

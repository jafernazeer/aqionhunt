const axios = require('axios');
const cheerio = require('cheerio');

async function testDetail() {
  try {
    const url = 'https://www.yello.ae/company/347405/hutaib-infotech-solutions';
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    const title = $('h1#company_name, h1').text().trim();
    const phone = $('.phone, #company_phone, a[href^="tel:"]').text().trim() || res.data.match(/(\+?971[\d\s-]{7,12}|0[4-9][\d\s-]{7})/)?.[0];
    const website = $('a.weblink, a[href*="http"]:not([href*="yello.ae"])').attr('href');
    const location = $('.location, .address, #company_address').text().trim();
    
    // Extract emails from HTML or mailto
    const mailto = $('a[href^="mailto:"]').attr('href');
    const emailMatch = res.data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g);
    
    console.log({
      title,
      phone,
      website,
      location,
      mailto,
      emailMatches: emailMatch ? Array.from(new Set(emailMatch)).filter(e => !e.includes('yello.ae') && !e.includes('sentry') && !e.includes('w3.org')) : []
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testDetail();

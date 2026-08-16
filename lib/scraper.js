import * as cheerio from 'cheerio';

/**
 * Scrapes and extracts business identity, copy, value proposition, services, and contact info.
 */
export async function scrapeWebsite(url) {
  let formattedUrl = url.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }

  const result = {
    url: formattedUrl,
    hostname: '',
    title: '',
    description: '',
    companyName: '',
    tagline: '',
    headings: [],
    paragraphs: [],
    services: [],
    stats: [],
    contact: {
      email: '',
      phone: '',
      address: '',
    },
    rawText: '',
  };

  try {
    const parsedUrl = new URL(formattedUrl);
    result.hostname = parsedUrl.hostname.replace(/^www\./i, '');
    result.companyName = result.hostname.split('.')[0].charAt(0).toUpperCase() + result.hostname.split('.')[0].slice(1);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(formattedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Clean out script/style tags
    $('script, style, noscript, svg, iframe, link').remove();

    // Extract meta title & description
    result.title = $('title').first().text().trim() || $('meta[property="og:title"]').attr('content') || '';
    result.description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
    
    // Better company name extraction
    const ogSiteName = $('meta[property="og:site_name"]').attr('content');
    if (ogSiteName) {
      result.companyName = ogSiteName.trim();
    } else if (result.title) {
      const parts = result.title.split(/[-|–—:]/);
      if (parts.length > 0 && parts[0].trim().length < 30) {
        result.companyName = parts[0].trim();
      }
    }

    // Headings
    $('h1, h2, h3').slice(0, 15).each((_, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      if (text && text.length > 4 && text.length < 120) {
        result.headings.push(text);
      }
    });

    // Paragraphs
    $('p').slice(0, 20).each((_, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      if (text && text.length > 25 && text.length < 350) {
        result.paragraphs.push(text);
      }
    });

    // Tagline estimation
    if (result.headings.length > 0) {
      result.tagline = result.headings[0];
    } else if (result.description) {
      result.tagline = result.description;
    }

    // Extract potential services
    const serviceKeywords = ['service', 'solution', 'offer', 'product', 'feature', 'platform', 'pricing', 'about'];
    $('a, button, li, h3, h4').each((_, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      if (text.length > 3 && text.length < 40 && !result.services.includes(text)) {
        const href = $(el).attr('href') || '';
        if (serviceKeywords.some(kw => href.toLowerCase().includes(kw) || text.toLowerCase().includes(kw))) {
          if (result.services.length < 8 && !/^(home|about|contact|login|sign up|terms|privacy|get started|demo)$/i.test(text)) {
            result.services.push(text);
          }
        }
      }
    });

    // Extract potential contacts
    const bodyText = $('body').text();
    const emailMatch = bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) result.contact.email = emailMatch[0];

    const phoneMatch = bodyText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) result.contact.phone = phoneMatch[0];

    result.rawText = (result.headings.join('. ') + ' ' + result.paragraphs.slice(0, 10).join(' ')).slice(0, 3000);

    return result;
  } catch (error) {
    console.warn(`Scraping error for ${formattedUrl}:`, error.message);
    return {
      ...result,
      fallbackUsed: true,
      tagline: `Intelligent Solutions & Operations for ${result.companyName}`,
      description: `${result.companyName} provides industry-leading products and client services.`,
      headings: [`Modern Services by ${result.companyName}`, `Transforming Client Engagements`],
      paragraphs: [`${result.companyName} delivers specialized expertise, dedicated workflows, and tailored service experiences for enterprises and modern businesses.`],
      services: ['Client Advisory & Consulting', 'Enterprise Solutions', 'Operations Management', 'Custom Support & Delivery'],
    };
  }
}

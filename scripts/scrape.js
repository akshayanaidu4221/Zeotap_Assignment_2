import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URLs for each CDP documentation
const cdpDocs = {
  segment: 'https://segment.com/docs/',
  mparticle: 'https://docs.mparticle.com/',
  lytics: 'https://docs.lytics.com/',
  zeotap: 'https://docs.zeotap.com/home/en-us/'
};

// Function to scrape a single URL
async function scrapePage(url, platform) {
  try {
    console.log(`Scraping ${url}`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract title and content (this will need to be customized for each platform)
    let title = $('h1').first().text().trim();
    if (!title) {
      title = $('title').text().trim();
    }
    
    // Extract main content (this is a simplified approach)
    let content = '';
    $('p, li, h2, h3, h4').each((_, el) => {
      const text = $(el).text().trim();
      if (text) {
        content += text + ' ';
      }
    });
    
    // Clean up content
    content = content.replace(/\s+/g, ' ').trim();
    
    // Extract links to other pages
    const links = [];
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('/') && !href.includes('#')) {
        links.push(new URL(href, url).href);
      }
    });
    
    return {
      url,
      title,
      content,
      platform,
      links
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

// Function to scrape documentation for a platform
async function scrapePlatform(baseUrl, platform, maxPages = 10) {
  const visited = new Set();
  const queue = [baseUrl];
  const results = [];
  
  while (queue.length > 0 && results.length < maxPages) {
    const url = queue.shift();
    
    if (visited.has(url)) continue;
    visited.add(url);
    
    const pageData = await scrapePage(url, platform);
    if (pageData) {
      results.push({
        title: pageData.title,
        content: pageData.content,
        url: pageData.url,
        platform
      });
      
      // Add new links to the queue
      for (const link of pageData.links) {
        if (!visited.has(link)) {
          queue.push(link);
        }
      }
    }
  }
  
  return results;
}

// Main function to scrape all platforms
async function scrapeAllPlatforms() {
  for (const [platform, baseUrl] of Object.entries(cdpDocs)) {
    console.log(`Starting to scrape ${platform} documentation...`);
    
    try {
      const results = await scrapePlatform(baseUrl, platform);
      
      // Save results to JSON file
      const outputPath = path.join(__dirname, '..', 'src', 'data', `${platform}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
      
      console.log(`Saved ${results.length} pages for ${platform}`);
    } catch (error) {
      console.error(`Error scraping ${platform}:`, error);
    }
  }
}

// Run the scraper
scrapeAllPlatforms().then(() => {
  console.log('Scraping completed!');
}).catch(error => {
  console.error('Error:', error);
});